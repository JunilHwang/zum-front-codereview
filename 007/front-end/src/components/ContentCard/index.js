import { Component } from '../../core';

export default class ContentCard extends Component {
  makeTemplate() {
    const { content } = this.props;

    return `<a href="#">${content.title} ${content.summaryContent} ${content.mediaName}</a>`;
  }

  setEvent() {
    const { content } = this.props;

    this.target.addEventListener('click', event => {
      event.preventDefault();

      this.router.pushState('DETAIL', content.url);
    });
  }
}
