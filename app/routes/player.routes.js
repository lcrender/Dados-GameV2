const { Router } = require('express');
const router = Router();
//const verifyToken = require('../middlewares/verifyToken');
const { newPlayer, viewAll, viewOne, updatePlayer, deletePlayer } = require('../controllers/player.controller');

router.post('/players', newPlayer);
router.put('/players/:id', updatePlayer);
router.get('/players', viewAll);
router.get('/player/:id', viewOne);
router.delete('/player/:id', deletePlayer);

module.exports = router;