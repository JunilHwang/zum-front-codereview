class Observable {
  constructor() {
    this._listeners = new Set();
  }

  subscribe(listener) {
    this._listeners.add(listener);
  }

  unsubscribe(listener) {
    this._listeners = [...this._listeners].filter(subscriber => subscriber !== listener);
  }

  notifyAll(data) {
    this._listeners.forEach(listener => listener(data));
  }
}

export default new Observable();
