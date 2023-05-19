import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Align } from '@progress/kendo-angular-popup';
import { Employee } from 'src/app/model/employee';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/service/project.service';
import { TemplateService } from 'src/app/service/template.service';
import { FilterExpression } from "@progress/kendo-angular-filter";
import { CompositeFilterDescriptor, orderBy } from "@progress/kendo-data-query";
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
import { SortDescriptor } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { EmployeeService } from 'src/app/service/employee.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ProjectAuthService } from 'src/app/service/projectAuth.service';
import { Template } from 'src/app/model/template';

@Component({
  selector: 'app-accessed-write-templates',
  providers: [DatePipe],
  templateUrl: './accessed-write-templates.component.html',
  styleUrls: ['./accessed-write-templates.component.css']
})

export class AccessedWriteTemplatesComponent {
  
  public gridView: GridDataResult;
  public gridDataUser: any[]=[] ;
  public gridData: any[]=[] ;
  public pageSize = 20;
  public buttonCount = 2;
  public sizes = [5,10, 20, 50];
  public opened = true;
  filteredTemplates : string[]=[];
  projects : string[]=[];
  dialogDelete=false;
  canceledDelete=true;
  idToDelete:any;

  roleName:any;
  user:any;
  employeeId:any;
  listAccessedWriteTemplates:any;

  project : Project={
    projectId:'',
    projectName:'',
    createdBy:'',
    createdDate: undefined
  };  

  constructor(private router:Router, private templateService:TemplateService,
    private projectService : ProjectService, private employeeService:EmployeeService
    ,private datePipe: DatePipe,private toastr:ToastrService, private projectAuthService:ProjectAuthService
    ){}

  ngOnInit() : void{
    this.user=this.employeeService.GetUser();
    this.roleName=this.employeeService.GetUser().roleDTO.roleName;
    this.getAccessedWriteTemplate();
    this.user=this.employeeService.GetUser() ;
      this.templateService
      .getAllTemp()
      .subscribe(
         (result: any[]) => {
          this.gridData=result;
              
      } 
      );
    
  }
  getAccessedWriteTemplate(){
    console.log("access", this.roleName);
    console.log("access", this.user);
    this.employeeId=this.user.employeeId;
    this.projectAuthService.getEmployeeAccessdProjectAuth(this.employeeId).subscribe(
      (result: any[][]) => {
        this.gridDataUser = result.flat();
        this.listAccessedWriteTemplates = result;
        console.log("templates AccessedWriteTemplatesComponent ", this.gridDataUser);
        this.gridDataUser.forEach(
          (a:any) => {
            const formattedCreatedDate = this.datePipe.transform(a.createdDate, 'dd MMMM yyyy');
            const formattedModifiedDate = this.datePipe.transform(a.modifiedDate, 'dd MMMM yyyy');
            a.createdDate=formattedCreatedDate
            a.modifiedDate=formattedModifiedDate
          }
        )
        this.sortData()  
      },
      (error) => {
        console.log("error in fillteredTemplates",error)
      }
    )
  }
  sortData() {
    this.gridDataUser.sort((a:any, b:any) => {
      return a.templateCreatedBy.employeeName != this.user.employeeName ? 1 : -1;
    });
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
    this.idToDelete=id;
    //this.templateService.getTemplate(id).subscribe(res=>console.log(res));
    this.dialogDelete=true;
    if(!this.canceledDelete){
      this.templateService.deleteTemplate(id).subscribe
      ( (result) => (
        console.log(result),
        this.getAccessedWriteTemplate(),
        this.showSuccessDelete(),
        this.dialogDelete=false
        ),
        (error=>
          this.showErrorDelete()
        )
      );
    }
  }
  yes(){
    this.canceledDelete=false;
    this.deleteTemplate(this.idToDelete);
  }
  cancelDelete(){
    this.canceledDelete=true;
    this.dialogDelete=false;

  }
  updateTemplate(id : string){
    this.router.navigate(['UpdateTemplate',id]); 
  }
  openDialog(){
    this.opened = true;
    this.router.navigate(['AddTemplate']); 
  }
  closeDialog(){
    this.opened = false;
  }
  public showSuccessDelete(): void {
    this.toastr.success('Template Deleted Successefully !', 'Delete Message');
  }
  public showErrorDelete(): void {
    this.toastr.error('Template Not Deleted ', 'Delete Message');
  }
  public showInfo(): void {
    this.toastr.info('Message Info!', 'Title Info!');
  }
  public showWarning(): void {
    this.toastr.warning('Please Fill All Fields  !', 'FORM Warning');
  }
}
