"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const list_1 = __importDefault(require("./list"));
const get_1 = __importDefault(require("./get"));
const post_1 = __importDefault(require("./post"));
const put_1 = __importDefault(require("./put"));
const del_1 = __importDefault(require("./del"));
const controller = {
    getList: list_1.default,
    getOne: get_1.default,
    write: post_1.default,
    edit: put_1.default,
    delete: del_1.default,
};
exports.default = controller;
