const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import jwt module
const app = express();
const port = 3000;

// ...

// User Router
const userRouter = require('./path/to/userRoutes'); // Make sure to provide the correct path to userRoutes.js
const authController = require('./path/to/auth.controller'); // Import the auth.controller.js

// ...

// Apply the authMiddleware to the routes you want to protect
app.get('/home', authController.authMiddleware, (req, res) => {
  // Retrieve data from the database or perform any other operations
  res.json({ message: 'Welcome to the home page' });
});

app.get('/services', authController.authMiddleware, (req, res) => {
  // Retrieve data from the database or perform any other operations
  res.json({ message: 'This is the services page' });
});

// Mounting the routers
app.use('/api/v1/user', userRouter);
// ...

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
