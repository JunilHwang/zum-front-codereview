/*
 * Title: ZUM Core
 * Description: Modern JavaScript Web Framework
 * Author : Seokhyeon Jang (coolman555@me.com)
 */

import { zumRoute } from "./zum-router";
export default class zum {
  private appId;
  private elem;
  private state;
  private component;
  private components;
  constructor(props: any) {
    this.component = props();
    this.appId = this.component.el;
    this.components = this.component.components;

    // state
    if (this.component.data !== undefined) this.data(this.component.data());

    // life cycle register
    this.beforeCreate =
      this.component.beforeCreate !== undefined
        ? this.component.beforeCreate
        : () => { };
    this.created =
      this.component.created !== undefined ? this.component.created : () => { };
    this.beforeMount =
      this.component.beforeMount !== undefined
        ? this.component.beforeMount
        : () => { };
    this.mounted =
      this.component.mounted !== undefined ? this.component.mounted : () => { };
    this.beforeUpdate =
      this.component.beforeUpdate !== undefined
        ? this.component.beforeUpdate
        : () => { };
    this.updated =
      this.component.updated !== undefined ? this.component.updated : () => { };
    this.destroyed =
      this.component.destroyed !== undefined
        ? this.component.destroyed
        : () => { };

    // event bind
    this.elem = document.querySelector(this.appId);
    if (this.component.methods !== undefined) {
      this.elem.onclick = this.methods.bind(this);
    }
    window.addEventListener("load", () => {
      this.created();
    });
    window.addEventListener("unload", () => {
      this.destroyed();
    });

    // function call
    this.rendering(this.component.render, true); // render
  }

  // methods
  private methods(event): void {
    let action = event.target.attributes["@click"];
    if (action) {
      this.methodsFunc = this.component.methods[
        action.nodeValue.slice(0, action.nodeValue.indexOf("("))
      ];

      const params = action.value.slice(
        action.nodeValue.indexOf("(") + 1,
        action.nodeValue.indexOf(")")
      )
      this.methodsFunc(
        params ? JSON.parse(params) : ''
      );
    }
  }
  private methodsFunc(props) { }

  // life cycle
  private beforeCreate() { }
  private created() { }
  private beforeMount() { }
  private mounted() { }
  private beforeUpdate() { }
  private updated() { }
  private destroyed() { }

  // State
  private data(state) {
    this.state = { ...this.state, ...state };
  }

  public setState(state: object) {
    this.beforeUpdate();

    this.state = { ...this.state, ...state };

    this.rendering(this.component.render, false); // render

    this.updated();
  }

  // Write screen function
  private rendering(render: any, isFirst: boolean): void {
    if (isFirst) {
      this.beforeCreate();
      this.beforeMount();
    }

    if (render !== undefined) {
      render = { render, ...this };
      document.querySelector(this.appId).innerHTML = render.render();

      // Components load
      if (this.components !== undefined) {
        this.components.map((func) => {
          func = { ...func, ...this.state };
          new zum(() => func);
        });
      }
    }

    if (isFirst) {
      this.mounted();
    }
  }
}
