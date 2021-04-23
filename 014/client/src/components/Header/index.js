import './style.css';

import Component from '../../core/components';
import Router from '../../core/router';

import zumLogo from '../../img/zum_logo.png';
import zumKorean from '../../img/zum_korean.png';

import CategoryMenu from '../CategoryMenu';

export default class Header extends Component {
  constructor($target) {
    super($target);
    this.$header = document.createElement('div');
    this.$header.className = 'header';

    this.$target.appendChild(this.$header);
    this.render();
  }

  getTemplate() {
    const template = `
      <div class='logo'>
        <a>
          <img id='zum_logo' src=${zumLogo} />
          <img id='zum_korean' src=${zumKorean} />
        </a>
      </div>
    `;
    return template;
  }

  mount() {
    new CategoryMenu(this.$header);
  }

  render() {
    this.$header.innerHTML = this.getTemplate();
    this.mount();
  }
}
