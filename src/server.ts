import { mainMenuPrompt } from "./prompts";
import { viewAllDepartments, viewAllRoles, viewAllEmployees } from "./queries";

const main = async () => {
  let exit = false;

  while (!exit) {
    const action = await mainMenuPrompt();

    switch (action) {
      case "View All Departments":
        console.table(await viewAllDepartments());
        break;

      case "View All Roles":
        console.table(await viewAllRoles());
        break;

      case "View All Employees":
        console.table(await viewAllEmployees());
        break;

      case "Exit":
        exit = true;
        console.log("Goodbye!");
        break;

      default:
        console.log("Feature not implemented yet!");
    }
  }
};

main();