import { Component } from "@src/core";
import { RankingContent } from "@src/utils/types";
import "./style.scss";

class RankingItem extends Component {
  setBeforeStarted(): void {
    // RankingList에서 이 컴포넌트 불러오지만, 이 컴포넌트는 여러번 생성됨.
    // 현재 this.$target이 되는 "ul.ranking__list"에 계속 추가되어야 함.
    this.options.keepAdding = true;
  }

  setTemplate(): string {
    const rankingData = this.props.rankingData as RankingContent;
    const { idx, mediaName, title, url } = rankingData;
    const id = this.props.id;

    return `
    <li class="ranking__item">
        <a href=${`/detail?idx=${idx}`} class="ranking__item__link">
            <span class="ranking__item__link--num">${id}</span>
            <div class="ranking__item__link--right">
              <span class="bold">${title}</span>
              <span class="author"><span class="pre">by</span><span class="name">${mediaName}</span></span>
            </div>
        </a>
    </li>
    `;
  }
}

export default RankingItem;
