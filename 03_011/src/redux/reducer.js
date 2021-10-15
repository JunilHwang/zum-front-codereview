import { ADD_BOOKMARK, REMOVE_BOOKMARK } from './action';

const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case ADD_BOOKMARK:
      return [...state, { ...action.payload, timestamp: Date.now() }];
    case REMOVE_BOOKMARK:
      const {
        payload: { idx },
      } = action;
      return state.filter((content) => content.idx !== +idx);
    default:
      return state;
  }
};

export default bookmarkReducer;
