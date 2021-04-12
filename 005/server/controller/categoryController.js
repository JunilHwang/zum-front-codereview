import categoryUtil from '../utils/category.js';
import contentUtil from '../utils/content.js';
export const getCategory = (req, res, next) => {
  try {
    const categoryUrl = req.params.category;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Cache-Control', 'private');
    res.json(categoryUtil[categoryUrl]);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getCategoryContent = (req, res, next) => {
  try {
    const { category, id } = req.params;
    for (let i = 0; i < contentUtil[category].length; i++) {
      if (contentUtil[category][i].idx === parseInt(id)) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Cache-Control', 'private');
        res.json(contentUtil[category][i]);
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
