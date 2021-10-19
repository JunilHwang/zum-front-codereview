import { createElement } from '@/core/dom';
import { FunctionComponent } from '@/types/dom';
import store from '@/store';
import { RankingItem } from '@/components';
import rankingListStyle from './rankingList.module.scss';

interface RankingListProps {}

const { rankingSection, rankingList } = rankingListStyle;
export const RankingList: FunctionComponent<RankingListProps> = () => {
  const { getState } = store;
  const { rankingDatas } = getState();
  return createElement(
    `
    <section class="${rankingSection}">
      <h2>실시간 TOP 12</h2>
    </section>`,
    [
      createElement(
        `<ol class="${rankingList}"></ol>`,
        rankingDatas.map((rankingData, i) => RankingItem({ rankingData, rank: i + 1 }))
      ),
    ]
  );
};
