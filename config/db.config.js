// Import the dotenv package
const Sequelize = require('sequelize');

const dotenv = require('dotenv').config({path: '/Users/myadminuser/Desktop/bootcamp/repos/EmployeeTracker/.env'});




// Log environment variables to debug
// console.log('DB_NAME:', process.env.DB_NAME);
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_DIALECT:', process.env.DB_DIALECT);


// Load database credentials from environment variables
const sequelize = new Sequelize(

  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres', 
  }
);

module.exports = sequelize;
