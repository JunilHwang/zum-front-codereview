import { Request, Response } from 'express';
import { sanitize, cache } from './util';
import { typeGetArticle, typeArticleDB } from '../Types';
import db from '../db';

const getAnArticle = (req: Request, res: Response) => {
  //API Caching
  if (cache.has(req.url)) {
    console.log('200 OK - cache hit');
    return res.status(200).json(cache.get(req.url));
  }

  //sanitize input
  const articleInfo: typeGetArticle = { articleid: Number(sanitize(req.params.id)) };
  const id = articleInfo.articleid;

  //validity check
  if (isNaN(id) || id < 0 || id > Number.MAX_SAFE_INTEGER) {
    console.log('400 Bad Request - invalid id');
    return res.status(400).json({ code: 1, message: 'Invalid id' });
  }

  //get an article
  db.all(`SELECT * FROM Article WHERE articleid = ?;`, [id], (err: Error, rows: any) => {
    if (err) {
      console.dir(err);
      console.log('500 Internal Server Error - failed to query article');
      return res.status(500).json({ code: 2, message: 'Failed to query article' });
    }

    if (rows.length === 0) {
      console.log('404 Not Found - article not found');
      return res.status(404).json({ code: 3, message: 'Article not found' });
    }

    const response: typeArticleDB = rows[0];
    //API Caching
    cache.set(req.url, response);
    console.log('200 OK - article found');
    return res.status(200).json(response);
  });
};

export default getAnArticle;
