// const { rollDices } = require('../helpers/dices');
const Player = require('../models/Player');
const rollDices = async () => {
    const dice1= Math.floor(6 * Math.random()) + 1;
    const dice2 = Math.floor(6 * Math.random()) + 1;
    const veredict = dice1 + dice2 === 7 ? 'win' : 'lose';
    return {
        dice1,
        dice2,
        rolScore: dice1 + dice2,
        veredict
    };
};
class RollGame {
    id
    constructor(id) {
        this.id = id;
    };
    async playRollGame() {
        const game = await rollDices()
        const player = await Player.findById({_id: this.id})
        player.totalGames++;
        if (game.veredict === 'win') {
            player.gamesWon++;
        }
        player.playHistory.push(game);
        player.wonRate = parseFloat(((player.gamesWon / player.totalGames) * 100).toFixed(2));
        await player.save();
        const result = {
            "dice1": game.dice1,
            "dice2": game.dice2,
            "Score": game.rolScore,
            "Veredict": game.veredict
        }
        return result
    };
};

module.exports = RollGame;