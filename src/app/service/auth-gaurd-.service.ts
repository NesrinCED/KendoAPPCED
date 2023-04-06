import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor(private auth : EmployeeService , private router : Router){}
  
  canActivate():boolean{
     if(this.auth.IsLoggedIn()){
      return true;
     }
     else{
      alert("Please Login First!")
      this.router.navigate(['login'])
      return false;
    }
    }
}
