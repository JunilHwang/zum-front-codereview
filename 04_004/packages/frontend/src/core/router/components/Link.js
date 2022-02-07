import { createElement as h, Component } from '@/core';
import { withRouter } from '@/core/router';

export const Link = withRouter(class extends Component {
  navigate(event) {
    event.preventDefault();
    if (this.props.replace) {
      this.props.history.replace(this.props.to);
    } else {
      this.props.history.push(this.props.to);
    }
  }

  render() {
    return (
      h('a', {
          href: this.props.to,
          onClick: this.navigate.bind(this),
        },
        ...this.props.children,
      )
    );
  }
});

