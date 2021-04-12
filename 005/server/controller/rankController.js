import rankData from '../models/rank.js';
import rankDetailData from '../models/rank_detail.js';
export const getRanking = (req, res, next) => {
  try {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Cache-Control', 'private');
    res.json(rankData);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
export const getRankingContent = (req, res, next) => {
  try {
    const { media, id } = req.params;
    console.log(media, id);
    for (let i = 0; i < rankData.length; i++) {
      if (rankDetailData[i].idx === parseInt(id)) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Cache-Control', 'private');
        res.json(rankDetailData[i]);
      }
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
