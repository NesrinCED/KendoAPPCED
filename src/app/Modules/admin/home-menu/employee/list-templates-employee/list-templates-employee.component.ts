import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectEvent } from '@progress/kendo-angular-layout';
import { Align } from '@progress/kendo-angular-popup';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-list-templates-employee',
  templateUrl: './list-templates-employee.component.html',
  styleUrls: ['./list-templates-employee.component.css']
})
export class ListTemplatesEmployeeComponent {

  @Input() id:any;
  
  /*@Output() name = new EventEmitter<any>();
  //for the output
  addNewItem(value: string) {
    this.name.emit(value);
  }*/

  gridData:any[];

  employeeDetails:any;

  employeeName:string;
  employee : Employee={
    employeeId:'',
    employeeName:'',
    employeePassword:''
  };

  user:any;

  projectName:any;
  
  constructor(private router:Router, private activatedRoute: ActivatedRoute, 
    private employeeService:EmployeeService,  private projectService:ProjectService){
     this.user= this.employeeService.GetUser()
   }

  ngOnInit() : void{
    this.activatedRoute.paramMap.subscribe(
      {
        next: (params) => {
          const id = this.user.employeeId;
          if (id){
            this.employeeService.getEmployee(id).subscribe(
              {
                next: (result) => { 
                  this.employee=result;
                  this.employeeName=this.employee.employeeName;
                  this.employeeDetails=result;
                  this.gridData= this.employeeDetails.createdTemplatesDTO;
                  this.gridData.forEach((x)=>
                  this.projectService.getProject(x.projectId).subscribe((a:any)=>
                  {
                    x.projectId=a.projectName;
                  }
                  ));
                  this.projectName=this.gridData[0].projectId;
                  console.log("000",this.employeeDetails);
                  console.log("111",this.employeeName);
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
}






/*{

  public popupAlign: Align = { horizontal: "center", vertical: "top" };
  // public show = false;
   public groupBy = [{field: 'name'}];
   public gridData: any[] ;
   public opened = true;
   public employee :Employee = new Employee();
   public employeeName:string="";
 
  user:any;
  CId:any="aaa";


  public onTabSelect(e: SelectEvent): void {
    console.log("parent component");
  }

  public ngOnInit() {
    console.log("*******************",this.employeeService.GetUser().employeeId);
     /*this.activatedRoute.paramMap.subscribe(
      {
        next: (params) => {
          const id = params.get('employeeId');
          if (id){
            this.employeeService.getEmployee(id).subscribe(
              {
                next: (result) => { 
                  this.employee=result;
                  this.employeeName=this.employee.employeeName;
                  this.employeeDetails=result;
                  this.gridData= this.employeeDetails.createdTemplatesDTO;
                  this.gridData.forEach((x)=>
                  this.projectService.getProject(x.projectId).subscribe((a:any)=>
                  {
                    x.projectId=a.projectName;
                  }
                  ));
                  this.projectName=this.gridData[0].projectId;
                  console.log("000",this.employeeDetails);
                  console.log("111",this.employeeName);
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

  constructor(private router:Router, private activatedRoute: ActivatedRoute, 
    private employeeService:EmployeeService){
  }

  public close(status: string): void {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
    this.router.navigate(['AddTemplate']);
  }

 
}*/

