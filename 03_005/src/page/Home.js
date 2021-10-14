import Component from '../components/core/Component';
import Cate3_Top4 from '../components/Cate3_Top4';
import Top12 from '../components/Top12';

import '../css/cate3_top4.css';
import '../css/top12.css';

class Home extends Component {

    init() {
        const category = ['라이프', '푸드', '여행', '컬처'];
        this._state = { category: category }; // 4-2. state를 받아준 상태값으로 초기화 해줌
    }

    template() {
        return `
            <div id='cate3_top4'>
            </div>

            <div id="top12"></div>
        `;
    }

    async renderChildren() {
        const cate3_top4 = this._target.querySelector('#cate3_top4');
        const top12 = this._target.querySelector('#top12');
        const category = this._state.category;

        category.forEach(cate => {
            const divEl = document.createElement('div');
            const div =  cate3_top4.appendChild(divEl);
            new Cate3_Top4(div, {category: cate}); // 카테고리 별로 탑4를 뽑아줌
        })
        
        new Top12(top12);
    }

}

export default Home;