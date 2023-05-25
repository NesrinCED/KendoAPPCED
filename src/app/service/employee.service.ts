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
  choixmenu : string  = 'A';
  listData : Employee[];
  public dataForm:  FormGroup;

  private apiURL="https://localhost:7176/api";
  private url='Employee';

  constructor(private http : HttpClient ,private authGaurdService: AuthGaurdService) {  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    console.log("logged out !!!");
  }
  
  GetUser(){
    var x=JSON.parse(localStorage.getItem('user')|| '{}');
    return x;
  }
  GetRole(){
    var x=JSON.parse(localStorage.getItem('role')|| '{}');
    //console.log("ahouwa getRole !!!",x);
    return x;
  }
  storeRole(role:any){
    localStorage.setItem('role',JSON.stringify(role))
  }
  StoreUser(user : any, role:any){
    localStorage.setItem('user',JSON.stringify(user))
    //localStorage.setItem('role',JSON.stringify(role))
   // console.log("ahouwa storeUSer !!!",user);
    //console.log("ahouwa storeRole !!!",role);

  }
  IsLoggedIn(){
   //var x=JSON.parse(localStorage.getItem('user')|| '{}');
   return !!localStorage.getItem('user');
  }

  public getAllTemplatesById(id :string): Observable<any[]>{
    return this.http.get<any[]>("https://localhost:7176/api/Employee/AllTemplates/" + id);
  }

  add(addEmployeeRequest:Employee){
    addEmployeeRequest.projectAuthorizationsDTO.forEach( a => {
      a.projectAuthorizationId='00000000-0000-0000-0000-000000000000';
      a.employeeId='00000000-0000-0000-0000-000000000000';
    } );
    addEmployeeRequest.employeeId='00000000-0000-0000-0000-000000000000';
    return this.http.post<Employee>("https://localhost:7176/api/Employee/Add",addEmployeeRequest);
  }

  login(addEmployeeRequest:Employee){
    return this.http.post<Employee>("https://localhost:7176/api/Employee/authenticate",addEmployeeRequest);
  }
  public getAllemp(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiURL}/${this.url}`);
  }
  public getEmployee(id :string): Observable<Employee>{
    return this.http.get<Employee>(`${this.apiURL}/${this.url}/` + id);
  }
  public getEmployeeByName(name :string): Observable<Employee>{
    return this.http.get<Employee>(`${this.apiURL}/${this.url}/` + name);
  }
  public updateEmployee(id :string, employee : Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiURL}/${this.url}/` + id, employee);
  }
  public deleteEmployee(id :string): Observable<Employee>{
    return this.http.delete<Employee>(`${this.apiURL}/${this.url}/` + id);
  }
  /*************/
  public updateUserByAdmin(id :string, employee : Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiURL}/${this.url}/UpdateUserByAdmin/` + id, employee);
  }
  
}
