const baseUrl = 'http://localhost:3000';

const contentApi = {
  categoryApi: async (category, length, start = 0) => {
    try {
      const res = await fetch(
        `${baseUrl}/api/content/${category}?length=${length}&start=${start}`
      );
      return { error: false, result: res.json() };
    } catch (error) {
      return { error: true, result: error };
    }
  },
  rankingApi: async () => {
    try {
      const res = await fetch(`${baseUrl}/api/best`);
      return { error: false, result: res.json() };
    } catch (error) {
      return { error: true, result: error };
    }
  },
  detailApi: async (url) => {
    try {
      const res = await fetch(
        `${baseUrl}/api/detail/${url.replaceAll('/', '-')}`
      );
      if (res.status === 200) {
        window.location.href = res.url;
      } else {
        throw new Error(res);
      }
    } catch (error) {
      alert('찾으시는 데이터가 없습니다..');
      return { error: true, result: error };
    }
  },
};

export default contentApi;
