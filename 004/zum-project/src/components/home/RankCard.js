import Component from '../../core/Component';
import './rankCard.css';
export default class RankCard extends Component {
    setup() {}
    template() {
        const { idx, title, mediaName, url, arrIdx } = this.$props;
        return `
            <li class="card_wrap rank" data-url="${url}" data-idx="${idx}">
                <p class ="ranking_number">${arrIdx + 1}.</p>
                <p class ="ranking_title">${title}</p>
                <p class ="ranking_media_name">by ${mediaName}</p>
            </li>   
        `;
    }
    // 반복되는 컴포넌트의 경우 render메소드 재정의
    render() {
        this.$target.innerHTML += this.template();
        this.mounted();
    }
}
