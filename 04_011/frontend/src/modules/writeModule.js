const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const WRITE_POST = 'write/WRITE_POST';
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';
const UPDATE_POST = 'write/UPDATE_POST';

export const initialize = () => ({ type: INITIALIZE });
export const changeField = ({ key, value }) => ({
  type: CHANGE_FIELD,
  payload: { key, value },
});
export const writePost = ({ title, author, body }) => ({
  type: WRITE_POST,
  payload: { title, author, body },
});
export const setOriginalPost = (post) => ({
  type: SET_ORIGINAL_POST,
  post,
});
export const updatePost = ({ postId, title, author, body }) => ({
  type: UPDATE_POST,
  payload: { postId, title, author, body },
});

const initialState = {
  title: '',
  author: '',
  body: '',
  post: null,
  postId: null,
};

export default function editorModule(state = initialState, action = {}) {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...initialState,
      };
    case CHANGE_FIELD:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case WRITE_POST:
      return {
        ...state,
        post: action.payload,
      };
    case SET_ORIGINAL_POST:
      return {
        ...state,
        title: action.post.title,
        author: action.post.author,
        body: action.post.body,
        postId: action.post.postId,
      };
    case UPDATE_POST:
      return {
        ...state,
        post: action.payload,
      };

    default:
      return state;
  }
}
