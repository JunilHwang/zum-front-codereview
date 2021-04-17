/* eslint-disable no-new */
import Component from './core/Component';
import HomeContent from './HomeContent';
import HomeRanking from './HomeRanking';
import { getContent, getRanking } from '../request';

export default class Home extends Component {
  constructor($target, $props) {
    super($target, $props);
    this.setup();
    this.render();
  }

  setup() {
    this.$state = {
      contentList: ['life', 'food', 'trip', 'culture'],
      life: [],
      food: [],
      trip: [],
      culture: [],
      ranking: [],
      index: 0,
      size: 4,
    };
    this.getContentData();
    this.getRankingData();
  }

  get getContentState() {
    const { life, food, trip, culture, contentList } = this.$state;

    return {
      contentList,
      life,
      food,
      trip,
      culture,
    };
  }

  get getRankingState() {
    const { ranking } = this.$state;

    return ranking;
  }

  getContentData() {
    const { index, size, contentList } = this.$state;

    contentList.forEach((path) => {
      getContent(path, index, size).then((res) => {
        this.setState({
          [path]: res,
        });
      });
    });
  }

  getRankingData() {
    getRanking().then((res) => {
      this.setState({
        ranking: res,
      });
    });
  }

  mounted() {
    const { getRankingState, getContentState } = this;
    const $content = this.$target.querySelector('[data-component="content-block"]');
    const $ranking = this.$target.querySelector('[data-component="ranking-block"]');

    new HomeContent($content, {
      getContentState,
    });

    new HomeRanking($ranking, {
      getRankingState,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  template() {
    return `
      <div data-component="content-block"></div>
      <div data-component="ranking-block"></div>
    `;
  }
}
