import Component from '../core/Component';
import HomeCardList from '../components/home/HomeCardList';
import RankCardList from '../components/home/RankCardList';
import { loadingMsg } from '../lib/util';
import { HOME, HOME_SUCCESS, HOME_ERROR } from '../reducer/reducer';
import api from '../lib/api';
export default class Home extends Component {
    setup() {
        const { store } = this.$props;
        // 디스패치될 때 실행할 코드
        store.subscribe(() => {
            this.render();
        });
        // 시작한다는 액션 dispatch
        store.dispatch({ type: HOME });
        this.apiCall()
            .then(({ best, category }) => {
                // 성공했을 때 dispatch
                store.dispatch({
                    type: HOME_SUCCESS,
                    home: {
                        best,
                        category,
                    },
                });
            })
            .catch((error) => {
                // 실패했을 때 dispatch
                store.dispatch({ type: HOME_ERROR, error });
            });
    }
    template() {
        return `
            <div data-component="card"></div>
            <div data-component="ranking"></div>
        `;
    }
    mounted() {
        const $card = this.$target.querySelector('[data-component="card"]');
        const $ranking = this.$target.querySelector(
            '[data-component="ranking"]',
        );
        const { home, loading, error } = this.$props.store.getState();

        if (loadingMsg(loading, error, $card)) return;

        if (!home) return;
        new HomeCardList($card, {
            category: home.category,
        });
        new RankCardList($ranking, {
            best: home.best,
        });
    }
    async apiCall() {
        const res = await api.home();
        const data = await res.json();

        return data;
    }
}
