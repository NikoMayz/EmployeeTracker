const fs = require('fs');
const { Department, Employee, Role } = require('../models/index');

// Read JSON files
const departments = JSON.parse(fs.readFileSync('./seeds/departments.json','utf-8'));
const employees = JSON.parse(fs.readFileSync('./seeds/employees.json', 'utf8'));
const roles = JSON.parse(fs.readFileSync('./seeds/roles.json', 'utf8'));

// Function to insert department data
const insertDepartments = async () => {
  try {
    for (const department of departments) {
      // Check if department already exists
      const existingDepartment = await Department.findOne({ where: { name: department.name } });
      if (!existingDepartment) {
        // Insert department if it doesn't exist
        await Department.create(department);
        console.log(`Department "${department.name}" inserted.`);
      } else {
        console.log(`Department "${department.name}" already exists. Skipping...`);
      }
    }
  } catch (error) {
    console.error('Error inserting departments:', error);
  }
};

// Function to insert employee data
const insertEmployees = async () => {
  try {
    for (const employee of employees) {
      // Check if employee already exists
      const existingEmployee = await Employee.findOne({ where: { first_name: employee.first_name, last_name: employee.last_name } });
      if (!existingEmployee) {
        // Insert employee if it doesn't exist
        await Employee.create(employee);
        console.log(`Employee "${employee.first_name} ${employee.last_name}" inserted.`);
      } else {
        console.log(`Employee "${employee.first_name} ${employee.last_name}" already exists. Skipping...`);
      }
    }
  } catch (error) {
    console.error('Error inserting employees:', error);
  }
};

// Function to insert role data
const insertRoles = async () => {
  try {
    for (const role of roles) {
      // Check if role already exists
      const existingRole = await Role.findOne({ where: { title: role.title } });
      if (!existingRole) {
        // Insert role if it doesn't exist
        await Role.create(role);
        console.log(`Role "${role.title}" inserted.`);
      } else {
        console.log(`Role "${role.title}" already exists. Skipping...`);
      }
    }
  } catch (error) {
    console.error('Error inserting roles:', error);
  }
};

// Insert data into database
const seedDatabase = async () => {
  await insertDepartments();
  await insertRoles();
  await insertEmployees();
  console.log('Seed data insertion completed.');
};

// Run seedDatabase function
seedDatabase();
