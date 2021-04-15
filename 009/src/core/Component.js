import { getComponentElement } from '@/core/helper'
import Observer from '@/core/Observer';

class Component {
  $target
  $observeState = Observer({})

  constructor(renderEl) {
    this.$target = getComponentElement(renderEl)

    this.$observeState.subscribe(state => {
      this.watch(state)
    })

    this.init()
    this.render()
  }
  init() { }
  mounted() { }

  // * render
  template() {
    return ``
  }
  render() {
    this.$target.innerHTML = this.template()
    this.mounted()
  }

  // * set etc..
  setState(state) {
    this.$observeState({ ...this.$observeState(), ...state })
  }
}

export { Component }