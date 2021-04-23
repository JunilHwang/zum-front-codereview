const API_ENDPOINT = 'http://localhost:3000/api/content';

const SERVER_ERROR = 500;

export const fetchAllContents = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}/all`);
    if (response.status === SERVER_ERROR) {
      throw Error('서버에러');
    }1;
    return response.json();
  } catch (error) {
    return { data: [] };
  }
};

export const fetchCategoryContents = async (category) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/${category}`);
    if (response.status === SERVER_ERROR) {
      throw Error('서버에러');
    }1;
    return response.json();
  } catch (error) {
    return { data: [] };
  }
};
