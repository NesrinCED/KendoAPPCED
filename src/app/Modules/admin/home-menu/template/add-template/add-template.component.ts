import { HttpErrorResponse } from '@angular/common/http';
import { Component, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditorComponent } from '@progress/kendo-angular-editor';
import { Employee } from 'src/app/model/employee';
import { Project } from 'src/app/model/project';
import { Template } from 'src/app/model/template';
import { EmployeeService } from 'src/app/service/employee.service';
import { ProjectService } from 'src/app/service/project.service';
import { TemplateService } from 'src/app/service/template.service';
import { ImageDialogComponent } from './image-dialog-add/image-dialog.component';
import ValidateForm from 'src/app/helpers/ValidateForm';
//import { NotificationService } from "@progress/kendo-angular-notification";

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
  
  @ViewChild("upload") public dialog: ImageDialogComponent;
  @Output() @ViewChild("editor") public editor: EditorComponent;

  registerForm: FormGroup;
  submitted = false;
  languages = ['Arabic', 'French', 'English','Korean','Turkish','Chinese','Punjabi','German', 'Japanese', 'Indonesian', 'Portuguese', 'Russian', 'Spanish', 'Hindi'];
  public gridData: any[] ;
  employeNames : string[]=[];
  projects : string[]=[];
  id:any;
  openedFeature:boolean=false;
  user:any;
  ngForm!:FormGroup;
  dangerAlert=false;
  dangerAlertF=false;
  featureForm!:FormGroup;
  featureName:string;
  currentPosition:any;

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
  

 
  ngOnInit() {
    this.user=this.employeeService.GetUser();
    this.getAllEmp();
    this.getAllProj();
    this.ngForm=this.fb.group({
      name: ['', Validators.required],
      language: ['', Validators.required],
      content: ['', Validators.required],
      projectName: ['']
    });
    this.featureForm=this.fb.group({
      featureName: ['',Validators.required]
    })
  }

  constructor(private router:Router,private fb: FormBuilder,
     private templateService : TemplateService,private employeeService : EmployeeService,private projectService : ProjectService) { }
    
  getAllEmp(){
    this.employeeService.getAllemp()
    .subscribe( (result: any[]) => (result.forEach(x=>this.employeNames.push(x.employeeName)) ));
  
  }

  getAllProj(){
    this.projectService.getAllProj()
    .subscribe( (result: any[]) =>{
     (this.projects=result),
      console.log(this.projects)
    });
  }
  onSubmit() {
    this.addTemplate();
  } 

  addTemplate() {
    if (this.ngForm.valid){
      this.dangerAlert=false;
      this.addTemplateRequest.createdBy=this.user.employeeId;
            
      if(this.project.projectId!=""){      
        this.addTemplateRequest.projectId=this.project.projectId;
      }
      else{
        this.addTemplateRequest.projectId="";
        delete (this.addTemplateRequest as {[key: string]: any}).projectId;
      }
      //for template
      this.templateService.CreateTemplate(this.addTemplateRequest).subscribe
      (
        (result: any) => {
          this.submitted = false;
          this.router.navigate(['admin/AllTemplates']);
        },
        (error: HttpErrorResponse) => {
          console.log("errrorr !!",error)
        }
      )
    }
    else{
      this.dangerAlert=true;
      console.log("form invalid")
      ValidateForm.validateAllFormFileds(this.ngForm);
     // window.alert("Your form is invalid");
    }

    
  }

  onReset() {
    this.registerForm.reset();
  }
  public opened = true;

  public close(status: string): void {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
  // this.router.navigate(['Home']);
  }

  public open(): void {
    this.opened = true;
  }

  public openImage() {
    this.dialog.open();
  }
  public cancel(){
  this.router.navigate(['admin/AllTemplates'])
  }

  openFeature(){
    this.currentPosition = this.editor.view.state.selection.$anchor?.pos;
    this.openedFeature=true;
  }

  closeDialog(){
    this.openedFeature=false;
  }

  onSubmitFeature(){
    if(this.featureForm.valid){
      if (this.currentPosition !== undefined) {
        var text= '${'+this.featureName+'}';
        const tr = this.editor.view.state.tr.insertText(text, this.currentPosition);
        this.editor.view.dispatch(tr);
      }
      this.dangerAlertF=false;
      this.openedFeature=false;     
      console.log("final content",  this.addTemplateRequest.content)
    }
    else{
      this.dangerAlertF=true;
    }
  }

  

}