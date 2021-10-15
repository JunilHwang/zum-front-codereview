const { getContents, isValidCategory } = require('../../models');

module.exports = {
  get: (req, res) => {
    const { category } = req.params;
    if (!category) {
      const resData = getContents('');
      return res.send(resData);
    }
    if (category) {
      if (isValidCategory(category) === false) {
        return res.status(404).send('잘못된 요청입니다');
      }
      const resData = getContents(category);
      return res.send(resData);
    }
  },
  post: () => {},
  redirect: () => {},
};
