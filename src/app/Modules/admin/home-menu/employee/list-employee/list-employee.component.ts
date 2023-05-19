import { Component,ViewChild, ViewEncapsulation } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { PopupModule } from '@progress/kendo-angular-popup';
import { PopupService ,PopupRef} from '@progress/kendo-angular-popup';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleService } from 'src/app/service/role.service';
import { Employee } from 'src/app/model/employee';
import { Project } from 'src/app/model/project';
import { Role } from 'src/app/model/role';
import { ProjectService } from 'src/app/service/project.service';
import { ProjectAuth } from 'src/app/model/project-auth';
import { ToastrService } from 'ngx-toastr';
import { TemplateService } from 'src/app/service/template.service';
import { take, startWith, map } from 'rxjs/operators';
import { interval,Observable } from 'rxjs';
@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideInFromRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('600ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('600ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('slideInFromLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('600ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('600ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class ListEmployeeComponent {

  list: any[] ;
  private popupRef: PopupRef | null = null;
  opened:boolean=false;
  openedAdd=false;
  name:string;
  ngForm:FormGroup;
  ngEditForm:FormGroup;
  numTemplatesCreated :number;
  numTemplatesModified :number;
  totalNumTemplates: any;
  roles:string[]=[];
  gridData: any=[] ;
  projects:string[]=[];
  openEdit=false;
  loggedEmployee:any;
  projectAuthorizationsRequest: any[] = [];
  dialogDelete=false;
  canceledDelete=true;
  idToDelete:any;
  viewOpened=false;

  employee : Employee={
    employeeId: '',
    employeeName: '',
    employeePassword: '',
    role: '',
    employeeEmail: '',
    projectAuthorizationsDTO: []
  };

  addEmployeeRequest : Employee={
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
  projectAuthorization : ProjectAuth={
    projectAuthorizationId: '',
    read: '',
    write: '',
    employeeId: '',
    projectId: ''
  }
  /***for view ****/
  
  ViewGridData:any[];
  ViewEmployeeDetails:any;
  
  ViewEmployee : Employee={
    employeeId: '',
    employeeName: '',
    employeePassword: '',
    role: '',
    employeeEmail: '',
    projectAuthorizationsDTO: []
  };
  constructor(private toastr:ToastrService,private router:Router, private employeeService:EmployeeService
    , private fb:FormBuilder, private roleService: RoleService, private projectService: ProjectService
    , private templateService: TemplateService){}

  ngOnInit() : void{
    //console.log("list employee",this.employeeService.GetUser())
    this.templateService.getAllTemp().subscribe(
      (res:any) => {
        this.totalNumTemplates=res.length;
        console.log("total************ res ",this.totalNumTemplates);
      }
    )
    console.log("total ",this.totalNumTemplates)
    this.loggedEmployee=this.employeeService.GetUser()
    this.getAllemp();
    
    this.getAllRoles();
    this.ngForm=this.fb.group({
      employeeName: ['',Validators.required],
      employeeEmail: ['',Validators.email],
      roleName: ['',Validators.required],
      read: [false,Validators.required],
      write: [false,Validators.required],
    });
  }

  addEmployee() {
    console.log("addEmployeeFunction",this.gridData)    
    if (!this.ngForm.controls['employeeEmail'].valid){
      this.showErrorEmail()
    }
    else if(this.ngForm.valid && ( this.ngForm.value.read)){
     this.addEmployeeRequest.employeeName=this.ngForm.value.employeeName;
     this.addEmployeeRequest.employeePassword="go";
     this.addEmployeeRequest.role=this.role.roleId;
     this.addEmployeeRequest.employeeEmail=this.ngForm.value.employeeEmail;
    console.log("this.addEmployeeRequest",this.addEmployeeRequest)

    this.gridData.forEach( (a:any) => {
      const addProjectAuth : any={
        projectAuthorizationId: '',
        read: a.read,
        write: a.write,
        employeeId: '',
        projectId: a.projectId,
      }
      this.projectAuthorizationsRequest.push(addProjectAuth)
    })
    console.log("projectAuthorizationsRequest",this.projectAuthorizationsRequest)
    this.addEmployeeRequest.projectAuthorizationsDTO=this.projectAuthorizationsRequest;
    console.log("addEmployeeRequest",this.addEmployeeRequest)
    this.employeeService.add(this.addEmployeeRequest).subscribe(
      (res:any) => {
        console.log("res",res);
        this.showSuccess()    
        this.closeDialog()
      }
    )    
    }
    else{
      this.showError()
    }
  }
  fillGridData(){
    this.projectService.getAllProj().subscribe(
      (res:any) => {
        res.forEach(
          (a:any)=>{
            this.gridData.push({read: false,write: false, name:a.projectName, projectId:a.projectId })
            this.project=a.projectName
          }
        )
        console.log("griddata",this.gridData)
      }
    )
  }
  getAllemp(){
    this.employeeService
    .getAllemp()
    .subscribe( (result: any[]) => {
      this.list=result; 
     // console.log("employeeList",this.list)
    } 
    );
  }
  getAllRoles(){
    this.roleService
    .getAllRole()
    .subscribe( 
      (result: any[]) => {
        this.roles=result     } 
    );
  }

  close(){
    this.opened=false
  }

  openAddDialog(){
    this.fillGridData();
    this.openedAdd = true;
  }
  closeDialog(){
    this.openedAdd = false;
    this.getAllemp()
  }

  yes(){
    this.canceledDelete=false;
    this.deleteEmployee(this.idToDelete);
  }
  cancelDelete(){
    this.canceledDelete=true;
    this.dialogDelete=false;

  }
  deleteEmployee(id : string){
    this.idToDelete=id;
    this.dialogDelete=true;
    if(!this.canceledDelete){
     // console.log("iiiiiii",id)
      this.employeeService.deleteEmployee(id).subscribe(
         (a:any) => {
           console.log(a);
           this.dialogDelete=false;
           this.getAllemp()
           this.showSuccessDelete()
         }
       )
    }

  }
  public changeStatus(dataItem: any, field: string): void {
    console.log("changestatus",dataItem)
    dataItem[field] = !dataItem[field];
  }
  /***** For Edit ******* */
  editEmployee(id:string){
    this.openEdit=true;
    this.router.navigate(['Developers/UpdateUserByAdmin',id]);
  }
  /******* For View *******/
  viewEmployee(id : string){
    this.viewOpened=true;
    if (id){
      this.employeeService.getEmployee(id).subscribe(
        {
          next: (result) => { 
            this.ViewEmployee=result;
            this.ViewEmployeeDetails=result;
            this.ViewGridData= this.ViewEmployeeDetails.createdTemplatesDTO;
            this.ViewGridData.forEach((x)=>
            this.projectService.getProject(x.projectId).subscribe((a:any)=>
            {
              x.projectId=a.projectName;
            }
            ));
           }
        }
      );
    }
    else{
      console.log("error in getting id");
    }
  }
  returnToList(){
    this.viewOpened=false;
  }
  /*****Alerts******/
  public showSuccess(): void {
    this.toastr.success('Employee  Added Successufully ! ', 'ADD Message');
  }
  public showSuccessDelete(): void {
    this.toastr.success('Employee  Deleted Successufully ! ', 'DELETE Message');
  }
  public showErrorEmail(): void {
    this.toastr.error('Wrong Email Format !', 'EMAIL Message');
  }
  public showError(): void {
    this.toastr.error('Employee Not Added !', 'ADD Message');
  }
  public showInfo(): void {
    this.toastr.info('Message Info!', 'Title Info!');
  }
  public showWarning(): void {
    this.toastr.warning('Please Fill All Fields  !', 'FORM Warning');
  }
  
}


