import Component from './core/Component';

export default class Content extends Component {
  constructor($target, $props) {
    super($target, $props);
    this.render();
  }

  // eslint-disable-next-line class-methods-use-this
  template() {
    const { getContentState } = this.$props;

    const $content = getContentState.map(
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

    return $content.join('');
  }
}
