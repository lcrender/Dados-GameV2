const {HOSTDB, USERDB, PASSDB, PORTDB, DATAB} = require('./config/config.js');
const pool = require('mysql2/promise').createPool({
    host: HOSTDB,
    user: USERDB,
    password: PASSDB,
    port: PORTDB,
    database: DATAB});

module.exports = pool;