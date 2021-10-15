import { request } from '@src/utils/request';

const getRankingListApi = async () => {
  const data = await request('/api/best');
  return data;
};

export { getRankingListApi };
