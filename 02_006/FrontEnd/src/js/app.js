import SubPage from '../components/SubPage.js';
import Main from '../components/Main.js';
import Header from '../components/Header.js';
import Detail from '../components/Detail.js';
import Best from '../components/Best.js';
import Error from '../components/Error.js';
import Loading from '../components/Loading.js';
import appStore, {
  POST_BOOKMARK,
  GET_LOADING,
  NOT_FOUND,
  GET_SUB_VIEW,
  GET_DETAIL_VIEW,
  GET_APP_VIEW,
} from '../store/appStore.js';
import { postBookMarkApi } from '../modules/api/dataApi.js';
const { dispatch, subscribe, getState } = appStore;
import { historyRouterPush } from './main.js';

//렌더링 함수
const appRender = () => {
  //상태 불러오기

  let state = getState();
  //뷰 조회
  let path = state.path;
  let route = ['life', 'culture', 'trip', 'food'];

  let view = state.page;

  const $app = document.querySelector('#app');

  if (!route.includes(path) || state.page === 'error') {
    const $loading = document.querySelector('.loading');
    if ($loading) {
      setTimeout(() => {
        $loading.remove();
        $app.innerHTML = Header(state) + Error(state);
        headerEvent();
      }, 800);
    }
  }
  if (view === 'loading') {
    $app.innerHTML = Header(state) + Loading(state);
    headerEvent();
  }

  if (view === 'home') {
    const $loading = document.querySelector('.loading');
    if ($loading) {
      setTimeout(() => {
        $loading.remove();
        $app.innerHTML = Header(state) + Main(state) + Best(state);
        headerEvent();
        articleEvent();
        bestEvent();
      }, 800);
    } else {
      $app.innerHTML = Header(state) + Main(state) + Best(state);
      headerEvent();
      articleEvent();
      bestEvent();
    }
  }
  if (view === 'sub') {
    const $loading = document.querySelector('.loading');
    if ($loading) {
      setTimeout(() => {
        $loading.remove();
        $app.innerHTML = Header(state) + SubPage(state);
        headerEvent();
        articleEvent();
      }, 800);
    } else {
      $app.innerHTML = Header(state) + SubPage(state);
      headerEvent();
      articleEvent();
    }
  }
  if (view === 'infinity') {
    $app.innerHTML = Header(state) + Loading(state);
    headerEvent();
    const $loading = document.querySelector('.loading');
    setTimeout(() => {
      $loading.remove();
      $app.innerHTML = Header(state) + SubPage(state);
      headerEvent();
      articleEvent();
    }, 800);
  }
  if (state.page === 'detail') {
    const $loading = document.querySelector('.loading');
    setTimeout(() => {
      $loading && $loading.remove();
      $app.innerHTML = Header(state) + Detail(state);
      headerEvent();
      detailEvent();
    }, 800);
  }
};

window.addEventListener('DOMContentLoaded', e => {
  subscribe(GET_APP_VIEW, () => appRender());
  subscribe(GET_LOADING, () => appRender());
  subscribe(GET_SUB_VIEW, () => appRender());
  subscribe(GET_DETAIL_VIEW, () => appRender());
  subscribe(NOT_FOUND, () => appRender());
  const pathName = history.state ? history.state.pathName : '/' || location.pathname;
  historyRouterPush(pathName);
});

window.addEventListener('popstate', e => {
  //뒤로가기 앞으로가기 라우팅 변경(홈으로 이동x)
  const pathName = history.state ? history.state.pathName : '/' || location.pathname;
  historyRouterPush(pathName);
});

const throttle = (callBack, delay) => {
  let timerId;
  return e => {
    if (timerId) return;
    timerId = setTimeout(
      () => {
        callBack(e);
        timerId = null;
      },
      delay,
      e,
    );
  };
};

//무한스크롤 이벤트 핸들러
const infinityScrollHandler = () => {
  const hash = window.location.hash;
  const path = hash.replace('#/', '');
  //서브페이지에서만 인피니트 스크롤 구현
  let route = ['life', 'culture', 'trip', 'food', 'bookmark'];
  if (!route.includes(path)) return;
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    let { count } = getState().sub;
    let subData = JSON.parse(localStorage.getItem(path)) || [];
    dispatch({
      type: GET_SUB_VIEW,
      payload: {
        page: 'infinity',
        path: path,
        data: subData.splice((count + 1) * 12, 12) || [],
        count: count + 1,
      },
    });
  }
};
//무한 스크롤 이벤트 핸들러 등록
window.addEventListener('scroll', throttle(infinityScrollHandler, 1000));

