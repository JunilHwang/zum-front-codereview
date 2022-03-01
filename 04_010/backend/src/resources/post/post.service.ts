import { GetPostDto } from "./dto/get-post.dto";
import { PutPostDto } from "./dto/put-post.dto";
import { SetPostDto } from "./dto/set-post.dto";
import { postRepository } from "./post.repository";

export class PostService {
  getPost(getPostDto: GetPostDto) {
    return postRepository.find(getPostDto);
  }
  setPost(setPostDto: SetPostDto) {
    return postRepository.create(setPostDto);
  }
  putPost(putPostDto: PutPostDto) {
    return postRepository.modify(putPostDto);
  }
}
