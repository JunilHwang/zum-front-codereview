import Component from "../../../core/Component";
import BestCard from "./BestCard"
class TopRank extends Component {
    setup() {
        const { onInit, link } = this.$props;
        onInit();
        this.link = link;
    }

    template() {
        if (!this.$state) return ""

        return `
            <div class="best_container"></div>
        `
    }
    mounted() {
        const $CardContainer = this.$target.querySelector(".best_container");
        const { $state } = this
        $state && Object.values($state).forEach((item, idx) => {
            new BestCard($CardContainer, { item, link: this.link, rank: idx + 1 })
        });
    }
}

export default TopRank;