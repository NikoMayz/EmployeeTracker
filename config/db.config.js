// Import the dotenv package
const Sequelize = require('sequelize');

const dotenv = require('dotenv').config({path: '/Users/myadminuser/Desktop/bootcamp/repos/EmployeeTracker/.env'});




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
