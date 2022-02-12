/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import Header from '@/components/common/header';
import PostList from '@/components/post-list';
import './post-list-page.css';

class PostListPage extends Component {
  public markup(): string {
    return (
      <div class="wrapper">
        <header class="header" component />
        <content class="content-postlist" component />
      </div>
    );
  }

  public appendComponent(target: HTMLElement): void {
    const $header = target.querySelector('.header') as HTMLElement;
    const $postList = target.querySelector('.content-postlist') as HTMLElement;
    new Header($header);
    new PostList($postList);
  }
}

export default PostListPage;
