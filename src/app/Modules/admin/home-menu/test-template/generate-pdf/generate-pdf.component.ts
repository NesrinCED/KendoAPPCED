import { HttpErrorResponse } from '@angular/common/http';
import { Component, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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

@Component({
  selector: 'app-generate-pdf',
  templateUrl: './generate-pdf.component.html',
  styleUrls: ['./generate-pdf.component.css'],
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
export class GeneratePdfComponent {

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
  ngForm!:FormGroup;
  selectedProject: any; 
  selectedTemplate: any; 
  isSelectedTemplate=false;
  generatedPDF:boolean=false;
  showSuccessAlert = false;
  showDangerAlert = false;
  showDangerAlertJson=false;
  dangerAlertV=false;
  jsonForm!:FormGroup;
  list:string[]=[];
  values:string[]=[];
  jsonData0 :any;
  isConfirmedTemplate=false;
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
    //,console.log(this.projects)
    });
  }
  onTemplateChange(event:any) {
    this.selectedTemplate = event;
    this.isSelectedTemplate=true;
    var content!:string;
    content=this.selectedTemplate.content;
    this.choosedContent=content;
    var index=content.indexOf("{");
    var end=content.indexOf("}");
    while(index!=-1 && end!=-1){
      var field=content.substring(index+1,end);
      if (!this.list.find(item => item === field)) {
        this.list.push(field);
      }
      content=content.substring(end+1,content.length);
      index=content.indexOf("{");
      end=content.indexOf("}");
    }
  }

  onSubmit1() {
    if( this.templateRequest.templateId!=""){
        this.generatedPDF=true;
        this.showSuccess()
    }
    else {
      this.showErrorForm()
      this.generatedPDF=false;
      console.log("form invalid",this.ngForm.value)
      ValidateForm.validateAllFormFileds(this.ngForm);
    }

  } 
  onSubmit() {
    this.generatePDF();
  } 
  generatePDF() {    this.templateService.GeneratePDF(this.templateRequest.templateId,this.jsonData0).subscribe((blob: Blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'TemplatePdf.pdf';
    link.click();
    window.URL.revokeObjectURL(url);
    this.showSuccessDownload()
    setTimeout(() => {
    }
    ,3000); 
    },
    (error: HttpErrorResponse) => {
      console.log("errrorr !!",error)
    });
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
  onSubmitJson(){
    this.values=[]
    this.list.forEach(i=>{
      const inputElement = document.getElementById(i) as HTMLInputElement;
      const inputValue = inputElement.value;
      this.values.push(inputValue) 
    });
    console.log("vvvvv",this.values)
    if(!this.values.includes('')){
      this.jsonData0={};
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
      console.log(this.jsonData0)
      this.showSuccessFeatures()
      setTimeout(() => {
        this.isSelectedTemplate=false;
        this.isConfirmedTemplate=false;
      }
      ,3000); 
    }
    else{
      this.showErrorFeatures()
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
      this.toastr.success('Document generated Successfully !', 'Document Message');
    }
    public showSuccessDownload(): void {
      this.toastr.success('Document downloaded Successfully !', 'Document Message');
    }
    public showSuccessFeatures(): void {
      this.toastr.success('Features added Successfully !', 'Save Message');
    }
    public showErrorForm(): void {
      this.toastr.error('Please Fill All Fields  !', 'FORM Message');
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