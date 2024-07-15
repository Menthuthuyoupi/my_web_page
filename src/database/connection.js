const { Pool } = require('pg')
require('dotenv').config()

const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE } = process.env

const database = new Pool({
    user: PGUSER,
    host: PGHOST,
    password: PGPASSWORD,
    database: PGDATABASE,
    allowExitIdle: true
})

module.exports = database