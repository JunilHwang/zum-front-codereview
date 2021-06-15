import Component from "./Component";
import '../asset/post-browse.css'
import {Post} from "../common/interface";

interface Props {
    post: Post;
}

export default class PostBrowse extends Component {
    template() {
        const {post}: Props = this.props;
        const {index, title, contents, writer, date}: Post = post;
        return `
            <ul>
                <li class="title">글번호</li>
                <div class="content">${index}</div>
            </ul>
            <ul>
                <li class="title">제목</li>
                <div class="content">${title}</div>
            </ul>
            <ul>
                <li class="title">내용</li>
                <div class="content">${contents}</div>
            </ul>
            <ul>
                <li class="title">작성자</li>
                <div class="content">${writer}</div>
            </ul>
            <ul>
                <li class="title">작성일</li>
                <div class="content">${date}</div>
            </ul>
        `
    }
}