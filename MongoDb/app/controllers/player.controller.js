const pool = require('../db.js');
const playerCtrl = {};
playerCtrl.newPlayer = async (req, res) => {
	try {
		let { username } = req.body;
		if (username === '' || username === undefined) {
			username = 'ANONIMO';
		}
		const [ rows ] = await pool.query('INSERT INTO players (username) VALUES (?)', [ username ]);
		res.status(201).json({ id: rows.insertId, username });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
playerCtrl.viewAll = async (req, res) => {
	try {
		const [ players ] = await pool.query('SELECT * FROM players');
		if (!players || players.length < 1) {
			return res.status(404).json({ message: 'No player found' });
		}
		res.status(200).json({ players });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
playerCtrl.viewOne = async (req, res) => {
	try {
		const [ rows ] = await pool.query('SELECT * FROM players WHERE id = ?', [ req.params.id ]);
		if (rows.length <= 0) return res.status(404).json({ message: 'player not found' });
		res.status(200).json(rows[0]);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
playerCtrl.updatePlayer = async (req, res) => {
	try {
		const { id } = req.params;
		const { username } = req.body;
		const [ result ] = await pool.query('UPDATE players SET username = IFNULL(?, username) WHERE id = ?', [
			username,
			id
		]);
		if (result.affectedRows === 0) return res.status(404).json({ message: 'player not found' });
		const [ updatedResult ] = await pool.query('SELECT * FROM players WHERE id = ?', [ id ]);
		res.status(201).json(updatedResult[0]);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
playerCtrl.deletePlayer = async (req, res) => {
	try {
		const [ result ] = await pool.query('DELETE FROM players WHERE id = ?', [ req.params.id ]);
		if (result.affectedRows <= 0) return res.status(404).json({ message: 'player not found' });
		res.status(201).json({ message: 'player deleted' });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
module.exports = playerCtrl;
