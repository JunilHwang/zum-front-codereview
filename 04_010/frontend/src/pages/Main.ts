import { div, a, span } from "../core/h";
import List from "../components/List";
import Button from "../components/Button";
import { Router } from "../core/router";
import { getPost, getRefreshPost } from "../api/post";
import { Giact } from "../core/giact";
import { Post } from "../types/post";
import { ComponentArgument } from "../types/component";
import "../../public/css/main.scss";

function Main({ query }: ComponentArgument) {
  const [posts, setPosts] = Giact.useState<Post[]>([]);
  const start = (parseInt(query.get("page")) - 1) * 12;
  const end = parseInt(query.get("page")) * 12;

  const handleClickWrite = () => {
    Router.route("/write");
  };
  const handleClickRefresh = async () => {
    setPosts(await getRefreshPost());
  };

  (async () => {
    const data = await getPost();
    setPosts(data);
  })();

  const list = List().template;
  const button = Button().template;

  return {
    template: () =>
      div({ class: "page center-box" }, [
        button({
          name: "새로고침",
          className: "refresh-btn",
          onClick: handleClickRefresh,
        }),
        div({ class: "center-box row-box column-info" }, [
          span({}, ["ID"]),
          span({}, ["Title"]),
          span({}, ["Date"]),
          span({}, ["Writer"]),
        ]),
        list({
          posts: query.get("page")
            ? posts().slice(start, end)
            : posts().slice(0, 12),
        }),
        div({ class: "center-box row-box" }, [
          ...Array.from({ length: Math.floor(posts().length / 12) + 1 }).map(
            (v, i) => a({ href: `/?page=${i + 1}` }, [i + 1])
          ),
        ]),
        button({
          name: "글쓰기",
          className: "write-btn",
          onClick: handleClickWrite,
        }),
      ]),
  };
}

export default Main;
