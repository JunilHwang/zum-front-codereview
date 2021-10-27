import express from "express";
import best from "./best";
import content from "./content";
import detail from "./detail";

const router = express.Router();
router.use('/best', best);
router.use('/content', content);
router.use('/detail', detail);

export default router;