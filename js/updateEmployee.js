const db = require('../db/connection');
const inquirer = require('inquirer');
const { roleChoices } = require('./addEmployee');
const { departmentChoices } = require('./addRole');
const showAllEmployees = require('./employeesFunc');


// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
function employeeChoices() {
    const employees = [];
    return new Promise ((resolve, reject) => {
        const sql = `SELECT id, first_name, last_name FROM employees`;
        db.query(sql, (err, res) => {
            if(err) {
                reject(err);
            }
            let responses = JSON.parse(JSON.stringify(res));
            responses.forEach(element => {
                employees.push(element.id + '. ' + element.first_name + ' ' + element.last_name);
            })
            resolve(employees);
        })
    })
}

function editEmpTable(id, role, dep) {
    const sql = `UPDATE employees SET role_id = ?, dep_id = ? WHERE id = ?`
    const params = [role, dep, id];
    db.query(sql, params, (err, result) => {
        if(err) {
            console.log(err);
            return;
        }
        console.log('Employee role updated.');
        showAllEmployees();
    })
}

updateEmployee = async () => {
    const roleUpdateRes = await inquirer.prompt([
        {
            type: 'list', 
            name: 'updateEmp',
            message: 'Which employee would you like to update?',
            choices: await employeeChoices()
        }, 
        {
            type: 'list', 
            name: 'updateRole',
            message: 'What is this employees updated role?',
            choices: await roleChoices()
        }, 
        {
            type: 'list',
            name: 'updateDep',
            message: 'Which department does this role belong to?',
            choices: await departmentChoices()
        }
    ])
    const selectedEmpId = roleUpdateRes.updateEmp.charAt(0);
    const selectedRoleId = roleUpdateRes.updateRole.charAt(0);
    const selectedDepId = roleUpdateRes.updateDep.charAt(0);
    editEmpTable(selectedEmpId, selectedRoleId, selectedDepId);
}




module.exports = updateEmployee;