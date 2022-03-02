export interface IReduxAction {
  type: string;
  payload?: any;
}
type TState = any;
type TReducer = (state: TState, action: IReduxAction) => TState;

export const createStore = (reducer: TReducer) => {
  let state: any;
  const listeners: Function[] = [];

  const getState = () => {
    return state;
  };

  const unsubscribe = (listener: Function) => {
    const index = listeners.indexOf(listener);
    if (index === -1) {
      return console.error('faile unsubscribe!! because there is no listener');
    }
    listeners.splice(index, 1);
  };

  const subscribe = (listener: Function) => {
    listeners.push(listener);
    return () => unsubscribe(listener);
  };

  const dispatch = (action: IReduxAction) => {
    state = reducer(state, action);

    listeners.forEach((listener) => {
      listener();
    });

    return action;
  };

  return {
    dispatch,
    subscribe,
    unsubscribe,
    getState,
  };
};

// 사용법

// const initState = { value: 0 };
// function counterReducer(state = initState, action: IReduxAction) {
//   switch (action.type) {
//     case 'counter/incremented':
//       return { value: state.value + 1 };
//     case 'counter/decremented':
//       return { value: state.value - 1 };
//     default:
//       return state;
//   }
// }

// const store = createStore(counterReducer);

// const cb = () => console.log(store.getState());
// store.subscribe(cb);

// store.dispatch({ type: 'counter/incremented' });
// // {value: 1}
// store.dispatch({ type: 'counter/incremented' });
// // {value: 2}
// store.dispatch({ type: 'counter/decremented' });
