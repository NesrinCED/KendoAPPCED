import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { Project } from 'src/app/model/project';
import { Template } from 'src/app/model/template';
import { EmployeeService } from 'src/app/service/employee.service';
import { ProjectService } from 'src/app/service/project.service';
import { TemplateService } from 'src/app/service/template.service';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      kendo-pdf-document .k-toolbar {
        display: none;
      }

      kendo-pdf-document .k-editor {
        height: 100% !important;
        border: none;
      }
    `,
  ],
})
export class AddTemplateComponent {

  registerForm: FormGroup;
  submitted = false;
  languages = ['Arabic', 'French', 'English'];
  public gridData: any[] ;
  employeNames : string[]=[];
  projectNames : string[]=[];
  id:any;

  addTemplateRequest : Template={
    templateId: '',
      name: '',
      language: '',
      content: '',
      createdBy: '',
      modifiedBy: '',
      projectId: '',
      createdDate: undefined,
      modifiedDate: undefined
  };

  project : Project={
    projectId:'',
    projectName:'',
    createdBy:'',
    createdDate: undefined
  };
  
  employee : Employee={
    employeeId:'',
    employeeName:'',
    employeePassword:''
  };
  
 


  ngOnInit() {
    this.getAllEmp();
    this.getAllProj();
  }

  constructor(private router:Router,private formBuilder: FormBuilder,
     private templateService : TemplateService,private employeeService : EmployeeService,private projectService : ProjectService) { }
    
  getAllEmp(){
    this.employeeService.getAllemp()
    .subscribe( (result: any[]) => (result.forEach(x=>this.employeNames.push(x.employeeName)) ));
  
  }
  getAllProj(){
    this.projectService.getAllProj()
    .subscribe( (result: any[]) => (  
    result.forEach( x=>this.projectNames.push(x.projectName)) ));  
  }
  onSubmit() {
    this.addTemplate();
  } 

addTemplate() {
  //for projectId
  this.projectService.getProjectByName(this.project.projectName)
  .subscribe((result:any)=>(
    this.id=result.projectId
    ,   console.log("id project",this.id),
    this.addTemplateRequest.projectId=this.id
    ));
    //for employeId
    this.employeeService.getEmployeeByName(this.employee.employeeName)
    .subscribe((result:any)=>(
      this.id=result.employeeId,
      this.addTemplateRequest.createdBy=this.id,  
      console.log("0000000000", this.addTemplateRequest),    
      //for template
      this.templateService.CreateTemplate(this.addTemplateRequest).subscribe
      (
        (result: any) => {
          console.log(result);
          this.submitted = false;
          this.router.navigate(['ListTemplate']);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
  ));
  
  //ki 5rajt lbara yet3adew null les id donc da5alt de5el addtemplateservice

/*
  this.templateService.CreateTemplate(this.addTemplateRequest).subscribe
  (
    (result: any) => {
      console.log("ena chnod5ol service",result);
      this.submitted = false;
      this.router.navigate(['ListTemplate']);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );*/
}

onReset() {
   this.registerForm.reset();
}
public opened = true;

public close(status: string): void {
  console.log(`Dialog result: ${status}`);
  this.opened = false;
  //this.router.navigate(['home']);
}

public open(): void {
  this.opened = true;
}


}
