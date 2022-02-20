import express from 'express';
import * as postCtrl from './post/postCtrl';

const router = express.Router();

router.post('/', postCtrl.Create);
router.get('/', postCtrl.readList);
router.get('/:postId', postCtrl.read);
router.patch('/:postId', postCtrl.update);
router.delete('/:postId', postCtrl.remove);

export default router;
