// import { getBestDataApi, getMainDataApi } from '../modules/api/dataApi.js';
import Store from './Store.js';

export const GET_LOADING = 'GET_LOADING';
export const GET_APP_VIEW = 'GET_APP_VIEW';
export const GET_SUB_VIEW = 'GET_SUB_VIEW';
export const GET_DETAIL_VIEW = 'GET_DETAIL_VIEW';
export const POST_BOOKMARK = 'ADD_BOOKMARK';
export const NOT_FOUND = 'NOT_FOUND';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case NOT_FOUND: {
      return { ...state, error: true };
    }
    case GET_LOADING: {
      const { path, page, count } = payload;
      return {
        ...state,
        sub: {
          ...state.sub,
          count: count,
        },
        loading: true,
        error: false,
        path,
        page,
        detail: '',
      };
    }
    case POST_BOOKMARK: {
      let bookmark = JSON.parse(localStorage.getItem('bookmark'));
      return {
        ...state,
        sub: { ...state.sub, bookmark, count: 0 },
        error: false,
      };
    }
    case GET_APP_VIEW: {
      const { main, best, path, page } = payload;
      return { ...state, page, main, best, path, error: false, sub: { ...state.sub, count: 0 } };
    }
    case GET_SUB_VIEW: {
      const { page, path, count, data } = payload;

      if (path !== 'bookmark') {
        const subArr = [...state.sub[path], ...data];
        if (subArr.length > 40) subArr.length = 40;
        return {
          ...state,
          sub: { ...state.sub, [path]: subArr, count },
          error: false,
          path,
          page,
        };
      } else {
        return {
          ...state,
          sub: { ...state.sub, [path]: data, count },
          error: false,
          path,
          page,
        };
      }
    }
    case GET_DETAIL_VIEW: {
      const { data, page } = payload;
      return {
        ...state,
        sub: { ...state.sub, count: 0 },
        page,
        path: data.path,
        detail: data.data,
        error: false,
      };
    }
    default:
      return state;
  }
};
const mainObj = { life: [], food: [], trip: [], culture: [] };

const initialState = {
  header: [
    { title: '홈', route: '/' },
    { title: '라이프', route: '/life' },
    { title: '푸드', route: '/food' },
    { title: '여행', route: '/trip' },
    { title: '컬처', route: '/culture' },
    { title: '즐겨찾기', route: '/bookmark' },
  ],
  main: mainObj,
  sub: { life: [], food: [], trip: [], culture: [], bookmark: [], count: 0 },
  best: [],
  detail: '',
  error: false,
  loading: false,
  path: '',
  page: '',
};

const appStore = Store.createStore(initialState, reducer);

export default appStore;
