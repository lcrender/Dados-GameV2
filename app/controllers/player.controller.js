const Player = require('../models/Player');
const playerCtrl = {};
playerCtrl.newPlayer = async (req, res) => {
    try {
        let { username } = req.body;
        if (username === "" || username === undefined) {
            username = "ANONIMO";
        }
        const players = await Player.find({username: username}, {username: 1, _id: 0});
        if (!players || players[0] === undefined || username === "ANONIMO")  {
            const player = await new Player({
            username,
            date: new Date
        });
        await player.save();
        res.status(201).json(player);
        }
        else {
            res.send("The Username is in use, try with another username")
        }
    } catch (error) {
        res.send(error)
    }
};
playerCtrl.viewAll = async (req, res) => {
    try {
        const players = await Player.find(req.userId, { password: 0, __v: 0 });
        if (!players || players.length < 1) {
            return res.status(404).send('No player found');
        }
        res.json({players})
    } catch (error) {
        res.send(error)
    }
};
playerCtrl.viewOne = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id, { password: 0, _id: 0, __v: 0, date:0 });
        if (!player) {
            return res.status(404).send('No player found');
        }
        res.status(201).json(player)
    } catch (error) {
        res.send(error)
    }
};
playerCtrl.updatePlayer = async (req, res) => {
    try {
        const newName = req.body.username;
        await Player.findByIdAndUpdate(req.params.id, {username: newName}).lean()
        const player = await Player.findById(req.params.id, { password: 0 });
        res.status(201).json(player)
    } catch (error) {
        res.send(error)
    }
};  
playerCtrl.deletePlayer = async (req, res) => {
    try {
        const id = req.params.id
        await Player.findByIdAndDelete(id)
        res.redirect('/players');
    } catch (error) {
        res.send(error)
    }
};
module.exports = playerCtrl;