import { getArticleRanking } from '@/apis';
import { RankingList } from '@/components';
import { createElement } from '@/core/dom';
import store from '@/store';
import {
  fetchRankingErrorAction,
  fetchRankingLoadingAction,
  fetchRankingSuccessAction,
} from '@/store/actionCreator';
import { createUseEffect } from '@/store/hooks/useEffect';
import { FunctionComponent } from '@/types/dom';

interface RankingProps {}

const { dispatch, getState } = store;

const useEffect = createUseEffect();

export const Ranking: FunctionComponent<RankingProps> = () => {
  useEffect(() => {
    const fetchRankingData = async () => {
      dispatch(fetchRankingLoadingAction());
      try {
        const rankingDatas = await getArticleRanking();

        dispatch(fetchRankingSuccessAction(rankingDatas));
      } catch (error) {
        dispatch(fetchRankingErrorAction(error));
      }
    };

    fetchRankingData();
    window.setInterval(fetchRankingData, 60000);
  }, []);
  return createElement('<div></div>', [RankingList({})]);
};
