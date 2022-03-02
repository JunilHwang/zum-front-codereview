class Store {
  constructor(reducer) {
    this.reducer = reducer;
    this.state = reducer();
    this.subscriber = new WeakSet();
  }

  getState() {
    return this.state;
  }

  subscribe(callback) {
    this.subscriber.add(callback);
    return () => this.subscriber.delete(callback);
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.subscriber.forEach(callback => callback(action));
  }
}

export function createStore(reducer) {
  return new Store(reducer);
}
