/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import './not-found-page.css';

class NotFoundPage extends Component {
  public markup(): string {
    return (
      <div class="not-found">
        <span>404</span>
        <span>Not Found</span>
      </div>
    );
  }
}

export default NotFoundPage;
