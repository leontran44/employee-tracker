const pool = require('./db');


const getAllDepartments = async () => {
    const result = await pool.query('SELECT * FROM department ORDER BY id');
    return result.rows;
};


const getAllRoles = async () => {
    const result = await pool.query(
        `SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        JOIN department ON role.department_id = department.id
        ORDER BY role.id`
    );
    return result.rows;
};


const getAllEmployees = async () => {
    const result = await pool.query(
        `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary,
                CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        JOIN role ON e.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON e.manager_id = m.id
        ORDER BY e.id`
    );
    return result.rows;
};


const addDepartment = async (name) => {
    const result = await pool.query(
        'INSERT INTO department (name) VALUES ($1) RETURNING *',
        [name]
    );
    return result.rows[0];
};


const addRole = async (title, salary, department_id) => {
    const result = await pool.query(
        'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *',
        [title, salary, department_id]
    );
    return result.rows[0];
};


const addEmployee = async (first_name, last_name, role_id, manager_id) => {
    const result = await pool.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [first_name, last_name, role_id, manager_id || null]
    );
    return result.rows[0];
};


const updateEmployeeRole = async (employee_id, role_id) => {
    const result = await pool.query(
        'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *',
        [role_id, employee_id]
    );
    return result.rows[0];
};

const updateEmployeeManager = async (employee_id, manager_id) => {
    const result = await pool.query(
        'UPDATE employee SET manager_id = $1 WHERE id = $2 RETURNING *',
        [manager_id || null, employee_id]
    );
    return result.rows[0];
};

const getEmployeesByManager = async (manager_id) => {
    const result = await pool.query(
        `SELECT e.id, e.first_name, e.last_name, role.title AS role, department.name AS department, role.salary
        FROM employee e
        JOIN role ON e.role_id = role.id
        JOIN department ON role.department_id = department.id
        WHERE e.manager_id = $1
        ORDER BY e.id`,
        [manager_id]
    );
    return result.rows;
};

const getEmployeesByDepartment = async (department_id) => {
    const result = await pool.query(
        `SELECT e.id, e.first_name, e.last_name, role.title AS role, role.salary,
                CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        JOIN role ON e.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON e.manager_id = m.id
        WHERE department.id = $1
        ORDER BY e.id`,
        [department_id]
    );
    return result.rows;
};


const deleteDepartment = async (department_id) => {
    await pool.query('DELETE FROM department WHERE id = $1', [department_id]);
};

const deleteRole = async (role_id) => {
    await pool.query('DELETE FROM role WHERE id = $1', [role_id]);
};

const deleteEmployee = async (employee_id) => {
    await pool.query('DELETE FROM employee WHERE id = $1', [employee_id]);
};

const getDepartmentBudget = async (department_id) => {
    const result = await pool.query(
        `SELECT department.name AS department, SUM(role.salary) AS total_budget
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        WHERE department.id = $1
        GROUP BY department.name`,
        [department_id]
    );
    return result.rows[0];
};

module.exports = {
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
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    getDepartmentBudget,
};