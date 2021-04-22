interface Routes {
  [key: string]: () => any;
  fallback: () => any;
}

const routeSymbol = 'nav-link';

const Router = {
  routes: {} as Routes,
  routeSymbol,

  init(routes: Routes) {
    this.routes = routes;
    this.addEvent();
    this.handlePopState();
  },

  handlePopState() {
    const path = location.pathname;
    if (this.routes[path]) this.routes[path]();
    else this.routes.fallback();
  },

  addEvent() {
    window.addEventListener('popstate', this.handlePopState.bind(this));

    document.addEventListener('click', (e) => {
      const target = e?.target as Element;
      const anchorNode = target.closest('a');

      if (!anchorNode) return;
      if (anchorNode?.dataset?.route !== this.routeSymbol) return;

      const path = anchorNode.getAttribute('href');

      e.preventDefault();

      if (!path) return console.error('href attribute is not set');

      history.pushState(null, '', path);
      this.handlePopState();
    });
  },
};

export { Router };
