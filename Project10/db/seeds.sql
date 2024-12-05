-- Populate the 'department' table
INSERT INTO department (name)
VALUES 
    ('Engineering'),
    ('Sales'),
    ('Human Resources'),
    ('Finance');

-- Populate the 'role' table
INSERT INTO role (title, salary, department_id)
VALUES 
    ('Software Engineer', 90000, 1),
    ('Data Analyst', 80000, 1),
    ('Sales Representative', 70000, 2),
    ('HR Manager', 75000, 3),
    ('Accountant', 60000, 4);

-- Populate the 'employee' table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Doe', 1, NULL),        
    ('Jane', 'Smith', 2, 1),         
    ('Emily', 'Davis', 3, NULL),    
    ('Michael', 'Brown', 4, NULL),
    ('Sarah', 'Wilson', 5, 4);       
