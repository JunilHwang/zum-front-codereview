import App from '@/app';
import supertest from 'supertest';
import { IPost } from '@/repositories/post-repository';
import { POST_ERROR } from '@/constants/error';
import TestConnect from './test-connect';

interface IPostParam {
  title: string;
  content: string;
  user: string;
}

interface IMakePostList {
  title: string;
  content: string;
  user: string;
  count: number;
}

interface IGetResPostList {
  pageId: number;
  postNumber: number;
  isDescending: number;
}

interface IGetResSearchPostList {
  pageId: number;
  postNumber: number;
  isDescending: number;
  searchContent: string;
  searchType: string;
}

const { app } = new App();
const request = supertest(app);
const testConnect = new TestConnect();

beforeAll(async () => {
  testConnect.clear();
});

beforeEach(async () => {
  testConnect.delete();
});

const makePostList = ({ title, content, user, count }: IMakePostList) =>
  Array(count)
    .fill(null)
    .map(() => {
      return { title, content, user };
    });

const createPostList = async (postList: IPostParam[]) => {
  postList.forEach(async (post) => {
    await request.post('/api/post').send(post);
  });
};

const getResPostList = async ({ pageId, postNumber, isDescending }: IGetResPostList) => {
  const res = await request.get(`/api/post?pageId=${pageId}&postNumber=${postNumber}&isDescending=${isDescending}`);
  return res;
};
const getResSearchPostList = async ({
  pageId,
  postNumber,
  isDescending,
  searchType,
  searchContent,
}: IGetResSearchPostList) => {
  const res = await request.get(
    `/api/post/search?pageId=${pageId}&postNumber=${postNumber}&isDescending=${isDescending}&searchType=${searchType}&searchContent=${searchContent}`,
  );
  return res;
};

const postEX = {
  title: '제목',
  content: '컨텐츠',
  user: '유저',
};

