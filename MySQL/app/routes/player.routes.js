const { Router } = require('express');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');
const { newPlayer, viewAll, viewOne, updatePlayer, deletePlayer } = require('../controllers/player.controller');

router.post('/players', verifyToken, newPlayer);
router.put('/players/:id', verifyToken, updatePlayer);
router.get('/players', verifyToken, viewAll);
router.get('/player/:id', verifyToken, viewOne);
router.delete('/player/:id', verifyToken, deletePlayer);

module.exports = router;