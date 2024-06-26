// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/db.config');


const Department = require('./Department');
const Employee = require('./Employee');
const Role = require('./Role');

// Define associations
Department.hasMany(Role, { foreignKey: 'department_id', onDelete: 'CASCADE' });
Role.belongsTo(Department, { foreignKey: 'department_id' });

Role.hasMany(Employee, { foreignKey: 'role_id', onDelete: 'CASCADE' });
Employee.belongsTo(Role, { foreignKey: 'role_id' });

Employee.hasMany(Employee, {as: 'Subordinate', foreignKey: 'manager_id', onDelete: 'SET NULL' });
Employee.belongsTo(Employee, {as: 'Manager', foreignKey: 'manager_id'});

// Sync all models
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error creating database & tables:', err);
  });

module.exports = { Department, Employee, Role, sequelize };
