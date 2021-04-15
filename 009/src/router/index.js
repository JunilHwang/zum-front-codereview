import RouteStore from '@/store/route';

class Router {
  $routes = []
  $routerElement = document.querySelector('[data-router]')

  constructor(routes) {
    this.$routes = routes
    this.routerTo()
    this.setEvent()
  }

  getMatchRoute() {
    const purePath = window.location.pathname
    return this.$routes.find(route => route.path === purePath) || this.$routes[0]
  }
  route() {
    const { path, view, target } = this.getMatchRoute()
    RouteStore.setValue(path)
    new view(target)
  }
  routerTo(target) {
    const routerUrl = target || this.$routes[0].path
    history.pushState(null, null, routerUrl)
    this.route()
  }
  setEvent() {
    document.addEventListener('popstate', this.router);

    document.addEventListener('click', event => {
      if (!event.target.matches('[router-link]')) return;
      event.preventDefault()
      this.routerTo(event.target.href)
    })
  }
}

export { Router }