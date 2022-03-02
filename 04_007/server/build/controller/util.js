"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = exports.MAGICNUM = exports.sanitize = void 0;
const sanitize = (input) => {
    const result = input.replace(/[\/\'<>\`\"\;\\]/g, '');
    return result;
};
exports.sanitize = sanitize;
exports.MAGICNUM = {
    MAX_USERNAME_LENGTH: 32,
    MAX_ARTICLENAME_LENGTH: 128,
    MAX_ARTICLETEXT_LENGTH: 1048576,
    MAX_ARTICLETEXT_QUERY_LENGTH: 128,
    MAX_SAFE_QUERY_LENGTH: Math.floor(Math.sqrt(Number.MAX_SAFE_INTEGER)),
};
exports.cache = new Map();
