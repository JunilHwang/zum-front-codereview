const READ_POST = 'post/READ_POST';

export const readPost = (post) => ({
  type: READ_POST,
  payload: post,
});

const initialState = {
  post: null,
};

export default function postModule(state = initialState, action = {}) {
  switch (action.type) {
    case READ_POST:
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
}
