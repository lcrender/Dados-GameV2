const { Router } = require('express');
const router = Router();
const { 
    playRollDice,
    generalRanking,
    getBetterPlayer,
    getWorstPlayer, 
    deleteGames,
    viewGames } = require('../controllers/game.controller');

router.post('/games/:id', playRollDice);
router.delete('/games/:id', deleteGames);
router.get('/games/:id', viewGames);
router.get('/ranking', generalRanking);
router.get('/better-player', getBetterPlayer);
router.get('/worst-player', getWorstPlayer);

module.exports = router;