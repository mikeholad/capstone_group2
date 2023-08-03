const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./userdb');

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
  // Use the "db" connection pool to interact with the database for user registration
});

userRouter.post('/login', async (req, res) => {
  // Use the "db" connection pool to interact with the database for user login
});

module.exports = userRouter;
