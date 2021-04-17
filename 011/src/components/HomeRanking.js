import Component from './core/Component';

export default class Ranking extends Component {
  constructor($target, $props) {
    super($target, $props);
    this.render();
  }

  // eslint-disable-next-line class-methods-use-this
  template() {
    const { getRankingState } = this.$props;

    const $content = getRankingState.map(
      (content, idx) => `
      <div class="ranking">
        <div class="number">${idx + 1}</div>
        <div>
          <div class="title">${content.title}</div>
          <div class="media-name">by ${content.mediaName}</div>
        </div>
      </div>
    `
    );

    return `
      <div class="ranking-list">
      <div class="ranking-title">실시간 TOP 12</div>
      ${$content.join('')}
      </div>
    `;
  }
}
