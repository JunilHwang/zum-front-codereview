import Component from '@/core/Component';
import Menu from '@/components/Header/Menu';
import './Header.scss';

export default class Header extends Component {
  template(): string {
    super.template();
    return `<nav><ul data-component='navigation' class='navigation'>header</ul></nav>`;
  }

  update() {
    super.update();
    const { $target, props } = this;
    const $navigation: HTMLUListElement | null | undefined =
      $target?.querySelector('[data-component="navigation"]');
    if (!$navigation) return;
    new Menu($navigation, {
      outer: props.outer,
    });
  }
}
// 헤더 컴포넌트
