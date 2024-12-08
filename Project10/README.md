# Employee Tracker

## Description

The **Employee Tracker** is a command-line application that allows business owners to view and manage their company's employee database. Built using **Node.js**, **Inquirer**, and **PostgreSQL**, this CMS (Content Management System) application provides an easy-to-use interface for managing departments, roles, and employees.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Database Schema](#database-schema)
- [Walkthrough Video](#walkthrough-video)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
2. Navigate to the project directory:
    cd (your-directory-name)
3. Install dependencies:
    npm install
4. Set up the PostgreSQL datbabase:
     Run the schema to create a datbase structure: 
      ``` psql -U <your_username> -d <your_database_name> -f db/schema.sql
    Populate the database with seed data:
    ``` psql -U <your_username> -d <your_database_name> -f db/seeds.sql
5. Create a .env file in the root directory to store your database:
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=your_username
    DB_PASSWORD=your_password
    DB_NAME=employee_db

## Usage

1. Start the application:
    npm start
2. Navigate through the menu using arrow keys to:
    - View all departments, roles, or employees
    - Add a new department, role, or employee
    - Update an employee's role

## Features

1. View Data:
    Departments: Displays department names and IDs.
    Roles: Displays job titles, role IDs, salaries, and associated departments.
    Employees: Displays employee IDs, names, roles, departments, salaries, and managers.
2. Add Data:
    Departments: Add a new department by entering its name.
    Roles: Add a new role by entering its title, salary, and associated department.
    Employees: Add a new employee by entering their name, role, and manager.
3. Update Data:
    Update an employee's role by selecting the employee and their new role.

## Database Schema

1. Tables:
    -Department
        -id: Primary key
        -name: Name of the Department
    -Role
        -id: Primary key
        -title: Job title
        -salary: Role Salary
        -department_id: Foreign key for referncing department
    -Employee
        -id: Primary key
        -first_name: Employee's first name
        -last_name: Employee's last name
        -role_id: Foreign key referencing role
        manager_id: Foreign key referencing another employee

## Walkthrough Video

https://drive.google.com/file/d/1UlEtXhIWO21dRhPQJ9a11hAVhexazBW8/view


 