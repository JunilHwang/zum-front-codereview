function createStore(reducer) {
  let state;
  let listeners = [];

  const getState = () => {
    return state;
  };

  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(el => el !== listener);
    };
  };

  const dispatch = action => {
    state = reducer(state, action);
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
}

export default createStore;
