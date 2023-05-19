import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectEvent } from '@progress/kendo-angular-layout';
import { Align } from '@progress/kendo-angular-popup';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-list-templates-employee',
  templateUrl: './list-templates-employee.component.html',
  styleUrls: ['./list-templates-employee.component.css']
})
export class ListTemplatesEmployeeComponent {
  /*

   employeeName:string;

  gridData:any[];
  employeeDetails:any;
  
  employee : Employee={
    employeeId: '',
    employeeName: '',
    employeePassword: '',
    role: '',
    employeeEmail: '',
    projectAuthorizationsDTO: []
  };

  user:any;
  projectName:any;
  isOpened=true;
  
  constructor(private router:Router, private activatedRoute: ActivatedRoute, 
    private employeeService:EmployeeService,  private projectService:ProjectService){
   }

  ngOnInit() : void{
    
    this.activatedRoute.paramMap.subscribe(
      {
        next: (params) => {
          const id = params.get('id');
          if (id){
            this.employeeService.getEmployee(id).subscribe(
              {
                next: (result) => { 
                  this.employee=result;
                  this.employeeName=this.employee.employeeName;
                  this.employeeDetails=result;
                  this.gridData= this.employeeDetails.createdTemplatesDTO;
                  this.gridData.forEach((x)=>
                  this.projectService.getProject(x.projectId).subscribe((a:any)=>
                  {
                    x.projectId=a.projectName;
                  }
                  ));
                  this.projectName=this.gridData[0].projectId;
                 }
              }
            );
          }
          else{
            console.log("id fera8");
          }
        }
      }
    ) 

  }
  returnToList(){
    this.isOpened=false;
    this.router.navigate(['admin/Developers'])
  }*/
}


