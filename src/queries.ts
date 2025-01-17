import pool from "./connection";

export const viewAllDepartments = async () => {
  const res = await pool.query("SELECT * FROM department");
  return res.rows;
};

export const viewAllRoles = async () => {
  const res = await pool.query(
    `SELECT role.id, role.title, department.name AS department, role.salary 
     FROM role 
     JOIN department ON role.department_id = department.id`
  );
  return res.rows;
};

export const viewAllEmployees = async () => {
  const res = await pool.query(
    `SELECT employee.id, employee.first_name, employee.last_name, 
            role.title AS job_title, department.name AS department, role.salary,
            manager.first_name AS manager
     FROM employee
     JOIN role ON employee.role_id = role.id
     JOIN department ON role.department_id = department.id
     LEFT JOIN employee AS manager ON employee.manager_id = manager.id`
  );
  return res.rows;
};

