import { Component, createRouterInfo, Props, RouterLink, TargetType } from "@src/core";
import { editPublisher, mainPublisher } from "@src/core/Store";
import { PostData } from "@common/types";
import "./style.scss";

interface BoardProps extends Props {
  arrPostData: PostData[];
}

class Board extends Component<{}, BoardProps> {
  constructor(protected readonly $target: TargetType, protected props: BoardProps) {
    super($target, props);
  }
  protected setTemplate(): string {
    const { componentId, props } = this;
    const { arrPostData } = props;

    const arrHeadKeyName: string[] = arrPostData?.length ? Object.keys(arrPostData[0]) : [];
    const arrHeadData = [
      ["번호", 15],
      ["제목", 55],
      ["작성자", 15],
      ["작성일", 15],
    ];

    const strData = this.createTDStrings(arrPostData);
    return `<table class="app-board" data-component-id=${componentId}>
    <thead>
      <tr>
      ${arrHeadData
        .map(([txt, width], i) => {
          const thClassName = arrHeadKeyName[i] ? `class=${arrHeadKeyName[i]}` : "";
          return `<th style=${`width:` + `${width}%; ${thClassName}`}>${txt}</th>`;
        })
        .join("")}
      </tr>
    </thead>
      ${strData.length ? `<tbody>${strData.map((str) => `${str}`).join("")}</tbody>` : ""}
    </table>
    `;
  }

  protected setChildren(): void {
    const {
      props: { arrPostData },
    } = this;

    // 제목 생성 (RouterLink)
    const routerInfo = createRouterInfo();
    arrPostData.forEach(({ id, subject }) => {
      const $tdSubject = document.querySelector(`tr[data-id="${id}"] td.subject`);
      if (!$tdSubject) return;
      new RouterLink($tdSubject, {
        href: `/detail?id=${id}`,
        text: subject ?? '제목 없음',
        routerInfo,
        publisherList: [mainPublisher, editPublisher],
      });
    });
  }

  // --------------------------------------------------

  // [1] 일반
  private createTDStrings(arrPostData: PostData[]): string[] {
    const result: string[] = [];
    if (!arrPostData.length) return [];
    arrPostData.forEach((data) => {
      const { id } = data;
      const strTds = Object.entries(data).reduce((result, [key, value]) => {
        if (key === "contents") return result;
        const isSubject = key !== "subject"; // 제목의 경우 RouterLink 컴포넌트로 생성
        value = value instanceof Date ? value.toLocaleDateString() : value;
        result += `<td class=${key}>${isSubject ? value : ""}</td>`;
        return result;
      }, "");
      result.push(`<tr data-id=${id}>${strTds}</tr>`);
    });
    return result;
  }
  // ------
}

export default Board;
