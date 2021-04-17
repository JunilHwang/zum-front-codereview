import Component from './core/Component';

export default class Content extends Component {
  constructor($target, $props) {
    super($target, $props);
    this.render();
  }

  // eslint-disable-next-line class-methods-use-this
  template() {
    const { getContentState } = this.$props;
    const { contentList } = getContentState;
    const contentName = {
      life: '라이프',
      food: '푸드',
      trip: '여행',
      culture: '문화',
    };

    const $elements = contentList.map((path) => {
      const list = getContentState[path];
      const $content = list.map(
        (content) => `
        <div class="content">
          <img class="thumbnail" src="${content.imageUrl}" alt="컨텐츠 썸네일"/>
          <div class="content-description">
          <div class="title">${content.title}</div>
          <div class="summary-content">${content.summaryContent}</div>
          <div class="media-name">by ${content.mediaName}</div>
          </div>
        </div>
      `
      );

      return `
      <div>
        <div class="content-title">#${contentName[path]}</div>
        <div class="content-list">${$content.join('')}</div>
      </div>
      `;
    });

    return $elements.join('');
  }
}
