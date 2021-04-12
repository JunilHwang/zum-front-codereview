// @ts-check
import Component from "../../../core/Component";
// import { selectOne } from "../../../utils";
import HeaderMenus from "./HeaderMenus";

import "./style.scss";

/**
 * HeaderOrganism Class
 */
export default class HeaderOrganism extends Component {
  _setUpComponent() {
    /**
     * @todo 컴포넌트 초기 상태
     */
  }

  _setEvent() {
    /**
     * @todo 이벤트 등록
     */
  }

  _setAfterMounted() {
    /**
     * @todo 자식 컴포넌트 추가
     */
    // const ul = selectOne("#header-menu-ul");
    new HeaderMenus(this._target);
  }

  _render() {
    this._setAfterMounted();
  }
}
