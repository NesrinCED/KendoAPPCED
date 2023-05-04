import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { Template } from 'src/app/model/template';
import { ProjectService } from 'src/app/service/project.service';
import ValidateForm from 'src/app/helpers/ValidateForm';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent {

  public list: any[] ;
  opened:boolean=false;

  project : Project={
    projectId:'',
    projectName:'',
    createdBy:'',
    createdDate: undefined
  };
  
 user:any;
 submitted = false;
 ngForm!:FormGroup;
 dangerAlert=false;

  constructor(private router:Router, private projectService:ProjectService, private fb:FormBuilder){
  }
  getAll(){
    this.projectService
    .getAllProj()
    .subscribe( (result: any[]) => {
      this.list=result;  
      console.log(this.list);
    } 
    );
  }
  ngOnInit() : void{
    this.getAll();
    this.ngForm=this.fb.group({
      projectName: ['',Validators.required],
      createdBy: ['',Validators.required]
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

