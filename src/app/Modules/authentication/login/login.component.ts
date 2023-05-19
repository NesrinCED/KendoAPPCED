import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/ValidateForm';
import { Role } from 'src/app/model/role';
import { EmployeeService } from 'src/app/service/employee.service';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
   id:string="";

  loginForm! : FormGroup;
  type: string="password";
  isText: boolean=false;
  eyeIcon: string = "fa-eye-slash";

  showSuccessAlert = false;
  showDangerAlert = false;
  roleId:any;

  role:Role={
    roleId: '',
    roleName: ''
  };
  
  constructor(private router : Router, private fb:FormBuilder, private employeeService:EmployeeService
    ,private toastr:ToastrService, private roleService:RoleService){}
  
  ngOnInit():void {
    this.loginForm=this.fb.group({
      EmployeeName: ['', Validators.required],
      EmployeePassword: ['', Validators.required]
    })
  }
  hideshowPass(){
    this.isText= !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon= "fa-eye-slash" ;
    this.isText ? this.type= "text" : this.type= "password";
 }
 
  onLogin() {
    if(this.loginForm.valid){ 
      //send object to database 
      this.employeeService.login(this.loginForm.value)
      .subscribe({
        next:(res:any)=>{   
          this.employeeService.getEmployeeByName(this.loginForm.value.EmployeeName).subscribe((res:any)=>{
            this.id=res.employeeId;
            this.employeeService.StoreUser(res,res.roleDTO);
           // console.log("onLogin()",this.employeeService.GetUser())
          //  console.log(res.roleDTO)
          //  this.employeeService.storeRole(res.roleDTO);
            //console.log("onLogin()",this.employeeService.GetRole())
            this.showSuccess()
            this.router.navigate(['']);                   

          });   
        },
        error:(err:any)=>{
          this.showError()
          console.error("cannot find user !!")
        }
      })
    }
    
    else{
      //throw error using toaster and with required fields
      console.log("form invalid")
      this.showWarning()
      ValidateForm.validateAllFormFileds(this.loginForm);
    }
  //  console.log("ouuut onLogin()",this.employeeService.GetUser())

  }
  public showSuccess(): void {
    this.toastr.success('You Logged In Successefully !', 'LOGIN Message');
  }
  public showError(): void {
    this.toastr.error('User Not Found ', 'LOGIN Message');
  }
  public showInfo(): void {
    this.toastr.info('Message Info!', 'Title Info!');
  }
  public showWarning(): void {
    this.toastr.warning('Please Fill All Fields  !', 'FORM Warning');
  }



}
