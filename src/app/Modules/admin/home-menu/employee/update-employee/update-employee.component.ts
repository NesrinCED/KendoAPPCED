import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {

  employeeDetails : Employee={
    employeeId:'',
    employeeName:'',
    employeePassword:''
  };
  
  recentPassword:string="";
  type: string="password";
  isText: boolean=false;
  eyeIcon: string = "fa-eye-slash";
  ngForm!:FormGroup;
  typedPassword:string="";
  same:boolean=true;
  dangerAlert:boolean=false;

  constructor(private router:Router, private activatedRoute: ActivatedRoute,
     private employeeService:EmployeeService, private fb:FormBuilder){
   }


  ngOnInit() : void{
    this.employeeDetails=this.employeeService.GetUser();
    this.recentPassword=this.employeeDetails.employeePassword;

    this.ngForm=this.fb.group({
      employeeName: ['', Validators.required],
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });

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
          console.log("result :",res);
          this.employeeService.logout();
          this.router.navigate(['/login']);
        },
        error=>{console.error("error in updating")}
      )
      }
    }
    else{
      this.dangerAlert=true;
    }

 
  }

  onReset() {
    this.ngForm.reset();
 }
  hideshowPass(){
    this.isText= !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon= "fa-eye-slash" ;
    this.isText ? this.type= "text" : this.type= "password";
 }
 
 
}

    /*this.activatedRoute.paramMap.subscribe(
      {
        next: (params) => {
          const id = params.get('employeeId');
          console.log("aaaaa",id);
          if (id){
            this.employeeService.getEmployee(id).subscribe(
              {
                next: (result) => { 
                  this.employeeDetails=result;
                  console.log("bbb",this.employeeDetails);
                 }
              }
            );
          }
          else{
            console.log("id fera8");
          }
        }
      }
    )  */