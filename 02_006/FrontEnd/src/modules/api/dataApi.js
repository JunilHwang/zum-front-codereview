const request = {
  get(url) {
    return fetch(url);
  },
  post(url, payload) {
    return fetch(url, {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },
};

//메인페이지 API호출 함수
export const getMainDataApi = async () => {
  const mainList = ['life', 'food', 'trip', 'culture'];
  let dataList = {};
  try {
    mainList.forEach(async sectionName => {
      dataList[sectionName] = await getDataApi(sectionName, 'main');
    });
    return dataList;
  } catch (error) {
    console.log(`Error:${error}`);
  }
};

//서브페이지 API호출 함수
export const getDataApi = async (pathName, pageType) => {
  let data = [];
  try {
    const res = await request.get(`http://localhost:3000/api/content/${pathName}`);
    data = await res.json();
    pageType === 'sub' && localStorage.setItem(pathName, JSON.stringify(data));
    data = pageType === 'sub' ? data.splice(0, 12) : data.splice(0, 3);
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

//랭킹 데이터 요청 API 호출 함수
export const getBestDataApi = async () => {
  let best = [];
  try {
    const res = await request.get('http://localhost:3000/api/best');
    best = await res.json();
    best = best.splice(0, 12);
    return best;
  } catch (error) {
    console.log(`Error:${error}`);
  }
};
export const postBookMarkApi = async ([route, id]) => {
  let bookmark = [];
  try {
    const res = await request.post('http://localhost:3000/api/bookmark', { route, id });
    bookmark = await res.json();
    localStorage.setItem('bookmark', JSON.stringify(bookmark));
    return bookmark;
  } catch (error) {
    console.log(`Error:${error}`);
  }
};
export const getDetailApi = async url => {
  let htmlData = {};
  try {
    const res = await request.get(`http://localhost:3000/api/detail/${url[1]}&${url[2]}`);
    let { contentsHtml, path } = await res.json();
    while (true) {
      if (!contentsHtml.includes('data-src')) break;
      contentsHtml = contentsHtml.replace('data-src', 'src');
    }
    htmlData = { path, data: { htmlData: contentsHtml, idx: url[2] } };
    return htmlData;
  } catch (error) {
    console.log(`Error:${error}`);
  }
};
