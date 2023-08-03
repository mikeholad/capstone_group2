const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./userdb');
const models = require('../../models');

const User = models.users;

const userRouter = express.Router();

// ... other routes ...

userRouter.post('/register', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Validate required fields
  if (!first_name || !last_name || !email || !password) {
    return res.status(422).json({ message: 'All fields are required' });
  }

  try {
    // Check if the email already exists in the database
    const emailExists = await User.findOne({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      return res.status(422).json({ message: 'This email address is taken' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user in the database
    await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword,
    });

    return res.json({ message: 'Welcome for reg' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = userRouter;
