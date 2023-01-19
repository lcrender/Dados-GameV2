const Player = require('../models/Player');
const RollGame = require('../models/Games');
const gameCtrl = {};

gameCtrl.playRollDice = async (req, res) => {   
    const id = req.params.id;
    const game = await new RollGame(id);
    const playerRollDices = await game.playRollGame();
    res.send(playerRollDices)
};

gameCtrl.generalRanking = async (req, res) => {
    const players = await Player.find({}, {playHistory: 0, _id: 0, __v: 0}).sort({wonRate: -1});
    console.log(players.wonRate)
    res.send(players)
};

gameCtrl.getBetterPlayer = async (req, res) => {
    const players = await Player.find({})
    let max = 0;
    players.forEach(player => {
        player.wonRate > max ? max = player.wonRate : null
    })
    const betterPlayer = await Player.findOne({wonRate: max}, {_id: 0, __v: 0});
    res.status(201).json({betterPlayer})
};

gameCtrl.getWorstPlayer = async (req, res) => {
    const players = await Player.find({})
        let min = 100
        players.forEach(player => {
            player.wonRate < min ? min = player.wonRate : null
        })
        const worstPlayer = await Player.findOne({wonRate: min}, {_id: 0, __v: 0});
    res.status(201).json({worstPlayer})
};
gameCtrl.deleteGames = async (req, res) => {
    res.send('delete games')
}
gameCtrl.viewGames = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id, { playHistory:1, username: 1, _id: 0 });
        if (!player) {
            return res.status(404).send('No player found');
        }
        res.json(player)
    } catch (error) {
        res.send(error)
    }
}
module.exports = gameCtrl