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
import { ToastrService } from 'ngx-toastr';

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
  isUserButtonDisabled:  { [projectId: string]: boolean } = {};
  isTemplateButtonDisabled:  { [projectId: string]: boolean } = {};
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
    this.getFilteredTemplatesByProject(projectId);
  }
  
  constructor(private router:Router, private projectService:ProjectService, private fb:FormBuilder
    ,private datePipe: DatePipe, private projectAuthService:ProjectAuthService
    ,private toastr:ToastrService ){
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
          a.createdDate=formattedDate;
          this.getFilteredUsers(a.projectId,"")
          this.getFilteredTemplatesByProject(a.projectId)
        }
      )
      //console.log(this.list);
    } 
    );
  }
  getFilteredTemplatesByProject(projectId:string){
    this.projectService.getFilteredTemplatesByProject(projectId)
      .subscribe((result: any[]) => {
        this.filteredTemplates = result;
        this.isTemplateButtonDisabled[projectId] = this.filteredTemplates.length === 0; 
        console.log("**filtered***",this.filteredTemplates);
      });
  }
  getFilteredUsers(projectId:string, language:string){
    this.projectAuthService.getEmployeesProjectAuth(projectId)
      .subscribe((result: any[]) => {
        this.filteredUsers = result; 
        this.isUserButtonDisabled[projectId] = this.filteredUsers.length === 0;
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
    if (this.ngForm.get('projectName')?.value=="" || this.ngForm.get('createdBy')?.value==""){
      this.showError()
      console.log("**",this.ngForm.get('projectName')?.value)
    }
    else{
      console.log("ppp",this.project)
      this.projectService.CreateProject(this.project).subscribe
      (
        (result: any) => {
          this.showSuccess()
          this.submitted = false;
          setTimeout(() => {
            this.opened=false;
            this.getAll() 
          }
          , 3000);  

        },
      )
    }
   
}

onReset() {
   this.ngForm.reset();
}
    /******alerts****/
    public showSuccess(): void {
      this.toastr.success('Project Added Successfully !', 'Save Message');
    }
    public showError(): void {
      this.toastr.error('Please Fill All Fields  !', 'FORM Message');
    }
    public showInfo(): void {
      this.toastr.info('Message Info!', 'Title Info!');
    }
    public showWarning(): void {
      this.toastr.warning('Please Fill All Fields  !', 'FORM Warning');
    }

  
}

