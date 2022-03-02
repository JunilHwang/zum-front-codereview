import { Request, Response } from 'express';
import { sanitize, MAGICNUM, cache } from './util';
import { typeListArticle, returnListArticle } from '../Types';
import db from '../db';

const list = (req: Request, res: Response) => {
  //API Caching
  if (cache.has(req.url)) {
    console.log('200 OK - cache hit');
    return res.status(200).json(cache.get(req.url));
  }

  if (!Object.keys(req.query).length) {
    //simple query : skipping pagination
    db.all(`SELECT * from Article ORDER BY created_at DESC;`, (err: Error, rows: any) => {
      if (err) {
        console.dir(err);
        console.log('500 Internal Server Error - failed to get articles');
        return res.status(500).json({ code: 6, message: 'Failed to get articles' });
      }
      const response: returnListArticle = { result: rows };
      cache.set(req.url, response);
      return res.status(200).json(response);
    });
    return;
  }

  const listInfo: typeListArticle = {
    username: '',
    articlename: '',
    articletext: '',
    articlePerPage: 0,
    currentPage: 0,
    orderby: 'DESC',
  };

  //multiple query : validiity check
  if (req.query['username']) {
    listInfo.username = sanitize(req.query['username']);
    if (listInfo.username.length > MAGICNUM.MAX_USERNAME_LENGTH) {
      console.log('400 Bad Request - username too long');
      return res.status(400).json({ code: 0, message: 'Username is too long' });
    }
  }

  if (req.query['articlename']) {
    listInfo.articlename = sanitize(req.query['articlename']);
    if (listInfo.articlename.length > MAGICNUM.MAX_ARTICLENAME_LENGTH) {
      console.log('400 Bad Request - articlename too long');
      return res.status(400).json({ code: 1, message: 'Articlename is too long' });
    }
  }

  if (req.query['articletext']) {
    listInfo.articletext = sanitize(req.query['articletext']);
    if (listInfo.articletext.length > MAGICNUM.MAX_ARTICLETEXT_QUERY_LENGTH) {
      console.log('400 Bad Request - articletext too long');
      return res.status(400).json({ code: 2, message: 'Articletext is too long' });
    }
  }

  if (req.query['orderby']) {
    listInfo.orderby = sanitize(req.query['orderby']);
    if (listInfo.orderby !== 'ASC' && listInfo.orderby !== 'DESC') {
      console.log('400 Bad Request - orderby must be ASC or DESC');
      return res.status(400).json({ code: 2, message: 'Orderby must be ASC or DESC' });
    }
  }

  if (req.query['articlePerPage']) {
    listInfo.articlePerPage = Number(sanitize(req.query['articlePerPage']));
    if (
      isNaN(listInfo.articlePerPage) ||
      listInfo.articlePerPage <= 0 ||
      listInfo.articlePerPage > MAGICNUM.MAX_SAFE_QUERY_LENGTH
    ) {
      console.log('400 Bad Request - limit must be a positive integer');
      return res.status(400).json({ code: 3, message: 'Limit must be a positive integer' });
    }
  }

  if (req.query['currentPage']) {
    listInfo.currentPage = Number(sanitize(req.query['currentPage']));
    if (
      isNaN(listInfo.currentPage) ||
      listInfo.currentPage <= 0 ||
      listInfo.currentPage > MAGICNUM.MAX_SAFE_QUERY_LENGTH
    ) {
      console.log('400 Bad Request - offset must be a positive integer');
      return res.status(400).json({ code: 4, message: 'Offset must be a positive integer' });
    }
    listInfo.currentPage -= 1;
  }

  //create SQL Clause corresponding to query
  const whereArr: string[] = [];
  if (listInfo.username) whereArr.push(`username = '${listInfo.username}'`);
  if (listInfo.articlename) whereArr.push(`articlename LIKE '%${listInfo.articlename}%'`);
  if (listInfo.articletext) whereArr.push(`articletext LIKE '%${listInfo.articletext}%'`);
  const whereClause: string = whereArr.length ? ` WHERE ${whereArr.join(' AND ')}` : '';
  const orderbyClause: string = listInfo.orderby ? ` ORDER BY created_at ${listInfo.orderby}` : ``;
  let limitClause: string = '';
  if (listInfo.articlePerPage) {
    limitClause = ` LIMIT ${listInfo.articlePerPage}`;
    if (listInfo.currentPage) {
      limitClause += ` OFFSET ${listInfo.articlePerPage * listInfo.currentPage}`;
    }
  }
  const query: string = `SELECT * from Article${whereClause}${orderbyClause}${limitClause};`;
  console.log(query);

  //execute query
  db.all(query, (err: Error, rows: any) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ code: 5, message: 'Internal Server Error' });
    }
    const response: returnListArticle = { result: rows };
    cache.set(req.url, response);
    return res.status(200).json(response);
  });
};

export default list;
