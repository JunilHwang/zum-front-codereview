import { createElement as h, Component } from '@/core';
import { Route } from './components/Route';

export function withRouter(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        h(Route, {component: WrappedComponent, passedProps: this.props})
      );
    }
  };
}
