const express = require('express');

const router = express.Router();
const controller = require('../controllers/contents');

router.get('/', controller.get);
router.get('/:category', controller.get);

module.exports = router;
