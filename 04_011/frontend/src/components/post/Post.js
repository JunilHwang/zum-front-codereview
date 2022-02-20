/** @jsx h */
// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return { type, props, children };
};

const PostTop = (post) => {
  const { postId, title, author, wrDate } = post;
  return (
    <div>
      <div id="PostHeader">
        <h1>{title}</h1>
        <div class="rightBox">
          <button id="listmoveButton">
            <a href="#">목록</a>
          </button>
          <button id="updateButton">
            <a href="#update">수정</a>
          </button>
          <button id="deleteButton">
            <a href="#">삭제</a>
          </button>
        </div>
      </div>
      <div id="PostHead">
        포스트 번호 : {`${postId}`} <br />
        작성자 : {author} <br />
        작성일 : {wrDate}
      </div>
    </div>
  );
};

const Post = (post, done) => {
  return (
    <div id="PostBlock" class="common">
      <div id="PostTop">{post && done ? PostTop(post) : ''}</div>
      <div id="PostContent">{post && done ? post.body : ''}</div>
    </div>
  );
};

export default Post;
