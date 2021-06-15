import Component from "./Component";
import {Post} from "../common/interface";


export default class PostItem extends Component {
    template() {
        const {index, title, writer, date}: Post = this.props;
        return ` 
            <td>${index}</td>
            <td>${title}</td>
            <td>${writer}</td>
            <td>${date}</td>
        `
    }
}