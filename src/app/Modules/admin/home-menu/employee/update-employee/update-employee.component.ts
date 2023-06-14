import { Component , Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {

  employeeDetails : Employee={
    employeeId: '',
    employeeName: '',
    employeePassword: '',
    role: '',
    employeeEmail: '',
    projectAuthorizationsDTO: []
  };
  recentPassword:string="";
  type: string="password";
  isText: boolean=false;
  eyeIcon: string = "fa-eye-slash";
  ngForm!:FormGroup;
  typedPassword:string="";
  same:boolean=true;
  dangerAlert:boolean=false;
  recentAccount:any;
  isUser=false;
  roleName:any;

  constructor(private router:Router, private activatedRoute: ActivatedRoute,
     private employeeService:EmployeeService, private fb:FormBuilder,  private toastr:ToastrService,){
   }

  ngOnInit() : void{
    this.roleName=this.employeeService.GetUser().roleDTO.roleName;
    console.log("update employee",this.employeeService.GetUser().roleDTO.roleName)
    if(this.roleName=="Admin"){
      this.isUser=false;
    }
    else{
      this.isUser=true;
    }
    this.employeeDetails=this.employeeService.GetUser();
    this.recentAccount=this.employeeService.GetUser();
    this.recentPassword=this.employeeDetails.employeePassword;

    this.ngForm=this.fb.group({
      employeeName: ['', Validators.required],
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      employeeEmail:['',Validators.required]
    });
    this.employeeDetails.employeePassword=""

  }

  edit(){
    if (this.ngForm.valid){
      this.dangerAlert=false;
      var id=this.employeeDetails.employeeId;
      var employee=this.employeeDetails;
      this.typedPassword=this.ngForm.controls['currentPassword'].value;
      this.same=this.typedPassword===this.recentPassword; 
      if(this.same){
        this.employeeService.updateEmployee(id,employee).subscribe(
        (res:any)=>{          
            this.employeeService.logout();
            this.showSuccessUpdate()
            setTimeout(() => {
              this.showInfoLoggedOut()
              this.router.navigate(['/login']);
            }, 3000);
        },
        error=>{
          this.showErrorUpdate()
          console.error("error in updating")
        }
      )
      }
    }
    else{
      this.showErrorPassword()
     // this.dangerAlert=true;
    }

 
  }

  onReset() {
    this.ngForm.reset();
    this.dangerAlert=false;
    this.same=true;
 }
  hideshowPass(){
    this.isText= !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon= "fa-eye-slash" ;
    this.isText ? this.type= "text" : this.type= "password";
 }
  public showSuccessUpdate(): void {
    this.toastr.success('Account Updated Successfully !', 'Update Message');
  }
  public showErrorUpdate(): void {
    this.toastr.error('Account Not Updated ', 'Update Message');
  }
  public showErrorPassword(): void {
    this.toastr.error('Type Correct Current Password ! ', 'Password Message');
  }
  public showInfo(): void {
    this.toastr.info('No Changes To Update !', 'Update Info!');
  }
  public showInfoLoggedOut(): void {
    this.toastr.info('Message Info!', 'You Have Logged Out !');
  }
  public showWarning(): void {
    this.toastr.warning('Please Fill All Fields  !', 'Update Warning');
  }
 
}
