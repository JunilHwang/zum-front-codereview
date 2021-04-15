import Component from "../../core/Component.js";

let saveApi;
let contents = [];
export default class Life extends Component {

    setup(props) {}

    template() {
        if (this.props) {
            contents = this.props.setBodyApi(1);
            // saveApi  = this.props.zumApi[1].contents;
        }
            return `
            <div id="life">
                <div id="mainScreen">라이프</div>
                <div class="container">
                ${contents.join('')}
                </div>
            </div>
            `;

    }
}
