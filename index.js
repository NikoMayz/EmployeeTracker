// testConnection.js

// Import the sequelize instance from db.config.js
const sequelize = require('./config/db.config');

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })
  .finally(() => {
    sequelize.close();
  });
