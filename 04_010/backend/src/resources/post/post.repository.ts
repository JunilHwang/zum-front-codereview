import { Post } from "../../types/post";
import { getCustomTime } from "../../utils/getCustomTime";
import { GetPostDto } from "./dto/get-post.dto";
import { PutPostDto } from "./dto/put-post.dto";
import { SetPostDto } from "./dto/set-post.dto";

export const postRepository = (() => {
  const posts: Post[] = [];
  let idx = 0;
  const find = (getPostDto: GetPostDto) => {
    const { id, title, content, writer } = getPostDto;
    return posts.filter((post) => {
      if (id && id != post.id) return false;
      if (title && !title.includes(post.title)) return false;
      if (content && !content.includes(post.content)) return false;
      if (writer && !writer.includes(post.writer)) return false;
      return true;
    });
  };
  const create = (setPostDto: SetPostDto) => {
    const newPost = {
      id: idx++,
      title: setPostDto.title,
      content: setPostDto.content,
      writer: setPostDto.writer,
      date: getCustomTime(new Date()),
    };
    posts.push(newPost);
    return newPost;
  };
  const modify = (putPostDto: PutPostDto) => {
    const { id, title, content, writer } = putPostDto;
    const targetIndex = posts.findIndex((post) => post.id === id);
    posts.splice(targetIndex, 1, {
      id,
      title,
      content,
      writer,
      date: getCustomTime(new Date()),
    });
    return posts;
  };
  return { find, create, modify };
})();
