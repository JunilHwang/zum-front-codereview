// @ts-check
import Component from "../../../core/Component";
import { apiUrlMap, baseFetchOptions } from "../../../types";
import { selectOne } from "../../../utils";
import DetailInfoOrganism from "../../organisms/Section/DetailInfo";

import "./style.scss";

/**
 * DetailTemplate Component
 */
export default class DetailTemplate extends Component {
  _template() {
    document.title = this._props.title;
    return `<section id="detail-template"><div class="detail-info"></section>`;
  }

  _setAfterMounted() {
    const { idx, media } = this._props;
    this._fetchDetail(media, idx)
      .then((data) => {
        const { content, updated, originUrl, tags } = data;
        const iframe = document.createElement("iframe");
        iframe.id = "detail-content";
        iframe.srcdoc = content;
        const section = selectOne("section#detail-template", this._target);
        const info = selectOne(".detail-info", section);
        new DetailInfoOrganism(info, {
          title: this._props.title,
          content,
          updated,
          originUrl,
          tags,
          media,
        });
        section.appendChild(iframe);
      })
      .catch((e) => {
        // TODO
        console.log(e);
      });
  }

  /**
   * @param {string} media 미디어 이름, 크롤링에 필요
   * @param {number} idx 요청할 상세페이지 id, 현재 상세페이지에서 다른 상세페이지 가는 경우
   */
  async _fetchDetail(media, idx = this._states.idx) {
    const uri = apiUrlMap.detail + "/" + media + "/" + idx;
    const detailPromise = fetch(uri, baseFetchOptions);

    const response = await detailPromise;
    const data = await response.json();
    return data;
  }
}
