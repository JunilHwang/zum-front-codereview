import Component from '@src/core/Component';

import { getDetailContents } from '@src/api/detailContents';
import { getState, setState } from '@src/lib/observer';
import { contentsDetailData } from '@src/store/contentsDetail';
import { _ } from '@src/utils/myUtils';

export default class DetailPage extends Component {
  constructor($target: HTMLElement) {
    super($target);
    this.componentId = 'DetailPage';
    this.keys = [contentsDetailData];
    this.subscribe();
  }

  htmlTemplate() {
    const originalUrl = this.getOriginalUrl();
    const contentsHTML = getState<any>(contentsDetailData);
    const html = contentsHTML[originalUrl];
    if (!html) return '<div class="loading-spinner"></div>';

    const { title, writer, body } = html;
    return `
    <main class="main-wrap">
      <article>
        <div class="detail-header">
          <h2 class="detail-title">${title}</h2>
          <div class="detail-writer">
            <span>by ${writer}</span>
          </div>
        </div>
        <div class="detail-body">${body}</div>
        <div class="detail-btns"> 
          <button class="detail-prevList__button">목록</button>
          <button class="detail-favorite__button">즐겨찾기</button>
        <div>
      <article>
    </main>
    `;
  }

  async initializeState() {
    const originalUrl = this.getOriginalUrl();
    const data = await getDetailContents(originalUrl);
    const currentContents = getState<any>(contentsDetailData);
    const setDetailContents = setState(contentsDetailData);
    setDetailContents({
      ...currentContents,
      [originalUrl]: data,
    });
  }

  getOriginalUrl() {
    const url = 'https://hub.zum.com';
    const params = location.pathname.replace('/detail', '');
    const originalUrl = url + params;
    return originalUrl;
  }

  setEvent() {
    _.on(this.$target, 'click', this.handleClickPrevListBtn.bind(this));
    _.on(this.$target, 'click', this.handleClickFavoriteBtn.bind(this));
  }

  handleClickPrevListBtn(e: MouseEvent) {
    const target = e.target as HTMLButtonElement;
    if (!target.closest('.detail-prevList__button')) return;
    history.back();
  }

  handleClickFavoriteBtn(e: MouseEvent) {
    const target = e.target as HTMLButtonElement;
    if (!target.closest('.detail-favorite__button')) return;
    this.addIntoFavoritesStore();
  }

  addIntoFavoritesStore() {
    const currentContents = JSON.parse(localStorage.getItem('temp') as string);
    const savedContents =
      JSON.parse(localStorage.getItem('favorites') as string) || [];
    const contentsList = [...savedContents, ...currentContents];
    localStorage.setItem('favorites', JSON.stringify(contentsList));
    alert('즐겨찾기에 등록되었습니다.');
  }
}
