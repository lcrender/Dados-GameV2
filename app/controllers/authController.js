const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWTSECRET } = process.env;
const authCtrl = {};

authCtrl.signUp = async (req, res) => {
	try {
		const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({message: "Faltan datos para registrarse"})
        } else {
            const user = new User({
                email,
                password
            });
            user.password = await user.encryptPassword(user.password);
            await user.save();
            const token = jwt.sign({ id: user._id }, JWTSECRET, {
                expiresIn: 60 * 60 * 1
            });
            res.status(201).json({ auth: true, token });
        }
	} catch (error) {
		res.status(401).json({message: error});
	}
};
authCtrl.logIn = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(404).json({message: "The email doesn't exists"});
		}
		const validPassword = await user.validatePassword(password);
		if (!validPassword) {
			return res.status(401).json({ auth: false, token: null });
		}
		const token = jwt.sign({ id: user._id }, JWTSECRET, {
			expiresIn: 60 * 60 * 1
		});
		res.status(201).json({ auth: true, token });
	} catch (error) {
		res.status(401).json({message: error});
	}
};
authCtrl.viewMe = async (req, res) => {
	try {
		const user = await User.findById(req.userId, { password: 0 });
		if (!user) {
			return res.status(404).json({message: 'No user found'});
		}
		res.status(201).json(user);
	} catch (error) {
		res.status(401).json({message: error});
	}
};

module.exports = authCtrl;
