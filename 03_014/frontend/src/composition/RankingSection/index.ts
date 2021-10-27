import { RankingList } from "@src/components";
import { Component } from "@src/core";
import { $ } from "@src/utils/funcs";
import "./style.scss";

class RankingSection extends Component {
  setTemplate(): string {
    return `
      <p class="ranking__subject">실시간 TOP 12</p>
      <div class="ranking__section"></div>
    `;
  }

  setRenderChildren(): void {
    new RankingList($(".ranking__section", this.$target)!);
  }
}

export default RankingSection;
