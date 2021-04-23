import Component from '../core/components';

import Article from '../components/Article';

export default class DetailPage extends Component {
  constructor($target) {
    super($target);
    this.$detailPage = document.createElement('article');
    this.$detailPage.className = 'detailPage';

    this.$target.appendChild(this.$detailPage);
    this.mount();
  }

  mount() {
    new Article(this.$detailPage);
  }
}
