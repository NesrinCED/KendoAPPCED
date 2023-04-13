import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/ValidateForm';
import { EmployeeService } from 'src/app/service/employee.service';

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

  constructor(private router : Router, private fb:FormBuilder, private employeeService:EmployeeService){}
  
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
          this.showSuccessAlert=true;
          this.showDangerAlert=false;
          this.employeeService.getEmployeeByName(this.loginForm.value.EmployeeName).subscribe((res:any)=>{
            this.id=res.employeeId;
            this.router.navigate(['admin']);       
            this.employeeService.StoreUser(res);
          });       
        },
        error:(err:any)=>{
          this.showDangerAlert=true;
          console.error("cannot find user !!")
        }
      })
    }
    else{
      //throw error using toaster and with required fields
      console.log("form invalid")
      ValidateForm.validateAllFormFileds(this.loginForm);
      alert("Your form is invalid");
    }
  }


}
