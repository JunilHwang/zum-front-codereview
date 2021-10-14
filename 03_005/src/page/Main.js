import Component from '../components/core/Component';
import Header from '../components/common/Header';
import Home from './Home';
import DetailPage from './DetailPage';

import '../css/home.css';
import '../css/header.css';

class Main extends Component {
    
    init() {
        if(!window.localStorage.getItem('favorite')) {
            window.localStorage.setItem('favorite', JSON.stringify([]));
        }
        if(!window.localStorage.getItem('favorite_data')) {
            window.localStorage.setItem('favorite_data', JSON.stringify([]));
        }
    }

    // header : zum 로고와 메뉴가 들어갈 요소 (공통 요소)
    // contents : 페이지 이동에 따른 변화요소가 들어갈 요소
    template() {
        return `
        <div id='header' id='header'></div>
    
        <div id="contents"></div>
        `;
    }

    async renderChildren() {
        const header = this._target.querySelector('#header');
        const contents = this._target.querySelector('#contents');

        new Header(header); // id가 header인 div에 Header 클래스 매핑
        new Home(contents); // id가 contents인 div에 Header 클래스 매핑
    }

    setEvent() {
        this.getDetailPage();
    }

    getDetailPage() { // post 카드를 눌렀을 때 상세페이지 요청
        const posts = this._target.querySelector('#contents');
        const localStorage = window.localStorage;
        const favorite = JSON.parse(localStorage.getItem('favorite'));
        const favorite_data = JSON.parse(localStorage.getItem('favorite_data'));

        posts.addEventListener('click', (e) => {
            // 글 박스 클릭 시 상세페이지로 이동
            if (e.target.classList.contains('post-link')) {
                if (e.target.classList.contains('post-idx')) {
                    new DetailPage(document.getElementById('contents'), {idx: e.target.dataset.idx});
                } else {
                    new DetailPage(document.getElementById('contents'), {idx: e.target.parentElement.dataset.idx});
                }
            }

            // 즐겨찾기 버튼 클릭 시 추가/해제
            if (e.target.classList.contains('favorite')) { 
                const idx = e.target.dataset.idx.toString();
                const post_wrap = e.target.parentNode.parentNode;
        
                if (favorite.includes(idx)) { // 즐겨찾기 삭제
                    e.target.parentNode.innerHTML = `<i class="far fa-star fa-lg favorite" data-idx=${idx}></i>`; // 아이콘 바꿔주고
                    favorite.splice(favorite.indexOf(idx), 1); // 즐겨찾기 목록에서 삭제
                    localStorage.setItem('favorite', JSON.stringify(favorite)); // localstorage 업데이트

                    favorite_data.splice(favorite.indexOf(idx), 1);
                    localStorage.setItem('favorite_data', JSON.stringify(favorite_data));
                } else { // 즐겨찾기 추가
                    e.target.parentNode.innerHTML = `<i class="fas fa-star fa-lg favorite" data-idx=${idx}></i>`; // 아이콘 바꿔주고
                    favorite.splice(0, 0, idx); // 즐겨찾기 목록에 추가
                    localStorage.setItem('favorite', JSON.stringify(favorite)); // localstorage 업데이트

                    const url = post_wrap.querySelector('.sub_thumbnail').src;
                    const title = post_wrap.querySelector('.sub_title').innerText;
                    const content = post_wrap.querySelector('.sub_content').innerText;
                    const writer = post_wrap.querySelector('.sub_writer').innerText.split(' ')[1];

                    const data = {url:url, title:title, content:content, writer:writer, idx:idx};

                    favorite_data.splice(0, 0, data);
                    localStorage.setItem('favorite_data', JSON.stringify(favorite_data));
                }
            }
        });
    }



}

export default Main;