import Component from './core/Component';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

import Home from './pages/Home';
import Sub from './pages/Sub';
import Favorites from './pages/Favorites';
import Detail from './pages/Detail';

import { createStore } from './lib/redux';
import { routerPush, routerInit } from './lib/router';
import { setFavorItem, deleteFavorItem } from './lib/util';

import reducer from './reducer/reducer';
import './app.css';

export default class App extends Component {
    initialState = {};
    setup() {
        this.$store = createStore(reducer);
    }
    template() {
        return `
            <div data-component="header"></div>
            <div data-component="space"></div>
            <div data-component="main"></div>
            <div data-component="footer"></div>
        `;
    }
    mounted() {
        const $header = this.$target.querySelector('[data-component="header"]');
        const $footer = this.$target.querySelector('[data-component="footer"]');
        new Header($header, {});
        new Footer($footer, {});
        routerInit(this.routerSub.bind(this));
    }
    setEvent() {
        // 메뉴 클릭 이벤트
        this.addEvent('click', '.route', ({ target }) => {
            const path = target.getAttribute('path');
            this.$target
                .querySelector('.selectMenu')
                ?.classList.remove('selectMenu');
            target.classList.add('selectMenu');

            this.routerSub(path);
        });
        // 카드 클릭 이벤트
        this.addEvent('click', '.card_wrap', ({ target }) => {
            // console.log(target);
            const idx =
                target.dataset.idx ||
                target.parentNode.dataset.idx ||
                target.parentNode.parentNode.dataset.idx ||
                target.parentNode.parentNode.parentNode.dataset.idx;
            const url =
                target.dataset.url ||
                target.parentNode.dataset.url ||
                target.parentNode.parentNode.dataset.url ||
                target.parentNode.parentNode.parentNode.dataset.url;

            this.routerDetail(url, idx);
        });
        // 디테일 목록 버튼 클릭 이벤트
        this.addEvent('click', '.list_btn', () => {
            window.history.back();
        });
        // 디테일 즐겨찾기 버튼 클릭 이벤트
        this.addEvent('click', '.favor_btn', ({ target }) => {
            const className = target.classList;
            const { idx } = this.$store.getState().detail;

            if (className.contains('favor_on')) {
                className.replace('favor_on', 'favor_off');
                target.textContent = '즐겨찾기해제';
                setFavorItem(idx);
            } else if (className.contains('favor_off')) {
                className.replace('favor_off', 'favor_on');
                target.textContent = '즐겨찾기';
                deleteFavorItem(idx);
            }
        });
    }
    // sub화면 이동 함수
    routerSub(pathName) {
        const $main = this.$target.querySelector('[data-component="main"]');
        routerPush(pathName);

        switch (pathName) {
            case '/':
                new Home($main, {
                    store: this.$store,
                });
                break;
            case '/life':
            case '/food':
            case '/trip':
            case '/culture':
                this.sub = new Sub($main, {
                    store: this.$store,
                });
                break;
            case '/favorites':
                this.favorites = new Favorites($main, {
                    store: this.$store,
                });
                break;
            default:
                break;
        }
    }
    // detail 화면 이동 함수
    routerDetail(url, idx) {
        // console.log(data);
        const $main = this.$target.querySelector('[data-component="main"]');
        routerPush(`/detail/${idx}`);
        new Detail($main, { url, idx, store: this.$store });
    }
}
