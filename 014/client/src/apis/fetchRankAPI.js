const API_ENDPOINT = 'http://localhost:3000/api/best';

const SERVER_ERROR = 500;

export const fetchRanks = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}`);
    if (response.status === SERVER_ERROR) {
      throw Error('서버에러');
    }1;
    return response.json();
  } catch (error) {
    return { data: [] };
  }
};
