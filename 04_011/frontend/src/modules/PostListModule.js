const READ_POSTLIST = 'postList/READ_POSTLIST';
const CHANGE_FIELD = 'postList/CHANGE_FIELD';
const DATED_SELECT = 'postList/DATED_SELECT';
const PAGENATE_SECLET = 'postList/PAGENATE_SECLET';
const AUTHOR_FILTER = 'postList/AUTHOR_FILTER';
const REFRESH_STORE = 'postList/REFRESH_STORE';
const PAGE_INCREASE = 'postList/PAGE_INCREASE';
const PAGE_DECREASE = 'postList/PAGE_DECREASE';
const PAGE_LENGTH = 'postList/PAGE_LENGTH';
const PAGE_INIT = 'postList/PAGE_INIT';

export const readPostList = (postList) => ({
  type: READ_POSTLIST,
  payload: postList,
});

export const changeField = ({ value }) => ({
  type: CHANGE_FIELD,
  value,
});

export const authorSelect = ({ value }) => ({
  type: AUTHOR_FILTER,
  value,
});

export const datedSelect = ({ selector }) => ({
  type: DATED_SELECT,
  selector,
});

export const pagenationSelect = ({ selector }) => ({
  type: PAGENATE_SECLET,
  selector,
});

export const refreshStore = (postList) => ({
  type: REFRESH_STORE,
  payload: postList,
});

export const pageIncrease = () => ({ type: PAGE_INCREASE });
export const pageDecrease = () => ({ type: PAGE_DECREASE });
export const pageLength = ({ number }) => ({
  type: PAGE_LENGTH,
  number,
});
export const pageInit = () => ({ type: PAGE_INIT });

const initialState = {
  value: null,
  postList: null,
  datedSelector: 'none',
  pagenateSelector: 'none',
  authorFilter: null,
  page: 1,
  diff: 1,
  pageLength: 3,
};

export default function postListModule(state = initialState, action = {}) {
  switch (action.type) {
    case READ_POSTLIST:
      return {
        ...state,
        postList: action.payload,
      };
    case CHANGE_FIELD:
      return {
        ...state,
        value: action.value,
      };
    case AUTHOR_FILTER:
      return {
        ...state,
        authorFilter: action.value,
      };
    case DATED_SELECT:
      return {
        ...state,
        datedSelector: action.selector,
      };
    case PAGENATE_SECLET:
      return {
        ...state,
        pagenateSelector: action.selector,
      };
    case REFRESH_STORE:
      return {
        ...initialState,
        postList: action.payload,
      };
    case PAGE_INCREASE:
      return {
        ...state,
        page: state.page + state.diff,
      };
    case PAGE_DECREASE:
      return {
        ...state,
        page: state.page - state.diff,
      };
    case PAGE_LENGTH:
      return {
        ...state,
        pageLength: action.number,
      };
    case PAGE_INIT:
      return {
        ...state,
        page: initialState.page,
      };

    default:
      return state;
  }
}
