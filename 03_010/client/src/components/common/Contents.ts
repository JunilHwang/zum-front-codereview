import Component from '@src/core/Component';
import { ContentsState, HubContent } from '@src/store/contents';
import { _ } from '@src/utils/myUtils';

import { router } from '../../../index';

export default class Contents extends Component<ContentsState> {
  htmlTemplate() {
    const { isLoading, title: categoryTitle, data } = this.props;
    if (isLoading) return '<div class="loading-spinner"><div>';

    const temporaryImg = 'https://via.placeholder.com/270x200';
    return `
    <div>
      <h2 class="contents-category-title">${categoryTitle}</h2>
      <ul class="contents-container">
        ${data
          .map(
            ({ idx, mediaName, title, summaryContent, url, imageUrl }) => `
        <li class="contents-card" tabindex="0" data-idx=${idx} data-url=${url}>
          <img class="contents__img" src=${
            imageUrl ?? temporaryImg
          } alt="콘텐츠">
          <div class="text-wrap">
            <h3 class="card-title">${title}</h3>
            <p class="card-description">${summaryContent ?? ''}</p>
            <span class="card-media">${mediaName}<span>
            <button class="favorite-btn" aria-label="즐겨찾기">
              <i class="far fa-heart fa-2x ${
                this.hasContentsInStorage(idx) ? 'selected' : ''
              }" data-id=${idx}></i>
            </button>
          </div>
        </li>
        `
          )
          .join('')}
      </ul>
    </div>     
    `;
  }

  setEvent() {
    _.on(this.$target, 'click', this.handleClickContents.bind(this));
    _.on(this.$target, 'click', this.handleClickFavoriteIcon.bind(this));
  }

  handleClickContents(e: MouseEvent) {
    const target = e.target as HTMLLIElement;
    if (!target.closest('.contents-card')) return;
    if (target.closest('.favorite-btn')) return;

    const targetContents = target.closest('.contents-card') as HTMLLIElement;
    const targetId = Number(targetContents.dataset.idx);
    const targetUrl = targetContents.dataset.url;
    const originalUrl = 'https://hub.zum.com';
    const url = targetUrl?.replace(originalUrl, '');
    this.saveTempInlocalStorage(targetId);
    router.push('/detail', url);
  }

  handleClickFavoriteIcon(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest('.fa-heart')) return;

    const targetClassList = target.classList;
    const isSelected = targetClassList.contains('selected');
    const contentId = Number(target.dataset.id);

    if (isSelected) {
      targetClassList.remove('selected');
      this.removeInFavorite(contentId);
    } else {
      targetClassList.add('selected');
      this.addInFavorites(contentId);
    }
  }

  addInFavorites(contentsId: number) {
    const { data } = this.props;
    const contents = data.filter((content) => content.idx === contentsId);
    let items: localStroageItems = localStorage.getItem('favorites');
    if (!items) {
      items = [...contents];
      this.saveTolocalStorage('favorites', items);
    } else {
      const savedItems = JSON.parse(items);
      savedItems.push(...contents);
      this.saveTolocalStorage('favorites', savedItems);
    }
  }

  saveTolocalStorage(key: string, content: HubContent[]) {
    localStorage.setItem(key, JSON.stringify(content));
  }

  hasContentsInStorage(contentsId: Number) {
    let items: localStroageItems = localStorage.getItem('favorites');
    if (!items) return false;
    const contents = JSON.parse(items).filter(
      (item: HubContent) => item.idx === contentsId
    );

    return contents.length > 0 ? true : false;
  }

  removeInFavorite(contentsId: number) {
    const items = localStorage.getItem('favorites') as string;
    const contents = JSON.parse(items).filter(
      (item: HubContent) => item.idx !== contentsId
    );
    this.saveTolocalStorage('favorites', contents);
  }

  saveTempInlocalStorage(contentsId: number) {
    const { data } = this.props;
    const contents = data.filter((content) => content.idx === contentsId);
    this.saveTolocalStorage('temp', [...contents]);
  }
}

type localStroageItems = string | HubContent[] | null;
