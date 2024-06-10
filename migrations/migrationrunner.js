// const { Umzug, SequelizeStorage } = require('umzug');
// const sequelize = require('../config/db.config'); // Adjust path as needed

// const umzug = new Umzug({
//   migrations: {
//     path: 'migrations', // Adjust path to your migrations folder
//     params: [sequelize.getQueryInterface()], // Pass queryInterface directly
//   },
//   storage: new SequelizeStorage({
//     sequelize: sequelize,
//   }),
// });

// async function runMigrations() {
//   try {
//     await sequelize.authenticate(); // Ensure Sequelize is connected to the database
//     console.log('Connection to the database has been established successfully.');

//     const migrations = await umzug.up();
//     console.log('Migrations executed:', migrations.map(m => m.file));

//     // Close Sequelize connection after migrations
//     await sequelize.close();
//     console.log('Connection to the database has been closed.');

//   } catch (error) {
//     console.error('Error running migrations:', error);
//   }
// }

// runMigrations();


const { Umzug, SequelizeStorage } = require('umzug');
const sequelize = require('../config/db.config'); // Adjust path as needed
const path = require('path');

const migrationPath = path.resolve(__dirname, '../migrations'); // Resolve the path to the migrations folder

console.log('Resolved migration path:', migrationPath); // Debug log

const umzug = new Umzug({
  migrations: {
    // path: migrationPath,
    glob: `${migrationPath}/*.js`, // Use glob pattern directly

    params: [sequelize.getQueryInterface()], // Pass queryInterface directly
  },
  storage: new SequelizeStorage({
    sequelize: sequelize,
  }),
});

async function runMigrations() {
  try {
    await sequelize.authenticate(); // Ensure Sequelize is connected to the database
    console.log('Connection to the database has been established successfully.');

    const pendingMigrations = await umzug.pending();
    console.log('Pending migrations:', pendingMigrations.map(m => m.file)); // Debug log

    const migrations = await umzug.up();
    console.log('Migrations executed:', migrations.map(m => m.file));

    // Close Sequelize connection after migrations
    await sequelize.close();
    console.log('Connection to the database has been closed.');

  } catch (error) {
    console.error('Error running migrations:', error);
  }
}

runMigrations();
