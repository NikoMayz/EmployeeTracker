// const inquirer = require('inquirer');
// const { 
//     viewDepartments, 
//     viewRoles, 
//     viewEmployees, 
//     addDepartment, 
//     addRole, 
//     addEmployee, 
//     updateEmployeeRole,
//     updateEmployeeManager,
//     viewEmployeesByManager,
//     viewEmployeesByDepartment,
//     deleteDepartment,
//     deleteRole,
//     deleteEmployee,
//     viewTotalUtilizedBudget
// } = require('./functions'); 

// const startApp = () => {
//     inquirer.prompt([
//         {
//             type: 'list',
//             name: 'action',
//             message: 'What would you like to do?',
//             choices: [
//                 'View All Departments',
//                 'View All Roles',
//                 'View All Employees',
//                 'Add Department',
//                 'Add Role',
//                 'Add Employee',
//                 'Update Employee Role',
//                 'Update Employee Manager',
//                 'View Employees by Manager',
//                 'View Employees by Department',
//                 'Delete Department',
//                 'Delete Role',
//                 'Delete Employee',
//                 'View Total Utilized Budget of a Department',
//                 'Exit'
//             ]
//         }
//     ]).then(answer => {
//         switch (answer.action) {
//             case 'View All Departments':
//                 viewDepartments().then(() => startApp());
//                 break;
//             case 'View All Roles':
//                 viewRoles().then(() => startApp());
//                 break;
//             case 'View All Employees':
//                 viewEmployees().then(() => startApp());
//                 break;
//             case 'Add Department':
//                 addDepartment().then(() => startApp());
//                 break;
//             case 'Add Role':
//                 addRole().then(() => startApp());
//                 break;
//             case 'Add Employee':
//                 addEmployee().then(() => startApp());
//                 break;
//             case 'Update Employee Role':
//                 updateEmployeeRole().then(() => startApp());
//                 break;
//             case 'Update Employee Manager':
//                 updateEmployeeManager().then(() => startApp());
//                 break;
//             case 'View Employees by Manager':
//                 viewEmployeesByManager().then(() => startApp());
//                 break;
//             case 'View Employees by Department':
//                 viewEmployeesByDepartment().then(() => startApp());
//                 break;
//             case 'Delete Department':
//                 deleteDepartment().then(() => startApp());
//                 break;
//             case 'Delete Role':
//                 deleteRole().then(() => startApp());
//                 break;
//             case 'Delete Employee':
//                 deleteEmployee().then(() => startApp());
//                 break;
//             case 'View Total Utilized Budget of a Department':
//                 viewTotalUtilizedBudget().then(() => startApp());
//                 break;
//             case 'Exit':
//                 console.log('Goodbye!');
//                 process.exit();
//         }
//     });
// };

// startApp();

const inquirer = require('inquirer');
const { 
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
} = require('./functions');

// Function to display ASCII emoji and welcome message
const displayWelcomeMessage = () => {
    console.log(`
  ██████╗ ███████╗███████╗██╗   ██╗███████╗ ██████╗ ██╗██████╗ 
  ██╔══██╗██╔════╝██╔════╝██║   ██║██╔════╝██╔═══██╗██║██╔══██╗
  ██████╔╝█████╗  █████╗  ██║   ██║█████╗  ██║   ██║██║██████╔╝
  ██╔══██╗██╔══╝  ██╔══╝  ██║   ██║██╔══╝  ██║   ██║██║██╔═══╝ 
  ██████╔╝███████╗██║     ╚██████╔╝███████╗╚██████╔╝██║██║     
  ╚═════╝ ╚══════╝╚═╝      ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝╚═╝     
  
                Welcome to the Employee Manager!
  `);
};

const startApp = () => {
    displayWelcomeMessage();
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'View Employees by Manager',
                'View Employees by Department',
                'Delete Department',
                'Delete Role',
                'Delete Employee',
                'View Total Utilized Budget of a Department',
                'Exit'
            ]
        }
    ]).then(answer => {
        switch (answer.action) {
            case 'View All Departments':
                viewDepartments().then(() => startApp());
                break;
            case 'View All Roles':
                viewRoles().then(() => startApp());
                break;
            case 'View All Employees':
                viewEmployees().then(() => startApp());
                break;
            case 'Add Department':
                addDepartment().then(() => startApp());
                break;
            case 'Add Role':
                addRole().then(() => startApp());
                break;
            case 'Add Employee':
                addEmployee().then(() => startApp());
                break;
            case 'Update Employee Role':
                updateEmployeeRole().then(() => startApp());
                break;
            case 'Update Employee Manager':
                updateEmployeeManager().then(() => startApp());
                break;
            case 'View Employees by Manager':
                viewEmployeesByManager().then(() => startApp());
                break;
            case 'View Employees by Department':
                viewEmployeesByDepartment().then(() => startApp());
                break;
            case 'Delete Department':
                deleteDepartment().then(() => startApp());
                break;
            case 'Delete Role':
                deleteRole().then(() => startApp());
                break;
            case 'Delete Employee':
                deleteEmployee().then(() => startApp());
                break;
            case 'View Total Utilized Budget of a Department':
                viewTotalUtilizedBudget().then(() => startApp());
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit();
        }
        console.log('\n'); // Add some space at the bottom for better readability
    });
};


// Start the app
module.exports = {
    startApp
};