const databaseName = 'befitting-urial'
const connectionString = process.env.DATABASE_URL || `postgress://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')()
const db = pgp(connectionString)


module.exports = db
