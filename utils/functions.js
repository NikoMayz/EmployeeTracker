const inquirer = require('inquirer');
const sequelize = require('../config/db.config');

const { Department, Employee, Role } = require('../models');

// View all departments
const viewDepartments = async () => {
    try {
        const departments = await Department.findAll();
        console.table(departments.map(department => department.get({ plain: true })));
    } catch (err) {
        console.error('Error viewing departments:', err);
    }
};

// View all roles
const viewRoles = async () => {
    try {
        const roles = await Role.findAll();
        console.table(roles.map(role => role.get({ plain: true })));
    } catch (err) {
        console.error('Error viewing roles:', err);
    }
};

// View all employees
const viewEmployees = async () => {
    try {
        const employees = await Employee.findAll();
        console.table(employees.map(employee => employee.get({ plain: true })));
    } catch (err) {
        console.error('Error viewing employees:', err);
    }
};

// Add a department
const addDepartment = async () => {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the name of the department:'
            }
        ]);
        await Department.create({ name: answer.name });
        console.log('Department added successfully');
    } catch (err) {
        console.error('Error adding department:', err);
    }
};

// Add a role
const addRole = async () => {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title of the role:'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for the role:'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter the department ID for the role:'
            }
        ]);
        await Role.create({
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department_id
        });
        console.log('Role added successfully');
    } catch (err) {
        console.error('Error adding role:', err);
    }
};

// Add an employee
const addEmployee = async () => {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the first name of the employee:'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the last name of the employee:'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter the role ID for the employee:'
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter the manager ID for the employee (leave blank if none):'
            }
        ]);
        await Employee.create({
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role_id,
            manager_id: answer.manager_id || null
        });
        console.log('Employee added successfully');
    } catch (err) {
        console.error('Error adding employee:', err);
    }
};

// Update an employee role
const updateEmployeeRole = async () => {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'Enter the ID of the employee you want to update:'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter the new role ID for the employee:'
            }
        ]);
        await Employee.update({ role_id: answer.role_id }, { where: { id: answer.employee_id } });
        console.log('Employee role updated successfully');
    } catch (err) {
        console.error('Error updating employee role:', err);
    }
};

// Update an employee manager
const updateEmployeeManager = async () => {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'Enter the ID of the employee you want to update:'
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter the new manager ID for the employee:'
            }
        ]);
        await Employee.update({ manager_id: answer.manager_id }, { where: { id: answer.employee_id } });
        console.log('Employee manager updated successfully');
    } catch (err) {
        console.error('Error updating employee manager:', err);
    }
};

// View employees by manager
const viewEmployeesByManager = async () => {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter the manager ID to view their employees:'
            }
        ]);
        const employees = await Employee.findAll({ where: { manager_id: answer.manager_id } });
        console.table(employees.map(employee => employee.get({ plain: true })));
    } catch (err) {
        console.error('Error viewing employees by manager:', err);
    }
};

// View employees by department
const viewEmployeesByDepartment = async () => {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter the department ID to view its employees:'
            }
        ]);
        const employees = await Employee.findAll({
            include: {
                model: Role,
                where: { department_id: answer.department_id }
            }
        });
        console.table(employees.map(employee => employee.get({ plain: true })));
    } catch (err) {
        console.error('Error viewing employees by department:', err);
    }
};

// Delete a department
const deleteDepartment = async () => {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter the ID of the department you want to delete:'
            }
        ]);
        await Department.destroy({ where: { id: answer.department_id } });
        console.log('Department deleted successfully');
    } catch (err) {
        console.error('Error deleting department:', err);
    }
};

// Delete a role
const deleteRole = async () => {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter the ID of the role you want to delete:'
            }
        ]);
        await Role.destroy({ where: { id: answer.role_id } });
        console.log('Role deleted successfully');
    } catch (err) {
        console.error('Error deleting role:', err);
    }
};

// Delete an employee
const deleteEmployee = async () => {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'Enter the ID of the employee you want to delete:'
            }
        ]);
        await Employee.destroy({ where: { id: answer.employee_id } });
        console.log('Employee deleted successfully');
    } catch (err) {
        console.error('Error deleting employee:', err);
    }
};

// View total utilized budget of a department
const viewTotalUtilizedBudget = async () => {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter the department ID to view its total utilized budget:'
            }
        ]);
        const totalBudget = await Department.findAll({
            attributes: ['name', [sequelize.fn('SUM', sequelize.col('Roles.salary')), 'totalBudget']],
            include: {
                model: Role,
                attributes: [], // We do not need any additional attributes from the Role model
                include: {
                    model: Employee,
                    attributes: [] // We do not need any additional attributes from the Employee model
                }
            },
            group: ['Department.id'],
            raw: true // Get raw data to access the sum
        });
        
        console.log(`Total utilized budget for department ${answer.department_id}: ${totalBudget[0].totalBudget}`);
        } catch (err) {
            console.error('Error viewing total utilized budget:', err);
        }
        
        
        
};

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    viewEmployeesByManager,
    viewEmployeesByDepartment,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    viewTotalUtilizedBudget
};
