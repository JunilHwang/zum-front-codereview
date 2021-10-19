import { Action, RankingContent, RecentContents } from '@/types';
import {
  FETCH_RANKING_ERROR,
  FETCH_RANKING_LOADING,
  FETCH_RANKING_SUCCESS,
  FETCH_RECENT_CONTENTS_ERROR,
  FETCH_RECENT_CONTENTS_LOADING,
  FETCH_RECENT_CONTENTS_SUCCEES,
  PAGE_CHANGE,
} from './actionType';

export const fetchRankingLoadingAction = (): Action => ({
  type: FETCH_RANKING_LOADING,
});

export const fetchRankingSuccessAction = (rankingDatas: RankingContent[]): Action => ({
  type: FETCH_RANKING_SUCCESS,
  payload: { rankingDatas },
});

export const fetchRankingErrorAction = (error: null | Error | unknown): Action => ({
  type: FETCH_RANKING_ERROR,
  payload: { error },
});

export const fetchRecentContentsLoadingAction = (): Action => ({
  type: FETCH_RECENT_CONTENTS_LOADING,
});

export const fetchRecentContentsSuccessAction = (recentContents: RecentContents): Action => ({
  type: FETCH_RECENT_CONTENTS_SUCCEES,
  payload: { recentContents },
});

export const fetchRecentContentsErrorAction = (error: null | Error | unknown): Action => ({
  type: FETCH_RECENT_CONTENTS_ERROR,
  payload: { error },
});

export const pageChangeAction = (path: string): Action => ({
  type: PAGE_CHANGE,
  payload: { path },
});
