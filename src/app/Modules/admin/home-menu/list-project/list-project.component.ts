import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent {

  public list: any[] ;

  constructor(private router:Router, private projectService:ProjectService){
  }
  getAll(){
    this.projectService
    .getAllProj()
    .subscribe( (result: any[]) => {
      this.list=result;  
      console.log(this.list);
    /* this.list.forEach(i => {
          console.log("!!!",i.employeeId);
      });*/
      console.log("nommmmm",this.list[0].projectId);
    } 
    );
 
  }
  ngOnInit() : void{

    this.getAll();
  }
}

