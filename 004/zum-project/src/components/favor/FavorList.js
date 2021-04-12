import Component from '../../core/Component';
import FavorItem from './FavorItem';
import './favorList.css';
export default class FavorList extends Component {
    setup() {}
    template() {
        const { favor } = this.$props;
        return `
            <div class = 'category'><i>최근 즐겨찾기한 컨텐츠 ${
                favor && `( ${favor.length}개 )`
            }</i></div>
            <div class = 'favor_list' data-component="favor-list">
            </div>
        `;
    }
    mounted() {
        const { favor } = this.$props;
        if (!favor) return ``;
        const $favorlist = this.$target.querySelector(
            '[data-component="favor-list"]',
        );
        for (const item of favor) {
            new FavorItem($favorlist, {
                item: item,
            });
        }
    }
}
