import Component from "../../../core/Component";

class BestCard extends Component {
    setup() {
        const { item, link, rank } = this.$props;
        this.item = item;
        this.link = link;
        this.rank = rank
    }
    template() {
        const { idx, title, mediaName, url } = this.item;

        return `
        <div class="rank">
            <a href=#${idx} class="rank_link" data-url=${url} data-idx=${idx} data-link=${this.link}>
                <span class="rank_idx">${this.rank}</span>
                <div class="title_wrap" data-url=${url} data-idx=${idx} data-link=${this.link}>
                    <span class="title">${title}</span>
                    <span class="mediaName">by ${mediaName}</span>
                </div>
            </a>
        </div>
        `
    }
    render() {
        this.$target.innerHTML += this.template();
        this.mounted();
    }
}

export default BestCard