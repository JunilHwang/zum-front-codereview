import Component from '../../core/Component.js';
import './DetailTitle.css';

export default class DetailTitle extends Component {
    setup() {}
    template() {
        return `
            <div class="detail_title">
               <p class="title">${this.$props.title}</p>
               <p class="media"><i>by </i>${this.$props.media}</p>
            </div>
        `;
    }
}
