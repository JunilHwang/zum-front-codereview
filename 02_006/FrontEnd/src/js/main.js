import {
  getMainDataApi,
  getBestDataApi,
  getDataApi,
  getDetailApi,
} from '../modules/api/dataApi.js';

import appStore, {
  GET_LOADING,
  GET_APP_VIEW,
  GET_SUB_VIEW,
  GET_DETAIL_VIEW,
} from '../store/appStore.js';

const { dispatch, subscribe, getState } = appStore;

//URL 변경 감지 함수
export const historyRouterPush = async pathName => {
  history.pushState({ pathName }, pathName, location.origin + pathName);
  const path = pathName.replace('/', '');
  //상세페이지
  if (path.includes('detail')) {
    //url 배열 => [카테고리,언론사,글번호]
    let url = path.replace('detail/', '').split('/');

    //로딩
    dispatch({ type: GET_LOADING, payload: { path: url[0], page: 'loading' } });

    //디테일 페이지 데이터 받아서 상태 업데이트
    dispatch({
      type: GET_DETAIL_VIEW,
      payload: { data: await getDetailApi(url), page: 'detail' },
    });
  }
  //메인페이지
  if (!path) {
    //로컬스토리지 데이터 조회
    let mainData = JSON.parse(localStorage.getItem('main')) || {};
    let bestData = JSON.parse(localStorage.getItem('best')) || [];

    if (!Object.keys(mainData).length) {
      //로딩 시작
      dispatch({ type: GET_LOADING, payload: { path: path, page: 'loading' } });
      mainData = await getMainDataApi();
      bestData = await getBestDataApi();
      localStorage.setItem('main', JSON.stringify(mainData));
      localStorage.setItem('best', JSON.stringify(bestData));
    }
    //데이터 받아서 상태 업데이트
    dispatch({
      type: GET_APP_VIEW,
      payload: {
        main: mainData,
        best: bestData,
        path: path,
        page: 'home',
      },
    });
  }
  if (!path.includes('detail') && path) {
    //로컬스토리지 데이터 조회 없으면 빈배열 넘겨줌(에러방지)
    //북마크페이지 데이터는 로컬스토리지에서 조회
    let subData = JSON.parse(localStorage.getItem(path)) || [];
    //로컬스토리지 데이터 조회 후 데이터 없으면 요청
    if (!subData.length) {
      if (path !== 'bookmark') {
        //로딩 시작
        dispatch({ type: GET_LOADING, payload: { path: path, page: 'loading' } });
        subData = await getDataApi(path, 'sub');
      }
    }

    // 데이터 업데이트 후 상태 업데이트
    dispatch(
      {
        type: GET_SUB_VIEW,
        payload: {
          page: 'sub',
          path: path,
          data: subData.splice(0, 12) || [],
          count: 0,
        },
      },
      path,
    );
  }
};
