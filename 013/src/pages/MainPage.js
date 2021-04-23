import Component from "../core/Component";
import Content from "../components/Content";
import TopRank from "../components/MainPage/TopRank/TopRank";
import Loading from "../components/Loading";
import Error from "../components/Error";

import api from "../util/api";

class MainPage extends Component {
    setup() {
        this.error = new Error(this.$target);
    }
    template() {
        return `
        <div class="content"></div>
        <div class="top_rank"></div>
        `
    }
    mounted() {
        const { $target, $props } = this

        this.loading = new Loading($target);
        const $content = $target.querySelector(".content");
        const $topRank = $target.querySelector(".top_rank");
        const mainContent = new Content(
            $content, {
            link: $props,
            onInit: async () => {
                this.loading.toggleLoading();

                const response = await api.getMainDatas();
                if (!response.isError) {
                    const nextData = response.data;
                    mainContent.setState(nextData);
                    this.loading.toggleLoading();

                } else {
                    this.error.setState(response.data)
                }
            }
        })
        const topRank = new TopRank(
            $topRank, {
            link: $props,
            onInit: async () => {
                this.loading.toggleLoading();
                const response = await api.getBestDatas();
                if (!response.isError) {
                    const nextData = response.data;
                    topRank.setState(nextData);
                    this.loading.toggleLoading();
                } else {
                    this.error.setState(response.data)
                }
            }
        })
    }

}

export default MainPage;