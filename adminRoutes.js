const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./userdb');

const adminRouter = express.Router();

adminRouter.post('/register', async (req, res) => {
  // Use the "db" connection pool to interact with the database for admin registration
});

adminRouter.post('/login', async (req, res) => {
  // Use the "db" connection pool to interact with the database for admin login
});

module.exports = adminRouter;
