import { getUrlInfo } from '@util/index';

import App from '@src/components/App';

import { routes } from './routes';

type DataObject = {
  [propsName: string]: any;
};

type route = {
  name: string;
  path: string;
  template: Function | null;
};

type Template = () => string;

class Router {
  routes: Map<string, route>;
  constructor(routes: route[]) {
    this.routes = new Map();
    routes.forEach(route => {
      const { path } = route;
      this.routes.set(path, route);
    });
  }

  initializeApp() {
    document.body.innerHTML = '';
    document.body.appendChild(App.element);
  }

  async render() {
    this.initializeApp();

    window.scrollTo(0, 0);

    const pathResource = getUrlInfo(window.location.pathname);
    const { path: currentPath } = pathResource;

    if (this.routes.has(currentPath)) {
      const { name, path, template } = this.routes.get(currentPath) as route;

      if (!template) {
        const viewObj = await import(`@view/${name}/index.js`);
        const viewTemplate = viewObj.default;
        this.routes.set(path, { name, path, template: viewTemplate });
      }

      const templateFunc = (this.routes.get(currentPath) as route).template;
      App.setTemplate(templateFunc as Template);
    }
  }

  go(path: string, state: DataObject = {}) {
    window.history.pushState(state, '', path);
    this.render();
  }
}

const router = new Router(routes);

export default router;
