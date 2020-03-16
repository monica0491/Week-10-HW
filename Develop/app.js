const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

// const OUTPUT_DIR = path.resolve(__dirname, "output")
// const outputPath = path.join(OUTPUT_DIR, "team.html");


let staff = [];

const teamNo = {
    type: "number",
    message: "How many people are in your team?",
    name: "teamEmployees",
}

async function init(){
    
    let teamSize = "";

        await inquirer
        .prompt(teamNo)
        .then((data)=>{
            teamSize = data.teamEmployees + 1;
        });
        if( teamSize <= 0){
            console.log("You need to log in Employees to your team!");
            return;
        }
    
    

    for(i = 1; i < teamSize; i++){
        let name;
        let id;
        let role;
        let email;

        await inquirer.prompt([
            {
                type: "input",
                message: `What is the employee (${i})'s name?`,
                name: "name",
            },
            {
                type: "input",
                message: `What is the employee (${i})'s id?`,
                name: "id",
            },
            {
                type: "input",
                message: `What is the employee (${i})'s email?`,
                name: "email",
            },
            {
                type: "list",
                message: `What is the employee (${i})'s role?`,
                choices: ["Engineer", "Manager", "Intern"],
                name: "role",
            }
        ]).then((data)=>{
            name = data.name;
            id = data.id;
            role = data.role;
            email = data.email;
        });

        switch(role){
            case "Manager":
                await inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What is your Office Number?",
                        name: "officeNumber",
                        }
                    ]).then((data)=>{  
                    staff.push(new Manager(name, id, email, data.officeNumber));

                    
                });
                break;

            case "Engineer":
                await inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What is your GitHub?",
                        name: "github",
                        }
                ]).then((data)=>{
                    staff.push(new Engineer(name, id, email, data.github));
                    
                });
                break;
            case "Intern":
                await inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What is your school?",
                        name: "school",
                    }
                    
                ]).then((data)=> {
                    staff.push(new Intern(name, id, email, data.school));
                
                });
                break;
        } //End of Switch Case
            
    } //End of the loop

    render(staff);
    repeatQuestions();
        
}

const repeatQuestions = () => {
    inquirer
    .prompt(
        {
            name: "repeat",
            type: "confirm",
            message: "Do you want to add more people in your team?"
        }).then(data => {
            if(data.repeat === true){
                init();
            }
            else{
                render(staff)
                console.log(staff);
            }
        })
    }

init();



