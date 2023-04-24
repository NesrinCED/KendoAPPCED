import { Component, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorComponent } from '@progress/kendo-angular-editor';
import { Project } from 'src/app/model/project';
import { Template } from 'src/app/model/template';
import { EmployeeService } from 'src/app/service/employee.service';
import { ProjectService } from 'src/app/service/project.service';
import { TemplateService } from 'src/app/service/template.service';
import { ImageDialogUpdateComponent } from './image-dialog-update/image-dialog-update.component';
import { Employee } from 'src/app/model/employee';
import ValidateForm from 'src/app/helpers/ValidateForm';

@Component({
  selector: 'app-update-template',
  templateUrl: './update-template.component.html',
  styleUrls: ['./update-template.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UpdateTemplateComponent {

  @ViewChild("upload") public dialog: ImageDialogUpdateComponent;
  @Output() @ViewChild("editor") public editor: EditorComponent;

  languages = ['Arabic', 'French', 'English','Korean','Turkish','Chinese','Punjabi','German', 'Japanese', 'Indonesian', 'Portuguese', 'Russian', 'Spanish', 'Hindi'];
  ngForm!:FormGroup;
  projects : string[]=[];
  id:any;
  user:any;

  templateDetails :  Template={
    templateId: '',
      name: '',
      language: '',
      content: '',
      createdBy : '',
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
  
  employee : Employee={
    employeeId:'',
    employeeName:'',
    employeePassword:''
  };
  
  constructor(private router:Router,private activatedRoute: ActivatedRoute,  private fb:FormBuilder
     ,private templateService : TemplateService,private projectService : ProjectService
     ,private employeeService:EmployeeService){}

  getAllProj(){
    this.projectService.getAllProj()
    .subscribe( (result: any[]) => (this.projects=result));
  
  }
  ngOnInit(): void {

    this.user=this.employeeService.GetUser();
    
    this.templateDetails.modifiedBy=this.user;
  
    this.getAllProj();

    this.ngForm=this.fb.group({
      name: ['', Validators.required],
      language: ['', Validators.required],
      modifiedBy: ['', Validators.required],
      projectName: ['', Validators.required],
      content: ['', Validators.required]     
      
    });

    this.activatedRoute.paramMap.subscribe(
      {
        next: (params) => {
          const id = params.get('id');
          if (id){
            this.templateService.getTemplate(id).subscribe(
              {
                next: (result) => { 
                  this.templateDetails=result;
                  //hethi blastha houni car ki getTemplat modifiedBy null bdd
                  this.templateDetails.modifiedBy=this.user.employeeId;
                  this.employee.employeeName=this.user.employeeName;
                  // to show projectname in dropdownlist
                   this.projectService.getProject(this.templateDetails.projectId).subscribe(
                      (res:any)=>(
                        this.project=res
                       // console.log(this.project)
                        )
                    );           
                 }
              }
            );
          }
          else{
            console.log("id fera8");
          }
        }
      }
    )
  }
  onSubmit() {
    this.updateTemplate();
  } 
  updateTemplate(){
    this.templateDetails.projectId=this.project.projectId;
    this.templateService.updateTemplate(this.templateDetails.templateId, this.templateDetails)
    .subscribe(
      {
      next : (result) =>{this.router.navigate(['admin/AllTemplates']);}
      },);
    /*if (this.ngForm.valid){
      this.templateDetails.projectId=this.project.projectId;
      this.templateService.updateTemplate(this.templateDetails.templateId, this.templateDetails)
      .subscribe(
        {
        next : (result) =>{this.router.navigate(['admin/AllTemplates']);}
        },);
    }
    else{
      console.log("form invalid")
      ValidateForm.validateAllFormFileds(this.ngForm);
      window.alert("Your form is invalid");
    }*/
 
  }

 public openImage() {
  this.dialog.open();
}
}


