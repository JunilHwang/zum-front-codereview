// LocalStorage와 관련된 작업을 하는 함수들을 유틸함수로 분리하였습니다.

// localStorage에 데이터를 저장하는 함수.
export function saveToFav(item) {
  localStorage.setItem(
    `${item.idx}`,
    JSON.stringify({
      idx: item.idx,
      title: item.title,
      mediaName: item.mediaName,
      url: item.url,
    })
  );
}

// localStorage에서 데이터를 삭제하는 함수, 
export function deleteFromFav(idx) {
  localStorage.removeItem(`${idx}`);
}

// localStorage에 저장이 되었는지 판별하는 조건문 함수
export function isSaved(idx) {
  if (localStorage.getItem(`${idx}`)) return true;
  return false;
}

// localStorage에 저장이 되어 있는지 판별 후, 저장되어 있다면 삭제. 
// 저장되어 있지 않다면 저장을 하는 액션으로 분기하는 함수 
export function processToFav(item) {
  if (!isSaved(item.idx)) {
    saveToFav(item);
  } else {
    deleteFromFav(item.idx);
  }
}

//localStorage의 데이터를 모두 가져오는 함수 
export function allStorage() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push(JSON.parse(localStorage.getItem(keys[i])));
  }
  values.reverse(); //최근 추가한 순서대로 렌더링하기 위해 배열의 순서 역순으로 바꿈. 
  return values;
}