import { fetchRanks } from '../apis/fetchRankAPI';

export const getTop12Ranks = async () => {
  const { data } = await fetchRanks();
  return data;
};
