import { Component } from './dom';

const store = new WeakMap();
export function createContext(defaultValue) {
  class Provider extends Component {
    render() {
      store.set(Provider, this.props.value);
      return this.props.children[0];
    }
  }

  class Consumer extends Component {
    render() {
      const value = store.has(Provider) ? store.get(Provider) : defaultValue;
      return this.props.children[0](value);
    }
  }

  return {
    Provider,
    Consumer,
  };
}
