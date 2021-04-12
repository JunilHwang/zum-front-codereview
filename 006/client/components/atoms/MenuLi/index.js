// @ts-check
import Component from "../../../core/Component";

import "./style.scss";

/**
 * MenuLi Component
 */
export default class MenuLi extends Component {
  _template() {
    const { text, href } = this._props;
    return `<li class="header-menu-li" data-href="${href}"><p>${text}</p></li>`;
  }

  _render() {
    this._target.innerHTML += this._template();
  }
}
