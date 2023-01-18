const { Router } = require('express');
const router = Router();
const { indexRender } = require('../controllers/index.controller');
router.get('/', indexRender);

module.exports = router;