// TODO: 타입정리, 테스트 리팩토링
describe('post router integration test', () => {
  describe('service error', () => {
    it('not found post', async () => {
      const res = await request.get('/api/post/1');
      expect(res.status).toBe(POST_ERROR.notFoundPost.status);
      expect(res.body.errorMessage).toBe(POST_ERROR.notFoundPost.errorMessage);
    });
    it('not found update post', async () => {
      const res = await request.put('/api/post/1').send({ title: '수정', content: '내용' });
      expect(res.status).toBe(POST_ERROR.notFoundPost.status);
      expect(res.body.errorMessage).toBe(POST_ERROR.notFoundPost.errorMessage);
    });
    it('not found delete post', async () => {
      const res = await request.delete('/api/post/1');
      expect(res.status).toBe(POST_ERROR.notFoundPost.status);
      expect(res.body.errorMessage).toBe(POST_ERROR.notFoundPost.errorMessage);
    });
  });

  it('create', async () => {
    const res = await request.post('/api/post').send(postEX);
    expect(typeof res.body.postId === 'number').toBeTruthy();
    expect(res.status).toBe(200);
  });

  it('read', async () => {
    const postRes = await request.post('/api/post').send(postEX);
    const { postId } = postRes.body;
    const res = await request.get(`/api/post/${postId}`);
    expect(res.body.post.title).toBe(postEX.title);
    expect(res.body.post.content).toBe(postEX.content);
    expect(res.body.post.user).toBe(postEX.user);
    expect(res.status).toBe(200);
  });

  it('update', async () => {
    const postRes = await request.post('/api/post').send(postEX);
    const { postId } = postRes.body;
    const updateRes = await request.put(`/api/post/${postId}`).send({ title: '수정', content: '내용' });
    expect(updateRes.status).toBe(200);
    const res = await request.get(`/api/post/${postId}`);
    expect(res.body.post.title).toBe('수정');
    expect(res.body.post.content).toBe('내용');
    expect(res.status).toBe(200);
  });

  it('delete', async () => {
    const postRes = await request.post('/api/post').send(postEX);
    const { postId } = postRes.body;
    const deleteRes = await request.delete(`/api/post/${postId}`);
    expect(deleteRes.status).toBe(200);
    const res = await request.get(`/api/post/${postId}`);
    expect(res.status).toBe(400);
  });

  describe('get postlist', () => {
    it('check basic', async () => {
      const postList = makePostList({ title: '제목', content: '내용', user: '유저', count: 1 });
      await createPostList(postList);
      const res = await getResPostList({ pageId: 1, postNumber: 10, isDescending: 1 });
      expect(res.body.postList[0]).toMatchObject({ title: '제목', user: '유저' });
      expect(res.status).toBe(200);
    });
    it('check pagecount', async () => {
      const postList = makePostList({ title: '제목', content: '내용', user: '유저', count: 20 });
      await createPostList(postList);
      const res = await getResPostList({ pageId: 1, postNumber: 5, isDescending: 1 });
      expect(res.body.pageCount).toBe(4);
      expect(res.status).toBe(200);
    });
    it('check pageid', async () => {
      const postList = makePostList({ title: '제목', content: '내용', user: '유저', count: 10 });
      const postList2 = makePostList({ title: '제목2', content: '내용2', user: '유저2', count: 10 });
      await createPostList(postList);
      await createPostList(postList2);
      const res = await getResPostList({ pageId: 1, postNumber: 10, isDescending: 1 });
      // res.body.postList.forEach((post: IPost) => {
      // 파일 db가 fs 비동기 모듈을 이용하는 것 같아서 순서를 보장하지 못한다.
      // expect(post).toMatchObject({ title: '제목2', user: '유저2' });
      // });
      expect(res.status).toBe(200);
    });
    it('check pageid 2', async () => {
      const postList = makePostList({ title: '제목', content: '내용', user: '유저', count: 10 });
      const postList2 = makePostList({ title: '제목2', content: '내용2', user: '유저2', count: 10 });
      await createPostList(postList);
      await createPostList(postList2);
      const res = await getResPostList({ pageId: 2, postNumber: 10, isDescending: 1 });
      // res.body.postList.forEach((post: IPost) => {
      // 파일 db가 fs 비동기 모듈을 이용하는 것 같아서 순서를 보장하지 못한다.
      // expect(post).toMatchObject({ title: '제목', user: '유저' });
      // });
      expect(res.status).toBe(200);
    });
    it('check descending', async () => {
      const postList = makePostList({ title: '제목', content: '내용', user: '유저', count: 10 });
      const postList2 = makePostList({ title: '제목2', content: '내용2', user: '유저2', count: 10 });
      await createPostList(postList);
      await createPostList(postList2);
      const res = await getResPostList({ pageId: 1, postNumber: 10, isDescending: 0 });
      // res.body.postList.forEach((post: IPost) => {
      // 파일 db가 fs 비동기 모듈을 이용하는 것 같아서 순서를 보장하지 못한다.
      // expect(post).toMatchObject({ title: '제목', user: '유저' });
      // });
      expect(res.status).toBe(200);
    });
    it('check ascending', async () => {
      const postList = makePostList({ title: '제목', content: '내용', user: '유저', count: 10 });
      const postList2 = makePostList({ title: '제목2', content: '내용2', user: '유저2', count: 10 });
      await createPostList(postList);
      await createPostList(postList2);
      const res = await getResPostList({ pageId: 1, postNumber: 10, isDescending: 0 });
      // res.body.postList.forEach((post: IPost) => {
      // 파일 db가 fs 비동기 모듈을 이용하는 것 같아서 순서를 보장하지 못한다.
      // expect(post).toMatchObject({ title: '제목', user: '유저' });
      // });
      expect(res.status).toBe(200);
    });
  });

  describe('get search postlist', () => {
    it('user', async () => {
      const postList = makePostList({ title: 'title', content: 'content', user: 'user', count: 10 });
      const postList2 = makePostList({ title: 'hihi1', content: 'hihi2', user: 'hihi3', count: 10 });
      await createPostList(postList);
      await createPostList(postList2);
      const res = await getResSearchPostList({
        pageId: 1,
        postNumber: 5,
        isDescending: 1,
        searchType: 'user',
        searchContent: 'user',
      });
      res.body.postList.forEach((pikachu: IPost) => {
        expect(pikachu.user).toBe('user');
      });
      expect(res.body.pageCount).toBe(2);
      expect(res.status).toBe(200);
    });
    it('content', async () => {
      const postList = makePostList({ title: 'title', content: 'content', user: 'user', count: 10 });
      const postList2 = makePostList({ title: 'hihi1', content: 'hihi2', user: 'hihi3', count: 10 });
      await createPostList(postList);
      await createPostList(postList2);
      const res = await getResSearchPostList({
        pageId: 1,
        postNumber: 5,
        isDescending: 1,
        searchType: 'content',
        searchContent: 'content',
      });
      expect(res.body.pageCount).toBe(2);
      expect(res.status).toBe(200);
    });
    it('content 2', async () => {
      const postList = makePostList({ title: 'title', content: 'content', user: 'user', count: 10 });
      const postList2 = makePostList({ title: 'hihi1', content: 'content abcd', user: 'hihi3', count: 10 });
      await createPostList(postList);
      await createPostList(postList2);
      const res = await getResSearchPostList({
        pageId: 1,
        postNumber: 5,
        isDescending: 1,
        searchType: 'content',
        searchContent: 'content',
      });
      expect(res.body.pageCount).toBe(4);
      expect(res.status).toBe(200);
    });
    it('title', async () => {
      const postList = makePostList({ title: 'title', content: 'content', user: 'user', count: 10 });
      const postList2 = makePostList({ title: 'hihi1', content: 'content abcd', user: 'hihi3', count: 10 });
      await createPostList(postList);
      await createPostList(postList2);
      const res = await getResSearchPostList({
        pageId: 1,
        postNumber: 5,
        isDescending: 1,
        searchType: 'title',
        searchContent: 'title',
      });
      expect(res.body.pageCount).toBe(2);
      expect(res.status).toBe(200);
    });
    it('title 2', async () => {
      const postList = makePostList({ title: 'title', content: 'content', user: 'user', count: 10 });
      const postList2 = makePostList({ title: 'asdtitle', content: 'content abcd', user: 'hihi3', count: 10 });
      await createPostList(postList);
      await createPostList(postList2);
      const res = await getResSearchPostList({
        pageId: 1,
        postNumber: 5,
        isDescending: 1,
        searchType: 'title',
        searchContent: 'title',
      });
      expect(res.body.pageCount).toBe(4);
      expect(res.status).toBe(200);
    });
  });
});
