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
  generatedPDF:boolean=false;
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
  onSubmit1() {
    if(this.ngForm.valid){
      const jsonTextArea = document.getElementById('jsonData') as HTMLTextAreaElement;
      try {
        const jsonData = JSON.parse(jsonTextArea.value);
        this.generatedPDF=true;
        this.showSuccessAlert=true;
        this.showDangerAlert=false;
        this.showDangerAlertJson=false;
      } catch (error) {
        this.generatedPDF=false;
        this.showDangerAlertJson=true;
      } 
    }
    else{
      this.generatedPDF=false;
      this.showDangerAlert=true;
      this.showSuccessAlert=false;
      console.log("form invalid")
      ValidateForm.validateAllFormFileds(this.ngForm);
//      window.alert("Your form is invalid");
    }

  } 
  onSubmit() {
    this.generatePDF();
  } 
  generatePDF() {
    const json=JSON.parse(this.jsonData);
    this.templateService.GeneratePDF(this.templateRequest.templateId,json).subscribe((blob: Blob) => {
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
    this.router.navigate(['/admin/TestTemplate']);
  }

  public open(): void {
    this.opened = true;
  }



}

