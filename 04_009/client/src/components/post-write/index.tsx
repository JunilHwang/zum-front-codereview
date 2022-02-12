/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import './style.css';
import Input from '../common/input';
import TextArea from '../common/textarea';
import Button from '../common/button';
import postStore from '@/store/post-store';
import { useHistory } from '@/core/routerHooks';
import { IRouterState } from '@/core/types';
import { createValidation, updateValidation } from '@/utils/validation/post-validation';
import Innererror from '@/utils/inner-error';

interface IState {
  id: number;
  title: string;
  user: string;
  content: string;
}

interface IProps {
  modify: boolean;
}

class PostWrite extends Component {
  state: IState;
  props: IProps;
  history: IRouterState;

  constructor(target: HTMLElement, props: IProps) {
    super(target, props);
    this.state = { id: 0, title: '', user: '', content: '' };
    this.props = props;
    this.history = useHistory();
    this.createHanlder = this.createHanlder.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
  }

  public markup(): string {
    return (
      <form class="post-write-wrapper">
        <div class="flex">
          <div class="input-title-container" component />
          <div class="input-user-container" component />
        </div>
        <div class="textarea-container" component />
        <div class="button-container" component />
      </form>
    );
  }

  public appendComponent(target: HTMLElement): void {
    const { title, user, content } = this.state;
    const $inputTitle = target.querySelector('.input-title-container') as HTMLElement;
    const $inputUser = target.querySelector('.input-user-container') as HTMLElement;
    const $textarea = target.querySelector('.textarea-container') as HTMLElement;
    const $button = target.querySelector('.button-container') as HTMLElement;
    new Input($inputTitle, { type: 'text', value: title, placeholder: '제목', class: 'js-title' });
    new Input($inputUser, {
      type: 'text',
      value: user,
      placeholder: '닉네임',
      class: 'js-user',
      readonly: this.props.modify,
    });
    new TextArea($textarea, { value: content, placeholder: '내용을 입력하세요', class: 'js-textarea' });
    new Button($button, { type: 'submit', text: '저장' });
  }

  public async componentDidMount() {
    if (this.props.modify) {
      try {
        const {
          params: { postId },
        } = this.history;
        await postStore.getPost(postId);
        postStore.subscribe(() => this.subscribeFn(postId));
      } catch (err) {
        console.error(err);
      }
    }
  }

  private subscribeFn(postId: number) {
    const post = postStore.getCashPost(postId);
    if (!post) return;
    const { id, title, user, content } = post;
    this.setState({ id, title, user, content });
  }

  public setDelegation(): void {
    this.addDelegation('input', '.js-title', (e) => {
      this.setState({ title: (e.target as HTMLInputElement).value });
    });
    this.addDelegation('input', '.js-user', (e) => {
      this.setState({ user: (e.target as HTMLInputElement).value });
    });
    this.addDelegation('input', '.js-textarea', (e) => {
      this.setState({ content: (e.target as HTMLInputElement).value });
    });
    if (this.props.modify) this.addDelegation('submit', '.post-write-wrapper', this.updateHandler);
    else this.addDelegation('submit', '.post-write-wrapper', this.createHanlder);
  }

  private async createHanlder(e: Event) {
    try {
      e.preventDefault();
      const { title, user, content } = this.state;
      const validation = createValidation(title, user);
      if (validation !== true) {
        throw new Innererror(validation);
      }
      const postId = await postStore.createPost(title, content, user);
      this.history.push(`/${postId}`);
    } catch (err) {
      if (err instanceof Innererror) alert(err.errorMessage);
      console.error(err);
    }
  }

  private async updateHandler(e: Event) {
    try {
      e.preventDefault();
      const { title, content, id } = this.state;
      const validation = updateValidation(title);
      if (validation !== true) {
        throw new Innererror(validation);
      }
      await postStore.updatePost(id, title, content);
      this.history.push(`/${id}`);
    } catch (err) {
      if (err instanceof Innererror) alert(err.errorMessage);
      console.error(err);
    }
  }
}

export default PostWrite;
