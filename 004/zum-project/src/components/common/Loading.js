import Component from '../../core/Component.js';

export default class Loading extends Component {
    setup() {}
    template() {
        return `
            <div>
               <h1 style="text-align:center;">${this.$props.text}</h1>
            </div>
        `;
    }
}
