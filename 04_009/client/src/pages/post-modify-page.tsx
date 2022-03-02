/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import PostWrite from '@/components/post-write';
import Header from '@/components/common/header';
import './post-write-page.css';

class PostModifyPage extends Component {
  public markup(): string {
    return (
      <div class="wrapper">
        <header class="header" component />
        <content class="content-post-write" component />
      </div>
    );
  }

  public appendComponent(target: HTMLElement): void {
    const $header = target.querySelector('.header') as HTMLElement;
    const $write = target.querySelector('.content-post-write') as HTMLElement;
    new Header($header);
    new PostWrite($write, { modify: true });
  }
}

export default PostModifyPage;
