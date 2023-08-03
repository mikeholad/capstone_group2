const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./userdb');
const models = require('../../models');
const jwt = require('jsonwebtoken');

const User = models.users;

const userRouter = express.Router();

// ... other routes ...

userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    } else {
      // Generate a token and send it to the front end
      const token = generateToken(email);
      return res.json({ token: token });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to generate a token
const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_TOKEN, { expiresIn: '3000s' });
};

module.exports = userRouter;
