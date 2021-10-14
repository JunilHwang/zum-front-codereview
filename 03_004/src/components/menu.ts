import Component from "../core/component";

export default class Menu extends Component {
  selectedMenu: string;

  navItems: Array<{
    category: string,
    href: string,
    text: string,
  }>;
  

  initialize() {
    this.navItems = [
      {
        category: 'home',
        href: '',
        text: '홈',
      },
      {
        category: 'life',
        href: 'life',
        text: '라이프',
      },
      {
        category: 'food',
        href: 'food',
        text: '푸드',
      },
      {
        category: 'travel',
        href: 'travel',
        text: '여행',
      },
      {
        category: 'culture',
        href: 'culture',
        text: '문화',
      },
      {
        category: 'favorite',
        href: 'favorite',
        text: '즐겨찾기',
      },
    ]
  }

  template(): string {
    let menuTemplate = '';
    menuTemplate += '<nav class="navigation">';
    
    this.navItems.forEach( item => {
      let tag = '<a class="nav-item ' + item.category;
      if (item.category == this.selectedMenu) {
        tag += ' selected ';
      }
      tag += '" href=#' + item.href + '>' + item.text + '</a>';
      
      menuTemplate += tag;
    });

    menuTemplate += '</nav>'

    return menuTemplate;
  }

  selectMenu(menu: string): void {
    this.selectedMenu = menu;
  }
}