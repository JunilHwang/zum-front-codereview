const express = require('express');

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('<h1>SERVER IS ON</h1>');
});
module.exports = router;
