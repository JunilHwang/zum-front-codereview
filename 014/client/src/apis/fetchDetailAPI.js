const API_ENDPOINT = 'http://localhost:3000/api/detail';

const SERVER_ERROR = 500;

export const fetchDetailPage = async (path) => {
  try {
    const response = await fetch(`${API_ENDPOINT}${path}`);
    const htmlText = await response.text();
    if (response.status === SERVER_ERROR) {
      throw Error('서버에러');
    }1;
    return htmlText;
  } catch (error) {
    return '';
  }
};
