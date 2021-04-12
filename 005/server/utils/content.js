import lifeDetailData from '../models/life_detail.js';
import cultureDetailData from '../models/culture_detail.js';
import travelDetailData from '../models/travel_detail.js';
import foodDetailData from '../models/food_detail.js';

const contentUtil = {
  life: lifeDetailData,
  food: foodDetailData,
  travel: travelDetailData,
  culture: cultureDetailData,
};

export default Object.freeze(contentUtil);
