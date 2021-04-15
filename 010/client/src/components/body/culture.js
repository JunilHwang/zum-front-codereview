import Component from "../../core/Component.js";

let contents = [];
export default class Culture extends Component {

    setup(props) {

    }
    template() {
        if (this.props) {
            contents = this.props.setBodyApi(4);
        }
            return `
            <div id="culture">
                <div id="mainScreen">컬쳐</div>
                <div class="container">
                ${contents.join('')}
                </div>
            </div>
            `;
    }
}