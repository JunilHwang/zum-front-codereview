import express from 'express';

import articleRouter from './article.js';

const router = express.Router();

router.use('/article', articleRouter);

export default router;
