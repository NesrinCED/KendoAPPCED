import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { Template } from 'src/app/model/template';
import { ProjectService } from 'src/app/service/project.service';
import ValidateForm from 'src/app/helpers/ValidateForm';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ProjectAuthService } from 'src/app/service/projectAuth.service';
import { Offset } from '@progress/kendo-angular-popup';

@Component({
  selector: 'app-list-project',
  providers: [DatePipe],
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent {
  
 /* public marginLeft = { horizontal: -150, vertical: -50 };
  public marginRight = { horizontal: 93, vertical: -120 };*/

  showUsers = false;
  showTemplates = false;
  filteredTemplates : any[];
  filteredUsers : any[];
  selectedProjectId:any;
  list: any[] ;
  opened:boolean=false;
  user:any;
 submitted = false;
 ngForm!:FormGroup;
 dangerAlert=false;

  project : Project={
    projectId:'',
    projectName:'',
    createdBy:'',
    createdDate: undefined
  }; 

  public onToggleUser(projectId:string): void {
    this.selectedProjectId = projectId;
    this.showUsers = !this.showUsers;
    this.getFilteredUsers(projectId,"");   
  }
  public onToggleTemplates(projectId:string) {
    this.selectedProjectId = projectId;
    this.showTemplates = !this.showTemplates;
    this.getFilteredTemplates(projectId,"");
  }
  
  constructor(private router:Router, private projectService:ProjectService, private fb:FormBuilder
    ,private datePipe: DatePipe, private projectAuthService:ProjectAuthService){
  }

  ngOnInit() : void{
    this.getAll();
    this.ngForm=this.fb.group({
      projectName: ['',Validators.required],
      createdBy: ['',Validators.required]
  });
  }
  getAll(){
    this.projectService
    .getAllProj()
    .subscribe( (result: any[]) => {
      this.list=result;  
      this.list.forEach(
        (a:any) => {
          const formattedDate = this.datePipe.transform(a.createdDate, 'dd MMMM yyyy');
          a.createdDate=formattedDate
        }
      )
      //console.log(this.list);
    } 
    );
  }
  getFilteredTemplates(projectId:string, language:string){
    this.projectService.getFilteredTemplates(projectId,language)
      .subscribe((result: any[]) => {
        this.filteredTemplates = result; 
        console.log("**filtered***",this.filteredTemplates);
      });
  }
  getFilteredUsers(projectId:string, language:string){
    this.projectAuthService.getEmployeesProjectAuth(projectId)
      .subscribe((result: any[]) => {
        this.filteredUsers = result; 
        if(this.filteredUsers.length ==0)
        {
          this.filteredUsers.push("No Employees For Project")
        }
        console.log("**filtered***",this.filteredUsers);
      });
  }
  openDialog(){
    this.opened = true;
  }
  closeDialog(){
    this.opened = false;
  }
  onSubmit() {
    this.addProject();
  } 
  addProject() {
  if (this.ngForm.value){
    this.dangerAlert=false;
    console.log("ppp",this.project)
    this.projectService.CreateProject(this.project).subscribe
    (
      (result: any) => {
        this.submitted = false;
        this.opened=false;
        this.getAll()
      },
     /* (error: HttpErrorResponse) => {
        console.log("errrorr !!")
      }*/
    )
  }
  else{
    this.dangerAlert=true;
  }
}

onReset() {
   this.ngForm.reset();
}
  
}

