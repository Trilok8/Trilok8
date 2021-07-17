const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'expressjsPractice',
    password: 'boyapalli'
});

module.exports = pool.promise();