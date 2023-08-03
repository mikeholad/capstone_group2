// userdb.js
const mysql = require('mysql');

// Create a MySQL connection pool
const userPool = mysql.createConnection({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'agrotechx',
});

// Export the userPool to make it accessible in other files
module.exports = userPool;
