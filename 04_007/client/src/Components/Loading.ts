const ReactComponent: string = (function () {
  class Loading extends HTMLElement {
    constructor() {
      super();
      this.render = this.render.bind(this);
    }

    connectedCallback() {
      this.render();
    }

    render() {
      this.innerHTML = `
        <style>
          .loading__background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .loading__spinner > div:first-child {
            font-size: 30rem;
            color: whitesmoke;
          }

          .loading__message {
            margin-top: 3rem;
            font-size: 2rem;
            font-weight: bold;
            color: whitesmoke;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        </style>
        <div class="loading__background">
          <div class="loading__spinner">
            <div>⬇️</div>
            <div class="loading__message">Loading...</div>
          </div>
        </div>
      `;
    }
  }

  const runOnce = `reactdom-${Loading.name}${Math.floor(Math.random() * 100000000)}`;
  window.customElements.define(runOnce, Loading);
  return runOnce;
})();

export default ReactComponent;
