const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    totalGames: {type: Number, default: 0},
    gamesWon: {type: Number, default: 0},
    wonRate: {type: Number, default: 0},
    playHistory: [Object]
});
userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};
userSchema.methods.validatePassword = function (password) { 
   return bcrypt.compare(password, this.password);
}
module.exports = model('User', userSchema);