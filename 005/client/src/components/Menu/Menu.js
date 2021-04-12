import Component from '../../core/Component';
import routers from '../../lib/routers';
import mainPage from './mainPage.scss';

export default class Menu extends Component {
  constructor(target) {
    super(target);
  }
  setup() {
    this.$state = {
      menuList: [
        { name: 'HOME', url: '/' },
        { name: '라이프', url: '/life' },
        { name: '푸드', url: '/food' },
        { name: '여행', url: '/travel' },
        { name: '컬쳐', url: '/culture' },
        { name: '즐겨찾기', url: '/star' },
      ],
    };
  }
  template() {
    const { menuList } = this.$state;
    return `
    <header>
      <ul class="menu_container">
        ${menuList
          .map((item) => `<li><span route=${item.url}>${item.name}</span></li>`)
          .join('')}
      </ul>
    </header>
    <main class="main_container">
    메뉴를 선택해주세요!
   
    </main>
    <div class="loading_container">
       
    </div>
    <footer></footer>
    
    `;
  }
  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  clickListener(e) {
    const mainElement = document.querySelector('.main_container');
    if (e.target.tagName === 'SPAN') {
      const route = new routers(mainElement);
      const pathName = e.target.getAttribute('route');
      route.historyRouterPush(pathName, mainElement);
    }
  }
  setEvent() {
    const ulElement = document.querySelector('.menu_container');
    ulElement.addEventListener('click', this.clickListener);
  }
}
