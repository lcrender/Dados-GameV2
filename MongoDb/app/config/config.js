const {config} = require('dotenv');
config();
const HOST = process.env.HOSTDB;
const USERDB = process.env.USERDB;
const PASSDB = process.env.PASSDB;
const PORTDB = process.env.PORTDB;
const DATAB = process.env.DATAB;
const PORT = process.env.PORT;
const JWTSECRET = process.env.JWTSECRET;

module.exports = { HOST, USERDB, PASSDB, PORTDB, DATAB, PORT, JWTSECRET}