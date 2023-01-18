const { Router } = require('express');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');
const { signUp, viewMe, logIn, viewAll, viewOne, updateUser, deleteUser } = require('../controllers/authController');

router.post('/signup', signUp);
router.get('/me', verifyToken, viewMe);
router.post('/login', logIn);
router.get('/all-players', viewAll);
router.get('/player/:id', viewOne);
router.put('/player/:id', updateUser);
router.delete('/delete-player/:id', deleteUser);

module.exports = router;