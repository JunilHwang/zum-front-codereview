import './style.css';

import Component from '../../core/components';
import Router from '../../core/router';

import Modal from '../Modal';
import ThumbItem from '../ThumbItem';

import { getCategoryContents } from '../../services/contentsService';

export default class SubItems extends Component {
  constructor($target) {
    super($target);
    this.state = {
      items: [],
      isModalOn: false,
    };

    this.$subItems = document.createElement('section');
    this.$target.appendChild(this.$subItems);
    this.addEvent();
    this.effect();
  }

  getTemplate({ items }) {
    return `
    <ul class='sub_items'>
      ${items.length === 0 ? '목록을 불러오지 못했습니다' : ''}
    </ul>    
    `;
  }

  effect() {
    this.getItems();
  }

  render(props) {
    this.$subItems.innerHTML = this.getTemplate(props);
    this.mount(props);
  }

  mount({ isModalOn, items }) {
    isModalOn && new Modal(this.$subItems, {
      message: '목록을 불러오는 중입니다',
    });

    if (items) {
      items.forEach((item) => {
        new ThumbItem(
          document.querySelector('.sub_items'),
          { item },
        );
      });
    }
  }

  async getItems() {
    const currentPath = window.location.pathname.slice(1);
    this.setState({ isModalOn: true });
    const items = await getCategoryContents(currentPath);
    this.setState({ items, isModalOn: false });
  }

  addEvent() {
    this.$subItems.addEventListener('click', (event) => {
      const $thumbItem = event.target.closest('.thumb_item');
      if ($thumbItem) {
        const $a = $thumbItem.querySelector('.thumb_link');
        const path = $a.dataset.url.split('https://hub.zum.com')[1];

        window.history.pushState({}, '', path);
        Router.navigate();
      }
    });
  }
}
