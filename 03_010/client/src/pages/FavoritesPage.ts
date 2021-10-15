import Contents from '@src/components/common/Contents';
import Component from '@src/core/Component';
import { _ } from '@src/utils/myUtils';

export default class FavoritesPage extends Component {
  htmlTemplate() {
    return `
      <main class="main-wrap">
        <section class="contents-wrap"></section>
      <main>
    `;
  }

  mountChildComponent() {
    const contentsWrap = _.$('.contents-wrap', this.$target);
    const savedContents = localStorage.getItem('favorites');
    if (!savedContents) return;
    const favoriteContents = JSON.parse(savedContents).reverse();
    new Contents(contentsWrap, { title: '즐겨찾기', data: favoriteContents });
  }
}
