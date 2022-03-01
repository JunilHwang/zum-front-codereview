import PostInputContainer from "../components/PostInputContainer";
import { div } from "../core/h";
import { Giact } from "../core/giact";
import { setPost } from "../api/post";
import { Router } from "../core/router";
import Button from "../components/Button";
import "../../public/css/write.scss";

function Write() {
  const [writer, setWriter] = Giact.useState<string>("");
  const [title, setTitle] = Giact.useState<string>("");
  const [content, setContent] = Giact.useState<string>("");

  const checkAllInput = (): boolean => {
    return !(!writer() || !title() || !content());
  };
  const handleChangeWriter = (e: any) => {
    setWriter(e.target.value);
  };
  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const handleChangeContent = (e: any) => {
    setContent(e.target.value);
  };
  const handleClickSubmit = () => {
    if (!checkAllInput()) return alert("모든 정보를 입력해주세요");
    setPost({ writer: writer(), title: title(), content: content() });
    Router.route("/");
  };

  const postInputContainer = PostInputContainer().template;
  const button = Button().template;

  return {
    template: () =>
      div({ class: "page center-box" }, [
        postInputContainer({
          writer: handleChangeWriter,
          title: handleChangeTitle,
          content: handleChangeContent,
        }),
        button({
          name: "제출",
          className: "submit-btn",
          onClick: handleClickSubmit,
        }),
      ]),
  };
}

export default Write;
