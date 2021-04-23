const express = require('express');
const router = express.Router();

router.use('/best', require('./best'));
router.use('/content', require('./content'));
router.use('/detail', require('./detail'));

module.exports = router;
