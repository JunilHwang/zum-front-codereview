import Component from '@src/core/Component';
import { getState, setState } from '@src/lib/observer';

import { _ } from '@src/utils/myUtils';
import { request } from '@src/utils/request';

import {
  culturesData,
  foodsData,
  lifesData,
  travelsData,
} from '@src/store/contents';
import type { ContentsState, HubContent } from '@src/store/contents';

import ContentsWrap from '@src/components/sub/ContentsWrap';

type StoreKey = {
  culturesData: string;
  foodsData: string;
  lifesData: string;
  travelsData: string;
  [key: string]: string;
};

export default class SubPage extends Component {
  constructor($target: HTMLElement) {
    super($target);
    this.componentId = 'SubPage';
    this.keys = [lifesData, culturesData, foodsData, travelsData];
    this.subscribe();
  }

  htmlTemplate() {
    return `
      <main class="main-wrap">
        <section class="contents-wrap"></section>
      <main>
    `;
  }

  async initializeState() {
    const { data } = this.getCurrentSubPageStore();
    if (data.length > 0) return;

    const path = location.pathname.replace('/', '');
    const contentsData = await request(`/api/content/${path}`);

    const storeKey = this.getStoreKey();
    const currentData = getState<ContentsState>(storeKey);
    const setContents = setState(storeKey);
    setContents({
      ...currentData,
      data: contentsData,
      page: 1,
    });
  }

  mountChildComponent() {
    const $contentsWrap = _.$('.contents-wrap', this.$target);
    const { data, page } = this.getCurrentSubPageStore();

    if (!page) return;
    const ContentLists = this.getContentsListByPage(data, page);
    new ContentsWrap($contentsWrap, {
      setContent: this.setStoreContents.bind(this),
      data: ContentLists,
      page,
    });
  }

  getCurrentSubPageStore() {
    const storeKey = this.getStoreKey();
    const { data, page } = getState<ContentsState>(storeKey);
    return { data, page };
  }

  getStoreKey() {
    const currentKey = `${location.pathname.replace('/', '')}Data`;
    const store: StoreKey = { culturesData, foodsData, lifesData, travelsData };
    return store[currentKey];
  }

  getContentsListByPage(data: HubContent[], page: number) {
    const initialCount = 12;
    const count = page === 1 ? initialCount : initialCount + page * 4;
    return data.filter((_, idx) => idx + 1 <= count);
  }

  setStoreContents(page: number) {
    const storeKey = this.getStoreKey();
    const currentData = getState<ContentsState>(storeKey);
    const setContents = setState(storeKey);
    setContents({
      ...currentData,
      page,
    });
  }
}
