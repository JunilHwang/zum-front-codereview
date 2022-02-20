/*
export const combineReducers = (fnObj) => {
  console.log(fnObj.postListModule(), 'fnObj.postListModule');
  return fnObj;
};
*/
export const createStore = (reducer) => {
  let state;
  const listeners = new Set();

  const getState = () => ({ ...state });

  const dispatch = (action) => {
    state = reducer(state, action);
    publish();
  };

  const subscribe = (fn) => listeners.add(fn);
  const publish = () => listeners.forEach((fn) => fn());

  return {
    getState,
    dispatch,
    subscribe,
  };
};
