// require dotenv
require('dotenv');

// initialize mysql
const { Sequelize, DataTypes } = require('sequelize');

// create connection
const connection = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};
db.connection = connection;
db.DataTypes = DataTypes;

// define every parameter
db.users = require('./user.model')(connection, DataTypes);

// allow new models to be added

// export a connection instance
module.exports = db;