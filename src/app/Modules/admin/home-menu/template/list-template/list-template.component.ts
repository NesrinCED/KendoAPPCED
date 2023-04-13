import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Align } from '@progress/kendo-angular-popup';
import { Employee } from 'src/app/model/employee';
import { TemplateService } from 'src/app/service/template.service';

@Component({
  selector: 'app-list-template',
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.css']
})

export class ListTemplateComponent {
  

  public popupAlign: Align = { horizontal: "center", vertical: "top" };
 // public show = false;
  public groupBy = [{field: 'name'}];
  public gridData: any[] ;
  public opened = true;
  public employee :Employee = new Employee();
  public employeeName:string="";

  constructor(private router:Router, private templateService:TemplateService){
   }
   goListProj(){
    this.router.navigate(["ListProject"]);
   }
  getalltemp(){
    this.templateService
    .getAllTemp()
    .subscribe( (result: any[]) => {
      this.gridData=result;  
      //console.log(this.gridData);
      //console.log(this.gridData[0]);

    } 
    );
 
  }
  ngOnInit() : void{

    this.getalltemp();
  }
  public close(status: string): void {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
    this.router.navigate(['AddTemplate']);
  }
  deleteTemplate(id : string){
    console.log(id);
    this.templateService.deleteTemplate(id).subscribe
    ( (result) => (
      //console.log(result),
      this.getalltemp()))
  }
  updateTemplate(id : string){
    this.router.navigate(['admin/AllTemplates/UpdateTemplate',id]); 
  }
 
}
