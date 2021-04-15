import Component from "../../core/Component.js";

let contents = [];
export default class Food extends Component {

    setup(props) {

    }
    template() {
        if (this.props) {
            contents = this.props.setBodyApi(2);
        }
            return `
            <div id="food">
                <div id="mainScreen">푸드</div>
                <div class="container">
                ${contents.join('')}
                </div>
            </div>
            `;
    }
}
