import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/ValidateForm';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signUpForm! : FormGroup;
  type: string="password";
  isText: boolean=false;
  eyeIcon: string = "fa-eye-slash";

  alert: { type: string, message: string } = { type: '', message: '' };

  showAlert() {
    this.alert.type = 'primary';
    this.alert.message = 'Your signed up successufully !';
  }  
  constructor(private fb:FormBuilder, private employeeService:EmployeeService, private router:Router){}
  
  
  ngOnInit():void {
    this.signUpForm=this.fb.group({
      EmployeeName: ['', Validators.required],
      EmployeePassword: ['', Validators.required]
    })
  }
  hideshowPass(){
    this.isText= !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon= "fa-eye-slash" ;
    this.isText ? this.type= "text" : this.type= "password";
    
  }
  onSignUp() {
    if(this.signUpForm.valid){
      //send object to database
      console.log("this is res in sign component before service",this.signUpForm.value)
      this.employeeService.signUp(this.signUpForm.value)
      .subscribe({
        next:(res)=>{
          console.log("this is res in sign component",res)
          this.signUpForm.reset();
          this.router.navigate(['login']);
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }
    else{
      //throw error using toaster and with required fields
      ValidateForm.validateAllFormFileds(this.signUpForm);
    }
  }
 
}
