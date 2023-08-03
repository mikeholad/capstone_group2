// Import required packages
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

// Create Express app
const app = express();

// Database Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name',
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database.');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Password Hashing
const saltRounds = 10;

// Sign Up Endpoint
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password before saving it to the database
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error('Error hashing password: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Save the username, email, and hashed password to the database
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    connection.query(query, [username, email, hash], (err, result) => {
      if (err) {
        console.error('Error creating user: ', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.status(201).json({ message: 'User created successfully' });
    });
  });
});

// Login Endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Fetch the user's hashed password from the database
  const query = 'SELECT id, password FROM users WHERE username = ?';
  connection.query(query, [username], (err, result) => {
    if (err) {
      console.error('Error fetching user: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (result.length === 0) {
      // User not found
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const hashedPassword = result[0].password;

    // Compare the provided password with the hashed password
    bcrypt.compare(password, hashedPassword, (err, match) => {
      if (err) {
        console.error('Error comparing passwords: ', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (!match) {
        // Passwords don't match
        res.status(401).json({ error: 'Authentication failed' });
        return;
      }

      // Passwords match, user is authenticated
      const userId = result[0].id;
      // You can generate a JWT token here and send it in the response
      res.json({ message: 'Authentication successful', userId });
    });
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
