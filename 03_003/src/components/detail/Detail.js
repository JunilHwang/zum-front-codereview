import store from '../../lib/redux/store';
import { getDetailData } from '../../lib/api';

(async () => {
  const idx = location.hash.replace('#', '').substring(7);
  if (!idx) return;

  const data = await getDetailData(idx);
  store.dispatch({ type: 'GET_DETAIL_DATA', payload: data[0] });
})();

const Detail = () => {
  const { detail } = store.getState();
  const { title, media, article, category } = detail;

  let isBookmarked = false;
  let bookmarkIcon = isBookmarked
    ? `<i class="fas fa-bookmark bookmarkIcon"></i>`
    : `<i class="far fa-bookmark bookmarkIcon"></i>`;

  const renderDetail = () => {
    return `
      <section id="detail" data-category=${category}>
        <div class="detailHeader">
          <h1>${title}</h1>  
          <span>by ${media}</span>
        </div>
        <div class="detailContents">
          ${article}
        </div>
        <div class="detailBottom">
          <button>${bookmarkIcon}북마크</button>
          <button class="btn__list">목록</button>
          <button class="btn__top">맨 위로</button>
        </div>
      </section>`;
  };

  return renderDetail();
};

// event
window.addEventListener('click', goBack);
window.addEventListener('click', goToTop);

function goBack({ target }) {
  if (!target.closest('.btn__list')) return;

  window.history.back();
}

function goToTop({ target }) {
  if (!target.closest('.btn__top')) return;

  window.scrollTo(0, 0);
}

export default Detail;
