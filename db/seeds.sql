-- Departments
INSERT INTO department (name) VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal'),
('Human Resources');

-- Roles
INSERT INTO role (title, salary, department_id) VALUES 
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4),
('HR Manager', 130000, 5),
('HR Specialist', 90000, 5);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Mike', 'Johnson', 3, NULL),
('Emily', 'Davis', 4, 3),
('William', 'Brown', 5, NULL),
('Olivia', 'Wilson', 6, NULL),
('Liam', 'Taylor', 7, 6),
('Sophia', 'Anderson', 8, NULL),
('James', 'Thomas', 9, 8);