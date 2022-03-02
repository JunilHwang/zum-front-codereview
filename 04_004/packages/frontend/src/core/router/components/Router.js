import { createElement as h, Component } from '@/core';
import { matchPath } from '@/core/router';
import { Context } from '../context';

export class Router extends Component {
  constructor(props) {
    super(props);

    this.handlePopState = this.handlePopState.bind(this);
  }

  handlePopState() {
    this.forceUpdate();
  }

  componentDidMount() {
    window.addEventListener('popstate', this.handlePopState);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  render() {
    return (
      h(Context.Provider, {
          value: {
            match: matchPath(location.pathname, {path: '/'}),
            router: this,
          },
        },
        this.props.children[0]
      )
    );
  }
}

