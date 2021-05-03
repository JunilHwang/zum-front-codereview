export default class Router {
  routes;
  store;
  target;

  constructor(store) {
    this.store = store;
    this.initRoutes();
    this.setEventForPopState();
  }

  initRoutes() {}

  setTarget(target) {
    this.target = target;
  }

  setEventForPopState() {
    window.addEventListener('popstate', event => {
      const page = event.state.page;
      document.title = page;
      this.loadPage(page);
    });
  }

  loadPage(page) {
    // const app = document.querySelector('#app');

    if (page in this.routes) {
      new this.routes[page](this.target, null, this.store, this);
    }
  }

  replaceState(page) {
    document.title = page;

    window.history.replaceState({ page }, `${page}`, `#/page/${page}`);
    this.loadPage(page);
  }

  pushState(page, url) {
    const nowPage = history.state.page;

    if (nowPage !== page) {
      document.title = page;

      url
        ? window.history.pushState({ page, url }, `${page}`, `#/page/${page}`)
        : window.history.pushState({ page }, `${page}`, `#/page/${page}`);

      this.loadPage(page);
    }
  }
}
