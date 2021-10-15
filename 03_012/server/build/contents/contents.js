"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contents = void 0;
var culture_1 = __importDefault(require("./culture"));
var food_1 = __importDefault(require("./food"));
var life_1 = __importDefault(require("./life"));
var trip_1 = __importDefault(require("./trip"));
exports.contents = {
    culture: culture_1.default,
    food: food_1.default,
    life: life_1.default,
    trip: trip_1.default
};
