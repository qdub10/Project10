const inquirer = require('inquirer');
const {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require('../lib/queries');

const mainMenu = async () => {
  const choices = [
    'View all departments',
    'View all roles',
    'View all employees',
    'Add a department',
    'Add a role',
    'Add an employee',
    'Update an employee role',
    'Exit',
  ];

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices,
    },
  ]);

  switch (action) {
    case 'View all departments':
      return viewDepartments();
    case 'View all roles':
      return viewRoles();
    case 'View all employees':
      return viewEmployees();
    case 'Add a department':
      return promptAddDepartment();
    case 'Add a role':
      return promptAddRole();
    case 'Add an employee':
      return promptAddEmployee();
    case 'Update an employee role':
      return promptUpdateEmployeeRole();
    case 'Exit':
      console.log('Goodbye!');
      process.exit(0);
  }
};

const viewDepartments = async () => {
  const departments = await getAllDepartments();
  console.table(departments);
  return mainMenu();
};

const viewRoles = async () => {
  const roles = await getAllRoles();
  console.table(roles);
  return mainMenu();
};

const viewEmployees = async () => {
  const employees = await getAllEmployees();
  console.table(employees);
  return mainMenu();
};

const promptAddDepartment = async () => {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:',
    },
  ]);
  await addDepartment(name);
  console.log(`Department "${name}" added successfully.`);
  return mainMenu();
};

const promptAddRole = async () => {
  const departments = await getAllDepartments();
  const departmentChoices = departments.map((dept) => ({
    name: dept.name,
    value: dept.id,
  }));

  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:',
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select the department for the role:',
      choices: departmentChoices,
    },
  ]);

  await addRole(title, salary, department_id);
  console.log(`Role "${title}" added successfully.`);
  return mainMenu();
};

const promptAddEmployee = async () => {
  const roles = await getAllRoles();
  const roleChoices = roles.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const employees = await getAllEmployees();
  const managerChoices = [
    { name: 'None', value: null },
    ...employees.map((emp) => ({
      name: `${emp.first_name} ${emp.last_name}`,
      value: emp.id,
    })),
  ];

  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee:',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee:',
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the role of the employee:',
      choices: roleChoices,
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Select the manager of the employee:',
      choices: managerChoices,
    },
  ]);

  await addEmployee(first_name, last_name, role_id, manager_id);
  console.log(`Employee "${first_name} ${last_name}" added successfully.`);
  return mainMenu();
};

const promptUpdateEmployeeRole = async () => {
  const employees = await getAllEmployees();
  const employeeChoices = employees.map((emp) => ({
    name: `${emp.first_name} ${emp.last_name}`,
    value: emp.id,
  }));

  const roles = await getAllRoles();
  const roleChoices = roles.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const { employee_id, role_id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee_id',
      message: 'Select the employee to update:',
      choices: employeeChoices,
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the new role for the employee:',
      choices: roleChoices,
    },
  ]);

  await updateEmployeeRole(employee_id, role_id);
  console.log(`Employee role updated successfully.`);
  return mainMenu();
};

// Start the application
mainMenu();
