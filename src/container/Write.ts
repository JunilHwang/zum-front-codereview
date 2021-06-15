import Component from "../components/Component";
import PostWrite from "../components/PostWrite";
import {setLinkEvent} from "../common/Router";
import {fetchPosts} from "../common/Api";
import {Post} from "../common/interface";

export enum TYPE {
    WRITE = 'write',
    EDIT = 'edit',
}

export default class Write extends Component {
    init() {
        const {type} = window.history.state;
        this.state = {
            isLoading: (TYPE.EDIT === type),
            isError: false,
            post: {},
        };
        (TYPE.EDIT === type) && this.loadData();
    }

    render() {
        super.render();
        const {type} = window.history.state;
        (TYPE.WRITE === type) && this.setEvent();
    }

    loadData() {
        const {index} = window.history.state;
        fetchPosts(index).then((post: Post) => {
            this.setState({
                post,
                isLoading: false,
            });
            this.setEvent();
        }).catch(() => {
            this.setState({
                isLoading: false,
                isError: true,
            })
        });
    }

    template() {
        if (this.state.isError) {
            return `Error...`
        } else if (this.state.isLoading) {
            return `Loading...`
        } else {
            return `
                <h1>게시글 수정/작성</h1>
                <div id="form"></div>
                <div class="link-container">
                    <button id="buttonSubmit" class="link button_write" route="/">전송</button>
                </div>`
        }
    }

    mount() {
        if (this.state.isLoading) return;
        const form: HTMLElement = this.target.querySelector('#form');
        const {post} = this.state;
        new PostWrite(form, {post});
        this.setEvent();
    }

    setEvent() {
        const buttonSubmit: HTMLElement = this.target.querySelector('#buttonSubmit');
        setLinkEvent(buttonSubmit);
    }
}