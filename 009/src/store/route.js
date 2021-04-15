import Observer from '@/core/Observer'

class RouteStore {
  $route = Observer('')

  constructor() { }

  setValue(route) {
    this.$route(route)
  }
  getValue() {
    return this.$route()
  }
}

const routeStore = new RouteStore()

export default routeStore