import Component from '../../core/Component.js';
import './header.css';

export default class Header extends Component {
    setup() {}
    template() {
        return `
            <div class="header_wrap" data-component="header-div">
                <div class="logo_img"><span class="route" path="/">로고이미지</span></div>
                <div class="category">
                    <ul>
                        <li><span class="route selectMenu" path="/">홈</span></li>
                        <li><span class="route" path="/life">라이프</span></li>
                        <li><span class="route" path="/food">푸드</span></li>
                        <li><span class="route" path="/trip">여행</span></li>
                        <li><span class="route" path="/culture">컬쳐</span></li>
                        <li><span class="route" path="/favorites">즐겨찾기</span></li>
                    </ul>
                </div>
            </div>
        `;
    }
}
