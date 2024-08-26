const pool = require('./db');

/**
 * Get all departments
 */
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

// Export all functions
module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
};