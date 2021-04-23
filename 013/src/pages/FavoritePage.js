import Component from "../core/Component";
import Content from "../components/Content"
import Loading from "../components/Loading"
import Error from "../components/Error"
import api from "../util/api"
import { getItem } from "../util/localStorage"

class FavoritePage extends Component {
    setup() {
        const { $target, $props } = this
        this.$target = $target;
        this.link = $props;
        this.error = new Error(this.$target);
        this.favoriteItems = getItem("favorite");
    }
    template() {
        return `
        <div class="content"></div>
        `
    }
    mounted() {
        const $content = this.$target.querySelector(".content");
        this.loading = new Loading(this.$target);
        const favoritePage = new Content(
            $content, {
            link: this.link,
            onInit: async () => {
                this.loading.toggleLoading();
                const response = await api.getDataByIdxs(this.favoriteItems);
                if (!response.isError) {
                    const nextData = response.data;
                    favoritePage.setState(nextData);
                    this.loading.toggleLoading();
                } else {
                    this.error.setState(response.data);
                }
            }
        })

    }

    async loadData() {
        return await api.getDatasByCategory(this.$props)
    }

}

export default FavoritePage;