// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee.js");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name,id,email);
        this.officeNumber = officeNumber;
    }

    getRole() {
        if(this.officeNumber === this.officeNumber){
            return "Manager";
        }
    }

    getOfficeNumber(){
        if(this.officeNumber === this.officeNumber){
            return this.officeNumber;
        }
    }
};

module.exports = Manager;