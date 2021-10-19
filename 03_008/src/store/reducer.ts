import { Action, GlobalState, Reducer } from '@/types';
import { HOME_PAGE } from '@/route/path';
import {
  FETCH_RANKING_ERROR,
  FETCH_RANKING_LOADING,
  FETCH_RANKING_SUCCESS,
  FETCH_RECENT_CONTENTS_ERROR,
  FETCH_RECENT_CONTENTS_LOADING,
  FETCH_RECENT_CONTENTS_SUCCEES,
  PAGE_CHANGE,
} from './actionType';

let INITIAL_STATE: GlobalState = {
  loading: true,
  error: null,
  currentPath: HOME_PAGE,
  rankingDatas: [],
  recentContents: { cultureData: [], foodData: [], lifeData: [], tripData: [] },
};

const reducer: Reducer = (
  state: GlobalState = INITIAL_STATE,
  action: Action = { type: null }
): GlobalState => {
  switch (action.type) {
    case FETCH_RANKING_LOADING:
      return { ...state, loading: true };
    case FETCH_RANKING_SUCCESS:
      return { ...state, loading: false, rankingDatas: action.payload?.rankingDatas };
    case FETCH_RANKING_ERROR:
      return { ...state, loading: false, error: action.payload?.error };
    case FETCH_RECENT_CONTENTS_LOADING:
      return { ...state, loading: true };
    case FETCH_RECENT_CONTENTS_SUCCEES:
      return { ...state, loading: false, recentContents: action.payload?.recentContents };
    case FETCH_RECENT_CONTENTS_ERROR:
      return { ...state, loading: false, error: action.payload?.error };
    case PAGE_CHANGE:
      return {
        ...state,
        currentPath: action.payload?.path,
      };
    default:
      return state;
  }
};

export default reducer;
