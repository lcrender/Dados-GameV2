const { Schema, model } = require('mongoose');
const playerSchema = new Schema({
    username: String,
    date: Date,
    totalGames: {type: Number, default: 0},
    gamesWon: {type: Number, default: 0},
    wonRate: {type: Number, default: 0},
    playHistory: [Object]
});

module.exports = model('Player', playerSchema);