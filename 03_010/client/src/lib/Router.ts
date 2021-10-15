import type { RoutesStore } from '@src/configs/routes';
import { setState } from './observer';

type ValueOf<T> = T[keyof T];

export default class Router {
  private routes: RoutesStore;
  public pageState: string;
  public setPage: (args: any) => void;

  constructor(routes: RoutesStore, pageState: string) {
    this.routes = routes;
    this.pageState = pageState;
    this.setPage = setState(pageState);
    this.init();
  }

  init() {
    this.handlePopState();
    window.addEventListener('popstate', this.handlePopState.bind(this));
  }

  handlePopState() {
    let { pathname } = location;
    pathname = pathname === '/' ? pathname : `/${pathname.split('/')[1]}`;

    let Page;
    for (const [routePath, component] of Object.entries(this.routes)) {
      if (routePath === pathname) {
        Page = component;
        break;
      }
    }
    if (!Page) Page = this.routes['/error'];
    this.setPage({ CurrentPage: Page });
  }

  push(pathName: string, params: string | null = null) {
    let url = `${location.origin}${pathName}`;
    if (params) url += params;
    history.pushState({}, pathName, url);
    this.handlePopState();
  }

  renderHTML(el: HTMLElement, route: ValueOf<RoutesStore>) {
    if (route) new route(el);
    else new this.routes['/error'](el);
  }
}
