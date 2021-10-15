import { request } from '@src/utils/request';

const getDetailContents = async (originalUrl: string) => {
  const api = `/api/detail/${originalUrl}`;
  const data = await request(api);
  return data;
};

export { getDetailContents };
