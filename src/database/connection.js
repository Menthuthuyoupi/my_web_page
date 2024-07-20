const { Pool } = require('pg')
require('dotenv').config()

const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT } = process.env

const database = new Pool({
    user: PGUSER,
    host: PGHOST,
    password: PGPASSWORD,
    database: PGDATABASE,
    port: PGPORT,
    allowExitIdle: true
})

module.exports = database