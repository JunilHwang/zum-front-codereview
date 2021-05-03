import { Component } from '../../core';
import { ContentCard } from '../../components';
import { text } from '../../contants';

export default class ContentCardList extends Component {
  makeTemplate() {
    const { contents, name } = this.props;

    return `${name ? `<p>${name}</p>` : ``}
    ${contents
      .map((content, index) => {
        return `<li class='contents-card' data-key='${index}'></li>`;
      })
      .join('')}

    `;
  }

  mounted() {
    const cards = this.target.querySelectorAll('.contents-card');
    const { contents } = this.props;
    cards.forEach((card, index) => {
      new ContentCard(
        card,
        { content: contents[index] },
        this.store,
        this.router
      );
    });
  }
}
