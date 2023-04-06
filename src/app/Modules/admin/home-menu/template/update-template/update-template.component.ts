import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/model/project';
import { Template } from 'src/app/model/template';
import { ProjectService } from 'src/app/service/project.service';
import { TemplateService } from 'src/app/service/template.service';

@Component({
  selector: 'app-update-template',
  templateUrl: './update-template.component.html',
  styleUrls: ['./update-template.component.css']
})
export class UpdateTemplateComponent {

  projectNames : string[]=[];
  id:any;


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
  
  
  constructor(private router:Router,private activatedRoute: ActivatedRoute,
     private templateService : TemplateService,private projectService : ProjectService){}

  getAllProj(){
    this.projectService.getAllProj()
    .subscribe( (result: any[]) => (
     result.forEach( x=>this.projectNames.push(x.projectName))
      ));
  
  }
  ngOnInit(): void {
    this.getAllProj();

    this.activatedRoute.paramMap.subscribe(
      {
        next: (params) => {
          const id = params.get('templateId');
          if (id){
            this.templateService.getTemplate(id).subscribe(
              {
                next: (result) => { 
                  this.templateDetails=result;
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

  updateTempate(){
  //for projectId
    this.projectService.getProjectByName(this.project.projectName)
    .subscribe((result:any)=>(
      this.id=result.projectId,
      this.templateDetails.projectId=this.id,
      this.templateService.updateTemplate(this.templateDetails.templateId, this.templateDetails)
      .subscribe({
        next : (result) =>{this.router.navigate(['ListTemplate']);}
      })
      ));    


  }
}
