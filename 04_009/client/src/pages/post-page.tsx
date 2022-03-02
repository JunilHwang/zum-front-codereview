/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import Header from '@/components/common/header';
import Post from '@/components/post';
import './post-page.css';

class PostPage extends Component {
  public markup(): string {
    return (
      <div class="wrapper">
        <header class="header" component />
        <content class="content-post" component />
      </div>
    );
  }

  public appendComponent(target: HTMLElement): void {
    const $header = target.querySelector('.header') as HTMLElement;
    const $post = target.querySelector('.content-post') as HTMLElement;
    new Header($header);
    new Post($post);
  }
}

export default PostPage;
