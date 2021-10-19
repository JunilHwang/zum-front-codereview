import Component from '@/core/Component';
import { MENU_INFO } from '@/constants';
import { paths, routes } from '@/routes';
import { activateNavMenu } from '@/utils';

export default class Menu extends Component {
  setEvent() {
    super.setEvent();
    const { $target, props } = this;
    $target?.addEventListener('click', (e: MouseEvent) => {
      if (e.target instanceof HTMLLIElement) {
        const menuName: string = String(e.target.dataset.key).toLowerCase();
        routes(paths[menuName], props.outer, {});

        activateNavMenu($target, e.target);
      }
    });
  }

  template(): string {
    super.template();
    return `${Object.entries(MENU_INFO)
      .map(([key, name], idx) => {
        return `<li data-index="${idx}" data-key="${key}" class="${
          key === 'HOME' ? 'selected' : ''
        }">${name}</li>`;
      })
      .join('')}`;
  }
}
// 메뉴 아이템
// props: menu-name
