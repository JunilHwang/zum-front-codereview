import Component from '@src/core/Component';
import { _ } from '@src/utils/myUtils';
import { router } from '../../../index';

export default class MenuList extends Component {
  htmlTemplate() {
    const menuList = [
      { title: '홈', path: 'home' },
      { title: '라이프', path: 'lifes' },
      { title: '컬처', path: 'cultures' },
      { title: '푸드', path: 'foods' },
      { title: '여행', path: 'travels' },
      { title: '즐겨찾기', path: 'favorites' },
    ];

    return `
    <ul class="menu-container">
      ${menuList
        .map(
          ({ title, path }) =>
            `<li class="menu__list" data-path=${path} tabindex="0">${title}</li>`
        )
        .join('')}
    </ul>
    `;
  }

  setEvent() {
    _.on(this.$target, 'click', this.handleClickHeaderMenu.bind(this));
  }

  handleClickHeaderMenu(e: MouseEvent) {
    const target = e.target as HTMLUListElement;
    if (target.closest('.menu__list')) {
      const path = target.dataset.path;
      if (path === 'home') location.replace('/');
      else if (path) router.push(`/${path}`);
    }
  }
}
