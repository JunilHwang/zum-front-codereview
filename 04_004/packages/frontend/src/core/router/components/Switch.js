import { Component } from '@/core';
import { matchPath } from '@/core/router/match';

export class Switch extends Component {
  render() {
    return this.props.children
      .find(child =>
        matchPath(location.pathname, {
          path: '*',
          ...child.props
        }));
  }
}
