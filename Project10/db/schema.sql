-- db/schema.sql

-- Create the 'department' table
CREATE TABLE department (
    id SERIAL PRIMARY KEY,              -- Unique ID for each department
    name VARCHAR(30) UNIQUE NOT NULL    -- Name of the department
);

-- Create the 'role' table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,              -- Unique ID for each role
    title VARCHAR(30) UNIQUE NOT NULL,  -- Title of the role
    salary DECIMAL NOT NULL,            -- Salary for the role
    department_id INTEGER NOT NULL,     -- Foreign key to 'department' table
    CONSTRAINT fk_department
        FOREIGN KEY(department_id)
        REFERENCES department(id)
        ON DELETE CASCADE               -- Delete roles when department is deleted
);

-- Create the 'employee' table
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,              -- Unique ID for each employee
    first_name VARCHAR(30) NOT NULL,    -- Employee's first name
    last_name VARCHAR(30) NOT NULL,     -- Employee's last name
    role_id INTEGER NOT NULL,           -- Foreign key to 'role' table
    manager_id INTEGER,                 -- Self-referencing foreign key for manager
    CONSTRAINT fk_role
        FOREIGN KEY(role_id)
        REFERENCES role(id)
        ON DELETE CASCADE,              -- Delete employees when role is deleted
    CONSTRAINT fk_manager
        FOREIGN KEY(manager_id)
        REFERENCES employee(id)
        ON DELETE SET NULL              -- Set manager to NULL if the manager is deleted
);
