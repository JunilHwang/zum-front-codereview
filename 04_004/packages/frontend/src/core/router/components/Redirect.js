import { Component } from '@/core';
import { withRouter } from '@/core/router';

export const Redirect = withRouter(class extends Component {
  componentDidMount() {
    this.props.history.replace(this.props.to);
  }

  render() {
    return null;
  }
});
