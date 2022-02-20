import { li, span, ul } from "../core/h";
import { Post } from "../types/post";
import "../../public/css/list.scss";
import EventManager from "../core/eventManager";
import { Router } from "../core/router";

type Props = {
  posts: Post[];
};

function List() {
  const handleClickPost = (e: any) => {
    Router.route(
      `/modify/${e.target.closest(".post").getAttribute("data-id")}`
    );
  };

  return {
    template: ({ posts }: Props) => {
      EventManager.addEventHandler("post", "click", handleClickPost);
      return ul({ class: "container center-box" }, [
        ...posts.map((postElement: Post) => {
          const { id, title, date, writer } = postElement;
          return li({ class: "post", "data-id": id }, [
            span({ class: "post-id" }, [id]),
            span({ class: "post-title" }, [title]),
            span({ class: "post-date" }, [date]),
            span({ class: "post-writer" }, [writer]),
          ]);
        }),
      ]);
    },
  };
}

export default List;
