import Component from '../../core/Component';
import Card from '../card/Card';
import './homeCardList.css';
export default class HomeCardList extends Component {
    setup() {}
    template() {
        return `
            <div class="category">라이프</div><div class="home_card_list_wrap" data-component="home-life"></div>
            <div class="category">푸드</div><div class="home_card_list_wrap" data-component="home-food"></div>
            <div class="category">여행</div><div class="home_card_list_wrap" data-component="home-trip"></div>
            <div class="category">컬쳐</div><div class="home_card_list_wrap" data-component="home-culture"></div>
        `;
    }
    mounted() {
        if (!this.$props.category) {
            return ``;
        }
        const _target = this.$target;
        const childComponent = {
            life: _target.querySelector('[data-component="home-life"]'),
            food: _target.querySelector('[data-component="home-food"]'),
            trip: _target.querySelector('[data-component="home-trip"]'),
            culture: _target.querySelector('[data-component="home-culture"]'),
        };

        for (const [key, values] of Object.entries(this.$props.category)) {
            for (const value of values) {
                new Card(childComponent[key], {
                    item: value,
                });
            }
        }
    }
}
