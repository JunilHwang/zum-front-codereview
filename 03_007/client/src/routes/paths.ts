// const getPath = (root: string, subLink: string): string => {
//   return `${root}/${subLink}`;
// };
const ROOTS: string = '/';
type pathsType = {
  [key: string]: string;
};
const paths: pathsType = {
  root: ROOTS,
  home: ROOTS,
  life: '/life',
  food: '/food',
  trip: '/trip',
  culture: '/culture',
  detail: '/detail',
  bookmark: '/bookmark',
};
export const subPaths = [paths.life, paths.food, paths.trip, paths.culture];
export default paths;
