const { Router } = require('express');
const router = Router();
const { 
    playersRollDice,
    generalRanking,
    getBetterPlayer,
    getWorstPlayer,
    deleteGame } = require('../controllers/game.controller');

router.post('/player/:id', playersRollDice);
router.get('/ranking', generalRanking);
router.get('/better-player', getBetterPlayer);
router.get('./worst-player', getWorstPlayer);
router.delete('./delete/:id', deleteGame);

module.exports = router;