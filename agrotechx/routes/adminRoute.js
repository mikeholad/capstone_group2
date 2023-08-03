const express = require('express');
const app = express();

// Import the adminRouter
const adminRouter = require('./AdminRoutes');

// Mount the adminRouter
app.use('/admin', adminRouter);

// Add other routes and middleware here

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
