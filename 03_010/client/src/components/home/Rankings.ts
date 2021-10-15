import Component from '@src/core/Component';
import { getState, setState } from '@src/lib/observer';

import { getRankingListApi } from '@src/api/rankingApi';

import { rankingData } from '@src/store/rankings';
import type { RankingContent, RankingState } from '@src/store/rankings';

import { router } from '../../../index';
import { _ } from '@src/utils/myUtils';

export default class Rankings extends Component {
  constructor($target: HTMLElement) {
    super($target);
    this.componentId = 'Rankings';
    this.keys = [rankingData];
    this.subscribe();
  }

  htmlTemplate() {
    const { isLoading, data: rankingList } =
      getState<RankingState>(rankingData);

    const rankingListTemplate = this.getRankingListTemplate(rankingList);

    return `
      <h2 class="ranking__h2">실시간 TOP 12</h2>
      ${
        isLoading
          ? '<div class="loading-spinner"><div>'
          : `<ul class="ranking-container">
              ${rankingListTemplate}
             </ul>`
      }`;
  }

  getRankingListTemplate(rankingList: RankingContent[]) {
    return rankingList
      .map(
        ({ idx, mediaName, title, url }: RankingContent, rank: number) => `
      <li class="ranking__list" data-idx=${idx} data-url=${url}>
        <div class="ranking-text-wrap">
          <h3>${title}</h3>
          <span class="ranking__span-media">${mediaName}</span>
          <span class="rank-number">${rank + 1}</span>
        </div>
      </li>`
      )
      .join('');
  }

  async initializeState() {
    this.loadingRankingList();
    const setRankingList = setState(rankingData);
    const rankingList = await getRankingListApi();
    setRankingList({
      isLoading: false,
      data: rankingList,
    });
  }

  loadingRankingList() {
    const setRankingList = setState(rankingData);
    setRankingList({
      isLoading: true,
      data: [],
    });
  }

  setEvent() {
    _.on(this.$target, 'click', this.handleClickRankingContents.bind(this));
  }

  handleClickRankingContents(e: MouseEvent) {
    const target = e.target as HTMLLIElement;
    if (!target.closest('.ranking__list')) return;
    const targetContents = target.closest('.ranking__list') as HTMLLIElement;
    const targetId = Number(targetContents.dataset.idx);
    const targetUrl = targetContents.dataset.url;
    const originalUrl = 'https://hub.zum.com';
    const url = targetUrl?.replace(originalUrl, '');
    this.saveTempInlocalStorage(targetId);
    router.push('/detail', url);
  }

  saveTempInlocalStorage(contentsId: number) {
    const { data } = getState<RankingState>(rankingData);
    const contents = data.filter((content) => content.idx === contentsId);
    localStorage.setItem('temp', JSON.stringify([...contents]));
  }
}
