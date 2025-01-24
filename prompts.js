import inquirer from "inquirer";
import {
  getDepartments,
  getRoles,
  getEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  getEmployeesByManager,
  deleteDepartment,
} from "./queries.js";

const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Choose an action:",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Update an employee manager",
        "View employees by manager",
        "Delete a department",
        "Exit",
      ],
    },
  ]);

  switch (action) {
    case "View all departments":
      console.table(await getDepartments());
      break;
    case "View all roles":
      console.table(await getRoles());
      break;
    case "View all employees":
      console.table(await getEmployees());
      break;
    case "Add a department":
      const response = await inquirer.prompt([
        { type: "input", name: "dept_name", message: "Enter department name:" }
      ]);
      const dept_name = response.dept_name; 
      await addDepartment(dept_name); 
      console.log("Department added!");
      break;
    case "Add a role":
      const roleResponse = await inquirer.prompt([
        { type: "input", name: "title", message: "Enter role title:" },
        { type: "input", name: "salary", message: "Enter salary:" },
        { type: "input", name: "department_id", message: "Enter department ID for this role:" },
      ]);
      const { title, salary, department_id } = roleResponse;
      await addRole(title, salary, department_id);
      console.log("Role added!");
      break;
    case "Add an employee":
      const employeeResponse = await inquirer.prompt([
        { type: "input", name: "first_name", message: "Enter employee's first name:" },
        { type: "input", name: "last_name", message: "Enter employee's last name:" },
        { type: "input", name: "role_id", message: "Enter role ID:" },
        { type: "input", name: "manager_id", message: "Enter manager's ID (if any):" },
      ]);
      let { first_name, last_name, role_id, manager_id } = employeeResponse
      manager_id = manager_id.trim() === "" ? null :parseInt(manager_id, 10); 
      await addEmployee(first_name, last_name, role_id, manager_id);
      console.log("Employee added!");
      break;
    case "Update an employee role":
      const updateResponse = await inquirer.prompt([
        { type: "input", name: "employee_id", message: "Enter employee ID to update:" },
        { type: "input", name: "new_role_id", message: "Enter new role ID:" },
      ]);
      const { employee_id, new_role_id } = updateResponse;
      await updateEmployeeRole(employee_id, new_role_id);
      console.log("Employee role updated!");
      break;
    case "Update an employee manager":
      const updateManagerResponse = await inquirer.prompt([
        { type: "input", name: "employee_id", message: "Enter employee ID:" },
        { type: "input", name: "manager_id", message: "Enter new manager ID:" },
      ]);
      await updateEmployeeManager(updateManagerResponse.employee_id, updateManagerResponse.manager_id);
      console.log("Employee's manager updated!");
      break;
    case "View employees by manager":
      const managerResponse = await inquirer.prompt([
        { type: "input", name: "manager_id", message: "Enter manager ID:" },
      ]);
      console.table(await getEmployeesByManager(managerResponse.manager_id));
      break;
    case "Delete a department":
      const deleteResponse = await inquirer.prompt([
        { type: "input", name: "department_id", message: "Enter department ID to delete:" },
      ]);
      await deleteDepartment(deleteResponse.department_id);
      console.log("Department deleted!");
      break;
    case "Exit":
      console.log("Goodbye!");
      process.exit();
  }

  mainMenu();
};

mainMenu();