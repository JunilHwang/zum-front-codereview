import RouterInstance from './RouterInstance';
import Home from './components/Home';
import ContentList from './components/ContentList';

const zumRouter = new RouterInstance();

const activeRoute = (path) => {
  const allRoutes = Array.from(document.querySelectorAll('[router-link]'));

  allRoutes.forEach((route) => {
    const routerLink = route.getAttribute('router-link');
    route.classList.remove('on');

    if (routerLink === path) {
      route.classList.add('on');
    }
  });
}

const drawPage = () => {
  const root = document.getElementById('App');
  const currentPath = window.location.pathname.slice(1) || 'home';
  const route = zumRouter.getRouter()[currentPath];
  activeRoute(currentPath);

  switch (route?.content) {
    case 'Home':
      if (!route.state) {
        root.innerHTML = '';
        // eslint-disable-next-line no-new
        const home = new Home(root);
        zumRouter.setRouterState(currentPath, { ...route, state: home });
      } else {
        route.state.render();
      }
      break;
    case 'ContentList':
      if (!route.state) {
        root.innerHTML = '';
        // eslint-disable-next-line no-new
        const list = new ContentList(root, null, currentPath);
        zumRouter.setRouterState(currentPath, { ...route, state: list });
      } else {
        route.state.render();
      }
      break;
    default:
      break;
  }
};

const pushHistory = (e) => {
  const route = e.target.attributes[0].value;
  const routeInfo = zumRouter.getRouter()[route];

  if (!routeInfo) {
    window.history.pushState({}, '404', '404');
  } else {
    window.history.pushState({ path: routeInfo.path }, { path: routeInfo.path }, routeInfo.path);
  }

  drawPage();
};

const popHistory = (e) => {
  drawPage();
};

window.onload = () => {
  const definedRoutes = Array.from(document.querySelectorAll('[router-link]'));

  definedRoutes.forEach((route) => {
    route.addEventListener('click', pushHistory);
  });

  drawPage();
};

window.addEventListener('popstate', popHistory);
