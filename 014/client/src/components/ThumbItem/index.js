import './style.css';

import redHeart from '../../img/red_heart.png';
import emptyHeart from '../../img/empty_heart.png';

import Component from '../../core/components';

export default class ThumbItem extends Component {
  constructor($target, { item, favoriteitems, setfavoriteitems }) {
    super($target);
    this.state = {
      item,
      isFavorite: this.isFavoriteItem(item.idx) ? redHeart : emptyHeart,
      favoriteitems,
      setfavoriteitems,
    };

    this.$thumbItem = document.createElement('li');
    this.$thumbItem.className = 'thumb_item';

    this.$target.appendChild(this.$thumbItem);
    this.render(this.state);
    this.addEvent();
  }

  render(props) {
    this.$thumbItem.innerHTML = this.getTemplate(props);
  }

  getTemplate({ item, isFavorite }) {
    const template = `
    <a class='thumb_link' data-url=${item.url}>
      <img class='thumb_img' alt='thumb_img' data-src=${item.imageUrl} />
      <img class='heart heart_${item.idx}' src=${isFavorite} data-id=${item.idx} />
      <strong class='title'>${item.title}</strong>
      <span class='text'>${item.summaryContent}</span>
      <span class='author'>by ${item.mediaName}</span>
    </a>
    `;

    return template;
  }

  addEvent() {
    this.$thumbItem.addEventListener('click', (event) => {
      if (event.target.classList.contains('heart')) {
        event.stopPropagation();
        const id = event.target.dataset.id;

        this.handleFavorite(id);
        return;
      }
    });
  }

  handleFavorite(id) {
    const favorites = localStorage.getItem('favorites');

    if (!favorites) {
      this.initFavorite(id);
      return;
    }

    this.isFavoriteItem(id) ?
      this.removeFavorite(favorites, id) :
      this.addFavorite(favorites, id);
  }

  isFavoriteItem(id) {
    const favorites = localStorage.getItem('favorites');

    if (!favorites) {
      return false;
    }
    return JSON.parse(favorites)
      .some((favoriteId) => favoriteId === String(id));
  }

  initFavorite(id) {
    localStorage.setItem('favorites', JSON.stringify([id]));
    this.setState({ isFavorite: redHeart });
  }

  addFavorite(favorites, id) {
    const newFavorites = JSON.stringify([...JSON.parse(favorites), id]);
    localStorage.setItem('favorites', newFavorites);

    this.setState({ isFavorite: redHeart });
  }

  removeFavorite(favorites, id) {
    const newFavorites = JSON.stringify(
      JSON.parse(favorites)
        .filter((favoriteId) => favoriteId !== id),
    );
    localStorage.setItem('favorites', newFavorites);

    this.setState({ isFavorite: emptyHeart });

    if (this.state.isFavorite && this.state.favoriteitems) {
      this.removeFavoriteItems(newFavorites);
    }
  }

  removeFavoriteItems(newFavorites) {
    const items = this.state.favoriteitems
      .filter((item) => {
        const isNotDeleted = JSON.parse(newFavorites)
          .some(v => v === String(item.idx));
        return isNotDeleted && item;
      });


    this.state.setfavoriteitems({ items });
  }
}
