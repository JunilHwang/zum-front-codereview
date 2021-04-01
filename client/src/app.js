import Component from "./core/component.js";
import Header from "./components/Header/header.js"
import MainPage from "./components/mainPage.js";
import { initialRoutes } from './router.js';
import SubPage from "./components/SubPages/subPage.js";
import FavoritePage from "./components/Favorite/favoritePage.js";

export default class App extends Component{

  template(){
    return `
      <Header data-component="Header"></Header>
      <div id="page"></div>
      `;
  }

  mount(){
    
    const pageDiv=this.$target.querySelector("#page");
    initialRoutes(pageDiv);

    const $header=this.$target.querySelector('[data-component="Header"]');
    const $mainPage=this.$target.querySelector('[data-component="MainPage"]');
    const $subPage=this.$target.querySelector('[data-component="SubPage"]');

    new Header($header,null);
    $mainPage && new MainPage($mainPage,this.$props);
    $subPage && new SubPage($subPage,this.$props);

  }

  setEvent(){
    window.onload=()=>{
      this.addEvent('clic k','.route',(e)=>{
        this.removeHeaderStyle(e);
      })

      window.addEventListener('hashchange', () => {
        this.routingPageRandering();
      })

      window.addEventListener('keydown',(e)=>{
        if(e.key == 'F5' || e.ctrlKey == true && (e.key == 'r')){
          e.cancelBubble = true;
          e.returnValue = false;
          location.href='/'
          setTimeout(function(){
              window.location.reload();
          }, 1000);
          return false;
        }
      })
    }
  }

  routingPageRandering(){
    const link=window.location.hash;
    switch(link){
      case '#Home':
        const $mainPage=this.$target.querySelector('[data-component="MainPage"]');
        new MainPage($mainPage,this.$props);
        break;

      case '#Life':
      case '#Food':
      case '#Trip':
      case '#Culture':
        const $subPage=this.$target.querySelector('[data-component="SubPage"]');
        new SubPage($subPage,{props:this.$props,link:link});     
        break;

      case '#Favorite':
        const $favoritePage=this.$target.querySelector('[data-component="FavoritePage"]');
        new FavoritePage($favoritePage,this.$props);
        break;

      default:
        break;
    }
  }

  /* Nav Select background style 변경 */
  removeHeaderStyle(e){
    const $li=this.$target.querySelectorAll('.menuItem');
    $li.forEach((li)=>{
      const link=li.children[0];
      li.classList.remove('on');
      if(link===e.target){
        li.classList.add('on');
      }
    })
  }

}