import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiURL="https://localhost:7176/api";
  private url='Role';

  constructor(private http : HttpClient) {  }
  
  public getAllRole(): Observable<Role[]>{
    return this.http.get<Role[]>(`${this.apiURL}/${this.url}`);
  }
  public getRole(id :string): Observable<Role>{
    return this.http.get<Role>(`${this.apiURL}/${this.url}/` + id);
  }
 /* public getRoleByName(name :string): Observable<Role>{
    return this.http.get<Role>(`${this.apiURL}/${this.url}/` + name);
  }
  public updateRole(id :string, Role : Role): Observable<Role>{
    return this.http.put<Role>(`${this.apiURL}/${this.url}/` + id, Role);
  }
    public deleteRole(id :string): Observable<Role>{
    return this.http.delete<Role>(`${this.apiURL}/${this.url}/` + id);
  }*/
  public CreateRole(addRoleRequest : Role): Observable<Role>{
    addRoleRequest.roleId='00000000-0000-0000-0000-000000000000';
    console.log("ppp",addRoleRequest)
    return this.http.post<Role>(`${this.apiURL}/${this.url}`,addRoleRequest);
  }

}
