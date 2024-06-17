const sequelize = require('../config/db.config');
const { Department, Employee, Role } = require('../models');
const inquirer = require('inquirer');
const Table = require('cli-table3');

// View all departments
const viewDepartments = async () => {
    try {
        const departments = await Department.findAll({ raw: true });
        const table = new Table({
            head: ['ID', 'Name'],
            colWidths: [10, 30]
        });

        departments.forEach(department => {
            table.push([department.id, department.name]);
        });

        console.log(table.toString());
    } catch (err) {
        console.error('Error viewing departments:', err);
    }
};

// View all roles
const viewRoles = async () => {
    try {
        const roles = await Role.findAll({ raw: true });
        const table = new Table({
            head: ['ID', 'Title', 'Salary', 'Department ID'],
            colWidths: [10, 20, 20, 20]
        });

        roles.forEach(role => {
            table.push([role.id, role.title, role.salary, role.department_id]);
        });

        console.log(table.toString());
    } catch (err) {
        console.error('Error viewing roles:', err);
    }
};

// View all employees
const viewEmployees = async () => {
    try {
        const employees = await Employee.findAll({  
            include: [{
                model: Role,
                attributes: ['salary']
            }],
            raw: true,
            nest: true
        })

        const table = new Table({
            head: ['ID', 'First Name', 'Last Name', 'Role ID', 'Manager ID', 'Role_Salary'],
            colWidths: [10, 20, 20, 20, 20]
        });

        employees.forEach(employee => {
            table.push([employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, employee.role.salary]);
        });

        console.log(table.toString());
    } catch (err) {
        console.error('Error viewing employees:', err);
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
        const employees = await Employee.findAll({ where: { manager_id: answer.manager_id }, raw: true });
        const table = new Table({
            head: ['ID', 'First Name', 'Last Name', 'Role ID', 'Manager ID'],
            colWidths: [10, 20, 20, 20, 20]
        });

        employees.forEach(employee => {
            table.push([employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id]);
        });

        console.log(table.toString());
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
                where: { department_id: answer.department_id },
                attributes: []
            },
            raw: true
        });
        const table = new Table({
            head: ['ID', 'First Name', 'Last Name', 'Role ID', 'Manager ID'],
            colWidths: [10, 20, 20, 20, 20]
        });

        employees.forEach(employee => {
            table.push([employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id]);
        });

        console.log(table.toString());
    } catch (err) {
        console.error('Error viewing employees by department:', err);
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

        const departmentId = answer.department_id;

        const totalBudget = await Department.findAll({
            where: { id: departmentId },
            attributes: [
                'name',
                [sequelize.fn('SUM', sequelize.col('roles.salary')), 'totalBudget']
            ],
            include: {
                model: Role,
                attributes: [],
                include: {
                    model: Employee,
                    attributes: []
                }
            },
            group: ['Department.id'],
            raw: true
        });

        if (totalBudget.length > 0) {
            console.log(`Total utilized budget for department ${departmentId}: ${totalBudget[0].totalBudget}`);
        } else {
            console.log('No data found for the specified department ID.');
        }
    } catch (err) {
        console.error('Error viewing total utilized budget:', err);
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
