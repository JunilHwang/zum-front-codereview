import Card from '../component/card/card';
import { onHandleClickListItem } from '../utils/eventhandler';
import './bookmark.css';

const Bookmark = ({ parent, store }) => {
  const bookmarkTemplate = (information) => {
    const { idx, title, imageUrl, mediaName } = information;
    return `<div class="bookmark-item-container" id="category-item-${idx}">
      <div class="bookmark-item-title">${title}</div>
      <div class="bookmark-item-image" style="background-image : url(${imageUrl})"></div>
      <div class="bookmark-item-media">by ${mediaName}</div>   
    </div>`;
  };

  const render = () => {
    const {
      state: { likeContents },
    } = store.getState();

    parent.innerHTML = `<div class="bookmark-page-container">
      <div class="bookmark-title">#내 즐겨찾기 목록</div>
      <ul class="bookmark-list-container">
        ${
          likeContents.length > 0
            ? likeContents
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((content) => `<li>${bookmarkTemplate(content)}</li>`)
                .join('')
            : '<span>등록된 즐겨찾기가 없습니다.</span>'
        }
      </ul>
    </div>`;

    document
      .querySelector('.bookmark-list-container')
      ?.addEventListener('click', (event) =>
        onHandleClickListItem(event, store, likeContents)
      );
  };

  render();
};

export default Bookmark;
