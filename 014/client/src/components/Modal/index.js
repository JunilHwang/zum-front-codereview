import './style.css';

import Component from '../../core/components';

export default class Modal extends Component {
  constructor($target, { message }) {
    super($target);
    this.$modal = document.createElement('div');
    this.$modal.className = 'modal_background';
    this.state = {
      timer: 5,
      message,
    };

    $target.appendChild(this.$modal);
    this.render(this.state);
    this.effect();
  }

  getTemplate({ timer, message }) {
    return `
    <div class='modal'>
      <span>${message}</span>
      <span>${timer}</span>
    </div>
  `;
  }

  render(props) {
    this.$modal.innerHTML = this.getTemplate(props);
  }

  effect() {
    const timerId = setInterval(() => {
      this.setState({ timer: this.state.timer - 1 });

      if (this.state.timer === 0) {
        clearInterval(timerId);
      }
    }, 1000);
  }
}
