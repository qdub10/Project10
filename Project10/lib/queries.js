const pool = require('../config/database');

// Query to view all departments
const getAllDepartments = async () => {
  const query = 'SELECT * FROM department;';
  const { rows } = await pool.query(query);
  return rows;
};

// Query to view all roles
const getAllRoles = async () => {
  const query = `
    SELECT 
      role.id, 
      role.title, 
      role.salary, 
      department.name AS department 
    FROM role
    JOIN department ON role.department_id = department.id;
  `;
  const { rows } = await pool.query(query);
  return rows;
};

// Query to view all employees
const getAllEmployees = async () => {
  const query = `
    SELECT 
      e.id,
      e.first_name,
      e.last_name,
      role.title AS job_title,
      department.name AS department,
      role.salary,
      CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    JOIN role ON e.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee m ON e.manager_id = m.id;
  `;
  const { rows } = await pool.query(query);
  return rows;
};

// Query to add a department
const addDepartment = async (name) => {
  const query = 'INSERT INTO department (name) VALUES ($1) RETURNING *;';
  const values = [name];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Query to add a role
const addRole = async (title, salary, department_id) => {
  const query = `
    INSERT INTO role (title, salary, department_id)
    VALUES ($1, $2, $3) RETURNING *;
  `;
  const values = [title, salary, department_id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Query to add an employee
const addEmployee = async (first_name, last_name, role_id, manager_id) => {
  const query = `
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ($1, $2, $3, $4) RETURNING *;
  `;
  const values = [first_name, last_name, role_id, manager_id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Query to update an employee role
const updateEmployeeRole = async (employee_id, new_role_id) => {
  const query = `
    UPDATE employee
    SET role_id = $1
    WHERE id = $2 RETURNING *;
  `;
  const values = [new_role_id, employee_id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
