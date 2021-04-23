import Component from "./core/Component"
import DetailPage from "./pages/DetailPage"
import { initialRoutes } from "./router/Router"
import Header from "./components/Header"

class App extends Component {
  template() {
    return `
      <header class="header"></header>
      <section class="page"></section>
    `
  }

  mounted() {
    const $header = this.$target.querySelector(".header")
    new Header($header);

    const page = this.$target.querySelector(".page");
    initialRoutes(page);
  }

  setEvent() {
    //rank를 클릭했을 시 상세 페이지로
    this.addEvent("click", ".rank", (e) => {
      const $content = document.querySelector(".content");
      const url = e.target.parentNode.dataset.url
        || e.target.firstElementChild.dataset.url;
      const idx = e.target.parentNode.dataset.idx
        || e.target.firstElementChild.dataset.idx;
      const link = e.target.parentNode.dataset.link
        || e.target.firstElementChild.dataset.link;

      new DetailPage($content.parentNode, { url, idx, link })
    })

    //card를 클릭했을 시 상세 페이지로
    this.addEvent("click", ".card", (e) => {
      const $content = document.querySelector(".content");
      const url = e.target.parentNode.dataset.url
        || e.target.dataset.url;
      const idx = e.target.parentNode.dataset.idx
        || e.target.dataset.idx;
      const link = e.target.parentNode.dataset.link
        || e.target.dataset.link;
      new DetailPage($content.parentNode, { url, idx, link })
    })
  }
}

export default App