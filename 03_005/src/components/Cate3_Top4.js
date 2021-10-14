import Component from "./core/Component";
import Post_Thumb from './Post_Thumb';

// 카테고리별 TOP4 리스트 출력
class Cate3_Top4 extends Component {

    template() {
        return `
        <div class='posts-wrap'>
            <h3 class='category_name'>#${this._props.category}</h3>
            <ul class='posts'></ul>
        </div>`;
    }

    async renderChildren() {
        const map = {"컬처": "culture", "푸드": "food", '라이프': 'life', '여행': 'travel'};
        const content = await fetch(`${this._url}/api/content/${map[this._props.category]}`).then(resp => resp.json());
        const posts = this._target.querySelector('.posts');
        const MAX = 4; // 카테고리 별 갯수

        for (let i=0; i<MAX; i++) {
            const li = document.createElement('li');
            const post = posts.appendChild(li);
            new Post_Thumb(post, {content: content[i]});
        }
    }

}

export default Cate3_Top4;