import { Router } from 'express';
import postRouter from './post-route';

const router = Router();

router.use('/post', postRouter);

export default router;
