import express from 'express';

import articleController from '../controllers/articleController.js';

const router = express.Router();

router.post('/', articleController.postArticle);
router.get('/', articleController.getArticleAll);
router.get('/:id', articleController.getArticle);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);

export default router;
