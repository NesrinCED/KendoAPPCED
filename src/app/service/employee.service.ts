import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/employee';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthGaurdService } from './auth-gaurd-.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  islogin = false;
  admin = false;
  suser = false;
  choixmenu : string  = 'A';
  listData : Employee[];
  public dataForm:  FormGroup;

  private apiURL="https://localhost:7176/api";
  private url='Employee';

  constructor(private http : HttpClient
    //,private router : Router, 
     ,private authGaurdService: AuthGaurdService) {  }

  logout() {
    localStorage.removeItem('user');
    console.log("logged out !!!");
   // this.router.navigate(['login'])
  }
  
  GetUser(){
    var x=JSON.parse(localStorage.getItem('user')|| '{}');
    return x;
  }
  StoreUser(user : any){
    localStorage.setItem('user',JSON.stringify(user))
  }
  IsLoggedIn(){
   var x=JSON.parse(localStorage.getItem('user')|| '{}');
    return !!localStorage.getItem('user');
  }
  public getAllTemplatesById(id :string): Observable<any[]>{
    return this.http.get<any[]>("https://localhost:7176/api/Employee/AllTemplates/" + id);
  }

  signUp(addEmployeeRequest:Employee){
    addEmployeeRequest.employeeId='00000000-0000-0000-0000-000000000000';
    console.log("sign up in service ", addEmployeeRequest);
    return this.http.post<Employee>("https://localhost:7176/api/Employee/register",addEmployeeRequest);
  }

  login(addEmployeeRequest:Employee){
    console.log("hetheyya request",addEmployeeRequest);
    var x:any;
    return this.http.post<Employee>("https://localhost:7176/api/Employee/authenticate",addEmployeeRequest);
  }
  public getAllemp(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiURL}/${this.url}`);
  }
  public getEmployee(id :string): Observable<Employee>{
    console.log("hekislash importanteeeeeeeee");
    return this.http.get<Employee>(`${this.apiURL}/${this.url}/` + id);
  }
  public getEmployeeByName(name :string): Observable<Employee>{
    console.log("get employee name in service angular");
    return this.http.get<Employee>(`${this.apiURL}/${this.url}/` + name);
  }
  public updateEmployee(id :string, employee : Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiURL}/${this.url}/` + id, employee);
  }

  public deleteEmployee(id :string): Observable<Employee>{
    return this.http.delete<Employee>(`${this.apiURL}/${this.url}/` + id);
  }
}
