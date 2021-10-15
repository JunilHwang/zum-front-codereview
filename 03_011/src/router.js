import Bookmark from './bookmark/bookmark';
import Detail from './detail/detail';
import MainPage from './main/main';
import Notfound from './notfound';
import Store from './redux/store';
import SubPage from './sub/sub';

const root = document.getElementById('app');
const store = new Store();

const router = [
  {
    url: '/',
    component: MainPage,
  },
  {
    url: '/content/:category',
    component: SubPage,
  },
  {
    url: '/bookmark',
    component: Bookmark,
  },
  {
    url: '/content/:category/:idx',
    component: Detail,
  },
  {
    url: '/notfound',
    component: Notfound,
  },
];

function hashHandler(event) {
  let { hash } = window.location;
  const path = `/${hash.replace('#', '')}`;

  store.unsubscribeStore({ option: true });

  if (path === '/') {
    router[0].component({ parent: root, store });
  } else if (path.substring(0, 9) === '/content/') {
    const category = path.replace('/content/', '');
    router[1].component({
      parent: root,
      category,
      url: router[1].url,
      store,
    });
  } else if (path === '/bookmark') {
    router[2].component({ parent: root, store });
  } else {
    router[4].component({ parent: root, store });
  }
}

export default function routePages() {
  window.addEventListener('hashchange', hashHandler);
  let { hash } = window.location;
  hash = hash || '#';
  window.location.href = window.location.origin + hash;

  hashHandler();
}
