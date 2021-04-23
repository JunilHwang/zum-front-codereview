import express from "express";
import routes from "../routes"
import { getBest, getContentByCategory, getContentByIdx, getDetailByUrl } from "../controllers/apiController"

const apiRouter = express.Router();

apiRouter.get(routes.best, getBest);
apiRouter.get(routes.category, getContentByCategory);
apiRouter.get(routes.category_detail, getContentByIdx);
apiRouter.get(routes.detail, getDetailByUrl);

export default apiRouter;