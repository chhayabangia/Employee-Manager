INSERT INTO department (dept_name) 
VALUES 
('Engineering'), 
('Finance'), 
('Sales'), 
('Legal');

INSERT INTO role (title, salary, department_id) 
VALUES
('Software Engineer', 120000, 1),
('Accountant', 125000, 2),
('Sales Lead', 100000, 3),
('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
('Mike', 'Doris', 1, NULL),
('Nina', 'Ball', 2, NULL),
('Charlie', 'Brown', 3, NULL),
('Kunal', 'Singh', 4, NULL),
('Kaylee', 'Russell', 2, 2),
('Amina', 'Masood', 1, 1),
('Manny', 'Chan', 4, 4),
('Michelle', 'Ho', 3, 3);