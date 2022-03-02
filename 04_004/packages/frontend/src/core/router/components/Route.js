import { createElement as h, Component } from '@/core';
import { Context } from '@/core/router/context';
import { matchPath } from '@/core/router/match';
import { cache } from '@/core/router/request';

const locations = [];
export class Route extends Component {
  render() {
    return (
      h(Context.Consumer, null, context => {
        const match = matchPath(location.pathname, this.props);
        const component = this.props.component;
        if (context) {
          const location = locations[locations.length-1] || {
            pathname: window.location.pathname,
            search: window.location.search,
            hash: window.location.hash,
            state: {},
          };
          return (
            h(Context.Provider, {
                value: { ...context, match }
              },
              component ?
              h(component, {
                  // TODO: 사이드 이펙트 감소
                  match: match || context.match,
                  location,
                  history: {
                    location,
                    length: locations.length,
                    push: (location, state = {}) => {
                      history.pushState(state, null, location);
                      locations.push({ state });
                      context.router.forceUpdate();
                    },
                    replace: (location, state = {}) => {
                      history.replaceState(state, null, location);
                      locations[locations.length-1] = {
                        ...locations[locations.length-1],
                        state,
                      };
                      context.router.forceUpdate();
                    },
                    bust: (location) => {
                      cache.delete(location);
                    },
                  },
                  ...this.props.passedProps
                },
                ...this.props.passedProps.children
              ) :
              this.props.children[0]
            )
          );
        }
        return null;
      })
    );
  }
}
