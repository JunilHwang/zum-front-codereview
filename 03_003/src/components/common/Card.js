import store from '../../lib/redux/store';
import { getDetailData } from '../../lib/api';
import useState from '../../lib/hooks/useState';

const Card = cardData => {
  const { idx, imageUrl, mediaName, summaryContent, title, url } = cardData;

  const [isBookmarked, setIsBookmarked] = useState(false);

  let bookmarkIcon = isBookmarked()
    ? `<i class="fas fa-bookmark icon"></i>`
    : `<i class="far fa-bookmark icon"></i>`;

  const renderCard = () => {
    return `
      <li class="card" data-idx=${idx} data-url=${url}>
        <div class="thumb">
          <img class="image" src="${imageUrl}" alt="thumbnail Image" />
          <span class="bookmarkIcon">${bookmarkIcon}</span>
        </div>
        <storng class="title">${title}</storng>
        <p class="summary">${summaryContent}</p>
        <span class="media">by ${mediaName}</span>
      </li>
    `;
  };

  return renderCard();
};

// event
window.addEventListener('click', getDetailPage);

async function getDetailPage({ target }) {
  const $card = target.closest('.card');
  if (!$card) return;
  if (!$card.dataset.idx) return;
  if (target.classList.contains('bookmarkIcon')) return;
  if (target.classList.contains('icon')) return;

  const idx = $card.dataset.idx;
  const data = await getDetailData(idx);
  store.dispatch({ type: 'GET_DETAIL_DATA', payload: data[0] });

  window.location.hash = `detail/${idx}`;
  window.scrollTo(0, 0);
}

export default Card;
