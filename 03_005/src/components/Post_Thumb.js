import Component from './core/Component';

import '/src/css/post_thumb.css';

class Post_Thumb extends Component {

    template() {
        const content = this._props.content;
        return `
        <div class="post-wrap">
            <div class="post-idx post-link" data-idx='${content.idx}'>
                <img class='sub_thumbnail post-link' src='${content.imageUrl}'>
                <div class='sub_title post-link'>${content.title}</div>
                <div class='sub_content post-link'>${content.summaryContent}</div>
            </div>
            <div class="sub_writer">by ${content.mediaName}</div>
            <div class='sub_favorite'></div>
        </div>
        `;
    }

    renderChildren() {
        const sub_favorite = this._target.querySelector('.sub_favorite');
        const localStorage = window.localStorage;
        const favorite = JSON.stringify(localStorage.getItem('favorite'));
        
        if (favorite.includes(this._props.content.idx.toString())) {
            sub_favorite.innerHTML = `<i class="fas fa-star fa-lg favorite" data-idx='${this._props.content.idx}'></i>`;
        } else {
            sub_favorite.innerHTML = `<i class="far fa-star fa-lg favorite" data-idx='${this._props.content.idx}'></i>`;
        }
    }

}

export default Post_Thumb;