import Component from "../core/Component";
import DetailContent from "../components/DetailPage/DetailContent"
import Loading from "../components/Loading"
import Error from "../components/Error"
import api from "../util/api"

class DetailPage extends Component {
    setup() {
        this.error = new Error(this.$target);
    }
    template() {
        return `
        <div class="content"></div>
        `
    }
    mounted() {
        const { $target, $props } = this
        this.loading = new Loading($target);
        const { url, idx, link } = $props
        const $content = $target.querySelector(".content");
        const detailPage = new DetailContent($content, {
            idx,
            link,
            onInit: async () => {
                this.loading.toggleLoading();
                const encodeUrl = encodeURIComponent(url)
                const response = await api.getContentByUrl(encodeUrl);
                if (!response.isError) {
                    const nextData = response.data;
                    detailPage.setState(nextData);
                    this.loading.toggleLoading();
                } else {
                    this.error.setState(response.data);
                }
            }
        })

    }

}

export default DetailPage;