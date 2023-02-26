const { Router } = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = Router();
const { 
    playRollDice,
    generalRanking,
    getBetterPlayer,
    getWorstPlayer, 
    deleteGames,
    viewGames } = require('../controllers/game.controller');

router.post('/games/:id', verifyToken, playRollDice);
router.delete('/games/:id', verifyToken, deleteGames);
router.get('/games/:id', verifyToken, viewGames);
router.get('/ranking', verifyToken, generalRanking);
router.get('/better-player', verifyToken,getBetterPlayer);
router.get('/worst-player', verifyToken, getWorstPlayer);

module.exports = router;