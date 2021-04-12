import Component from '../../core/Component.js';
import './favorItem.css';
export default class FavorItem extends Component {
    setup() {}
    template() {
        if (!this.$props.item) {
            return ``;
        }
        const {
            idx,
            title,
            url,
            mediaName,
            summaryContent,
            imageUrl,
        } = this.$props.item;
        return `
            <div class="card_wrap" data-url='${url}' data-idx='${idx}'>
                <div class="title">
                    <p>
                        <b>
                            ${title}
                        </b>
                    </p>
                    <p>
                        <i>by</i> ${mediaName}
                    </p>
                </div>
                <div class="content">
                    <p>
                        ${summaryContent || ''}
                    </p>
                </div>
                <div class="img">
                    <img src="${imageUrl || ''}"/>
                </div>
            </div>
        `;
    }
    // 반복되는 컴포넌트의 경우 render메소드 재정의
    render() {
        this.$target.innerHTML += this.template();
        this.mounted();
    }
}
