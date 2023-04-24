const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'rootroot',
    database: 'finance_plan_db',
})

module.exports = db
