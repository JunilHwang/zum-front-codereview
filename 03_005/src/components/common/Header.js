import Component from '/src/components/core/Component.js';
import SubPage from '/src/page/SubPage.js';
import Home from '/src/page/Home.js'
import Post_Thumb from '/src/components/Post_Thumb.js';

import zum from '/src/image/logo_zum.png';
import hub from '/src/image/logo_hub.png';
import '/src/css/header.css';

class Header extends Component {

    init() {
        this.state = { current : 12 }
    }

    template() {
        const category = ['HOME', '라이프', '푸드', '여행', '컬쳐', '즐겨찾기'];
        const menu = {'HOME':'home', '라이프': 'life', '푸드': 'food', '여행': 'travel', '컬쳐': 'culture', '즐겨찾기': 'favorite'};
        
        return `
        <div id="logo">
            <img class="header_logo" src="${zum}">
            <img class="header_logo" src="${hub}">
        </div>
        <div class="navi">
            <ul>
                ${category.map(item => `<li class='menu' data-cate='${menu[item]}'>${item}</li>`).join('')}
            </ul>
        </div>
        `;
    }

    setEvent() {
        const navi = this._target.querySelector('.navi');
        const contents = this._target.parentElement.querySelector('#contents');

        navi.addEventListener('click', (e) => {
            if(e.target.classList.contains('menu')) {
                switch(e.target.dataset.cate) {
                    case 'home':
                        new Home(contents, {infinityScroll: this.infinityScroll});
                        break;
                    case 'favorite':
                        break;
                    default:
                        new SubPage(contents, {category: e.target.dataset.cate, title: e.target.innerText, infinityScroll: this.infinityScroll});
                }
            }
        });
    }

    // 상세 페이지 무한 스크롤 구현
    infinityScroll() {
        const contents = this._target.parentElement.querySelector('#contents');

        if (contents.childNodes[1].classList.contains('subpage')) {
            const scrollLength = window.innerHeight + window.scrollY;
            // 게시물 출력을 다 했거나, 스크롤이 밑에 닿으면
            if ((this._state.max > this._state.current) && (scrollLength >= document.body.offsetHeight)) {
                const list = this._target.querySelector('.category-list > ul');
                // 게시물 최대 12개를 더 이어붙여줌
                for (let i=0; i<12; i++) {
                    const li_el = document.createElement('li');
                    const li = list.appendChild(li_el);

                    new Post_Thumb(li, {content: this._state.content[this._state.current] });
                    this._state.current++;

                    if (this._state.max === this._state.current) break;
                }
            }
        }
    }

}

export default Header;