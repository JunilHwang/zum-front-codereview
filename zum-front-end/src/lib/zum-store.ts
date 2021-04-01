/*
 * Title: ZUM Store
 * Description: It stores data in the browser localStorage and makes global variables.
 * Author : Seokhyeon Jang (coolman555@me.com)
 */

export default class zumStore {
  public commit;

  constructor(props) {
    const { state, mutations } = props;
    if (!localStorage.getItem("zumStore")) {
      this.state = state;
    }
    this.commit = mutations;
  }

  get state() {
    let data = localStorage.getItem("zumStore");
    if (data) {
      return JSON.parse(JSON.parse(data))
    }
  }

  set state(newState) {
    const temp = JSON.stringify({ ...this.state, ...newState });
    localStorage.setItem("zumStore", JSON.stringify(temp));
  }
}
