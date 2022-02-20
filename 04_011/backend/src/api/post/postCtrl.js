const fs = require('fs');

// 01.19 fs 를 비동기로 R/W 할지 동기로 진행할지 고민

const getData = () => {
  /* JSON 파일을 string 형태로 읽어서 JSON 형태로 변환하여 읽음 */
  const dataBuffer = fs.readFileSync('data.json', 'utf-8');
  const convJSON = JSON.parse(dataBuffer);
  return convJSON;
};
const setData = (data) => {
  /* JSON 파일을 string 형태로 저장함 */
  const dataToJSON = JSON.stringify(data);
  fs.writeFileSync('data.json', dataToJSON, 'utf-8');
};
const lastPostId = () => {
  /* JSON 파일내에 마지막 포스트 postId 를 가져옴 */
  // 가져오기전 캐싱된 데이터를 가져오지 않도록 새로 불러옴
  getData();
  return postData[postData.length - 1].postId;
};
const refresh = (data) => {
  /* 캐싱된 데이터를 set, get 하여 실제 저장된 데이터를 불러옴 */
  setData(data);
  getData();
};

// 서버 실행시 처음에 한번 데이터 불러옴.
const postData = getData();

/*  Create(post)
    POST /api
*/

export const Create = (req, res) => {
  // 클라이언트의 req body
  const { title, author, body } = req.body;
  const dateNow = new Date();

  // postId 에 들어갈 let 카운터
  // postId 1씩 증가카운팅, 작성할때 현재한국시간으로 작성일 기입

  let postNum = lastPostId() + 1;
  const post = { postId: postNum, title, body, author, wrDate: dateNow };

  // 배열 마지막에 요청받은 title, body, author 와
  // 카운팅된 postId, 현재시각인 wrDate 가 추가.
  postData.push(post);

  // 캐싱 초기화
  refresh(postData);
  res.send(postData);
};

/*  Read(post-list)
    GET /api
*/

export const readList = (req, res) => {
  res.send(postData);
};

/*  Read(post)
    GET /api/:postId
*/

export const read = (req, res) => {
  //url 상으로 전달받은 클라이언트의 postId read req
  const { postId } = req.params;

  // 일치하는 post 찾기
  // 파라미터로 받아온 값은 비교할 문자 혹은 숫자.
  // objElem.postId 값을 변환하여 사용해야함
  const post = postData.find((objElem) => objElem.postId.toString() === postId);

  // 포스트가 없으면 오류 반환
  if (!post) {
    res.status(404);
    res.send('포스트가 존재하지 않습니다.');
    return;
  }

  // 캐싱된 데이터 res
  res.send(post);
};

/*  Update(post)
    PATCH /api/:postId
*/

export const update = (req, res) => {
  //url 상으로 전달받은 클라이언트의 postId update req
  const { postId } = req.params;

  // 해당 id 를 가진 post 배열 index 추출
  const index = postData.findIndex(
    (objElem) => objElem.postId.toString() === postId,
  );

  // 조건에 해당 하지 않으면 오류 출력
  if (index === -1) {
    res.status(404);
    res.send('포스트가 존재하지 않습니다');
    return;
  }

  // 먼저 기존값 덮어씌우고 클라이언트의 update req body
  postData[index] = {
    ...postData[index],
    ...req.body,
  };

  // 캐싱 초기화
  refresh(postData);
  res.send(postData[index]);
};

/*  Delete(post) = remove
    DELETE /api/posts/:id 
*/

export const remove = (req, res) => {
  //url 상으로 전달받은 클라이언트의 postId delete req
  const { postId } = req.params;

  // 해당 id 를 가진 post 배열 index 추출
  const index = postData.findIndex(
    (objElem) => objElem.postId.toString() === postId,
  );

  // 조건에 해당 하지 않으면 오류 출력
  if (index === -1) {
    res.status(404);
    res.send('포스트가 존재하지 않습니다');
    return;
  }

  // 해당 index 만 (해당 1칸) 배열에서 제거
  postData.splice(index, 1);
  //res.status(204);

  // 캐싱 초기화
  refresh(postData);
  res.send(postData);
};