//네비게이션 이벤트 등록
const headerEvent = () => {
  const $appNavBar = document.querySelector('.navBar');
  const $logo = document.querySelector('.logo');

  //네비게이션 클릭시 카테고리 이동
  $appNavBar.addEventListener('click', navigationHandler);
  //로고 클릭시 홈으로 이동
  $logo.addEventListener('click', pushMain);
};

//카드뉴스 클릭 이벤트 핸들러 등록
const articleEvent = () => {
  const $article = document.querySelectorAll('.articleList');
  [...$article].forEach(el => {
    el.addEventListener('click', articleEventHandler);
  });
};

//랭킹 상위 12 이벤트 핸들러 등록
const bestEvent = () => {
  const $bestItem = document.querySelector('.bestList');
  $bestItem.addEventListener('click', bestEventHandler);
};

//디테일 이벤트 핸들러 등록
const detailEvent = () => {
  const $detailBookmark = document.querySelector('.detailBookmark');
  const $pushCategory = document.querySelector('.pushCategory');

  //즐겨찾기 버튼 클릭시 즐겨찾기 추가 요청
  $detailBookmark.addEventListener('click', bookmarkEventHandler);
  //목록 버튼 클릭시 카테고리로 이동
  $pushCategory.addEventListener('click', pushCategory);
};

//네비게이션 이벤트 등록 해제
const removeHeaderEvent = () => {
  const $appNavBar = document.querySelector('.navBar');
  const $logo = document.querySelector('.logo');

  $appNavBar && $appNavBar.removeEventListener('click', navigationHandler);
  $logo && $logo.removeEventListener('click', pushMain);
};

//카드뉴스 클릭 이벤트 핸들러 등록 해제
const removeArticleEvent = () => {
  const $article = document.querySelectorAll('.articleList');
  $article &&
    [...$article].forEach(el => {
      el.removeEventListener('click', articleEventHandler);
    });
};

//랭킹 상위 12 이벤트 핸들러 등록 해제
const removeBestEvent = () => {
  const $bestItem = document.querySelector('.bestList');
  $bestItem && $bestItem.removeEventListener('click', bestEventHandler);
};

//디테일 이벤트 핸들러 해제
const removeDetailEvent = () => {
  const $detailBookmark = document.querySelector('.detailBookmark');
  const $pushCategory = document.querySelector('.pushCategory');

  $detailBookmark && $detailBookmark.removeEventListener('click', bookmarkEventHandler);
  $pushCategory && $pushCategory.removeEventListener('click', pushCategory);
};

//네비게이션 이벤트 핸들러
const navigationHandler = ({ target }) => {
  if (!target.matches('li')) return;
  const pathName = target.getAttribute('data-route');

  //네비게이션 메뉴 클릭시 url 변경
  historyRouterPush(pathName);
};

//카드뉴스 이벤트 핸들러
const articleEventHandler = async ({ target }) => {
  //상세페이지로 이동
  if (!target.matches('.bookmark>*')) {
    let pathName = target.parentNode.parentNode.getAttribute('data-route');
    pathName = pathName
      ? pathName.split('/')
      : target.parentNode.getAttribute('data-route').split('/');
    historyRouterPush(`/detail/${pathName[0]}/${pathName[1]}/${pathName[2]}`);
  }
  //즐겨찾기 버튼 클릭시 post요청
  if (target.matches('.bookmark > *')) {
    const id = target.parentNode.parentNode.id;
    const res = await postBookMarkApi(id.split('ID'));
    dispatch({ type: POST_BOOKMARK, payload: res });
    alert('즐겨찾기에 추가하였습니다.');
  }
};

// 베스트 이벤트 핸들러
const bestEventHandler = ({ target }) => {
  if (!target.matches('.bestArticle > *') && !target.matches('.bestArticle')) return;
  const route = target.parentNode.getAttribute('data-route');
  const pathName = route ? route : target.parentNode.parentNode.getAttribute('data-route');
  historyRouterPush(`/detail/best/${pathName}`);
};

//즐겨찾기 추가 이벤트 핸들러
const bookmarkEventHandler = async ({ target }) => {
  if (target.matches('.bookmark>*')) {
    const id = target.parentNode.parentNode.id;
    const res = await postBookMarkApi(id.split('ID'));
    dispatch({ type: POST_BOOKMARK, payload: res });
    alert('즐겨찾기에 추가하였습니다.');
  }
};

//메인으로 이동 이벤트 핸들러
const pushMain = () => {
  historyRouterPush('/');
};
//카테고리 이동 이벤트 핸들러
const pushCategory = ({ target }) => {
  const pathName = target.getAttribute('data-route');
  historyRouterPush(`/${pathName}`);
  window.scrollTo(0, 0);
};

export default appRender;
