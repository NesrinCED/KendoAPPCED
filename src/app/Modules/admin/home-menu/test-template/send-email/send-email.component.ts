



import { HttpErrorResponse } from '@angular/common/http';
import { Component, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditorComponent } from '@progress/kendo-angular-editor';
import * as saveAs from 'file-saver';
import { Employee } from 'src/app/model/employee';
import { Project } from 'src/app/model/project';
import { Template } from 'src/app/model/template';
import { EmployeeService } from 'src/app/service/employee.service';
import { ProjectService } from 'src/app/service/project.service';
import { TemplateService } from 'src/app/service/template.service';
import ValidateForm from 'src/app/helpers/ValidateForm';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css'],
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
export class SendEmailComponent {

  templateRequest : Template={
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

  registerForm: FormGroup;
  submitted = false;
  filteredTemplates : string[]=[];
  projects : string[]=[];
  id:any;
  jsonData:any;
  subject:any;
  to:any;
  user:any;
  ngForm!:FormGroup;
  selectedProject: any; 
  showSuccessAlert = false;
  showDangerAlert = false;
  showDangerAlertJson=false;

  ngOnInit() {
    this.user=this.employeeService.GetUser();
    this.getAllProj();
    this.ngForm=this.fb.group({
      name: ['', Validators.required],
      projectName: ['', Validators.required],
      jsonData: ['', Validators.required],
      subject: ['', Validators.required],
      to: ['', Validators.required],
    });
  }
  constructor(private router:Router,private fb: FormBuilder,
     private templateService : TemplateService,private employeeService : EmployeeService,private projectService : ProjectService) { }

  onProjectChange(event:any) {
    this.selectedProject = event; 
    this.getFilteredTemplates(this.selectedProject?.projectId);
  }
  getFilteredTemplates(projectId:string){
    if (projectId) {
      this.projectService.getFilteredTemplates(projectId)
        .subscribe((result: any[]) => {
          this.filteredTemplates = result; 
        });
    } else {
      this.filteredTemplates = []; 
    }
  }
  getAllProj(){
    this.projectService.getAllProj()
    .subscribe( (result: any[]) =>{
     (this.projects=result)
    //,console.log(this.projects)
    });
  }
  onTextChange(event:any) {
   // console.log(event); 
  }
  onSubmit() {
    if(this.ngForm.valid){
      const jsonDataTextArea = document.getElementById('jsonData') as HTMLTextAreaElement;
      const subjectTextArea=document.getElementById('subject') as HTMLTextAreaElement;
      const toTextArea=document.getElementById('to') as HTMLTextAreaElement;
      try {
        const jsonData = JSON.parse(jsonDataTextArea.value);
        const subject = subjectTextArea.value;
        const to = toTextArea.value;
        this.showDangerAlert=false;
        this.showDangerAlertJson=false;
        
        const body={
          subject,
          to,
          jsonData
        };
        console.log(body)
        this.templateService.
        SendEmail(this.templateRequest.templateId,body)
        .subscribe((result: any) => {
        console.log("sent success")
        this.showSuccessAlert=true;
        this.router.navigate(['/admin/TestTemplate']);

        },
        (error: HttpErrorResponse) => {
          console.log("errrorr !!",error)
        });
      } catch (error) {
        this.showDangerAlertJson=true;
      } 
    }
    else{
      this.showDangerAlert=true;
      this.showSuccessAlert=false;
      console.log("form invalid")
      ValidateForm.validateAllFormFileds(this.ngForm);
    }

  } 
  
  onReset() {
    this.registerForm.reset();
  }
  public opened = true;

  public close(): void {
    this.opened = false;
    this.router.navigate(['/admin/TestTemplate']);
  }

  public open(): void {
    this.opened = true;
  }



}
