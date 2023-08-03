const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// User Routes
const userRouter = require('./userRoutes');
app.use('/api/v1/user', userRouter);

// Admin Routes
const adminRouter = require('./adminRoutes');
app.use('/api/v1/admin', adminRouter);

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
