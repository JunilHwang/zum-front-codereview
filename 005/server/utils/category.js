import foodData from '../models/food.js';
import cultureData from '../models/culture.js';
import lifeData from '../models/life.js';
import travelData from '../models/travel.js';

const categoryUtil = {
  food: foodData,
  culture: cultureData,
  life: lifeData,
  travel: travelData,
};

export default Object.freeze(categoryUtil);
