import { Request, Response } from 'express';
import { sanitize, MAGICNUM, cache } from './util';
import { typeModifyArticle } from '../Types';
import db from '../db';

const modifyArticle = (req: Request, res: Response) => {
  //validity check : missing values
  if (!Object.keys(req.body).length || !req.body['articletext'] || !req.body['articlename']) {
    console.log('400 Bad Request - missing required fields');
    return res.status(400).json({ code: 0, message: 'Insufficient data' });
  }

  //sanitize input
  const modifyInfo: typeModifyArticle = {
    articleid: Number(sanitize(req.params.id)),
    articletext: sanitize(req.body['articletext']),
    articlename: sanitize(req.body['articlename']),
  };
  const { articleid: id, articletext, articlename } = modifyInfo;

  //validity check
  if (isNaN(id) || id < 0 || id > Number.MAX_SAFE_INTEGER) {
    console.log('400 Bad Request - invalid id');
    return res.status(400).json({ code: 1, message: 'Invalid id' });
  }

  if (articletext.length > MAGICNUM.MAX_ARTICLETEXT_LENGTH) {
    console.log('400 Bad Request - articletext too long');
    return res.status(400).json({ code: 2, message: 'Articletext is too long' });
  }

  if (articlename.length > MAGICNUM.MAX_ARTICLENAME_LENGTH) {
    console.log('400 Bad Request - articlename too long');
    return res.status(400).send({ code: 3, message: 'Articlename is too long' });
  }

  const updated_at = new Date().toISOString();

  //CALLBACK HELL #1 : check if article exists
  db.all(`SELECT * FROM Article WHERE articleid = ?;`, [id], (err: Error, rows: any) => {
    if (err) {
      console.dir(err);
      console.log('500 Internal Server Error - failed to query article');
      return res.status(500).json({ code: 4, message: 'Failed to query article' });
    }

    if (rows.length === 0) {
      console.log('404 Not Found - article not found');
      return res.status(404).json({ code: 5, message: 'Article not found' });
    }

    //CALLBACK HELL #2 : write to database
    db.all(
      `UPDATE Article SET articletext = ?, articlename = ?, modified_at = ? WHERE articleid = ?;`,
      [articletext, articlename, updated_at, id],
      (err: Error) => {
        if (err) {
          console.dir(err);
          console.log('500 Internal Server Error - failed to update article');
          return res.status(500).json({ code: 6, message: 'Failed to update article' });
        }

        //clear cache
        cache.clear();
        console.log('204 No Content - article updated');
        return res.status(204).send();
      }
    );
  });
};

export default modifyArticle;
