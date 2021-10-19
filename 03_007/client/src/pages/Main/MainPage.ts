import Component from '@/core/Component';
import Buttons from '@/Buttons';
import { increase2, decrease2, store } from '@/store';

export default class MainPage extends Component {
  template(): string {
    super.template();
    //@ts-ignore
    const num = store.getState().a;
    return `<h1>count: ${num}</h1><div data-component='test-fake-redux'></div><div data-component='redux2'></div>`;
  }
  update() {
    super.update();
    const $mainPage: HTMLElement | null | undefined =
      this.$target?.querySelector('[data-component="test-fake-redux"]');
    if (!$mainPage) return;
    const $el: HTMLElement | null | undefined = this.$target?.querySelector(
      '[data-component="redux2"]',
    );
    if (!$el) return;
    new Buttons($el, {
      store,
      increase2,
      decrease2,
    });
    console.log(this.state);
  }
}

// 메인 페이지
