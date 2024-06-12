const express = require('express');
const app = express();
const routes = require('./routes');
const { startApp } = require('./utils/inquirer');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(routes);

// Start the inquirer prompt
startApp();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
