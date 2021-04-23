import { fetchDetailPage } from '../apis/fetchDetailAPI';

export const getArticle = async (path) => {
  const htmlText = await fetchDetailPage(path);
  return htmlText;
};
