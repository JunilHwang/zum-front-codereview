import Observable from './basic-observable';
import routerContext, { RouterContext } from './router-context';
import { ClassContructor, IRoute } from './types';
import { getQuery, pathValidation } from './utils';

class Router {
  target: HTMLElement;
  routes: IRoute[];
  NotFoundPage: ClassContructor;
  routerContext: RouterContext;
  stores: Observable[];

  constructor(target: HTMLElement, routes: IRoute[], NotFoundPage: ClassContructor, stores: Observable[]) {
    this.target = target;
    this.routes = routes;
    this.NotFoundPage = NotFoundPage;
    this.routerContext = routerContext;
    this.stores = stores;
    this.push = this.push.bind(this);
    this.goBack = this.goBack.bind(this);
    this.set();
    this.route();
    this.addLinkChangeHandler();
    this.addBackChangeHandler();
  }

  private set() {
    routerContext.setState({
      pathname: window.location.pathname,
      query: getQuery(),
      push: (url: string) => this.push(url),
      goBack: () => this.goBack(),
    });
  }

  private route() {
    const currentPath = window.location.pathname.slice(1).split('/');
    for (let i = 0; i < this.routes.length; i++) {
      const routePath = this.routes[i].path.slice(1).split('/');
      const params = pathValidation(currentPath, routePath);
      if (!params) continue;
      routerContext.setState({ params });

      this.stores.forEach((store) => {
        store.unsubscribeAll();
      });

      const Page = this.routes[i].component;
      new Page(this.target);
      return;
    }
    new this.NotFoundPage(this.target);
  }

  private addLinkChangeHandler() {
    this.target.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const closest = target.closest('a');
      if (!closest || closest.getAttribute('target')) return;
      e.preventDefault();
      const pathname = closest.getAttribute('href');
      if (pathname) {
        this.push(pathname);
      }
    });
  }

  private addBackChangeHandler() {
    window.addEventListener('popstate', () => {
      routerContext.setState({ pathname: window.location.pathname, query: getQuery() });
      this.route();
    });
  }

  private push(url: string) {
    if (url === window.location.pathname + window.location.search) return;
    const [pathname] = url.split('?');
    window.history.pushState(null, '', url);
    routerContext.setState({ pathname, query: getQuery() });
    this.route();
  }

  private goBack() {
    window.history.back();
  }
}

export default Router;
