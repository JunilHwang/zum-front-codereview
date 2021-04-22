import path from 'path';

const convertToAbsolutePath = (relativePath: string) => path.resolve(__dirname, relativePath);

const dbPaths = {
  ranking: convertToAbsolutePath('../db/ranking.json'),
  life: convertToAbsolutePath('../db/life.json'),
  food: convertToAbsolutePath('../db/food.json'),
  culture: convertToAbsolutePath('../db/culture.json'),
  trip: convertToAbsolutePath('../db/trip.json'),
};

export { dbPaths };
