const jwt = require('jsonwebtoken');
const { JWTSECRET } = require('../config/config');
const pool = require('../db.js');
const authCtrl = {};
const bcrypt = require('bcryptjs');
const saltRounds = 10;
// Función para encriptar la contraseña
const encryptPassword = (password) => {
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
};
// Función para desencriptar la contraseña
const comparePassword = (password, hash) => {
	return bcrypt.compareSync(password, hash);
};

authCtrl.signUp = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			res.status(400).json({ message: 'Missing data to register' });
		}
		const hashedPassword = encryptPassword(password);
		const [ rows ] = await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [
			email,
			hashedPassword
		]);
		const token = jwt.sign({ rows }, JWTSECRET, {
			expiresIn: 60 * 60 * 1
		});
		res.status(201).json({ auth: true, token });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
authCtrl.logIn = async (req, res) => {
	try {
		const { email, password } = req.body;
		const [ rows ] = await pool.query('SELECT * FROM users WHERE email = ?', [ email ]);
		if (rows.length <= 0) return res.status(404).json({ message: 'email no encontrado' });
		const isMatch = comparePassword(password, rows[0].password);
		if (!isMatch) {
			res.status(401).json({ auth: false });
		}
		const token = jwt.sign({ rows }, JWTSECRET, {
			expiresIn: 60 * 60 * 1
		});
		res.status(201).json({ auth: true, token });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
// authCtrl.viewMe = async (req, res) => {
// try {
// 	const user = await User.findById(req.userId, { password: 0 });
// 	if (!user) {
// 		return res.status(401).json({message: 'No user found'});
// 	}
// 	res.status(200).json(user);
// } catch (error) {
// 	res.status(500).json({message: error});
// }
// };

module.exports = authCtrl;
