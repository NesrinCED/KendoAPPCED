import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Template } from 'src/app/model/template';
import { TemplateService } from 'src/app/service/template.service';
import {enableProdMode} from '@angular/core';
import { Offset } from '@progress/kendo-angular-popup/models/offset.interface';
import { Align } from '@progress/kendo-angular-popup';
enableProdMode();

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

  constructor(private router:Router, private templateService:TemplateService){
    this.gridData=[{"action":true}]
  }
  getalltemp(){
    this.templateService
    .getAllTemp()
    .subscribe( (result: any[]) => (this.gridData=result ,  console.log(this.gridData)));
 
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
    ( (result) => (console.log(result),this.getalltemp()))
  }
  updateTemplate(id : string){
    this.router.navigate(['UpdateTemplate',id]);

    //this.templateService.updateTemplate(id).subscribe( (result) => (console.log(result)))
  }
 /* function():void{
      this.show = !this.show;
      //this.toggleText = this.show ? "Hide" : "Show";
   // this.router.navigate(['AddTemplate']);
  }*/
  /*goBack(): void {
  this.location.back();
} */
}
