export default class Store {
  state;
  reducer;
  subscribers;
  middlewares;

  constructor(reducer) {
    this.reducer = reducer;
    this.subscribers = [];

    this.initState();
  }

  initState() {}

  applyMiddlewares(middlewares) {
    this.middlewares = middlewares;
    this.middlewares.reverse();
    let dispatch = this.dispatch.bind(this);

    middlewares.forEach(middleware => {
      dispatch = middleware(this)(dispatch);
    });

    this.dispatch = dispatch;
  }

  subscribe(subscriber, callback = null) {
    this.subscribers.push({
      subscriber,
      callback,
    });
  }

  publish() {
    this.subscribers.forEach(subscriber => {
      subscriber.callback(this.state);
    });
  }

  getState() {
    return { ...this.state };
  }

  dispatch(action) {
    this.state = this.reducer.setState(this.state, action);
    this.publish();
  }

  createAction(type, payload = {}) {
    return {
      type,
      payload: { ...payload },
    };
  }
}
