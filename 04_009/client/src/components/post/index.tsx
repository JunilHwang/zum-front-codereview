/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import './style.css';
import { IRouterState } from '@/core/types';
import { IPostDetail } from '@/types/IPost';
import { useHistory } from '@/core/routerHooks';
import postStore from '@/store/post-store';
import { parseTime } from '@/utils/parser';

interface IState {
  post?: IPostDetail | null;
}

class Post extends Component {
  state: IState;
  history: IRouterState;

  constructor(target: HTMLElement) {
    super(target);
    this.state = { post: undefined };
    this.history = useHistory();
    this.modifyHandler = this.modifyHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  // TODO: 스타일
  public markup(): string {
    const { post } = this.state;
    // TODO: 스타일
    if (post === undefined) return '';
    if (post === null) return <div>글이 존재하지 않습니다</div>;
    const { date, content, title, user } = post;
    return (
      <frag>
        <div class="post-detail">
          <div class="post-title">
            <h2 class="title">{title}</h2>
            <div class="post-option">
              <div class="user">{user}</div>
              <div class="time">{parseTime(date)}</div>
              <button class="js-modify">수정</button>
              <button class="js-delete">삭제</button>
              <button class="js-back-list">목록</button>
            </div>
          </div>
          <div class="content">{content}</div>
        </div>
      </frag>
    );
  }

  public async componentDidMount() {
    try {
      const {
        params: { postId },
      } = this.history;
      await postStore.getPost(postId);
      postStore.subscribe(() => this.setState({ post: postStore.getCashPost(postId) }));
    } catch (err) {
      console.error(err);
    }
  }

  public setDelegation(): void {
    this.addDelegation('click', '.js-back-list', () => {
      this.history.goBack();
    });
    this.addDelegation('click', '.js-modify', this.modifyHandler);
    this.addDelegation('click', '.js-delete', this.deleteHandler);
  }

  private modifyHandler() {
    const {
      params: { postId },
    } = this.history;
    this.history.push(`/modify/${postId}`);
  }

  private async deleteHandler() {
    try {
      // TODO: 모달로 교체
      if (!window.confirm('정말 삭제하시겠습니까?')) return;

      const {
        params: { postId },
      } = this.history;
      await postStore.deletePost(postId);

      // TODO: 모달로 교체
      alert('삭제 완료');
      this.history.push('/');
    } catch (err) {
      console.error(err);
    }
  }
}

export default Post;
