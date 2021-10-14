// css import
require('./css/style.css');

// 라우터 import
const { initialRoutes, historyRouterPush } = require('./router');

const $app = document.querySelector('#app');

// 기본 경로
initialRoutes('history', $app);

// 페이지가 로드되면 각 li 클릭 시 해당 라우터 내용 렌더링
window.onload = () => {
  const historyLinker = document.querySelectorAll('li.history');

  historyLinker.forEach((el) => {
    el.addEventListener('click', (e) => {
      // 클릭한 li의 route 속성값을 교체할 DOM과 함께 라우터 함수에 전달
      const pathName = e.target.getAttribute('route');
      historyRouterPush(pathName, $app);
    });
  });
};
