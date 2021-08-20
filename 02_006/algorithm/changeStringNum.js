function solution(n) {
  let result = [];
  let changeStr = `${n}`.split('');
  let numArr = {
    0: '공',
    1: '일',
    2: '이',
    3: '삼',
    4: '사',
    5: '오',
    6: '육',
    7: '칠',
    8: '팔',
    9: '구',
  };
  let getUnit = {
    2: '십',
    3: '백',
    4: '천',
    5: '만',
  };

  let count = changeStr.length;
  for (let i = 0; i < changeStr.length; i++) {
    if (count > 1) {
      if (changeStr[i] === '1') {
        result.push(getUnit[count]);
      } else {
        if (changeStr[i] !== '0') {
          result = result.concat(numArr[changeStr[i]], getUnit[count]);
        }
      }
    } else {
      if (changeStr[i] !== '0') {
        result.push(numArr[changeStr[i]]);
      }
    }
    count = count - 1;
  }
  return result.join('');
}
console.log(solution(1234));
