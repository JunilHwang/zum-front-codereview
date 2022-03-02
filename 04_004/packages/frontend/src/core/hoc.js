import { createElement as h, Component } from './dom';
import { request } from '@/core/router';

export function withFetch(url, options = {}) {
  return function (WrappedComponent) {
    return class extends Component {
      constructor(props) {
        super(props);

        this.state = {
          error: null,
          data: null,
        };
        this.abortController = null;
      }

      componentWillUnmount() {
        try {
          this.abortController?.abort();
        } catch (e) {
          console.error(e);
        }
      }

      fetchData() {
        if (this.abortController) return;
        this.abortController = new AbortController();

        request(
          typeof url === 'function' ?
          url(this.props) :
          url, {
            ...options,
            signal: this.abortController.signal
          })
          .then(result => this.setState({ data: result }))
          .catch(err => {
            if (500 <= err.status) {
              // TODO: alert 컴포넌트 만들기
              alert(`오류(${err.status}): ${err.result.message}`);
            }
            this.setState({ error: err, data: err.result });
          })
          .finally(() => this.abortController = null);
      }

      render() {
        return h(WrappedComponent, {
          fetchedData: this.state.data,
          error: this.state.error,
          fetch: this.fetchData.bind(this),
          abort: this.abortController?.abort.bind(this.abortController) ||
            (() => {}),
          ...this.props
        });
      }
    };
  };
}

export function withInitFetch(url, options = {}) {
  return function (WrappedComponent) {
    return withFetch(url, options)(
      class extends Component {
        componentDidMount() {
          this.props.fetch();
        }

        componentWillUnmount() {
          this.props.abort();
        }

        render() {
          return h(WrappedComponent, {...this.props});
        }
      }
    );
  }
}
