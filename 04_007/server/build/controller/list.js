"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const db_1 = __importDefault(require("../db"));
const list = (req, res) => {
    //API Caching
    if (util_1.cache.has(req.url)) {
        console.log('200 OK - cache hit');
        return res.status(200).json(util_1.cache.get(req.url));
    }
    if (!Object.keys(req.query).length) {
        //simple query : skipping pagination
        db_1.default.all(`SELECT * from Article ORDER BY created_at DESC;`, (err, rows) => {
            if (err) {
                console.dir(err);
                console.log('500 Internal Server Error - failed to get articles');
                return res.status(500).json({ code: 6, message: 'Failed to get articles' });
            }
            const response = { result: rows };
            util_1.cache.set(req.url, response);
            return res.status(200).json(response);
        });
        return;
    }
    const listInfo = {
        username: '',
        articlename: '',
        articletext: '',
        articlePerPage: 0,
        currentPage: 0,
        orderby: 'DESC',
    };
    //multiple query : validiity check
    if (req.query['username']) {
        listInfo.username = (0, util_1.sanitize)(req.query['username']);
        if (listInfo.username.length > util_1.MAGICNUM.MAX_USERNAME_LENGTH) {
            console.log('400 Bad Request - username too long');
            return res.status(400).json({ code: 0, message: 'Username is too long' });
        }
    }
    if (req.query['articlename']) {
        listInfo.articlename = (0, util_1.sanitize)(req.query['articlename']);
        if (listInfo.articlename.length > util_1.MAGICNUM.MAX_ARTICLENAME_LENGTH) {
            console.log('400 Bad Request - articlename too long');
            return res.status(400).json({ code: 1, message: 'Articlename is too long' });
        }
    }
    if (req.query['articletext']) {
        listInfo.articletext = (0, util_1.sanitize)(req.query['articletext']);
        if (listInfo.articletext.length > util_1.MAGICNUM.MAX_ARTICLETEXT_QUERY_LENGTH) {
            console.log('400 Bad Request - articletext too long');
            return res.status(400).json({ code: 2, message: 'Articletext is too long' });
        }
    }
    if (req.query['orderby']) {
        listInfo.orderby = (0, util_1.sanitize)(req.query['orderby']);
        if (listInfo.orderby !== 'ASC' && listInfo.orderby !== 'DESC') {
            console.log('400 Bad Request - orderby must be ASC or DESC');
            return res.status(400).json({ code: 2, message: 'Orderby must be ASC or DESC' });
        }
    }
    if (req.query['articlePerPage']) {
        listInfo.articlePerPage = Number((0, util_1.sanitize)(req.query['articlePerPage']));
        if (isNaN(listInfo.articlePerPage) ||
            listInfo.articlePerPage <= 0 ||
            listInfo.articlePerPage > util_1.MAGICNUM.MAX_SAFE_QUERY_LENGTH) {
            console.log('400 Bad Request - limit must be a positive integer');
            return res.status(400).json({ code: 3, message: 'Limit must be a positive integer' });
        }
    }
    if (req.query['currentPage']) {
        listInfo.currentPage = Number((0, util_1.sanitize)(req.query['currentPage']));
        if (isNaN(listInfo.currentPage) ||
            listInfo.currentPage <= 0 ||
            listInfo.currentPage > util_1.MAGICNUM.MAX_SAFE_QUERY_LENGTH) {
            console.log('400 Bad Request - offset must be a positive integer');
            return res.status(400).json({ code: 4, message: 'Offset must be a positive integer' });
        }
        listInfo.currentPage -= 1;
    }
    //create SQL Clause corresponding to query
    const whereArr = [];
    if (listInfo.username)
        whereArr.push(`username = '${listInfo.username}'`);
    if (listInfo.articlename)
        whereArr.push(`articlename LIKE '%${listInfo.articlename}%'`);
    if (listInfo.articletext)
        whereArr.push(`articletext LIKE '%${listInfo.articletext}%'`);
    const whereClause = whereArr.length ? ` WHERE ${whereArr.join(' AND ')}` : '';
    const orderbyClause = listInfo.orderby ? ` ORDER BY created_at ${listInfo.orderby}` : ``;
    let limitClause = '';
    if (listInfo.articlePerPage) {
        limitClause = ` LIMIT ${listInfo.articlePerPage}`;
        if (listInfo.currentPage) {
            limitClause += ` OFFSET ${listInfo.articlePerPage * listInfo.currentPage}`;
        }
    }
    const query = `SELECT * from Article${whereClause}${orderbyClause}${limitClause};`;
    console.log(query);
    //execute query
    db_1.default.all(query, (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ code: 5, message: 'Internal Server Error' });
        }
        const response = { result: rows };
        util_1.cache.set(req.url, response);
        return res.status(200).json(response);
    });
};
exports.default = list;
