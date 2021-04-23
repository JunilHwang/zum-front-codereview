import Component from "../core/Component";
import { deleteItem, getItem, setItem } from "../util/localStorage";

const FAVORITE = "favorite"
class StarButton extends Component {
    setup() {
        const { $target, $props } = this;
        this.$target = $target
        this.link = $props;
    }
    template() {
        const favoriteItems = getItem(FAVORITE).map(({ idx }) => idx);
        return `
            ${favoriteItems.includes(this.$target.dataset.idx) ? "★" : "☆"}
        `
    }

    setEvent() {
        this.addEvent("click", ".starBtn", (e) => {
            this.toggleFavorite(e.target.dataset.idx);
            this.render();
        })
    }
    toggleFavorite(idx) {
        const favoriteItems = getItem(FAVORITE);
        const favoriteIdxs = favoriteItems.map(({ idx }) => idx)
        if (favoriteIdxs.includes(idx)) {
            deleteItem(FAVORITE, idx)
        } else {
            favoriteItems.unshift({ idx, link: this.link });
            setItem(FAVORITE, favoriteItems);
        }
    }
}

export default StarButton