import Component from '../core/Component';
import DetailTitle from '../components/detail/DetailTitle';
import DetailContent from '../components/detail/DetailContent';
import { loadingMsg } from '../lib/util';
import { DETAIL, DETAIL_SUCCESS, DETAIL_ERROR } from '../reducer/reducer';
import api from '../lib/api';

export default class Detail extends Component {
    setup() {
        const { store, idx } = this.$props;
        // 디스패치될 때 실행할 코드
        store.subscribe(() => {
            this.render();
        });
        // 시작한다는 액션 dispatch
        store.dispatch({ type: DETAIL });
        this.apiCall()
            .then(({ content, title, media }) => {
                // 성공했을 때 dispatch
                store.dispatch({
                    type: DETAIL_SUCCESS,
                    detail: {
                        content,
                        title,
                        media,
                        idx,
                    },
                });
            })
            .catch((error) => {
                // 실패했을 때 dispatch
                store.dispatch({ type: DETAIL_ERROR, error });
            });
    }
    template() {
        return `
            <div data-component="title"></div>
            <div data-component="content"></div>
        `;
    }
    mounted() {
        const $title = this.$target.querySelector('[data-component="title"]');
        const $content = this.$target.querySelector(
            '[data-component="content"]',
        );
        const { detail, loading, error } = this.$props.store.getState();

        if (loadingMsg(loading, error, $title)) return;
        if (!detail) return;

        new DetailTitle($title, {
            title: detail.title,
            media: detail.media,
        });
        new DetailContent($content, {
            content: detail.content,
            lazyLoading: this.lazyLoading.bind(this),
            idx: detail.idx,
        });
    }
    async apiCall() {
        const url = this.$props.url;
        const res = await api.detail(url);
        const data = await res.json();
        return data;
    }

    lazyLoading() {
        const observerOption = {
            root: null,
            rootMargin: '0px 0px 0px 0px',
            threshold: 0.0,
        };
        // IntersectionObserver 인스턴스 생성
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                // entry.isIntersecting: 특정 요소가 뷰포트와 0% 교차되었으면
                if (entry.isIntersecting) {
                    entry.target.src =
                        entry.target.dataset.src || entry.target.src;
                    observer.unobserve(entry.target); // entry.target에 대해 관찰 종료
                }
            });
        }, observerOption);

        const lazyImgs = this.$target.querySelectorAll(
            '.img_block img[data-src]',
        );
        lazyImgs.forEach((el) => {
            io.observe(el); // el에 대하여 관측 시작
        });
    }
}
