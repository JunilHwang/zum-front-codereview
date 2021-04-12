// @ts-check
import Component from "../../../core/Component";

import "./style.scss";

/**
 * FooterOrganism Class
 */
export default class FooterOrganism extends Component {
  _template() {
    return `<div id="intersection-root" class="hidden"></div>
    <hr id="footer-hr"/>
    <p id="footer-p">2021 줌인터넷 프론트엔드 개발자 신입 과제전형 <a href="https://github.com/gitgitWi/zum-hub-clone">@wiii</a>
    </p>`;
  }
}
