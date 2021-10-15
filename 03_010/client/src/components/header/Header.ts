import Component from '@src/core/Component';

import { _ } from '@src/utils/myUtils';

import HeaderTop from './HeaderTop';
import MenuList from './MenuList';

export default class Header extends Component {
  htmlTemplate() {
    return `
    <div class="header-wrap">
      <div class="header-top"></div>
      <nav class="nav-container"></nav>
    </div>
    `;
  }

  mountChildComponent() {
    const $headerTop = _.$('.header-top', this.$target);
    new HeaderTop($headerTop);

    const $navContainer = _.$('.nav-container', this.$target);
    new MenuList($navContainer);
  }
}
