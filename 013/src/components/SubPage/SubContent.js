import Component from "../../core/Component";
import Card from "../Card"
import api from "../../util/api"

const DATA_PER_PAGE = 4;
const lastData = 40;
let currentData = 12;

class SubContent extends Component {
    setup() {
        const { onInit, link } = this.$props;
        onInit();
        this.link = link;
        currentData = 12;
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
        this.infiniteScroll();
    }

    //http://yoonbumtae.com/?p=2858 참조

    infiniteScroll() {
        const link = this.link;
        const io = new IntersectionObserver((entries, observe) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                currentData += DATA_PER_PAGE;
                fetchData(currentData).then(() => {
                    observe.unobserve(entry.target);
                    observeLastChild(observe);
                });

            })
        }, {
            root: null,
            rootMargin: "0px 0px 0px 0px",
            threshold: 0.5
        });

        const fetchData = async (currentData) => {
            const response = await api.getDatasByCategory(link)
            const responseLength = Object.values(response.data).length;
            const nextData = responseLength !== 0 ? response.data.splice(0, currentData) : null;
            this.setState(nextData);
        }

        const observeLastChild = (intersectionObserver) => {
            const listChildren = document.querySelectorAll(".card_container a");
            listChildren.forEach(el => {
                if (!el.nextElementSibling && currentData < lastData) {
                    intersectionObserver.observe(el);
                } else if (currentData >= lastData) {
                    intersectionObserver.disconnect();
                }
            })
        }
        observeLastChild(io);
    }
}

export default SubContent;