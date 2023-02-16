require('dotenv').config();
require('./db')
const app = require('./server');
const {PORT} = require('./config/config.js');
app.listen(PORT, () => {
    console.log('Server on port', PORT)
});