import Component from "../../core/Component";
import { initLazyLoading } from "../../util/lazyLoading";
import StarButton from "../StarButton";

class DetailContent extends Component {
    setup() {
        const { $target, $props } = this
        $props.onInit();
        this.$target = $target;
        this.idx = $props.idx;
        this.link = $props.link;
    }
    template() {
        return `
        ${this.$state ? `
        <div class="title_wrap">
            <div class="main_title">${this.$state.article_title}</div>
            <div class="mediaName">by ${this.$state.media_title}</div>
        </div>
        <div class="article">
            ${this.$state.content}
        </div>
        <div class="button_wrap">
            <div class="starBtn" data-idx=${this.idx}></div>
            <a class="list" href=#${this.link}>목록</a>
        </div>
            ` : ""}`
    }
    mounted() {
        const $starBtn = this.$target.querySelector(".starBtn");
        $starBtn && new StarButton($starBtn, this.link);
        initLazyLoading();
    }
}

export default DetailContent;