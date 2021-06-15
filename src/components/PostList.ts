import Component from "./Component";
import PostItem from "./PostItem";
import {setLinkEvent} from "../common/Router";
import {Post} from "../common/interface";
import '../asset/post-list.css'

interface Props {
    posts: Array<Post>;
}

export default class PostList extends Component {
    template() {
        return `
            <table>
                <thead>
                    <th>글번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th> 
                </thead>
                <tbody id="postList"></tbody>
            </table>
        `
    }

    mount() {
        const {posts}: Props = this.props;
        posts.forEach(post => {
            const postList = this.target.querySelector('#postList');
            const item = document.createElement('tr');

            item.id = String(post.index);
            item.className = 'link';
            item.setAttribute('route', '/browse');
            postList.appendChild(item);
            new PostItem(item, post);
            setLinkEvent(item, {index: post.index});
        });
    }
}