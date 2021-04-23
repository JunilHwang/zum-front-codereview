import Component from "../core/Component";
import SubContent from "../components/SubPage/SubContent"
import Loading from "../components/Loading"
import api from "../util/api"
import Error from "../components/Error";


class SubPage extends Component {
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
        const $content = $target.querySelector(".content");

        const subContent = new SubContent(
            $content, {
            link: $props,
            onInit: async () => {
                this.loading.toggleLoading();
                const response = await api.getDatasByCategory($props)
                if (!response.isError) {
                    const nextData = response.data.splice(0, 12);
                    subContent.setState(nextData);
                    this.loading.toggleLoading();
                } else {
                    this.error.setState(response.data);
                }
            }
        })
    }
}

export default SubPage;