import Component from "./cors/Component.js";
import Main from "./page/main/Main.js";
import Detail from './page/detail/Detail'
import Modify from './page/modify/Modify'
import Write from './page/write/Write'
import Notfound from './page/notfound/Notfound'

export default class App extends Component {
  setup() {
    this.$state = {
      url: "",
      Bool: true
    };
  }

  template() {
    return `
      <header data-component="header"></header>
      <main data-component="main"></main>
      <footer data-component="footer"></footer>
    `;
  }

  setEvent() {
    const $main = this.$target.querySelector('[data-component="main"]');
    const cacheCheck = (data) => { //캐시갱신 true , 캐시갱신 x false ,조건 get api 요청
      this.setState({
        Bool: data
      });
    }
    const historyRouter = (state, title, url) => { //url 변경
      history.pushState(state, title, url);
      changeUrl(url)
    }
    const changeUrl = (url) => { //url 변경 알림 state 갱신 후 렌더링
      this.setState({
        url: url
      });
    }
    window.onpopstate = function () { //뒤로가기 버튼클릭시 활성화되는 함수
      changeUrl(window.location.pathname)
    }

    if (window.location.pathname == "/") {
      new Main($main, {
        historyRouter: historyRouter,
        data: this.$state.Bool,
        cacheCheck: cacheCheck
      });
    }
    else if (window.location.pathname == "/detail") {
      new Detail($main, {
        historyRouter: historyRouter,
        cacheCheck: cacheCheck
      })
    }
    else if (window.location.pathname == "/modify") {
      new Modify($main, {
        historyRouter: historyRouter,
        cacheCheck: cacheCheck
      })
    }
    else if (window.location.pathname == "/write") {
      new Write($main, {
        cacheCheck: cacheCheck
      })
    }
    else {
      new Notfound($main);
    }
  }


}