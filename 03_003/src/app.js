import store from './lib/redux/store';

import Header from './components/common/Header';
import MainContainer from './components/main/MainContainer';
import Bookmark from './components/bookmark/Bookmark';
import CategoryCardList from './components/category/CategoryCardList';
import Detail from './components/detail/Detail';

const $app = document.querySelector('#app');

const routes = {
  '': 'main',
  bookmark: 'bookmark',
  life: 'category',
  food: 'category',
  trip: 'category',
  culture: 'category',
  detail: 'detail',
};

export const renderApp = () => {
  const data = store.getState();
  if (!data) return;

  let hash = location.hash.replace('#', '');
  if (hash.includes('/')) {
    hash = hash.substring(0, 6);
  }
  const page = routes[hash];

  const defaultPageHTML = Header();
  let pageHTML = null;

  if (!page) {
    return `<div>${hash} 페이지가 존재하지 않습니다.</div>`;
  }

  switch (page) {
    case 'main':
      pageHTML = defaultPageHTML + MainContainer();
      break;
    case 'bookmark':
      pageHTML = defaultPageHTML + Bookmark();
      break;
    case 'category':
      pageHTML = defaultPageHTML + CategoryCardList(hash);
      break;
    case 'detail':
      pageHTML = defaultPageHTML + Detail();
      break;
    default:
      pageHTML = defaultPageHTML + MainContainer();
  }

  $app.innerHTML = pageHTML;
};
