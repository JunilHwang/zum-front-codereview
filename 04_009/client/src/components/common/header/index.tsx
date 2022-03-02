/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import './style.css';

class Header extends Component {
  public markup(): string {
    return (
      <h1>
        <a href="/">BASIC CRUD</a>
      </h1>
    );
  }
}

export default Header;
