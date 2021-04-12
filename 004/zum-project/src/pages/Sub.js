import Component from '../core/Component';
import SubCardList from '../components/sub/SubCardList';
import { loadingMsg } from '../lib/util';
import { SUB, SUB_SUCCESS, SUB_ERROR } from '../reducer/reducer';
import api from '../lib/api';

export default class Sub extends Component {
    currentItem = 12;
    DATA_PER_PAGE = 8;
    lastItem = 40;
    setup() {
        const { store } = this.$props;
        // 디스패치될 때 실행할 코드
        store.subscribe(() => {
            this.render();
        });
        // 시작한다는 액션 dispatch
        store.dispatch({ type: SUB });

        this.apiCall()
            .then(({ data }) => {
                // 성공했을 때 dispatch
                store.dispatch({
                    type: SUB_SUCCESS,
                    sub: {
                        showData: data.slice(0, 12),
                        orignData: data,
                    },
                });
            })
            .catch((error) => {
                // 실패했을 때 dispatch
                store.dispatch({ type: SUB_ERROR, error });
            });
    }
    template() {
        return `
            <div class="sub" data-component="sub"></div>
        `;
    }

    mounted() {
        const $sub = this.$target.querySelector('[data-component="sub"]');
        const { sub, loading, error } = this.$props.store.getState();

        if (loadingMsg(loading, error, $sub)) return;
        if (!sub) return;

        new SubCardList($sub, {
            showData: sub.showData,
            category: window.location.pathname,
            infiniteScroll: this.infiniteScroll.bind(this),
        });
    }
    async apiCall() {
        const category = window.location.pathname;

        const res = await api.content(category.slice(1, category.length));
        const data = await res.json();

        return data;
    }

    infiniteScroll() {
        const $sub = this.$target.querySelector('[data-component="sub"]');

        // 데이터 추가 함수
        const addData = (current) => {
            const { store } = this.$props;
            store.subscribe(() => {
                this.render();
            });
            store.dispatch({
                type: SUB_SUCCESS,
                sub: {
                    ...store.getState().sub,
                    showData: store.getState().sub.orignData.slice(0, current),
                },
            });
        };

        const observeLastChild = (intersectionObserver) => {
            const listChildren = $sub.querySelectorAll('.card_wrap');
            listChildren.forEach((el) => {
                if (
                    !el.nextElementSibling &&
                    this.currentItem < this.lastItem
                ) {
                    intersectionObserver.observe(el); // el에 대하여 관측 시작
                } else if (this.currentItem >= this.lastItem) {
                    intersectionObserver.disconnect();
                }
            });
        };
        const observerOption = {
            root: null,
            rootMargin: '0px 0px 0px 0px',
            threshold: 1.0,
        };

        // IntersectionObserver 인스턴스 생성
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                // entry.isIntersecting: 특정 요소가 뷰포트와 50%(threshold 0.5) 교차되었으면
                if (entry.isIntersecting) {
                    this.currentItem = this.currentItem + this.DATA_PER_PAGE;
                    addData(this.currentItem);
                    observer.unobserve(entry.target);
                    observeLastChild(observer);
                }
            });
        }, observerOption);

        observeLastChild(io);
    }
}
