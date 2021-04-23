import Component from "../core/Component";
import Card from "./Card"

class Content extends Component {
    setup() {
        const { onInit, link } = this.$props;
        onInit();
        this.link = link;
    }
    template() {
        return `
        ${this.$state && Object.values(this.$state).length === 0 ? `
        <div class="empty">표시할 데이터가 존재하지 않습니다..<div>`
                : `<div class="card_container"></div>`
            }`
    }
    mounted() {
        const $CardContainer = this.$target.querySelector(".card_container");
        const { $state } = this
        $state && Object.values($state).forEach(item => {
            new Card($CardContainer, { item, link: this.link })
        });
    }
}

export default Content;