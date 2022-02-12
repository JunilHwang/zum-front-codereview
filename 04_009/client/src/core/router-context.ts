import { IRouterState, TState } from './types';

class RouterContext {
  state: IRouterState;

  constructor() {
    this.state = {
      pathname: '',
      query: {},
      params: {},
      push: () => {},
      goBack: () => {},
    };
  }

  public setState(nextState: TState) {
    this.state = { ...this.state, ...nextState };
  }
}

export { RouterContext };
export default new RouterContext();
