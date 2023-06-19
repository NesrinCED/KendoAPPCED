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

interface Field {
  label: string;
  value: string;
  name: string;
}

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
  list: Array<string | { [key: string]: string[] }> = [  ];

  values:string[]=[];
  jsonData0 :any;         formData: { [key: string]: any } = {};     fields: Field[] = [];

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
  /**** demo pdf *****/
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
      const specialCH = /\${(.*?)}/g;
      const fields: Field[] = [];
      let match;
      while ((match = specialCH.exec(content))) {
        const field = match[1];
        fields.push({ label: field, value: '', name: field.replace('.', '_') });
        /*{label: 'client', value: '', name: 'client'}
          {label: 'supplier.name', value: '', name: 'supplier_name'}*/
      }
      return fields;
    }
    addFeatures(){
      for (const field of this.fields) {
        const value = field.value;
        const keys = field.label.split('.');
        console.log("keys",keys)
        /* keys: ['client']
                 ['supplier', 'name']
        */
        let currentObj: any = this.formData;
        console.log("befroe currentObj",currentObj)
        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          if (!currentObj[key]) {
            currentObj[key] = {};
          }
          currentObj = currentObj[key];
          console.log("currentObj",currentObj)
        }
        currentObj[keys[keys.length - 1]] = value;
      }
      console.log(JSON.stringify(this.formData));
      //{"client":"a","purchase":{"name":"b"}}
      this.showSuccessFeatures()
        setTimeout(() => {
          this.isSelectedTemplate=false;
          this.isConfirmedTemplate=false;
        }
        ,3000); 
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
  generatePDF() { 
    console.log("content",this.templateRequest.content)
    this.templateService.GeneratePDF(this.templateRequest.templateId,this.formData)
    .subscribe((blob: Blob) => {
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
  /*********************/
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