import createStore from '@/core/createStore';

// initial state
const initState = {
  a: 20,
};

// types
export const INCREASE = 'INCREASE';
export const DECREASE = 'DECREASE';
interface i_action {
  [key: string]: any;
}

// reducer
export const store = createStore((state = initState, action: i_action = {}) => {
  switch (action.type) {
    case INCREASE:
      return { ...state, a: state.a + 1 };
    case DECREASE:
      return { ...state, a: state.a - 1 };
    default:
      return state;
  }
});

// actions
export const increase2 = () => ({ type: INCREASE });
export const decrease2 = () => ({ type: DECREASE });
