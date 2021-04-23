import Component from '../core/components';

import MainItems from '../components/MainItems';
import MainRank from '../components/MainRank';

export default class MainPage extends Component {
  constructor($target) {
    super($target);
    this.$mainPage = document.createElement('article');
    this.$mainPage.className = 'mainPage';

    this.$target.appendChild(this.$mainPage);
    this.mount();
  }

  mount() {
    new MainItems(this.$mainPage);
    new MainRank(this.$mainPage);
  }
}
