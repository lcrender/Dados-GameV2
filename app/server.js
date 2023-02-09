const express = require('express');
const app = express();
const cors = require('cors');
// Settings
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/auth.routes'));
app.use(require('./routes/game.routes'));
app.use(require('./routes/player.routes'));
module.exports = app;