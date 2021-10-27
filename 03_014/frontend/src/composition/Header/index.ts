import { Component } from "@src/core";
import { $ } from "@src/utils/funcs";
import { Logo, Nav } from "@src/components";
import "./style.scss";

class Header extends Component {
  setTemplate(): string {
    return `
      <div class="header__inner">
        <div class="header__inner__logo"></div>
        <div class="header__inner__navbar"></div>
      </div>`;
  }

  setRenderChildren(): void {
    new Logo($(".header__inner__logo", this.$target)!);
    new Nav($(".header__inner__navbar", this.$target)!);
  }
}

export default Header;
