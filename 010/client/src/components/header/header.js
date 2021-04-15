import Component from "../../core/Component.js";
import Home from "../body/home.js";
import Life from "../body/life.js";
import Food from "../body/food.js";
import Traval from "../body/traval.js";
import Culture from "../body/culture.js";
let contents = [];

export default class Header extends Component {

    setup () {
    }
    // getFavorite (arg) {
    //     console.log(arg)
    // }

    setBodyApi (menu) {
        let menuContents = [];
        let sentinel = {};
        const fa = document.getElementById("favorite");

        if (menu === 'home') {
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
        } else {
            const saveApi  = this.zumApi[menu].contents;
            try {
                saveApi.map((currentValue,idx) => {
                    if (idx > 15) { //4줄만 나오도록 . -> 스크롤이벤트로 내리면 더 나오게 만들기.
                        console.log("Stop")
                    throw sentinel;
                    }
                    menuContents.push(`
                    <div class="item">
                        <img src=${currentValue.imageUrl} />
                        <h4>${currentValue.title}<h4/>
                        <p>${this.textLengthOverCut(currentValue.summaryContent, 60, '...')}</p>
                        <p>${currentValue.mediaName} 
                            <span>
                                <a id="favorite" >★</a>
                            </span>
                        <p/>
                    </div>
                    `);

                })
            } catch(e) {
                if (e !== sentinel) throw e;
            }
        }
        return menuContents;
    }

    template () {

        let menu = []
         this.zumMenu.map((currentValue,idx) => {
            menu.push(`
                <li><a id=${currentValue.id}>${currentValue.menu}</a></li>
            `);
        })
        
        return `
            <top>
                <div class="logo">JxxH ZUM</div>
            </top>
            <div id="line"></div>
                <ul id="menu">
                    ${menu.join('')}
                </ul>
            <div id="line"></div>
        `;
    }
    // <li><a id="home">HOME</a></li>
    // <li><a id="life">라이프</a></li>
    // <li><a id="food">푸드</a></li>
    // <li><a id="traval">여행</a></li>
    // <li><a id="culture">컬쳐</a></li>
    // <li><a id="favorites">즐겨찾기</a></li>
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

    mounted() {
        const {zumApi,textLengthOverCut,setBodyApi} = this;

        const home = document.getElementsByClassName('home');
        const life = document.getElementsByClassName('life');
        const food = document.getElementsByClassName('food');
        const traval = document.getElementsByClassName('traval');
        const culture = document.getElementsByClassName('culture');

        new Home(home, {
            setBodyApi : setBodyApi.bind(this),
            textLengthOverCut : textLengthOverCut.bind(this)
        });

        new Life(life, {
            setBodyApi : setBodyApi.bind(this),
            textLengthOverCut : textLengthOverCut.bind(this)
        });

        new Food(food, {
            setBodyApi : setBodyApi.bind(this),
            textLengthOverCut : textLengthOverCut.bind(this)
        });
    
        new Traval(traval, {
            setBodyApi : setBodyApi.bind(this),
            textLengthOverCut : textLengthOverCut.bind(this)
        });
        
        new Culture(culture, {
            setBodyApi : setBodyApi.bind(this),
            textLengthOverCut : textLengthOverCut.bind(this)
        });
    
  
    }

  setEvent() {
    const { pagePush } = this.props;
    this.addEvent('click', '#home', ({target}) => {
        pagePush('home');
    });
    this.addEvent('click', '#life', ({target}) => {
        pagePush('life');
    });

    this.addEvent('click', '#food', ({target}) => {
        pagePush('food');
    });
    this.addEvent('click', '#traval', ({target}) => {
        pagePush('traval');
    });

    this.addEvent('click', '#culture', ({target}) => {
        pagePush('culture');
    });

    // 즐겨찾기
    // this.addEvent('click', '#favorite', ({target}) => {
        
    // })
  }

}