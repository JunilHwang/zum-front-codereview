"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const db_1 = __importDefault(require("../db"));
const deleteArticle = (req, res) => {
    //sanitize input
    const articleInfo = { articleid: Number((0, util_1.sanitize)(req.params.id)) };
    const { articleid: id } = articleInfo;
    //validity check
    if (isNaN(id) || id < 0 || id > Number.MAX_SAFE_INTEGER) {
        console.log('400 Bad Request - invalid id');
        return res.status(400).json({ code: 1, message: 'Invalid id' });
    }
    //CALLBACK HELL #1 : check if article exists
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
        //CALLBACK HELL #2 : delete from database
        db_1.default.all(`DELETE FROM Article WHERE articleid = ?;`, [id], (err) => {
            if (err) {
                console.dir(err);
                console.log('500 Internal Server Error - failed to delete article');
                return res.status(500).json({ code: 4, message: 'Failed to delete article' });
            }
            //clear cache
            util_1.cache.clear();
            console.log('204 No Content - article deleted');
            return res.status(204).send();
        });
    });
};
exports.default = deleteArticle;
