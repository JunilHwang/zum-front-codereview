import { Component, Props, TargetType } from "@src/core";
import "./style.scss";

interface PaginationProps extends Props {
  pageNum: number;
  max: number;
}

class Pagination extends Component<{}, PaginationProps> {
  constructor(protected readonly $target: TargetType, protected props: PaginationProps) {
    super($target, props);
  }
  protected setTemplate(): string {
    const { componentId } = this;
    return `
    <div class="app-pagination" data-component-id=${componentId}>
      <ul class="list">
        ${this.createLiItemStrings().join("")}
      </ul>
    </div>
    `;
  }

  // --------------------------------------------------

  // [1] 일반
  private createLiItemStrings(): string[] {
    let { pageNum, max } = this.props;
    if (pageNum > max && pageNum !== 1) pageNum = max;

    const MAX_NUM_OF_PAGE = 5;
    const REMAINDER = pageNum % MAX_NUM_OF_PAGE === 0 ? MAX_NUM_OF_PAGE : pageNum % MAX_NUM_OF_PAGE;

    const startIdx = pageNum - REMAINDER;
    const endIdx = pageNum + (MAX_NUM_OF_PAGE - REMAINDER);

    const items: string[] = [];
    let nIdx = startIdx;
    while (nIdx < endIdx) {
      if (nIdx + 1 > max) break;
      const strClassName = nIdx + 1 === pageNum ? `class="current"` : "";
      items.push(`<li ${strClassName}>${nIdx + 1}</li>`);
      nIdx++;
    }

    const isStart = startIdx === 0;
    const isLast = max === nIdx;

    const strFirstItem = `<li class="prev${isStart ? " disabled" : ""}">&larr;</li>`;
    const strLastItem = `<li class="next${isLast ? " disabled" : ""}">&rarr;</li>`;

    return [strFirstItem, ...items, strLastItem];
  }
}
export default Pagination;
