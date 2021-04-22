import { Router, Express } from 'express';
import { routePaths } from '@/router/routePaths';
import { rankingController, detailController, contentController } from '@/controller';

const router = Router();

router.get(routePaths.best, rankingController.getRanking);

router.get(routePaths.content, contentController.getContent);

router.get(routePaths.detail, detailController.getDetail);

const applyRouter = (app: Express) => {
  app.use(routePaths.base, router);
};

export { applyRouter };
