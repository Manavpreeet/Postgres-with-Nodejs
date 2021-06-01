const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password: "newsecret",
    database: "employ_department",
    host: "localhost",
    port: 5432
})

module.exports = pool