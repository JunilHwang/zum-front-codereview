export default class RouterInstance {
  $router;

  constructor() {
    this.$router = {
      home: {
        path: '/',
        content: 'Home',
        state: null,
      },
      life: {
        path: '/life',
        content: 'ContentList',
        state: null,
      },
      food: {
        path: '/food',
        content: 'ContentList',
        state: null,
      },
      trip: {
        path: '/trip',
        content: 'ContentList',
        state: null,
      },
      culture: {
        path: '/culture',
        content: 'ContentList',
        state: null,
      },
    }
  }

  setRouterState(path, newState) {
    const newRouter = {...this.$router};
    newRouter[path] = newState;

    this.$router = newRouter;
  }

  getRouter() {
    return this.$router;
  }
}
