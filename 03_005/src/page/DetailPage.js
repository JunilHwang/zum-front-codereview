import Component from '../components/core/Component';
import Home from './Home';

class DetailPage extends Component {

    template() {
        return `
        <div class="loading">
            콘텐츠 로딩중입니다...
        </div>

        <div class='post_title'></div>
        
        <div class='post_content'></div>
        
        <div class='footer'>
            <button class='go-home'>목록</button>
        </div>
        `;
    }

    setEvent() {
        const btn = this._target.querySelector('.go-home');
        btn.addEventListener('click', (e) => {
            new Home(document.getElementById('contents'));
        });
    }

    async renderChildren() {
        const post_title = this._target.querySelector('.post_title');
        const post_content = this._target.querySelector('.post_content');
        const { idx } = this._props;
        
        const contents = await fetch(`${this._url}/api/detail/${idx}`).then(resp => resp.json());

        this._target.querySelector('.loading').style.display = 'none';

        this._target.querySelector('.post_title').innerHTML = contents.title;
        this._target.querySelector('.comment_info').style.display = 'none';
        this._target.querySelector('.page_share_l').style.display = 'none';
        
        this._target.querySelector('.post_content').innerHTML = contents.content;
        
    }
}

export default DetailPage;