import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/ValidateForm';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  /*signUpForm! : FormGroup;
  type: string="password";
  isText: boolean=false;
  eyeIcon: string = "fa-eye-slash";
  showSuccessAlert = false;


  constructor(private fb:FormBuilder, private employeeService:EmployeeService, private router:Router
    ,private toastr:ToastrService){}
  
  
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
      this.employeeService.signUp(this.signUpForm.value)
      .subscribe({
        next:(res)=>{
          this.showSuccessAlert=true;
          this.signUpForm.reset();
          this.showSuccess()
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 3000);
          
        },
        error:(err)=>{
          this.showError()
          //this.showSuccessAlert=false;
         console.log(err?.error.message)
        }
      })
    }
    else{
      this.showWarning()
      ValidateForm.validateAllFormFileds(this.signUpForm);
    }
  }
  public showSuccess(): void {
    this.toastr.success('You Signed Up Successefully !', 'SIGNUP Message');
  }
  public showError(): void {
    this.toastr.error('User Not Signed Up ', 'SIGNUP Message');
  }
  public showInfo(): void {
    this.toastr.info('Message Info!', 'Title Info!');
  }
  public showWarning(): void {
    this.toastr.warning('Please Fill All Fields  !', 'FORM Warning');
  }*/

}
