import Home from '../components/Home/Home';
import SubPage from '../components/SubPage/SubPage';
import Star from '../components/Star/Star';
import DetailContent from '../components/common/DetailContent/DetailContent';

export default class routers {
  constructor(target, step = 0) {
    this.$target = target;
    this.$step = step;
    this.setup();
    this.startRoute(this.$target);
  }
  setup() {
    this.keywordList = {
      '/': '홈',
      '/life': '라이프',
      '/travel': '여행',
      '/food': '음식',
      '/culture': '컬쳐',
    };
  }
  startRoute(element) {
    window.addEventListener('popstate', (e) => {
      if (e.state === null) {
        this.renderHTML(element, '/');
      } else {
        this.renderHTML(element, history.state.data);
      }
      localStorage.setItem('lastPage', history.state.data);
    });
  }
  historyRouterPush(pathName, element, keyword = '') {
    window.history.pushState(
      { data: pathName },
      pathName,
      window.location.origin + pathName
    );
    localStorage.setItem('lastPage', pathName);
    this.renderHTML(element, pathName, keyword);
  }

  renderHTML(element, pathName, keyword = '') {
    if (pathName === '/') {
      const ele = new Home(element, '');
    } else if (
      pathName === '/life' ||
      pathName === '/travel' ||
      pathName === '/food' ||
      pathName === '/culture'
    ) {
      const ele = new SubPage(element, pathName, this.keywordList[pathName]);
    } else if (this.$step === 1) {
      const ele = new DetailContent(element, pathName, keyword, 1);
    }
  }
}
