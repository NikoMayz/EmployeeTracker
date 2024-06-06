const express = require('express');
const routes = require('./routes/api');

const app = express();

// Use JSON middleware
app.use(express.json());

// Use routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Not found middleware
app.use((req, res, next) => {
  res.status(404).send('Resource not found');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
