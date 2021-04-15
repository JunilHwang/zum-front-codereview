
export default class Router {
    nowPage = '';
  
    constructor({ pages }) {
      if (window.performance) {
        if (performance.navigation.type == 1) { // 새로고침  감지
          window.location="?a=b&c=d#home"; //# 지우기
        }
      }
      window.onhashchange = () => {
        this.app = document.getElementById('body');
        this.pages = pages;
        this.nowPage = window.location.hash.replace('#', '');
        const page = this.pages.find((page) => page.path === this.nowPage);
        // find : page.path === this.nowPage를 만족하는 제일 첫번째 값을 가져온다.
        const Page = page.page;
        const currentPage = new Page({ router: this });
        this.app.innerHTML = ''; // 현재 페이지를 비워주고.
        this.app.innerHTML += currentPage.template(); // 현재 페이지를 넣어준다.
        currentPage.mounted();
      };
    }
}