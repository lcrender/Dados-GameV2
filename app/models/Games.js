const pool = require('../db.js');
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
    async playRollGame(id) {
        const game = await rollDices();
        // await pool.query('UPDATE players SET totalGames = totalGames + 1 WHERE id = ?', [id]);
        if (game.veredict === 'win') {
            
            // await pool.query('UPDATE players SET wonRate = gamesWon / totalGames * 100 WHERE id = ?', [id]);
             await pool.query('UPDATE players SET gamesWon = gamesWon + 1, totalGames = totalGames + 1, wonRate = gamesWon / totalGames * 100 WHERE id = ?', [id]);
             await pool.query('INSERT INTO playHistory SET indice = ?, dice1 = ?, dice2 = ?, score = ?, veredict = ?', [id, game.dice1, game.dice2, game.rolScore, game.veredict]);
             const result = {
                "dice1": game.dice1,
                "dice2": game.dice2,
                "Score": game.rolScore,
                "Veredict": game.veredict
            }
            return result
         }
         await pool.query('UPDATE players SET totalGames = totalGames + 1, wonRate = gamesWon / totalGames * 100 WHERE id = ?', [id]);
         await pool.query('INSERT INTO playHistory SET indice = ?, dice1 = ?, dice2 = ?, score = ?, veredict = ?', [id, game.dice1, game.dice2, game.rolScore, game.veredict]);
         const result = {
            "dice1": game.dice1,
            "dice2": game.dice2,
            "Score": game.rolScore,
            "Veredict": game.veredict
        }
    return result}
};

module.exports = RollGame;