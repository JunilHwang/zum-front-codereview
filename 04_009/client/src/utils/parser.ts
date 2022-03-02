const secObj = {
  year: 31536000,
  month: 2592000,
  date: 86400,
  hour: 3600,
  min: 60,
};

const getTimeObject = (date: Date) => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  date: date.getDate(),
  hour: date.getHours(),
  min: date.getMinutes(),
  sec: date.getSeconds(),
  time: date.getTime(),
});

// TODO: 깔끔하게
const parseTime = (time: string) => {
  const dbTime = getTimeObject(new Date(time));
  const nowTime = getTimeObject(new Date());
  const diff = (nowTime.time - dbTime.time) / 1000;
  let gap = diff;
  let suffix = '';
  if (diff < secObj.min) {
    suffix = '초 전';
  } else if (diff < secObj.hour) {
    gap /= secObj.min;
    suffix = '분 전';
  } else if (diff < secObj.date) {
    gap /= secObj.hour;
    suffix = '시간 전';
  } else if (diff < secObj.month) {
    gap /= secObj.date;
    suffix = '일 전';
  } else if (diff < secObj.year) {
    gap /= secObj.month;
    suffix = '달 전';
  } else {
    gap /= secObj.year;
    suffix = '년 전';
  }
  gap = Math.floor(gap);
  return gap + suffix;
};

export { parseTime };
