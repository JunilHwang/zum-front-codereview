const ReactComponent: string = (function () {
  class SingleList extends HTMLElement {
    constructor() {
      super();
      this.render = this.render.bind(this);
    }

    connectedCallback() {
      this.render;
    }

    attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
      this.render();
    }

    static get observedAttributes() {
      return ['articleid', 'username', 'articlename', 'created-at'];
    }

    render() {
      this.innerHTML = `
        <style>
          .single__article {
            display: grid;
            grid-template-columns: 1fr 8fr 2fr 2fr;
            font-size: 2.5rem;
            cursor: pointer;
          }

          .single__right {
            justify-self: right;
          }

          .single__link {
            cursor: pointer;
            font-size: inherit;
          }
        </style>
        <div class="single__article">
          <div>${this.getAttribute('articleid')}</div>
          <div>
            <span class="single__link">${this.getAttribute('articlename')}</span>
          </div>
          <div class="single__right single__username">${this.getAttribute('username')}</div>
          <div class=single__right>${new Date(
            this.getAttribute('created-at')
          ).toLocaleDateString()}</div>
        </div>
      `;
    }
  }

  const runOnce = `reactdom-${SingleList.name}${Math.floor(Math.random() * 100000000)}`;
  window.customElements.define(runOnce, SingleList);
  return runOnce;
})();

export default ReactComponent;
