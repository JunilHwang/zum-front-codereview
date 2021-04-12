// @ts-check
import { Router } from "express";
import { params } from "../types";
import best from "./best.js";
import content from "./content.js";
import detail from "./detail.js";

const router = Router();

router.use(params.best, best);
router.use(params.content, content);
router.use(params.detail, detail);

export default router;
