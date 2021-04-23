import './style.css';

import Component from '../../core/components';
import Router from '../../core/router';
import Observable from '../../core/observable';

import Modal from '../Modal';
import ThumbItem from '../ThumbItem';

import { getTop4Items } from '../../services/contentsService';

export default class MainItems extends Component {
  constructor($target) {
    super($target);
    this.$mainItems = document.createElement('section');
    this.state = {
      items: {},
      isModalOn: false,
    };

    this.$target.appendChild(this.$mainItems);
    this.addEvent();
    this.effect();
  }

  render(props) {
    this.$mainItems.innerHTML = this.getTemplate(props);
    this.mount(props);
  }

  effect() {
    this.getItems();
  }

  getTemplate({ items }) {
    let template = '';

    if (Object.keys(items).length === 0) {
      template += '<ul>목록을 불러오지 못했습니다.</ul>';
    } else {
      for (const category in items) {
        template += `
          <h4 class='item_category'>#${category}</h4>
          <ul class='item item_${category}'></ul>`;
      }
    }

    return template;
  }

  async getItems () {
    this.setState({ isModalOn: true });
    const items = await getTop4Items();
    this.setState({ items, isModalOn: false });
  }

  mount({ items, isModalOn }) {
    isModalOn && new Modal(this.$mainItems, { message: '기사를 불러오는 중입니다' });

    for (const category in items) {
      items[category].forEach((item) => {
        new ThumbItem(
          document.querySelector(`.item_${category}`),
          { item });
      });
    }
  }

  addEvent() {
    this.$mainItems.addEventListener('click', (event) => {
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
