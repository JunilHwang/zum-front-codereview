import Component from "./core/Component.js";
import styles from "./css/App.css"

import Footer from "./components/footer.js";
import Header from "./components/header/header.js"

import Home from "./components/body/home.js"
import Life from "./components/body/life.js"
import Food from './components/body/food.js';
import Traval from "./components/body/traval.js";
import Culture from "./components/body/culture.js";

//menu
import Router from './router.js';
 
const pages = [ //router page
    { page: Home, path: 'home'},
    { page: Life, path: 'life' },
    { page: Food, path: 'food' },
    { page: Traval, path: 'traval'},
    { page: Culture, path: 'culture'},
    // { page: Favorites, path: 'favorites'},
];
new Router({ pages });

export default class App extends Component {

    first () {}

  setup () {
    this.state = {
      isFilter: 0,
      header: null
    };
    // this.componentHtml('menu');
  }

    textLengthOverCut(txt, len, lastTxt) {
        if (len == "" || len == null) { // 기본값
            len = 20;
        }
        if (lastTxt == "" || lastTxt == null) { // 기본값
            lastTxt = "...";
        }
        if (txt.length > len) {
            txt = txt.substr(0, len) + lastTxt;
        }
        return txt;
    }

  template () {//mounted에서 data-component를 끌어다쓴다.
    let menuContents = [];
        let sentinel = {};

            for (let i = 1; i < 5; i++) {
                const saveApi  = this.zumApi[i].contents;
                try {
                    saveApi.map((currentValue,idx) => {
                        // fa.addEventListener('click', (event) => {
                        //     console.log("click",currentValue,event);
                        //     localStorage.setItem('favorite', currentValue);
                        // })
                        if (idx > 3) { //4줄만 나오도록 . -> 스크롤이벤트로 내리면 더 나오게 만들기.
                            console.log("Stop",i)
                            throw sentinel;
                        }
                        
                        menuContents.push(`
                        <div class="item">
                            <img src=${currentValue.imageUrl} />
                            <h4>${currentValue.title}<h4/>
                            <p>${this.textLengthOverCut(currentValue.summaryContent, 60, '...')}</p>
                            <p>${currentValue.mediaName} <span><a id="favorite" >★</a></span><p/>
                        </div>
                        `)
                    
                    });
                } catch(e) {
                    if (e !== sentinel) throw e;
                }
            }
    return `
       <header data-component="header"></header>
       <main data-component="home" id="body">
        <div class="home" id="mainScreen">HOME</div
            <div id="mainScreen">HOME</div>
                <div class="container">
                ${menuContents.join('')}
            </div>
       </main>
       <footer data-component="footer"></footer>
    `;
  }

  componentHtml (arg) {
    const {zumApi} = this;
    const header = this.target.querySelector('[data-component="header"]');
    const home = document.getElementsByClassName('home');
    const life = document.getElementsByClassName('life');
    const traval = document.getElementsByClassName('traval');
    const culture = document.getElementsByClassName('culture');
    const footer = this.target.querySelector('[data-component="footer"]');

    if (arg === 'header') {
        new Header(header, {
            addItem: this.addItem.bind(this), //props로 넘겨줌
            pagePush: this.pagePush.bind(this)
         })
         new Footer(footer, {
            addItem: this.addItem.bind(this)
        });
    } else if (arg === 'menu') {
        new Home(home, {
            zumApi
        });
        new Life(life, {
            zumApi,
        });
        new Traval(traval, {
            zumApi,
        });
        new Culture(culture, {
            zumApi,
        });
    }
    
  }

  // mounted에서 자식 컴포넌트를 마운트 해줘야 한다.
  mounted () {
    this.componentHtml('header');
  }

  get filteredItems () {
    const { isFilter, items } = this.state;
    return items.filter(({ active }) => (isFilter === 1 && active) ||
      (isFilter === 2 && !active) ||
      isFilter === 0);
  }

  //함수를 명시하여 컴포넌트를 사용할 때에는 this.addItem(...)으로 사용한다.

  addItem (contents) {
    const {items} = this.state;
    const seq = Math.max(0, ...items.map(v => v.seq)) + 1;
    const active = false;
    this.setState({
      items: [
        ...items,
        {seq, contents, active}
      ]
    });
  }

  pagePush(pageName) {
    window.location.hash = pageName;
    this.componentHtml('menu');
  }
}


