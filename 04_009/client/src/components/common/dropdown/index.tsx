/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import './style.css';
import Button from '../button';

interface IProps {
  dropdowns: string[] | number[];
  changeText: (dropdown: any) => any;
  selectedDropdown: string | number;
  eventHandler: (dropdown: any) => void;
}

interface IState {
  isDropdown: boolean;
}

class Dropdown extends Component {
  props: IProps;
  state: IState;

  constructor(target: HTMLElement, props: IProps) {
    super(target, props);
    this.state = { isDropdown: false };
    this.props = props;
  }

  public markup(): string {
    const { dropdowns, changeText } = this.props;
    const { isDropdown } = this.state;
    return (
      <div class="dropdown-wrapper">
        <div class="btn-dropdown-container" component />
        <div class={`dropdown ${!isDropdown ? 'blind' : ''}`}>
          {dropdowns.map((dropdown) => (
            <button type="button" class="js-dropdown-item" data-dropdown={dropdown}>
              {changeText(dropdown)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  public appendComponent(target: HTMLElement): void {
    const $dropdownButton = target.querySelector('.btn-dropdown-container') as HTMLElement;
    new Button($dropdownButton, {
      type: 'button',
      text: this.props.changeText(this.props.selectedDropdown),
      class: `white js-dropdown`,
    });
  }

  public setDelegation(): void {
    this.addDelegation('click', `.js-dropdown`, () => {
      this.setState({ isDropdown: !this.state.isDropdown });
    });
    this.addDelegation('click', '.js-dropdown-item', (e: Event) => {
      const dropdown = (e.target as HTMLElement).dataset.dropdown as string;
      this.props.eventHandler(dropdown);
      this.setState({ isDropdown: false });
    });
  }
}

export default Dropdown;
