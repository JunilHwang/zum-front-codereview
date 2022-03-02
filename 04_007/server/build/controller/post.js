"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const db_1 = __importDefault(require("../db"));
const newArticle = (req, res) => {
    // validity check #1 : missing values
    if (!Object.keys(req.body).length ||
        !req.body['username'] ||
        !req.body['articletext'] ||
        !req.body['articlename']) {
        console.log('400 Bad Request - missing required fields');
        return res.status(400).json({ code: 0, message: 'Insufficient data' });
    }
    // sanitize input
    const newInfo = {
        username: (0, util_1.sanitize)(req.body['username']),
        articletext: (0, util_1.sanitize)(req.body['articletext']),
        articlename: (0, util_1.sanitize)(req.body['articlename']),
    };
    const { username, articletext, articlename } = newInfo;
    // validity check #2 : invalid input
    if (username.length > util_1.MAGICNUM.MAX_USERNAME_LENGTH) {
        console.log('400 Bad Request - username too long');
        return res.status(400).json({ code: 1, message: 'Username is too long' });
    }
    if (articletext.length > util_1.MAGICNUM.MAX_ARTICLETEXT_LENGTH) {
        console.log('400 Bad Request - articletext too long');
        return res.status(400).json({ code: 2, message: 'Articletext is too long' });
    }
    if (articlename.length > util_1.MAGICNUM.MAX_ARTICLENAME_LENGTH) {
        console.log('400 Bad Request - articlename too long');
        return res.status(400).send({ code: 3, message: 'Articlename is too long' });
    }
    const created_at = new Date().toISOString();
    const updated_at = new Date().toISOString();
    // write to database
    db_1.default.run(`INSERT INTO Article (username, articletext, articlename, created_at, modified_at) VALUES (?, ?, ?, ?, ?);`, [username, articletext, articlename, created_at, updated_at], function (err) {
        if (err) {
            console.dir(err);
            console.log('500 Internal Server Error - failed to insert article');
            return res.status(500).json({ code: 4, message: 'Failed to insert article' });
        }
        //clear cache
        util_1.cache.clear();
        console.log('201 Created - article inserted');
        return res.status(201).json({ id: this.lastID });
    });
};
exports.default = newArticle;
