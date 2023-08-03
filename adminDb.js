// adminRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const adminDb = require('./adminDb'); // Import the admin database connection

const adminRouter = express.Router();

// Define the route for admin registration
adminRouter.post('/register', async (req, res) => {
  // Handle the admin registration logic here
});

// Define other admin routes here if needed

module.exports = adminRouter;
