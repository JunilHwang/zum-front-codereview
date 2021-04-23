import Component from "../core/Component";
import StarButton from "./StarButton";
import { initLazyLoading } from "../util/lazyLoading";

const EMPTY_IMG = "https://s3-eu-central-1.amazonaws.com/buddyloans-news/app/uploads/2015/12/shutterstock_70527019.jpg"

class Card extends Component {
    setup() {
        const { item, link } = this.$props;
        this.item = item;
        this.link = link;
    }

    template() {
        const { idx, title, imageUrl = EMPTY_IMG, mediaName, url } = this.item

        return `
            <a href=#${idx} class="item placeholders">
                <div class="card" data-url=${url} data-idx=${idx} data-link=${this.link}>
                    <img data-src=${imageUrl} class="thumb lazy" alt="기사 사진"/>
                    <span class="title">${title}</span>
                    <span class="mediaName">by ${mediaName}</span>
                </div>
                <div class="starBtn" data-idx=${idx}></div>
            </a>
        `
    }
    render() {
        this.$target.innerHTML += this.template();
        this.mounted();
    }

    mounted() {
        this.$target.querySelectorAll(".starBtn").forEach(e => {
            new StarButton(e, this.link);
        })
        initLazyLoading();
    }
}

export default Card