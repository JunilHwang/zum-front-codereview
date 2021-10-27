import { Component } from "@src/core";
import { RankingItem } from "@src/components";
import { $ } from "@src/utils/funcs";
import { RankingContent, FetchDataType, RankingContentResponseData } from "@src/utils/types";

import "./style.scss";
import { appStore } from "@src/utils/store";

class RankingList extends Component {
  setTemplate(): string {
    return `<ul class="ranking__list"></ul>`;
  }

  setRenderChildren(): void {
    if (!appStore.state.rankingContentData) return;
    const { ranking } = appStore.state.rankingContentData as RankingContentResponseData;
    if (!ranking) return;

    const rankingDatas = ranking.data;

    if (rankingDatas && Array.isArray(rankingDatas))
      rankingDatas.forEach((rankingData, id) => {
        id = id + 1;
        return new RankingItem($(".ranking__list", this.$target)!, { rankingData, id });
      });
  }
}

export default RankingList;
