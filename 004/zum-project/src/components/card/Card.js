import Component from '../../core/Component.js';
import { includeFavorItem } from '../../lib/util';
import './card.css';

export default class Card extends Component {
    setup() {}
    template() {
        if (!this.$props.item) {
            return ``;
        }
        const {
            idx,
            title,
            summaryContent,
            imageUrl,
            url,
            mediaName,
        } = this.$props.item;
        // const fakeImgUrl = `https://thumb.zumst.com/230x170/https://static.hubzum.zumst.com/hubzum/2020/09/17/14/d5a5dce411b4464faec9833f644fa179.jpg`;
        const star = includeFavorItem(idx + '') ? '★' : '☆';

        return `
            <div class="card_wrap" data-url='${url}' data-idx='${idx}'>
                <p class="card_thumbnail"><img src="${imageUrl}" onerror=""/></p>
                <p class="card_title">${star} ${title}</p>
                <p class="card_summary">${summaryContent}</p>
                <p class="card_media">by ${mediaName}</p>
            </div>
        `;
    }
    // 반복되는 컴포넌트의 경우 render메소드 재정의
    render() {
        this.$target.innerHTML += this.template();
        this.mounted();
    }
}
