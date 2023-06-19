



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
import { ProjectAuthService } from 'src/app/service/projectAuth.service';
import { ToastrService } from 'ngx-toastr';

interface Field {
  label: string;
  value: string;
  name: string;
}

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
  ngForm!:FormGroup;
  selectedProject: any; 
  selectedTemplate: any; 
  isSelectedTemplate=false;
  isConfirmedTemplate=false;
  list : string[]=[];
  values:string[]=[];
  jsonData0 :any;    formData: { [key: string]: any } = {};     fields: Field[] = [];

  showSuccessAlert = false;
  showDangerAlert = false;
  showDangerAlertJson=false;
  dangerAlertV=false;
  jsonForm!:FormGroup;
  choosedContent:string;
  roleName:any;
  user:any;
  employeeId:any;
  listAccessedReadTemplates:any;

  ngOnInit() {

    this.user=this.employeeService.GetUser();
    this.employeeId=this.user.employeeId;
    this.roleName=this.employeeService.GetUser().roleDTO.roleName;
    if(this.roleName=="Admin"){
      this.getAllProj();
    }
    else{
      this.getFilteredProjects(this.employeeId);
    }
    this.ngForm=this.fb.group({
      name: ['', Validators.required],
      projectName: ['', Validators.required],
      subject: ['', Validators.required],
      to: ['', Validators.required],
    });
    this.jsonForm=this.fb.group({
    });
  }
  constructor(private router:Router,private fb: FormBuilder, private projectAuthService:ProjectAuthService
     ,private templateService : TemplateService,private employeeService : EmployeeService
     ,private toastr:ToastrService ,private projectService : ProjectService) { }
  /*****for user */
  getFilteredProjects(id:string){
    this.projectAuthService.getReadAccessedProjectsByEmployee(this.employeeId).subscribe(
      (result: any[]) => {
        this.projects = result;
        this.listAccessedReadTemplates = result;
        console.log("templates Accessedprojects ", this.projects);
      },
      (error) => {
        console.log("error in Accessedprojects",error)
      }
    )
  }
  onProjectChange(event:any) {
    this.selectedProject = event; 
    this.getFilteredTemplates(this.selectedProject?.projectId);
  }
  getFilteredTemplates(projectId:string){
    if (projectId) {
      this.projectService.getFilteredTemplatesByProject(projectId)
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
    });
  }
  onTextChange(event:any) {
   // console.log(event); 
  }
  onSubmit() {
    if( this.templateRequest.templateId!="" && this.ngForm.get('subject')?.value!=null
      && this.ngForm.get('to')?.value!=null){
      const subjectTextArea=document.getElementById('subject') as HTMLTextAreaElement;
      const toTextArea=document.getElementById('to') as HTMLTextAreaElement;
      for (const field of this.fields) {
        const value = field.value;
        const keys = field.label.split('.');
        let currentObj: any = this.formData;
        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          if (!currentObj[key]) {
            currentObj[key] = {};
          }
          currentObj = currentObj[key];
        }
        currentObj[keys[keys.length - 1]] = value;
      }
      console.log(JSON.stringify(this.formData));
      try {
        const jsonData=this.formData;
        const subject = subjectTextArea.value;
        const to = toTextArea.value;        
        const body={
          subject,
          to,
          jsonData
        };
        console.log("body",body)
        this.templateService.
        SendEmail(this.templateRequest.templateId,body)
        .subscribe(
          (result: any) => {
            console.log("result",result)
            this.showSuccess()
            setTimeout(() => {
              this.router.navigate(['TestTemplate']);
            }
            ,3000); 
            
          }
          );
      } catch (error) {
        console.log("catch",error)
        this.showErrorEmail()
      } 
    }
   /* if( this.templateRequest.templateId!="" && this.ngForm.get('subject')?.value!=null
    && this.ngForm.get('to')?.value!=null){
      const subjectTextArea=document.getElementById('subject') as HTMLTextAreaElement;
      const toTextArea=document.getElementById('to') as HTMLTextAreaElement;
      try {
        const jsonData=this.jsonData0;
        const subject = subjectTextArea.value;
        const to = toTextArea.value;
        this.showDangerAlert=false;
        this.showDangerAlertJson=false;
        
        const body={
          subject,
          to,
          jsonData
        };
        console.log("body",body)
        this.templateService.
        SendEmail(this.templateRequest.templateId,body)
        .subscribe(
          (result: any) => {
            console.log("result",result)
            this.showSuccess()
            setTimeout(() => {
              this.router.navigate(['TestTemplate']);
            }
            ,3000); 
            
          }
          );
      } catch (error) {
        console.log("catch",error)
       // this.showDangerAlert=true;
      } 
    }
    else{
      this.showErrorForm()
      console.log("form invalid")
      ValidateForm.validateAllFormFileds(this.ngForm);
    }
*/
  } 
  
  onReset() {
    this.registerForm.reset();
  }
  public opened = true;

  public close(): void {
    this.opened = false;
    this.router.navigate(['TestTemplate']);
  }

  public open(): void {
    this.opened = true;
  }

  onTemplateChange(event:any) {
    this.selectedTemplate = event;
    this.isSelectedTemplate=true;
    var content!:string;
    content=this.selectedTemplate.content;
    this.choosedContent=content;
    this.fields = this.extractFields(content);
    console.log("fileds",this.fields)
    }
    extractFields(content: string): Field[] {
      const pattern = /\${(.*?)}/g;
      const fields: Field[] = [];
      let match;
      while ((match = pattern.exec(content))) {
        const field = match[1];
        fields.push({ label: field, value: '', name: field.replace('.', '_') });
      }
      return fields;
    }


  onSubmitJson(){
    console.log("innn")
    if(this.ngForm.value){
      this.jsonData0={};
      this.showDangerAlertJson=false;
      this.list.forEach(i=>{
        const inputElement = document.getElementById(i) as HTMLInputElement;
        const inputValue = inputElement.value;
        this.values.push(inputValue) 
      });
      for (let i = 0; i < this.list.length; i++) {
        const key = this.list[i];
        const value = this.values[i];
        this.jsonData0[key] =value;
      }
      console.log("onSubmitJson",this.jsonData0)
      this.showSuccessFeatures()
      setTimeout(() => {
        this.isSelectedTemplate=false;
        this.isConfirmedTemplate=false;
      }
      ,3000); 
    }
    else{
      this.showDangerAlertJson=true;
    }
  }
  ConfirmTemplate(){
    this.isConfirmedTemplate=true;

  }
  CancelTemplate(){
    this.isConfirmedTemplate=false;
    this.isSelectedTemplate=false;
    this.ngForm.reset()
  }

    /******alerts****/
    public showSuccess(): void {
      this.toastr.success('Email sent Successfully !', 'Email Message');
    }
    public showSuccessFeatures(): void {
      this.toastr.success('Features added Successfully !', 'Save Message');
    }
    public showErrorForm(): void {
      this.toastr.error('Please Fill All Fields  !', 'FORM Message');
    }
    public showErrorEmail(): void {
      this.toastr.error('Email Not Sent  !', 'Email Message');
    }
    public showErrorFeatures(): void {
      this.toastr.error('Please Fill All Features  !', 'FORM Message');
    }    
    public showInfo(): void {
      this.toastr.info('Message Info!', 'Title Info!');
    }
    public showWarning(): void {
      this.toastr.warning('Please Fill All Fields  !', 'FORM Warning');
    }
}
