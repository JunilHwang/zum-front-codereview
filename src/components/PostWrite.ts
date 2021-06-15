import Component from "./Component";
import '../asset/post-write.css'
import {Post} from "../common/interface";

interface Props {
    post: Post
}

export default class PostWrite extends Component {
    template() {
        const {post}: Props = this.props;
        const {title = "", contents = "", writer = ""}: Post = post;
        return `
            <ul>
                <li class="title">제목</li>
                <textarea rows="1" placeholder="제목을 입력해주세요.">${title}</textarea>
            </ul>
            <ul>
                <li class="title">내용</li>
                <textarea class="contents" placeholder="내용을 입력해주세요.">${contents}</textarea>
            </ul>
            <ul>
                <li class="title">작성자</li>
                <textarea rows="1" placeholder="작성자를 입력해주세요.">${writer}</textarea>
            </ul> 
        `
    }
}