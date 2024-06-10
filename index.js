// Import required modules
const express = require('express');
const { sequelize } = require('./models');
const runMigrations = require('./migrations/migrationrunner');
const seedDatabase = require('./seeds/seed');
const { startApp } = require('./utils/inquirer');

// Create an Express app
const app = express();

// Define port
const PORT = process.env.PORT || 3000;

// Function to start the server
const startServer = async () => {
    try {
        // Connect to the database
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        // Run database migrations
        await runMigrations();

        // Seed the database
        await seedDatabase();

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            // Call inquirer prompts to interact with the user
            startApp();
        });
    } catch (error) {
        console.error('Error starting server:', error);
        // If there's an error, close the database connection and exit the process
        await sequelize.close();
        console.log('Connection to the database has been closed.');
        process.exit(1); // Exit with error code 1
    }
};

// Invoke the function to start the server
startServer();

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Not found middleware
app.use((req, res, next) => {
    res.status(404).send('Resource not found');
});
