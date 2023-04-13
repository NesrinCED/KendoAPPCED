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
  projectNames : string[]=[];
  id:any;
  user:any;
  projectName:any;

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
    .subscribe( (result: any[]) => (
     result.forEach( x=>this.projectNames.push(x.projectName))
      ));
  
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
                    this.projectService.getProject(this.templateDetails.projectId).subscribe(
                      (res:any)=>(
                        this.projectName=res.projectName,
                        this.project.projectName=this.projectName
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

  updateTemplate(){
  //for projectId
    this.projectService.getProjectByName(this.project.projectName)
    .subscribe((result:any)=>(
      this.id=result.projectId,
      this.templateDetails.projectId=this.id,
      this.templateService.updateTemplate(this.templateDetails.templateId, this.templateDetails)
      .subscribe(
        {
        next : (result) =>{this.router.navigate(['admin/AllTemplates']);}
        },
        
     // error:()=>{}
      )
      ));    
  }

 public openImage() {
  this.dialog.open();
}
}


