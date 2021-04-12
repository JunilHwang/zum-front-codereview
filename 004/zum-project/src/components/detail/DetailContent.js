import Component from '../../core/Component.js';
import { includeFavorItem } from '../../lib/util';
import './DetailContent.css';

export default class DetailContent extends Component {
    setup() {}
    template() {
        return `
            <div class="detail_content">
               ${this.$props.content}
            </div>
            <button class="list_btn">목록</button>
            ${
                includeFavorItem(this.$props.idx)
                    ? `<button class="favor_btn favor_off">즐겨찾기해제</button>`
                    : `<button class="favor_btn favor_on">즐겨찾기</button>`
            }
            
            
        `;
    }
    didMounted() {
        this.$props.lazyLoading();
    }
}
