import './style.css';

import Component from '../../core/components';
import Router from '../../core/router';

import Modal from '../Modal';
import ThumbItem from '../ThumbItem';

import { getFavoriteItems } from '../../services/contentsService';

export default class FavoriteItems extends Component {
  constructor($target) {
    super($target);
    this.$favoriteItems = document.createElement('section');
    this.state = {
      items: [],
      isModalOn: false,
    };

    this.$target.appendChild(this.$favoriteItems);
    this.render(this.state);
    this.addEvent();
    this.effect();
  }

  mount({ isModalOn, items }) {
    isModalOn && new Modal(this.$favoriteItems, {
      message: '목록을 불러오는 중입니다',
    });
    if (items) {
      items.forEach((item) => {
        new ThumbItem(
          document.querySelector('.favorite_items'), {
            item,
            favoriteitems: items,
            setfavoriteitems: this.setState.bind(this),
          });
      });
    }
  }

  effect() {
    this.getItems();
  }

  async getItems() {
    this.setState({ isModalOn: true });
    const items = await getFavoriteItems();
    this.setState({ items, isModalOn: false });
  }

  addEvent() {
    this.$favoriteItems.addEventListener('click', (event) => {
      const $thumbItem = event.target.closest('.thumb_item');
      if ($thumbItem) {
        const $a = $thumbItem.querySelector('.thumb_link');
        const path = $a.dataset.url.split('https://hub.zum.com')[1];

        window.history.pushState({}, '', path);
        Router.navigate();
      }
    });
  }

  getTemplate({ items }) {
    return `
    <ul class='favorite_items'>
      ${items.length === 0 ? '즐겨찾기한 기사가 없습니다' : ''}
    </ul>`;
  }

  render(props) {
    this.$favoriteItems.innerHTML = this.getTemplate(props);
    this.mount(props);
  }
}
