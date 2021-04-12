// @ts-check
import Component from "../../../../core/Component";
import { onLinkClick, setTemplate } from "../../../../core/Router";
import {
  attributeNameMap,
  eventTypes,
  pathNameMap,
  selectorNameMap,
} from "../../../../types";
import { selectOne } from "../../../../utils";

import MenuLi from "../../../atoms/MenuLi";
import "./style.scss";
/**
 * HeaderMenus Component
 */
export default class HeaderMenus extends Component {
  _setUpComponent() {
    this._states.menus = [
      { text: "HUB", href: pathNameMap.root },
      { text: "라이프", href: pathNameMap.category.life },
      { text: "푸드", href: pathNameMap.category.food },
      { text: "여행", href: pathNameMap.category.trip },
      { text: "컬쳐", href: pathNameMap.category.culture },
      { text: "즐겨찾기", href: pathNameMap.favorite },
    ];
  }

  _template() {
    return `<ul id="header-menu-ul"></ul>`;
  }

  _setEvent() {
    this._target.addEventListener(eventTypes.click, ({ target }) => {
      const targetLi = target?.closest(selectorNameMap.header.menuLi);
      if (!targetLi) return;

      const targetHref = targetLi.getAttribute(attributeNameMap.categoryHref);
      const [template, subpath, ...restPath] = targetHref.split("/");
      setTemplate(template, { subpath, restPath });
      onLinkClick("", targetHref, {});
    });
  }

  _setAfterMounted() {
    const ul = selectOne(selectorNameMap.ul);
    const { menus } = this._states;
    menus.forEach(({ text, href }) => {
      new MenuLi(ul, { text, href });
    });
  }
}
