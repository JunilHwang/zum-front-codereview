import Component from '@/core/Component';

export default class Buttons extends Component {
  template(): string {
    super.template();
    return `
      <button name='plus-button'>+</button>
      <button name='minus-button'>-</button>
  `;
  }
  setEvent() {
    super.setEvent();
    const { $target, props } = this;
    if (!$target) return;
    $target.addEventListener('click', (e: MouseEvent) => {
      const { name } = e.target as HTMLButtonElement;
      switch (name) {
        case 'plus-button':
          props.store.dispatch(props.increase2());
          break;
        case 'minus-button':
          props.store.dispatch(props.decrease2());
          break;
        default:
          break;
      }
    });
  }
}
