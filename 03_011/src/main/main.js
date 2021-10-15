import LoadingPage from '../component/loading';
import ErrorPage from '../component/error';
import contentApi from '../api';
import Card from '../component/card/card';
import {
  checkBookmarkDiff,
  onHandleClickListItem,
} from '../utils/eventhandler';
import './main.css';

const MainPage = ({ parent, store }) => {
  let state = {
    loading: true,
    error: false,
    categoryContent: {},
    topRank: [],
  };

  const setContentBookmark = () => {
    const container = document.querySelector('.category-container');
    const lists = container?.querySelectorAll('.category-item-container');

    checkBookmarkDiff(store, lists);
  };

  const onHandleClickTopRank = (event) => {
    const { path } = event;
    let selectedId = null;
    for (let p of path) {
      if (p.id) {
        selectedId = +p.id.replace('content-', '');
        break;
      }
    }
    const { url } = state.topRank.find((item) => item.idx === selectedId);
    contentApi.detailApi(url);
    alert('데이터를 불러오는 중입니다.. 잠시만 기다려주세요.');
  };

  const addEventListeners = () => {
    const itemElement = document.querySelector('.category-container');
    const toprankElement = document.querySelector('.top12-container');
    itemElement.addEventListener('click', (event) => {
      const allContentsArray = Object.entries(state.categoryContent)
        .map(([key, value]) => value)
        .flatMap((item) => item);
      onHandleClickListItem(event, store, allContentsArray);
    });
    toprankElement.addEventListener('click', onHandleClickTopRank);
  };

  const categoryContentTemplate = (title, lists) => {
    return `<div class="category-content-container">
      <div class="category-content-title">#${title}</div>
      <ul>${lists
        .map((item) => `<li class="category-item-container">${Card(item)}</li>`)
        .join('')}</ul>
    </div>`;
  };

  const topRankTemplate = () => {
    return `
    <div class="top12-title">실시간 TOP 12</div>
    <ul>
        ${state.topRank
          .map((item, index) => {
            return `<li class="top12-list" id="content-${item.idx}">
                <div class="list-rank">${index + 1}</div>
                <div class="list-title">${item.title}</div>
                <div class="list-media">by ${item.mediaName}</div>
            </li>`;
          })
          .join('')}
    </ul>`;
  };

  const render = () => {
    const { loading, error, categoryContent, topRank } = state;
    parent.innerHTML = '';
    if (loading) {
      parent.innerHTML = LoadingPage();
    } else if (error) {
      parent.innerHTML = ErrorPage();
    } else {
      const categoryContainer = document.createElement('div');
      const toprankContainer = document.createElement('div');
      categoryContainer.className = 'category-container';
      toprankContainer.className = 'top12-container';

      if (Object.keys(categoryContent)) {
        const { life, food, travel, culture } = categoryContent;
        [
          ['라이프', life],
          ['푸드', food],
          ['여행', travel],
          ['문화', culture],
        ].forEach(([title, lists]) => {
          if (lists?.length) {
            categoryContainer.innerHTML += categoryContentTemplate(
              title,
              lists
            );
          }
        });
      }

      if (topRank.length) {
        toprankContainer.innerHTML = topRankTemplate();
      }

      parent.appendChild(categoryContainer);
      parent.appendChild(toprankContainer);
      addEventListeners();
      setContentBookmark();
    }
  };

  const setState = (newState) => {
    state = { ...state, ...newState };
    render();
  };

  const componentDidMount = () => {
    const { categoryApi, rankingApi } = contentApi;
    const categories = ['life', 'food', 'travel', 'culture'];
    Promise.all([...categories.map((tag) => categoryApi(tag, 4)), rankingApi()])
      .then((res) => {
        let newStateObj = { categoryContent: {}, topRank: [] };
        res.forEach(({ error, result }, index) => {
          if (error) {
            throw error;
          }
          if (index === res.length - 1) {
            result
              .then(({ data }) => {
                newStateObj.topRank = data;
              })
              .then(() => {
                setState(newStateObj);
              });
          } else {
            result.then(({ data }) => {
              newStateObj['categoryContent'][categories[index]] = data;
            });
          }
        });
      })
      .catch((e) => {
        setState({ error: true });
      })
      .finally(() => {
        setState({ loading: false });
      });
  };

  render();
  componentDidMount();
  store.subscribeStore(setContentBookmark);
};

export default MainPage;
