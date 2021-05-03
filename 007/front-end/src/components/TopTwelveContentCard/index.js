import { Component } from '../../core';

export default class TopTwelveContentCard extends Component {
  makeTemplate() {
    const { content, rank } = this.props;

    return `${rank} ${content.title} ${content.mediaName}`;
  }
}
