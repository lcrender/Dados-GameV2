const Player = require('../models/Player');
const RollGame = require('../models/Games');
const gameCtrl = {};

gameCtrl.playRollDice = async (req, res) => {
	try {
		const id = req.params.id;
		const game = await new RollGame(id);
		const playerRollDices = await game.playRollGame();
		res.status(201).json(playerRollDices);
	} catch (error) {
		res.status(400).json({message: error});
	}
};
gameCtrl.generalRanking = async (req, res) => {
	try {
		const players = await Player.find({}, { playHistory: 0, _id: 0, __v: 0 }).sort({ wonRate: -1 });
		let totalWrate = players.reduce((acumulador, actual) => acumulador + actual.wonRate, 0);
		totalWrate = totalWrate / players.length;
		const msg = `Total Won Rate: ${totalWrate}`;
		res.status(200).json({ msg, players });
	} catch (error) {
		res.status(400).json({message: error});
	}
};
gameCtrl.getBetterPlayer = async (req, res) => {
	try {
		const players = await Player.find({});
		let max = 0;
		players.forEach((player) => {
			player.wonRate > max ? (max = player.wonRate) : null;
		});
		const betterPlayer = await Player.findOne({ wonRate: max }, { _id: 0, __v: 0 });
		res.status(200).json({ betterPlayer });
	} catch (error) {
		res.status(400).json({message: error});
	}
};
gameCtrl.getWorstPlayer = async (req, res) => {
	try {
		const players = await Player.find({});
		let min = 100;
		players.forEach((player) => {
			player.wonRate < min ? (min = player.wonRate) : null;
		});
		const worstPlayer = await Player.findOne({ wonRate: min }, { _id: 0, __v: 0 });
		res.status(200).json({ worstPlayer });
	} catch (error) {
		res.status(400).json({message: error});
	}
};
gameCtrl.deleteGames = async (req, res) => {
	try {
		const player = await Player.findById(req.params.id);
		player.totalGames = 0;
		player.gamesWon = 0;
		player.wonRate = 0;
		player.playHistory = [];
		await player.save();
		res.status(201).json(player);
	} catch (error) {
		res.status(400).json({message: error});
	}
};
gameCtrl.viewGames = async (req, res) => {
	try {
		const player = await Player.findById(req.params.id, { playHistory: 1, username: 1, _id: 0 });
		if (!player) {
			return res.status(404).send('No player found');
		}
		res.status(200).json(player);
	} catch (error) {
		res.status(400).json({message: error});
	}
};
module.exports = gameCtrl;
