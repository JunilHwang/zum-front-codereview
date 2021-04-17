/* eslint-disable no-new */
import Component from './core/Component';
import Content from './Content';
import { getContent } from '../request';
import makeObserver from './makeObserver';

export default class ContentList extends Component {
  $path;

  constructor($target, $props, $path) {
    super($target, $props);
    this.$path = $path;
    this.setup();
    this.render();
  }

  setup() {
    this.$state = {
      index: 0,
      size: 12,
      content: [],
    };
    this.getContentData();
  }

  get getContentState() {
    const { content } = this.$state;

    return content;
  }

  getContentData() {
    const { index, size, content } = this.$state;

    getContent(this.$path, index, size).then((res) => {
      this.setState({
        index: index + size,
        content: [...content, ...res]
      });
    });
  }

  mounted() {
    const {
      getContentState, getContentData
    } = this;
    const $contentList = this.$target.querySelector('[data-component="content-list"]');

    new Content($contentList, {
      getContentState,
    });
    makeObserver(getContentData.bind(this));
  }

  // eslint-disable-next-line class-methods-use-this
  template() {
    return `
      <div class="content-list" data-component="content-list"></div>
      <div class="content-list-observer"></div>
    `;
  }
}
