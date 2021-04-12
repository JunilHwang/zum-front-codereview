import Component from '../../core/Component';
import Card from '../card/Card';
import './subCardList.css';
export default class SubCarList extends Component {
    setup() {}
    template() {
        const category = {
            '/life': '라이프',
            '/food': '푸드',
            '/trip': '여행',
            '/culture': '컬쳐',
        };
        return `
            <div class = 'category'><i>${
                category[this.$props.category] || ''
            }</i></div>
            <div class = 'sub_card_list' data-component="sub-card-list">
            </div>
        `;
    }
    mounted() {
        if (!this.$props.showData) {
            return ``;
        }
        const $sublist = this.$target.querySelector(
            '[data-component="sub-card-list"]',
        );
        for (const item of this.$props.showData /*.slice(0, 12)*/) {
            new Card($sublist, {
                item,
            });
        }
    }
    didMounted() {
        this.$props.infiniteScroll();
    }
}
