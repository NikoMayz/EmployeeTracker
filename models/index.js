// models/index.js
const Department = require('./Department');
const Employee = require('./Employee');
const Role = require('./Role');

// Define associations
Department.hasMany(Employee, { foreignKey: 'department_id', onDelete: 'CASCADE' });
Employee.belongsTo(Department, { foreignKey: 'department_id' });

Role.hasMany(Employee, { foreignKey: 'role_id', onDelete: 'CASCADE' });
Employee.belongsTo(Role, { foreignKey: 'role_id' });

module.exports = { Department, Employee, Role };
