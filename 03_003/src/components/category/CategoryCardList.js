import store from '../../lib/redux/store';
import { itemCount } from '../../lib/infiniteScroll';

import Card from '../common/Card';

const CategoryCardList = hash => {
  const { category } = store.getState();

  const HashtoCategory = {
    life: '라이프',
    food: '푸드',
    trip: '여행',
    culture: '컬처',
  };
  const categoryName = HashtoCategory[hash];
  const categoryData = category[hash];

  const renderCategoryCardList = () => {
    return `
      <section id="categoryCardList">
        <h1 class="category_name">#${categoryName}</h1>
          <div class="cardContainer">
            <ul>
            ${categoryData
              .slice(0, itemCount())
              .map(cardData => Card(cardData))
              .join('')}
            </ul>
          </div>
      </section>`;
  };

  return renderCategoryCardList();
};

export default CategoryCardList;
