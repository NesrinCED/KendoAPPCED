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
  projectNames : string[]=[];
  id:any;

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
  
 user:any;

 ngForm!:FormGroup;
 
  ngOnInit() {
    this.user=this.employeeService.GetUser();
    this.getAllEmp();
    this.getAllProj();
    this.ngForm=this.fb.group({
      name: ['', Validators.required],
      language: ['', Validators.required],
      content: ['', Validators.required],
      projectName: ['', Validators.required]
    });
  }

  constructor(private router:Router,private fb: FormBuilder,
     private templateService : TemplateService,private employeeService : EmployeeService,private projectService : ProjectService) { }
    
  getAllEmp(){
    this.employeeService.getAllemp()
    .subscribe( (result: any[]) => (result.forEach(x=>this.employeNames.push(x.employeeName)) ));
  
  }

  getAllProj(){
    this.projectService.getAllProj()
    .subscribe( (result: any[]) => (  
    result.forEach( x=>this.projectNames.push(x.projectName))
    ));  
  }
  onSubmit() {
    this.addTemplate();
  } 

addTemplate() {
  //for projectId
  this.projectService.getProjectByName(this.project.projectName)
  .subscribe((result:any)=>(
    this.id=result.projectId
    ,   console.log("id project",this.id),
    this.addTemplateRequest.projectId=this.id
    ));
    this.addTemplateRequest.createdBy=this.user.employeeId;
//    console.log("!!!!!!!!!!!!!",this.addTemplateRequest.createdBy)

  //for template
  this.templateService.CreateTemplate(this.addTemplateRequest).subscribe
  (
    (result: any) => {
      this.submitted = false;
      this.router.navigate(['admin/MyTemplates']);
    },
    (error: HttpErrorResponse) => {
      console.log("errrorr !!")
    }
  )
  
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

}
