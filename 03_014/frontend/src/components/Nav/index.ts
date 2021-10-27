import { Component } from "@src/core";
import { navInfo } from "@src/utils/consts";
import { NavInfoType } from "@src/utils/types";
import "./style.scss";

class Nav extends Component {
  setInitState() {
    return { navInfo };
  }
  setTemplate(): string {
    const navInfo = this.state.navInfo as NavInfoType[];
    if (!navInfo) return '';

    return `
    <ul class="nav">
      ${navInfo.map(({ path, name }) =>
      `<li class="nav__item">
        <a href="${path}">${name}</a>
      </li>`
      ).join("")}
    </ul>`;
  }
}

export default Nav;
