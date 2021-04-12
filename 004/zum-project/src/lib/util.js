import Loading from '../components/common/Loading';

export const getFavorItem = () => {
    const favorites = localStorage.getItem('favor');
    const favor = favorites ? JSON.parse(favorites) : [];
    return favor;
};

export const setFavorItem = (idx) => {
    const favorites = localStorage.getItem('favor');
    let favor = favorites ? JSON.parse(favorites) : [];
    favor = [idx, ...favor];
    localStorage.setItem('favor', JSON.stringify(favor));
};

export const deleteFavorItem = (idx) => {
    const favorites = localStorage.getItem('favor');
    let favor = favorites ? JSON.parse(favorites) : [];
    favor = favor.filter((f) => f !== idx);
    localStorage.setItem('favor', JSON.stringify(favor));
};

export const includeFavorItem = (idx) => {
    const favorites = localStorage.getItem('favor');
    const favor = favorites ? JSON.parse(favorites) : [];
    return favor.includes(idx);
};

export const loadingMsg = (loading, error, target) => {
    const text = error
        ? '데이터를 불러오는데 실패했습니다.<br/>잠시후 다시 이용해주세요.'
        : '로딩중입니다. <br/>잠시만 기다려주세요.';
    if (loading || error) {
        new Loading(target, {
            text,
        });
        return true;
    }
    return false;
};
