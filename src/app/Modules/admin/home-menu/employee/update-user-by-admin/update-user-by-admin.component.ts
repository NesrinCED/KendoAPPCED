import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupRef } from '@progress/kendo-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/model/employee';
import { Project } from 'src/app/model/project';
import { ProjectAuth } from 'src/app/model/project-auth';
import { Role } from 'src/app/model/role';
import { EmployeeService } from 'src/app/service/employee.service';
import { ProjectService } from 'src/app/service/project.service';
import { ProjectAuthService } from 'src/app/service/projectAuth.service';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-update-user-by-admin',
  templateUrl: './update-user-by-admin.component.html',
  styleUrls: ['./update-user-by-admin.component.css']
})
export class UpdateUserByAdminComponent {

  name:string;
  ngEditForm:FormGroup;
  roles:string[]=[];
  gridEditData: any=[] ;
  projects:string[]=[];
  idToEdit:any;
  openEdit=true;
  recentEmployee:any;

  employee : Employee={
    employeeId: '',
    employeeName: '',
    employeePassword: '',
    role: '',
    employeeEmail: '',
    projectAuthorizationsDTO: []
  };

  project : Project={
    projectId:'',
    projectName:'',
    createdBy:'',
    createdDate: undefined
  };

  role : Role={
    roleId: '',
    roleName: ''
  }

  constructor(private toastr:ToastrService,private router:Router, private employeeService:EmployeeService
    , private fb:FormBuilder, private roleService: RoleService, private projectService: ProjectService
    ,private activatedRoute: ActivatedRoute, private projectAuthService: ProjectAuthService){}

  ngOnInit() : void{
    this.openEdit=true;
    this.idToEdit=this.activatedRoute.snapshot.paramMap.get('id');
    this.getEmployee(this.idToEdit);
    this.getAllRoles();
    
    this.ngEditForm=this.fb.group({
      employeeName: ['',Validators.required],
      employeeEmail: ['',Validators.email],
      roleName: [''],
      read: [],
      write: []
    });
  }
  getEmployee(id:string){
    this.activatedRoute.paramMap.subscribe(
      {
        next: (params) => {
          const id = params.get('id');
          if (id){
            this.employeeService.getEmployee(id).subscribe(
              {
                next: (result) => { 
                  this.employee=result;
                  this.recentEmployee=result;
                  console.log(" employee",this.recentEmployee)
                  //this.gridEditData=this.recentEmployee.projectAuthorizationsDTO;
                  let name=""
                  this.recentEmployee.projectAuthorizationsDTO.forEach((a:any) => {
                    this.projectService.getProject(a.projectId).subscribe(
                      (res:any) => {
                        name=res.projectName
                        this.gridEditData.push(
                          {
                            read: a.read,
                            write: a.write,
                            projectName:name,
                            projectId:a.projectId
                          }
                        )
                      }
                    )
                    
                  });
                  console.log("gridEditData",this.gridEditData)
                  // to show role in dropdownlist
                   this.roleService.getRole(this.employee.role).subscribe(
                      (res:any)=>(
                        this.role=res
                        )
                    );    
                 }
              }
            );
          }
          else{
            console.log("error ! ");
          }
        }
      }
    )
  }
  getAllRoles(){
    this.roleService
    .getAllRole()
    .subscribe( 
      (result: any[]) => {
        this.roles=result     } 
    );
  }
  saveEdit(id:string,employee:any){
    console.log(" employee to update 000", employee)
    employee.projectAuthorizationsDTO=this.gridEditData;
    console.log(" employee to update 1111 ", employee)
    this.employeeService.updateUserByAdmin(id,employee).subscribe(
      (res:any)=>{      
        console.log("updated employee ", res)
        this.showSuccess()
        this.router.navigate(['Developers'])
      },
      error=>{
        this.showError()
        console.error("error in updating")
      }
    )
    
  }
  closeDialogEdit(){
    this.openEdit=false;
    this.router.navigate(['Developers'])
  }
  public changeStatus(dataItem: any, field: string): void {
    dataItem[field] = !dataItem[field];
   // console.log("changestatus", dataItem);
  }
  /*****Alerts******/
  public showSuccess(): void {
    this.toastr.success('Employee Edited Successufully ! ', 'EDIT Message');
  }
  public showErrorEmail(): void {
    this.toastr.error('Wrong Email Format !', 'EMAIL Message');
  }
  public showError(): void {
    this.toastr.error('Employee Not Edited !', 'EDIT Message');
  }
  public showInfo(): void {
    this.toastr.info('Message Info!', 'Title Info!');
  }
  public showWarning(): void {
    this.toastr.warning('Please Fill All Fields  !', 'FORM Warning');
  }
}
