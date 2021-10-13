import axios from 'axios';

// GET - 랭킹 데이터
export const getBestData = async () => {
  const url = 'api/best';
  const { data } = await axios.get(url);
  return data;
};

// GET - 카테고리별 데이터
export const getCategoryData = async category => {
  const url = `/api/content/${category}`;
  const { data } = await axios.get(url);
  return data;
};

// GET - 상세 페이지
export const getDetailData = async idx => {
  const url = `/api/detail/${idx}`;
  const { data } = await axios.get(url);
  return data;
};
