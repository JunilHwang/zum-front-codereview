import Component from '../core/components';

import FavoriteItems from '../components/FavoriteItems';

export default class FavoritePage extends Component {
  constructor($target) {
    super($target);
    this.$favoritePage = document.createElement('article');
    this.$favoritePage.className = 'favoritePage';

    this.$target.appendChild(this.$favoritePage);
    this.mount();
  }

  mount() {
    new FavoriteItems(this.$favoritePage);
  }
}
