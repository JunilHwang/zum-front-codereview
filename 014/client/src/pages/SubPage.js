import Component from '../core/components';

import SubItems from '../components/SubItems';

export default class SubPage extends Component {
  constructor($target) {
    super($target);
    this.$subPage = document.createElement('article');
    this.$subPage.className = 'subPage';

    this.$target.appendChild(this.$subPage);
    this.mount();
  }

  mount() {
    new SubItems(this.$subPage);
  }
}
