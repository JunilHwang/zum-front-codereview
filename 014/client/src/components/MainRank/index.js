import './style.css';

import Component from '../../core/components';
import Router from '../../core/router';

import Modal from '../Modal';

import { getTop12Ranks } from '../../services/rankService';

export default class MainRank extends Component {
  constructor($target) {
    super($target);
    this.$mainRank = document.createElement('div');
    this.$mainRank.className = 'mainRank';
    this.state = {
      ranks: [],
      isModalOn: false,
    };

    this.$target.appendChild(this.$mainRank);
    this.render(this.state);
    this.addEvent();
    this.effect();
  }

  render(props) {
    this.$mainRank.innerHTML = this.getTemplate(props);
    this.mount(props);
  }

  effect() {
    this.getRanks();
  }

  getTemplate({ ranks }) {
    const template = `
      <h3>실시간 TOP 12</h3>
      <ul>
      ${ranks.length === 0 ?
    '실시간 랭킹을 불러오지 못했습니다' : ranks.map((rank, index) => `
        <li class='rank_item'>
          <a class='rank_link' data-url=${rank.url}>
            <span class='rank_number'>${index + 1}</span>
            <span class='rank_title'>${rank.title}</span>
            <span class='author'>by ${rank.mediaName}</span>
          </a>
        </li>
      `).join('')}
      </ul>`;

    return template;
  }

  mount({ isModalOn }) {
    isModalOn && new Modal(this.$mainRank, {
      message: '실시간 랭킹을 불러오는 중입니다',
    });
  }

  async getRanks() {
    this.setState({ isModalOn: true });
    const ranks = await getTop12Ranks();
    this.setState({ ranks, isModalOn: false });
  }

  addEvent() {
    this.$mainRank.addEventListener('click', (event) => {
      const $rankItem = event.target.closest('.rank_item');

      if ($rankItem) {
        const $a = $rankItem.querySelector('.rank_link');
        const path = $a.dataset.url.split('https://hub.zum.com')[1];

        window.history.pushState({}, '', path);
        Router.navigate();
      }
    });
  }
}
