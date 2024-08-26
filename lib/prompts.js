const inquirer = require('inquirer');
const cTable = require('console.table');
const {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    getEmployeesByManager,
    getEmployeesByDepartment,
    deleteDepartment, deleteRole, deleteEmployee,
    getDepartmentBudget
} = require('./queries');


const mainMenu = async () => {
    const { action } = await inquirer.prompt([
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
            'View Department Budget',
            'Exit',
        ],
        },
    ]);

switch (action) {
    case 'View All Departments':
        return viewAllDepartments();
    case 'View All Roles':
        return viewAllRoles();
    case 'View All Employees':
        return viewAllEmployees();
    case 'Add Department':
        return promptAddDepartment();
    case 'Add Role':
        return promptAddRole();
    case 'Add Employee':
        return promptAddEmployee();
    case 'Update Employee Role':
        return promptUpdateEmployeeRole();
    case 'Update Employee Manager':
        return promptUpdateEmployeeManager();
    case 'View Employees by Manager':
        return viewEmployeesByManager();
    case 'View Employees by Department':
        return viewEmployeesByDepartment();
    case 'Delete Department':
        return promptDeleteDepartment();
    case 'Delete Role':
        return promptDeleteRole();
    case 'Delete Employee':
        return promptDeleteEmployee();
    case 'View Department Budget':
        return viewDepartmentBudget();
    case 'Exit':
        return exitApplication();
    default:
        console.log('Invalid action!');
        return mainMenu();
    }
};


const viewAllDepartments = async () => {
    const departments = await getAllDepartments();
    console.table(departments);
    return mainMenu();
};


const viewAllRoles = async () => {
    const roles = await getAllRoles();
    console.table(roles);
    return mainMenu();
};


const viewAllEmployees = async () => {
    const employees = await getAllEmployees();
    console.table(employees);
    return mainMenu();
};


const promptAddDepartment = async () => {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the new department:',
            validate: (input) => (input ? true : 'Department name cannot be empty.'),
        },
    ]);

    await addDepartment(name);
    console.log(`Added ${name} department successfully.`);
    return mainMenu();
};


const promptAddRole = async () => {
    const departments = await getAllDepartments();

    const { title, salary, department_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the new role:',
            validate: (input) => (input ? true : 'Role title cannot be empty.'),
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Enter the salary for the new role:',
            validate: (input) => (input > 0 ? true : 'Salary must be a positive number.'),
        },
        {
        type: 'list',
        name: 'department_id',
        message: 'Select the department for the new role:',
        choices: departments.map((dept) => ({
            name: dept.name,
            value: dept.id,
            })),
        },
    ]);

    await addRole(title, salary, department_id);
    console.log(`Added ${title} role successfully.`);
    return mainMenu();
};


const promptAddEmployee = async () => {
    const roles = await getAllRoles();
    const employees = await getAllEmployees();

    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "Enter the employee's first name:",
            validate: (input) => (input ? true : "First name cannot be empty."),
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Enter the employee's last name:",
            validate: (input) => (input ? true : "Last name cannot be empty."),
        },
        {
            type: 'list',
            name: 'role_id',
            message: "Select the employee's role:",
            choices: roles.map((role) => ({
                name: role.title,
                value: role.id,
            })),
        },
        {
            type: 'list',
            name: 'manager_id',
            message: "Select the employee's manager:",
            choices: [
                { name: 'None', value: null },
                ...employees.map((emp) => ({
                name: `${emp.first_name} ${emp.last_name}`,
                value: emp.id,
                })),
            ],
        },
    ]);

    await addEmployee(first_name, last_name, role_id, manager_id);
    console.log(`Added ${first_name} ${last_name} successfully.`);
    return mainMenu();
};


