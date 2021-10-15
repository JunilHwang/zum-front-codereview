import Component from '@src/core/Component';
import { getState, setState } from '@src/lib/observer';
import { _ } from '@src/utils/myUtils';

import {
  culturesData,
  foodsData,
  lifesData,
  travelsData,
} from '@src/store/contents';
import type { ContentsState } from '@src/store/contents';

import { getAllContents } from '@src/api/contentsApi';

import Rankings from '@src/components/home/Rankings';
import Contents from '@src/components/common/Contents';
import { myCache } from '@src/utils/cache';

export default class HomePage extends Component {
  constructor($target: HTMLDivElement) {
    super($target);
    this.componentId = 'HomePage';
    this.keys = [lifesData, culturesData, foodsData, travelsData];
    this.subscribe();
  }

  htmlTemplate() {
    return `
      <main class="main-wrap">
        <section class="contents-wrap content-life"></section>
        <section class="contents-wrap content-food"></section>
        <section class="contents-wrap content-travel"></section>
        <section class="contents-wrap content-culture"></section>
        <section class="rankings-wrap"></section>
      </main>
      `;
  }

  async initializeState() {
    const allContents = await getAllContents();
    allContents.forEach((content, idx) => {
      const contents = getState<ContentsState>(this.keys[idx]);
      const setContents = setState(this.keys[idx]);
      setContents({
        ...contents,
        isLoading: false,
        data: content,
      });
    });
  }

  mountChildComponent() {
    const categories = ['라이프', '컬처', '푸드', '여행'];
    const $allContents = _.$All('.contents-wrap', this.$target);
    const { cache } = myCache.get(categories[categories.length - 1]);
    if (cache?.length > 0) this.loadCachedContents($allContents, categories);
    else this.loadCategoryContents($allContents, categories);

    const $rankings = _.$('.rankings-wrap', this.$target);
    new Rankings($rankings);
  }

  loadingContents($target: HTMLElement) {
    return new Contents($target, {
      title: '',
      isLoading: true,
      data: [],
      page: 1,
    });
  }

  loadCachedContents($allContents: NodeList, categories: string[]) {
    $allContents.forEach(($contentsWrap: any, idx: number) => {
      const { cache } = myCache.get(categories[idx]);
      new Contents($contentsWrap, {
        title: categories[idx],
        isLoading: false,
        data: cache,
        page: 1,
      });
    });
  }

  loadCategoryContents($allContents: NodeList, categories: string[]) {
    $allContents.forEach(($contentsWrap: any, idx: number) => {
      if (this.keys.length === 0) return this.loadingContents($contentsWrap);

      const contents = getState<ContentsState>(this.keys[idx]);
      const max = 4;
      const topContentsWithInFour = contents.data.filter(
        (_, i: number) => i < max
      );

      myCache.set(categories[idx], [...topContentsWithInFour]);
      new Contents($contentsWrap, {
        ...contents,
        isLoading: contents.isLoading,
        data: topContentsWithInFour,
      });
    });
  }
}
