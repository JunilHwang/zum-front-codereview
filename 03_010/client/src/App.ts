import Component from './core/Component';
import { getState } from './lib/observer';
import { pageStore } from './store/pages';
import { _ } from './utils/myUtils';

import Header from './components/header/Header';

export default class App extends Component {
  constructor($target: HTMLDivElement) {
    super($target);
    this.componentId = 'AppComponent';
    this.keys = [pageStore];
    this.subscribe();
  }
  htmlTemplate() {
    return `
    <header class="page__header"></header>
    <div class="page-container"></div>
    `;
  }

  mountChildComponent() {
    const $pageContainer = _.$('.page-container', this.$target);
    const $header = _.$('.page__header', this.$target);
    const { CurrentPage } = getState(pageStore);
    new CurrentPage($pageContainer);
    new Header($header);
  }
}
