import { Action, State } from '@/core/Store';

const actionTypes = {
  ADD_COUNT: 'add_count',
};

const initialState = {
  count: 0,
};

const reducer = (state: State, action: Action) => {
  const { type } = action;

  switch (type) {
    case actionTypes.ADD_COUNT:
      return { ...state, count: state.count + 1 };
    default:
      return { ...state };
  }
};

export { reducer, actionTypes, initialState };
