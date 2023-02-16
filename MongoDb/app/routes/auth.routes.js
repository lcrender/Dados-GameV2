const { Router } = require('express');
const router = Router();
const { signUp, logIn } = require('../controllers/authController');

router.post('/signup', signUp);
router.post('/login', logIn);

module.exports = router;