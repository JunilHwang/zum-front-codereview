import store from '../../lib/redux/store';
import { getDetailData } from '../../lib/api';

const TopContents = data => {
  return `    
    <section id="topContents">
      <h1>실시간 TOP 12</h1>
      <div class="topContainer">
        <ul>
          ${data
            .map((li, idx) => {
              return `
                <li class="topItem" data-idx=${li.idx}>
                  <a>
                    <p class="rank_number">${idx + 1}</p>
                    <div>
                      <strong class="title">${li.title}</strong>
                      <span class="media">by ${li.mediaName}</span>
                    </div>
                  </a>
                </li>
              `;
            })
            .join('')}
        </ul>
      </div>
    </section>
  `;
};

window.addEventListener('click', getDetailPage);

async function getDetailPage({ target }) {
  const $card = target.closest('.topItem');
  if (!$card) return;
  if (!$card.dataset.idx) return;

  const idx = $card.dataset.idx;
  const data = await getDetailData(idx);
  store.dispatch({ type: 'GET_DETAIL_DATA', payload: data[0] });

  window.location.hash = `detail/${idx}`;
  window.scrollTo(0, 0);
}

export default TopContents;
