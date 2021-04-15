import Component from "../../core/Component.js";

let contents = [];
export default class Traval extends Component {

    setup(props) {}

    template() {
        if (this.props) {
            console.log(this.props)
            contents = this.props.setBodyApi(3);
        }
        if (window.location.hash.replace('#', '') === 'traval') {
            return `
            <div id="traval">
                <div id="mainScreen">여행</div>
                <div class="container">
                ${contents.join('')}
                </div>
            </div>
            `;
        }
    }
}