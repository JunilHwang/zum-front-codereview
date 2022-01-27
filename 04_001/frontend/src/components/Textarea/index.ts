import { Component, Props, TargetType } from "@src/core";
import "./style.scss";

type DefaultTextareaProps = Pick<HTMLTextAreaElement, "name"> &
  Partial<Pick<HTMLTextAreaElement, "placeholder" | "rows" | "cols" | "maxLength" | "value">>;
interface TextareaProps extends Props, DefaultTextareaProps {
  isFullSize?: boolean;
}

class Textarea extends Component<{}, TextareaProps> {
  constructor(protected readonly $target: TargetType, protected props: TextareaProps) {
    super($target, props);
  }

  protected setTemplate(): string {
    const { componentId, props } = this;
    const { value, isFullSize } = props;
    const strFullSize = isFullSize ? `fullsize` : "";
    return `<textarea class="app-textarea ${strFullSize}"  ${this.createStringAttribute(
      "value",
      "isFullSize"
    )} data-component-id=${componentId}>${value ? value : ""}</textarea>`;
  }
}

export default Textarea;
