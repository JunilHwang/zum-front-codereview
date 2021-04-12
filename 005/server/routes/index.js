import express from 'express';
import { getRanking, getRankingContent } from '../controller/rankController.js';
import {
  getCategory,
  getCategoryContent,
} from '../controller/categoryController.js';
const router = express.Router();

router.get('/api/best', getRanking);
router.get('/api/content/:category', getCategory);
router.get('/api/content/rank/:media/:id', getRankingContent);
router.get('/api/content/:category/:id', getCategoryContent);

export default router;
