"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const db_1 = __importDefault(require("../db"));
const modifyArticle = (req, res) => {
    //validity check : missing values
    if (!Object.keys(req.body).length || !req.body['articletext'] || !req.body['articlename']) {
        console.log('400 Bad Request - missing required fields');
        return res.status(400).json({ code: 0, message: 'Insufficient data' });
    }
    //sanitize input
    const modifyInfo = {
        articleid: Number((0, util_1.sanitize)(req.params.id)),
        articletext: (0, util_1.sanitize)(req.body['articletext']),
        articlename: (0, util_1.sanitize)(req.body['articlename']),
    };
    const { articleid: id, articletext, articlename } = modifyInfo;
    //validity check
    if (isNaN(id) || id < 0 || id > Number.MAX_SAFE_INTEGER) {
        console.log('400 Bad Request - invalid id');
        return res.status(400).json({ code: 1, message: 'Invalid id' });
    }
    if (articletext.length > util_1.MAGICNUM.MAX_ARTICLETEXT_LENGTH) {
        console.log('400 Bad Request - articletext too long');
        return res.status(400).json({ code: 2, message: 'Articletext is too long' });
    }
    if (articlename.length > util_1.MAGICNUM.MAX_ARTICLENAME_LENGTH) {
        console.log('400 Bad Request - articlename too long');
        return res.status(400).send({ code: 3, message: 'Articlename is too long' });
    }
    const updated_at = new Date().toISOString();
    //CALLBACK HELL #1 : check if article exists
    db_1.default.all(`SELECT * FROM Article WHERE articleid = ?;`, [id], (err, rows) => {
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
        db_1.default.all(`UPDATE Article SET articletext = ?, articlename = ?, modified_at = ? WHERE articleid = ?;`, [articletext, articlename, updated_at, id], (err) => {
            if (err) {
                console.dir(err);
                console.log('500 Internal Server Error - failed to update article');
                return res.status(500).json({ code: 6, message: 'Failed to update article' });
            }
            //clear cache
            util_1.cache.clear();
            console.log('204 No Content - article updated');
            return res.status(204).send();
        });
    });
};
exports.default = modifyArticle;
