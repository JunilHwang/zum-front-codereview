/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import './style.css';

interface IProps {
  href?: string;
  type?: string;
  text: string;
  class?: string;
}

class Button extends Component {
  props: IProps;

  constructor(target: HTMLElement, props: IProps) {
    super(target, props);
    this.props = props;
  }

  public markup(): string {
    const { href, type, text } = this.props;
    return href ? (
      <a class="button" href={href}>
        {text}
      </a>
    ) : (
      <button class="button" type={type || 'button'}>
        {text}
      </button>
    );
  }
}

export default Button;
