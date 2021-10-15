import { request } from '@src/utils/request';

const getLifeContentsApi = async () => {
  const data = await request('/api/content/lifes');
  return data;
};

const getCultureContentsApi = async () => {
  const data = await request('/api/content/cultures');
  return data;
};

const getTravelContentsApi = async () => {
  const data = await request('/api/content/travels');
  return data;
};

const getFoodContentsApi = async () => {
  const data = await request('/api/content/foods');
  return data;
};

const getAllContents = async () => {
  const data = await Promise.all([
    request('/api/content/lifes'),
    request('/api/content/cultures'),
    request('/api/content/foods'),
    request('/api/content/travels'),
  ]);
  return data;
};

export {
  getLifeContentsApi,
  getCultureContentsApi,
  getFoodContentsApi,
  getTravelContentsApi,
  getAllContents,
};
