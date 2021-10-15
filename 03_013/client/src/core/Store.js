/* eslint-disable no-restricted-syntax */
import { observable } from './observer';

// dispatch -> action(commit) -> mutation -> state
const createStore = reducer => {
  // reducer가 반환하는 state를 observable로 설정
  const state = observable(reducer());

  // getState를 호출하면 state가 아닌 frozenState 반환(읽기 전용)
  const frozenState = {};
  Object.keys(state).forEach(key => {
    Object.defineProperty(frozenState, key, {
      get() {
        return state[key];
      },
    });
  });

  const dispatch = action => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      if (state[key]) {
        state[key] = value;
      }
    }
  };

  const getState = () => frozenState;
  return { getState, dispatch };
};

export default createStore;
