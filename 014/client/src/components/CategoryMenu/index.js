import './style.css';

import Component from '../../core/components';
import Router from '../../core/router';

export default class CategoryMenu extends Component {
  constructor($target) {
    super($target);
    this.$categoryMenu = document.createElement('ul');
    this.$categoryMenu.className = 'CategoryMenu';
    this.state = {
      categories: [
        { name: '홈', path: '/' },
        { name: '라이프', path: '/life' },
        { name: '푸드', path: '/food' },
        { name: '여행', path: '/trip' },
        { name: '컬처', path: '/culture' },
        { name: '즐겨찾기', path: '/favorite' },
      ],
      currentPath: window.location.pathname,
    };

    this.$target.appendChild(this.$categoryMenu);
    this.render(this.state);
    this.addEvent();
  }

  render(props) {
    this.$categoryMenu.innerHTML = this.getTemplate(props);
  }

  handleOnClick(event) {
    const path = event.target.dataset.category;

    if (path) {
      window.history.pushState({}, '', path);
      Router.navigate();

      this.setState({ currentPath: path });
    }
  }

  addEvent() {
    this.$categoryMenu.addEventListener('click', this.handleOnClick.bind(this));
  }

  getTemplate({ categories, currentPath }) {
    const template = `
    ${categories.map(({ name, path }) => `
        <li>
          <span 
            class=${currentPath === path ? 'active' : '-'}
            data-category=${path}
          >
            ${name}
          </span>
        </li>
      `).join('')}
    `;

    return template;
  }
}
