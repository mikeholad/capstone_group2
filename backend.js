const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000; // Change this to the desired port number

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database (for demonstration purposes, we'll use a simple array to store users)
const users = [];

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if user already exists
    if (users.find((user) => user.email === email)) {
      return res.status(409).json({ error: 'User already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save the user in the "database"
    users.push({ username, email, password: hashedPassword });
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user in the "database" based on the provided email
    const user = users.find((user) => user.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Home endpoint
app.get('/home', (req, res) => {
  // Retrieve data from the database or perform any other operations
  res.json({ message: 'Welcome to the home page' });
});

// Services endpoint
app.get('/services', (req, res) => {
  // Retrieve data from the database or perform any other operations
  res.json({ message: 'This is the services page' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
