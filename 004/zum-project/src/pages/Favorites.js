import Component from '../core/Component';
import FavorList from '../components/favor/favorList';
import { getFavorItem } from '../lib/util';
import { loadingMsg } from '../lib/util';
import { FAVOR, FAVOR_SUCCESS, FAVOR_ERROR } from '../reducer/reducer';
import api from '../lib/api';

export default class Favorites extends Component {
    setup() {
        const { store } = this.$props;
        // 디스패치될 때 실행할 코드
        store.subscribe(() => {
            this.render();
        });
        // 시작한다는 액션 dispatch
        store.dispatch({ type: FAVOR });
        this.apiCall()
            .then(({ data }) => {
                // 성공했을 때 dispatch
                store.dispatch({
                    type: FAVOR_SUCCESS,
                    favor: {
                        data: [...data],
                    },
                });
            })
            .catch((error) => {
                // 실패했을 때 dispatch
                store.dispatch({ type: FAVOR_ERROR, error });
            });
    }
    template() {
        return `
            <div class="sub" data-component="favor"></div>
        `;
    }
    mounted() {
        const $favor = this.$target.querySelector('[data-component="favor"]');
        const { favor, error, loading } = this.$props.store.getState();

        if (loadingMsg(loading, error, $favor)) return;
        if (!favor) return;
        new FavorList($favor, {
            favor: favor.data,
        });
    }

    async apiCall() {
        const favorites = getFavorItem();

        const res = await api.favor(favorites);
        const data = await res.json();

        return data;
    }
}
