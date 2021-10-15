const ADD_BOOKMARK = '즐겨 찾기 목록에 추가';
const REMOVE_BOOKMARK = '즐겨 찾기 목록에서 삭제';

const actions = {
  addBookmark: (data) => {
    return { type: ADD_BOOKMARK, payload: data };
  },
  removeBookmark: (data) => {
    return { type: REMOVE_BOOKMARK, payload: data };
  },
};

export { ADD_BOOKMARK, REMOVE_BOOKMARK, actions };
