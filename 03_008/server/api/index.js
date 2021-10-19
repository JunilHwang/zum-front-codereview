const express = require('express');
const best = require('./best');
const content = require('./content');
const recentContent = require('./recentContent');

const router = express.Router();

router.use('/best', best);
router.use('/content', content);
router.use('/recentContent', recentContent);

module.exports = router;
