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
import { ToastrService } from 'ngx-toastr';
import { ProjectAuthService } from 'src/app/service/projectAuth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-template',
  providers: [DatePipe],
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
  ngForm!:FormGroup;
  dangerAlert=false;
  dangerAlertF=false;
  featureForm!:FormGroup;
  featureName:string;
  currentPosition:any;

  roleName:any;
  user:any;
  employeeId:any;
  listAccessedWriteTemplates:any[];
  createDisabled=false;

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
    this.employeeId=this.user.employeeId;
    this.roleName=this.employeeService.GetUser().roleDTO.roleName;
    this.getAllEmp();
    if(this.roleName=="Admin"){
      this.getAllProj();
    }
    else{
      this.getFilteredProjects(this.employeeId);
    }
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

  constructor(private router:Router, private templateService:TemplateService,
    private projectService : ProjectService, private employeeService:EmployeeService
    ,private fb:FormBuilder,private datePipe: DatePipe,private toastr:ToastrService, 
    private projectAuthService:ProjectAuthService) { }
    
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
          this.showSuccess();
          setTimeout(() => {
            if(this.roleName=="Admin"){
              this.router.navigate(['AllTemplates']);                  
            }
            else{
              this.router.navigate(['AccessedTemplates']);                  
            }
          }, 3000);              
        },
        (error: HttpErrorResponse) => {
          this.showError()
          console.log("errrorr in the back!!",error)
        }
      )
    }
    else{
      this.dangerAlert=true;
      console.log("form invalid")
      ValidateForm.validateAllFormFileds(this.ngForm);
    }    
  }
  public opened = true;

  public close(status: string): void {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }

  public openImage() {
    this.dialog.open();
  }
  public cancel(){
    if(this.roleName=="Admin"){
      this.router.navigate(['AllTemplates']);                  
    }
    else{
      this.router.navigate(['AccessedTemplates']);                  
    }
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
  /*****for user */
  getFilteredProjects(id:string){
    this.projectAuthService.getWriteAccessedProjectsByEmployee(this.employeeId).subscribe(
      (result: any[]) => {
        this.projects = result;
        this.listAccessedWriteTemplates = result;
        console.log("templates Accessedprojects ", this.projects);
      },
      (error) => {
        console.log("error in Accessedprojects",error)
      }
    )
  }

/******alerts****/
  public showSuccess(): void {
    this.toastr.success('Template Created Successfully !', 'Save Message');
  }
  public showError(): void {
    this.toastr.error('Template Not Created ', 'Save Message');
  }
  public showInfo(): void {
    this.toastr.info('Message Info!', 'Title Info!');
  }
  public showWarning(): void {
    this.toastr.warning('Please Fill All Fields  !', 'FORM Warning');
  }

}