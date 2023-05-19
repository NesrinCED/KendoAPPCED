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
  user:any;
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

  ngOnInit() {
    this.user=this.employeeService.GetUser();
    this.getAllProj();
    this.ngForm=this.fb.group({
      name: ['', Validators.required],
      projectName: ['', Validators.required],
    });
    this.jsonForm=this.fb.group({
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
    var content!:string;
    content=this.selectedTemplate.content;
    var index=content.indexOf("{");
    var end=content.indexOf("}");
    while(index!=-1 && end!=-1){
      this.list.push(content.substring(index+1,end))
      content=content.substring(end+1,content.length);
      index=content.indexOf("{");
      end=content.indexOf("}");
    }
    console.log(this.list);
    this.isSelectedTemplate=true;

  }

  onSubmit1() {
    if( this.templateRequest.templateId!=""){
        this.generatedPDF=true;
        this.showSuccessAlert=true;
        this.showDangerAlert=false;
    }
    else {
      this.generatedPDF=false;
      this.showDangerAlert=true;
      this.showSuccessAlert=false;
      console.log("form invalid",this.ngForm.value)
      ValidateForm.validateAllFormFileds(this.ngForm);
    }

  } 
  onSubmit() {
    this.generatePDF();
  } 
  generatePDF() {
    console.log("dddd",this.templateRequest.templateId)
    console.log("dddd",this.jsonData0)

    this.templateService.GeneratePDF(this.templateRequest.templateId,this.jsonData0).subscribe((blob: Blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'TemplatePdf.pdf';
    link.click();
    window.URL.revokeObjectURL(url);
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
    console.log("enter !")

    if(this.ngForm.value){
      console.log("valid !")
      this.jsonData0={};
      this.showDangerAlertJson=false;
      this.list.forEach(i=>{
        const inputElement = document.getElementById(i) as HTMLInputElement;
        const inputValue = inputElement.value;
        this.values.push(inputValue) 
      });
      console.log(this.values)
      for (let i = 0; i < this.list.length; i++) {
        const key = this.list[i];
        const value = this.values[i];
        this.jsonData0[key] =value;
      }
      console.log(this.jsonData0)
      this.isSelectedTemplate=false;
    }
    else{
      this.showDangerAlertJson=true;
    }
  }
}

