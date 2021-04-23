import './style.css';

import Component from '../../core/components';

import Modal from '../Modal';

import { getArticle } from '../../services/detailService';

export default class Article extends Component {
  constructor($target) {
    super($target);
    this.state = {
      page: '',
      isModalOn: false,
    };
    this.render(this.state);
    this.effect();
  }

  mount({ isModalOn }) {
    isModalOn && new Modal(this.$target, {
      message: '상세페이지 불러오는중',
    });
  }

  effect() {
    this.getArticle();
  }

  async getArticle() {
    this.setState({ isModalOn: true });
    const path = window.location.pathname;
    const page = await getArticle(path);
    this.setState({ page, isModalOn: false });
  }

  render(props) {
    this.$target.innerHTML = this.getTemplate(props);
    this.mount(props);
  }

  getTemplate({ page }) {
    return page.length === 0 ? '페이지를 불러올 수 없습니다' : page;
  }
}
