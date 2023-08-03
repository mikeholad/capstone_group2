const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoute');
// const adminRoutes = require('./routes/adminRoute');
const models = require('./app/models');
const port = process.env.APP_PORT;

models.connection.sync().then(() => {
  console.log('synced');
}).catch(err => {
  console.log(err.message);
});

app.use(express.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('index', { message: 'Welcome to the homepage' });
});

app.use('/user', userRoutes);
// app.use('/admin', adminRoutes);

app.all('*', (req, res, next) => {
  res.send('Sorry, page not found');
});

app.listen(port, () => console.log(`Server is Listening on ${port}...`));
