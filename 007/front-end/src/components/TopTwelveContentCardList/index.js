import { Component } from '../../core';
import { TopTwelveContentCard } from '../../components';
import { text } from '../../contants';

export default class TopTwelveContentCardList extends Component {
  makeTemplate() {
    const { topTwelveContents } = this.props;

    return `
    <p>${text.TOP_TWELVE}</p>
      ${topTwelveContents
        .map((content, index) => {
          return `<li class="top-twelve-contents-card" data-key="${index}"></li>`;
        })
        .join('')}
    `;
  }

  mounted() {
    const cards = this.target.querySelectorAll('.top-twelve-contents-card');
    const { topTwelveContents } = this.props;

    cards.forEach((card, index) => {
      new TopTwelveContentCard(
        card,
        { rank: index + 1, content: topTwelveContents[index] },
        this.store,
        this.router
      );
    });
  }
}
