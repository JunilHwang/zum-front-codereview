import './style.css';

import Component from './core/components';
import Router from './core/router';

import Header from './components/Header';

export default class App extends Component {
  constructor($target) {
    super($target);
    this.mount();
    this.addEvent();
  }

  mount() {
    this.$header = new Header(this.$target);

    Router.init();
  }

  addEvent() {
    this.throttleCheck;
    window.addEventListener('scroll', this.lazyload);
    window.addEventListener('resize', this.lazyload);
    window.addEventListener('DOMNodeInserted', this.lazyload);
  }

  lazyload() {
    const DELAY = 20;
    if (!this.throttleCheck) {
      this.throttleCheck = setTimeout(() => {
        const innerHeight = window.innerHeight;
        const imgs = document.querySelectorAll('img[data-src]');
        imgs.forEach((img) => {
          const imgOffsetTop = img.getBoundingClientRect().top; //innerHeight을 기준으로 이미지의 상대위치
          if (imgOffsetTop < innerHeight) {
            img.src = img.dataset.src;
          }
        });
        this.throttleCheck = null;
      }, DELAY);
    }
  }
}
