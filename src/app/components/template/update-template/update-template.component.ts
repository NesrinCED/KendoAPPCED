import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Template } from 'src/app/model/template';
import { TemplateService } from 'src/app/service/template.service';

@Component({
  selector: 'app-update-template',
  templateUrl: './update-template.component.html',
  styleUrls: ['./update-template.component.css']
})
export class UpdateTemplateComponent implements OnInit{

  templateDetails : Template={
    id: '',
    name: '',
    language: '',
    content: '',
    createdBy: '',
    modifiedBy: '',
    project: '',
    createdDate: undefined,
    modifiedDate: undefined
};
  constructor(private router:Router,private activatedRoute: ActivatedRoute, private templateService : TemplateService){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      {
        next: (params) => {
          const id = params.get('id');
          if (id){
            this.templateService.getTemplate(id).subscribe(
              {
                next: (result) => { this.templateDetails=result;}
              }
            );
          }
        }
      }
    )
  }

  updateTempate(){
    this.templateService.updateTemplate(this.templateDetails.id, this.templateDetails)
    .subscribe({
      next : (result) =>{this.router.navigate(['ListTemplate']);}
    });
  }
}
