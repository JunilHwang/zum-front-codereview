import { Component } from "@src/core";
import logoImg from "@public/images/logo_zum.png";
import "./style.scss";

class Logo extends Component {
  setTemplate(): string {
    return `
    <a href="/" class="logo">
      <img src=${logoImg} alt="logo_zum" />
      <span>허브</span>
    </a>`;
  }
}

export default Logo;
