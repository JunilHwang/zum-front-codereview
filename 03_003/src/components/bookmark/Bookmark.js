import store from '../../lib/redux/store';

import Card from '../common/Card';

const Bookmark = () => {
  const { category } = store.getState();
  const bookmarkData = category['trip'];

  const renderBookmark = () => {
    return `
      <section id="bookmark">
        <h1>즐겨찾기</h1>
        <div class="bookmarkContainer">
          <ul>
            ${bookmarkData
              .slice(0, 6)
              .map(cardData => Card(cardData))
              .join('')}
          </ul>
        </div>
      </section>`;
  };

  return renderBookmark();
};

export default Bookmark;
