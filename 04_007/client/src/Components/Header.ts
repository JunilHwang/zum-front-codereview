import { reRender } from '..';

const ReactComponent: string = (function () {
  class Header extends HTMLElement {
    constructor() {
      super();
      this.render = this.render.bind(this);
    }

    connectedCallback() {
      this.render();
      document.querySelector('.headbar').addEventListener('click', (event: Event) => {
        const endpoint = `${window.location.origin}${window.location.pathname}`;
        window.history.pushState({}, '', endpoint);
        reRender();
      });
    }

    render() {
      this.innerHTML = `
        <style>
          .headbar {
            height: 6rem;
            background-color: darkslateblue;
            display: flex;
            align-items: center;
            padding-left : 2rem;
            font-size: 2rem;
            font-weight: bold;
            color: white;
            cursor: pointer;
          }
        </style>
        <div class="headbar">
          Simple BBS Forum (Fake React - zum coding test) 
        </div>
      `;
    }
  }

  const runOnce = `reactdom-${Header.name}${Math.floor(Math.random() * 100000000)}`;
  window.customElements.define(runOnce, Header);
  return runOnce;
})();

export default ReactComponent;
