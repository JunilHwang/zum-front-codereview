import {
  createElement as h,
  Component,
  withRouter,
  Link,
} from '@/core';
import { urlFor } from '@/helper';

export const ErrorPage = withRouter(
  class extends Component {
    componentDidMount() {
      this.props.history.bust(urlFor({ type: 'api/list' }));
    }

    render() {
      return (
        h('div', null,
          h('div', null,
            h('span', null, 'error!')
          ),
          h('div', null,
            h(Link, {to: '/'}, '메인으로 이동')
          )
        )
      );
    }
  }
);
