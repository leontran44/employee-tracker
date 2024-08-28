<div align="center">
  
  # Employee Tracker
  > Module 12 Challenge

![JavaScript Badge](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
[![Node.js Badge](https://img.shields.io/badge/Node.js-393%3F?style=for-the-badge&logo=node.js&logoColor=green)](https://nodejs.org/en/)
[![Inquirer Badge](https://img.shields.io/badge/Inquirer-8.2.4-000?style=for-the-badge&logo=inquirer)](https://www.npmjs.com/package/inquirer)
[![PostgreSQL Badge](https://img.shields.io/badge/PostgreSQL-13-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![dotenv Badge](https://img.shields.io/badge/dotenv-8.2.0-ECD53F?style=for-the-badge&logo=dotenv&logoColor=white)](https://www.npmjs.com/package/dotenv)

</div>

## Description

This repository contains the code for the **Employee Tracker** application, a command-line interface (CLI) that allows business owners to manage and organize their company's employee database. The application is built using Node.js, Inquirer, PostgreSQL, and other tools to provide a robust and interactive interface for handling employee data. Users can view and manage departments, roles, and employees, as well as perform various administrative tasks like updating employee roles and managers.

### Key Features:

- **View Departments, Roles, and Employees:** Easily access and view all departments, roles, and employees in the database.
- **Add New Entries:** Add new departments, roles, and employees to the database.
- **Update Employee Roles and Managers:** Change the role or manager of existing employees.
- **View Employees by Manager or Department:** See which employees report to specific managers or work in particular departments.
- **Delete Entries:** Remove departments, roles, and employees from the database.
- **View Department Budgets:** Calculate and view the total utilized budget of a department, based on employee salaries.

## Instruction Video

[EmployeeTracker.webm](https://github.com/user-attachments/assets/e1d48d5e-dcb4-427a-bdff-dc069a083dc9)

## Installation

To run this application, follow these steps:

1. **Ensure Node.js is Installed:**

   You will need Node.js installed on your computer. Check if you have Node.js by typing `node -v` in your command line. You should see a version number. If Node.js is not installed, visit the [Node.js website](https://nodejs.org/en) to install it.

2. **Clone the Repository:**

   Clone this project repository to your computer:

   ```bash
   git clone https://github.com/your-username/employee-tracker.git
   cd employee-tracker
   ```

3. **Install Dependencies:**

   Use the following command to install the required dependencies:

   ```bash
   npm install
   ```

4. **Set Up the Database:**

   - Create a PostgreSQL database named `employee_tracker`.
   - Run the provided SQL schema to create the necessary tables. Optionally, seed the database using the `seeds.sql`.sql file located in the `db/` directory.

5. **Configure Environment Variables:**

   Create a `.env` file in the root directory and add your PostgreSQL credentials:

   ```plaintext
   DB_HOST=localhost
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_NAME=employee_tracker
   DB_PORT=5432
   ```

6. **Run the Application:**

   Start the application by running the following command:

   ```bash
   node index.js
   ```

   Follow the prompts to interact with the Employee Tracker application.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Inquirer**: Command-line interface for user interaction.
- **PostgreSQL**: Relational database management system.
- **dotenv**: Environment variable management.
- **console.table**: Tabular data display in the console.

## License

[MIT License](https://opensource.org/licenses/MIT)

## Contact

- GitHub: [leontran44](https://github.com/leontran44)
- Email: [Leon Tran](mailto:leontran44@gmail.com)
- LinkedIn: [Leon Tran](https://www.linkedin.com/in/hoangqtran/)
