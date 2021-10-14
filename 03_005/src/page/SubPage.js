import Component from '/src/components/core/Component';
import Post_Thumb from '/src/components/Post_Thumb';

import '/src/css/subpage.css'

class SubPage extends Component {
    
    init() {
        this._state = { current: 0 };
    }

    template() {
        return `
        <div class="subpage">
            <div class='banner'>
            <h1>${this._props.title}</h1>
            </div>
            <div class='category-list'>
                <ul>
                </ul>
            </div>
        </div>
        `;
    }

    async renderChildren() {
        const list = this._target.querySelector('.category-list > ul');
            const content = await fetch(`${this._url}/api/content/${this._props.category}`).then(resp => resp.json());
            this._state = { ...this._state, ...{content: content, max: content.length} };
        
        // 일단 게시물 12개 출력해줌
        for (let i=0; i<12; i++) {
            const li_el = document.createElement('li');
            const li = list.appendChild(li_el);
            new Post_Thumb(li, {content: content[i]});
            this._state.current++;
        }
    }

    setEvent() {
        window.addEventListener('scroll', this._props.infinityScroll.bind(this));
    }


}

export default SubPage;