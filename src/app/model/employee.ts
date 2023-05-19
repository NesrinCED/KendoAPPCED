import { ProjectAuth } from "./project-auth";

export class Employee {
    employeeId:string="";
    employeeName:string;
    employeePassword:string;
    role:string="";
    employeeEmail:string;
    projectAuthorizationsDTO:ProjectAuth[];
}
