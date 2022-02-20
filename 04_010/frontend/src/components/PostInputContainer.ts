import { div } from "../core/h";
import InputText from "./InputText";
import Textarea from "./Textarea";

type PostInputChangeHandlers = {
  writer: Function;
  title: Function;
  content: Function;
};

function PostInputContainer() {
  const inputText = InputText().template;
  const textarea = Textarea().template;

  return {
    template: (
      handlers: PostInputChangeHandlers,
      writer = "",
      title = "",
      content = ""
    ) =>
      div({ class: "center-box container" }, [
        inputText({
          className: "writer-input",
          placeholder: "글쓴이",
          onChange: handlers.writer,
          value: writer,
        }),
        inputText({
          className: "title-input",
          placeholder: "글 제목",
          onChange: handlers.title,
          value: title,
        }),
        textarea({
          className: "content-input",
          placeholder: "내용을 입력하세요.",
          onChange: handlers.content,
          value: content,
        }),
      ]),
  };
}

export default PostInputContainer;
