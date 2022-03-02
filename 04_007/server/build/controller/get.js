"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const db_1 = __importDefault(require("../db"));
const getAnArticle = (req, res) => {
    //API Caching
    if (util_1.cache.has(req.url)) {
        console.log('200 OK - cache hit');
        return res.status(200).json(util_1.cache.get(req.url));
    }
    //sanitize input
    const articleInfo = { articleid: Number((0, util_1.sanitize)(req.params.id)) };
    const id = articleInfo.articleid;
    //validity check
    if (isNaN(id) || id < 0 || id > Number.MAX_SAFE_INTEGER) {
        console.log('400 Bad Request - invalid id');
        return res.status(400).json({ code: 1, message: 'Invalid id' });
    }
    //get an article
    db_1.default.all(`SELECT * FROM Article WHERE articleid = ?;`, [id], (err, rows) => {
        if (err) {
            console.dir(err);
            console.log('500 Internal Server Error - failed to query article');
            return res.status(500).json({ code: 2, message: 'Failed to query article' });
        }
        if (rows.length === 0) {
            console.log('404 Not Found - article not found');
            return res.status(404).json({ code: 3, message: 'Article not found' });
        }
        const response = rows[0];
        //API Caching
        util_1.cache.set(req.url, response);
        console.log('200 OK - article found');
        return res.status(200).json(response);
    });
};
exports.default = getAnArticle;
