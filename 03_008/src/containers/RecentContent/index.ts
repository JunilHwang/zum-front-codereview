import { createElement } from '@/core/dom';
import store from '@/store';
import {
  fetchRecentContentsErrorAction,
  fetchRecentContentsLoadingAction,
  fetchRecentContentsSuccessAction,
} from '@/store/actionCreator';
import { createUseEffect } from '@/store/hooks/useEffect';
import { FunctionComponent } from '@/types/dom';
import { getRecentContents } from '@/apis/zumHubAPI';
import { ContentList } from '@/components';

interface RecentContentProps {}

const useEffect = createUseEffect();
const { dispatch, getState } = store;

export const RecentContent: FunctionComponent<RecentContentProps> = () => {
  const { recentContents } = getState();

  const { cultureData, foodData, lifeData, tripData } = recentContents;

  useEffect(() => {
    const fetchRecentContent = async () => {
      dispatch(fetchRecentContentsLoadingAction());

      try {
        const recentContentsData = await getRecentContents();
        console.log(recentContentsData);

        dispatch(fetchRecentContentsSuccessAction(recentContentsData));
      } catch (error) {
        dispatch(fetchRecentContentsErrorAction(error));
      }
    };

    fetchRecentContent();
  }, []);

  return createElement('<div></div>', [
    ContentList({ sectionTitle: '라이프', contentData: lifeData }),
    ContentList({ sectionTitle: '푸드', contentData: foodData }),
    ContentList({ sectionTitle: '여행', contentData: tripData }),
    ContentList({ sectionTitle: '컬쳐', contentData: cultureData }),
  ]);
};
