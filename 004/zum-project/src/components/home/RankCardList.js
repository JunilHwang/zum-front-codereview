import Component from '../../core/Component';
import RankCard from './RankCard';
import './rankCardList.css';
export default class RankCardList extends Component {
    setup() {}
    template() {
        return `
            <div style="font-style: italic; font-size: 1.5rem; font-weight: bold; margin: 20px 0;">
            실시간 TOP 12
            </div>
            <ul class="ranking_box" data-component="rank-card-list">
            </ul>
        `;
    }
    mounted() {
        const { best } = this.$props;
        const $rankCardList = this.$target.querySelector(
            '[data-component="rank-card-list"]',
        );
        best.map(({ idx, title, mediaName, url }, arrIdx) => {
            new RankCard($rankCardList, {
                idx,
                title,
                mediaName,
                url,
                arrIdx,
            });
        });
    }
}
