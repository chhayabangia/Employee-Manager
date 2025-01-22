import pool from "./connection.js";

export const getDepartments = async () => {
  const res = await pool.query("SELECT * FROM department");
  return res.rows;
};

export const getRoles = async () => {
  const res = await pool.query(`
    SELECT role.id, role.title, role.salary, department.dept_name AS department
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  return res.rows;
};

export const getEmployees = async () => {
  const res = await pool.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, 
           department.dept_name AS department, role.salary, 
           CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
  `);
  return res.rows;
};

export const addDepartment = async (name) => {
  await pool.query("INSERT INTO department (dept_name) VALUES ($1)", [dept_name]);
};

export const addRole = async (title, salary, department_id) => {
  await pool.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)", [title, salary, department_id]);
};

export const addEmployee = async (first_name, last_name, role_id, manager_id) => {
  await pool.query(
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
    [first_name, last_name, role_id, manager_id]
  );
};

export const updateEmployeeRole = async (employee_id, role_id) => {
  await pool.query("UPDATE employee SET role_id = $1 WHERE id = $2", [role_id, employee_id]);
};

// Additional queries for bonus features
export const updateEmployeeManager = async (employee_id, manager_id) => {
  await pool.query("UPDATE employee SET manager_id = $1 WHERE id = $2", [manager_id, employee_id]);
};

export const getEmployeesByManager = async (manager_id) => {
  const res = await pool.query(
    "SELECT * FROM employee WHERE manager_id = $1",
    [manager_id]
  );
  return res.rows;
};

export const deleteDepartment = async (department_id) => {
  await pool.query("DELETE FROM department WHERE id = $1", [department_id]);
};