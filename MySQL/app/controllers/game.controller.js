const pool = require('../db.js');
const RollGame = require('../models/Games');
const gameCtrl = {};

gameCtrl.playRollDice = async (req, res) => {
	try {
		const id = req.params.id;
		const game = await new RollGame(id);
		const playerRollDices = await game.playRollGame(id);
		res.status(201).json(playerRollDices);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
gameCtrl.generalRanking = async (req, res) => {
	try {
		const [ players ] = await pool.query('SELECT * FROM players ORDER BY players.wonRate DESC');
		let acumulador = 0;
		for (i = 0; i < players.length; i++) {
			acumulador = acumulador + players[i].gamesWon;
		}
		const totalWrate = acumulador / players.length;
		const msg = `Total Won Rate: ${totalWrate}`;
		res.status(200).json({ msg: msg, players: players });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
gameCtrl.getBetterPlayer = async (req, res) => {
	try {
		const [ players ] = await pool.query('SELECT * FROM players ORDER BY players.wonRate DESC LIMIT 1');
		res.status(200).json({ Betterplayers: players });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
gameCtrl.getWorstPlayer = async (req, res) => {
	try {
		const [ players ] = await pool.query('SELECT * FROM players ORDER BY players.wonRate ASC LIMIT 1');
		res.status(200).json({ Worstplayer: players });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
gameCtrl.deleteGames = async (req, res) => {
	try {
		const [
			result
		] = await pool.query('UPDATE players SET totalGames = 0, gamesWon = 0, wonRate = 0 WHERE id = ?', [
			req.params.id
		]);
		if (result.affectedRows <= 0) return res.status(404).json({ message: 'player not found' });
		const games = await pool.query('DELETE FROM playHistory WHERE indice = ?', [ req.params.id ]);
		res.status(201).json(result);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
gameCtrl.viewGames = async (req, res) => {
	try {
		const [ rows ] = await pool.query('SELECT * FROM players WHERE id = ?', [ req.params.id ]);
		if (rows.length <= 0) return res.status(404).json({ message: 'player not found' });
		res.status(200).json(rows[0]);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
module.exports = gameCtrl;