const promptUpdateEmployeeRole = async () => {
    const employees = await getAllEmployees();
    const roles = await getAllRoles();

    const { employee_id, role_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: "Select the employee whose role you want to update:",
            choices: employees.map((emp) => ({
            name: `${emp.first_name} ${emp.last_name}`,
            value: emp.id,
            })),
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the new role:',
            choices: roles.map((role) => ({
                name: role.title,
                value: role.id,
            })),
        },
    ]);

    await updateEmployeeRole(employee_id, role_id);
    console.log("Employee's role updated successfully.");
    return mainMenu();
};

const promptUpdateEmployeeManager = async () => {
    const employees = await getAllEmployees();
    const { employee_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: "Select the employee whose manager you want to update:",
            choices: employees.map((emp) => ({
            name: `${emp.first_name} ${emp.last_name}`,
            value: emp.id,
            })),
        },
    ]);

    const managers = employees.filter((emp) => emp.id !== employee_id);
    const { manager_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'manager_id',
            message: 'Select the new manager:',
            choices: [
            { name: 'None', value: null },
            ...managers.map((mgr) => ({
                name: `${mgr.first_name} ${mgr.last_name}`,
                value: mgr.id,
            })),
            ],
        },
    ]);

    await updateEmployeeManager(employee_id, manager_id);
    console.log("Employee's manager updated successfully.");
    return mainMenu();
};

const viewEmployeesByManager = async () => {
    const employees = await getAllEmployees();
    const managers = employees.filter((emp) => emp.manager !== null);
    const { manager_id } = await inquirer.prompt([
    {
        type: 'list',
        name: 'manager_id',
        message: 'Select a manager to view their direct reports:',
        choices: [
        ...new Set(
            managers.map((mgr) => ({
                name: mgr.manager,
                value: mgr.manager_id,
                }))
            ),
        ],
    },
    ]);

    const employeesByManager = await getEmployeesByManager(manager_id);
    if (employeesByManager.length === 0) {
        console.log('This manager has no direct reports.');
    } else {
        console.table(employeesByManager);
    }
    return mainMenu();
};

const viewEmployeesByDepartment = async () => {
    const departments = await getAllDepartments();
    const { department_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            message: 'Select a department to view its employees:',
            choices: departments.map((dept) => ({
                name: dept.name,
                value: dept.id,
            })),
        },
    ]);

    const employeesByDepartment = await getEmployeesByDepartment(department_id);
    if (employeesByDepartment.length === 0) {
        console.log('No employees found in this department.');
    } else {
        console.table(employeesByDepartment);
    }
    return mainMenu();
};

const promptDeleteDepartment = async () => {
    const departments = await getAllDepartments();

    const { department_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            message: 'Select the department to delete:',
            choices: departments.map((dept) => ({
                name: dept.name,
                value: dept.id,
            })),
        },
    ]);

    await deleteDepartment(department_id);
    console.log('Department deleted successfully.');
    return mainMenu();
};


const promptDeleteRole = async () => {
    const roles = await getAllRoles();

    const { role_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the role to delete:',
            choices: roles.map((role) => ({
                name: role.title,
                value: role.id,
            })),
        },
    ]);

    await deleteRole(role_id);
    console.log('Role deleted successfully.');
    return mainMenu();
};

const promptDeleteEmployee = async () => {
    const employees = await getAllEmployees();
    const { employee_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select the employee to delete:',
            choices: employees.map((emp) => ({
                name: `${emp.first_name} ${emp.last_name}`,
                value: emp.id,
            })),
        },
    ]);

    await deleteEmployee(employee_id);
    console.log('Employee deleted successfully.');
    return mainMenu();
};

const viewDepartmentBudget = async () => {
    const departments = await getAllDepartments();

    const { department_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            message: 'Select a department to view its total utilized budget:',
            choices: departments.map((dept) => ({
                name: dept.name,
                value: dept.id,
            })),
        },
    ]);

    const budget = await getDepartmentBudget(department_id);

    if (budget) {
        console.log(
            `The total utilized budget for ${budget.department} department is $${budget.total_budget}.`
        );
    } else {
        console.log('No employees found in this department.');
    }
    return mainMenu();
};

const exitApplication = () => {
    console.log('Goodbye!');
    process.exit();
};


module.exports = { mainMenu };