const inquirer = require('inquirer');
const { query } = require('./db');

const mainMenu = async () => {
  const { choice } = await inquirer.prompt({
    name: 'choice',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add Department',
      'Add Role',
      'Add Employee',
      'Update Employee Role',
      'Exit',
    ],
  });

  switch (choice) {
    case 'View All Departments':
      return viewDepartments();
    case 'View All Roles':
      return viewRoles();
    case 'View All Employees':
      return viewEmployees();
    case 'Add Department':
      return addDepartment();
    case 'Add Role':
      return addRole();
    case 'Add Employee':
      return addEmployee();
    case 'Update Employee Role':
      return updateEmployeeRole();
    case 'Exit':
      process.exit();
  }
};

const viewDepartments = async () => {
  const departments = await query('SELECT * FROM department');
  console.table(departments);
  mainMenu();
};

const viewRoles = async () => {
  const roles = await query(
    `SELECT role.id, role.title, department.name AS department, role.salary 
     FROM role 
     JOIN department ON role.department_id = department.id`
  );
  console.table(roles);
  mainMenu();
};

const viewEmployees = async () => {
  const employees = await query(
    `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, 
      COALESCE(m.first_name || ' ' || m.last_name, 'None') AS manager 
     FROM employee e 
     JOIN role ON e.role_id = role.id 
     JOIN department ON role.department_id = department.id 
     LEFT JOIN employee m ON e.manager_id = m.id`
  );
  console.table(employees);
  mainMenu();
};

const addDepartment = async () => {
  const { name } = await inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter the name of the new department:',
  });

  await query('INSERT INTO department (name) VALUES ($1)', [name]);
  console.log(`Added department: ${name}`);
  mainMenu();
};

const addRole = async () => {
  const departments = await query('SELECT * FROM department');
  const { title, salary, departmentId } = await inquirer.prompt([
    { name: 'title', type: 'input', message: 'Enter role title:' },
    { name: 'salary', type: 'input', message: 'Enter role salary:' },
    {
      name: 'departmentId',
      type: 'list',
      message: 'Select department:',
      choices: departments.map(d => ({ name: d.name, value: d.id })),
    },
  ]);

  await query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
  console.log(`Added role: ${title}`);
  mainMenu();
};

const addEmployee = async () => {
  const roles = await query('SELECT * FROM role');
  const employees = await query('SELECT * FROM employee');

  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    { name: 'firstName', type: 'input', message: 'Enter first name:' },
    { name: 'lastName', type: 'input', message: 'Enter last name:' },
    {
      name: 'roleId',
      type: 'list',
      message: 'Select role:',
      choices: roles.map(r => ({ name: r.title, value: r.id })),
    },
    {
      name: 'managerId',
      type: 'list',
      message: 'Select manager:',
      choices: [{ name: 'None', value: null }].concat(
        employees.map(e => ({ name: `${e.first_name} ${e.last_name}`, value: e.id }))
      ),
    },
  ]);

  await query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [
    firstName,
    lastName,
    roleId,
    managerId,
  ]);
  console.log(`Added employee: ${firstName} ${lastName}`);
  mainMenu();
};

const updateEmployeeRole = async () => {
  const employees = await query('SELECT * FROM employee');
  const roles = await query('SELECT * FROM role');

  const { employeeId, roleId } = await inquirer.prompt([
    {
      name: 'employeeId',
      type: 'list',
      message: 'Select employee:',
      choices: employees.map(e => ({ name: `${e.first_name} ${e.last_name}`, value: e.id })),
    },
    {
      name: 'roleId',
      type: 'list',
      message: 'Select new role:',
      choices: roles.map(r => ({ name: r.title, value: r.id })),
    },
  ]);

  await query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
  console.log('Employee role updated.');
  mainMenu();
};

mainMenu();
