export default class Store {
  constructor() {
    this.state = {
      age: 10,
      listeners: [],
    };
  }
  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.publish();
  }
  subscribe(subscriber, context = null) {
    this.listeners.push({
      subscriber,
      context,
    });
  }
  publish() {
    listeners.forEach(({ subscriber, context }) => {
      subscriber.call(context);
    });
  }
  getState() {
    return { ...this.state };
  }
  reducer(state = {}, action) {}
}
