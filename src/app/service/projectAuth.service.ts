import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProjectAuth } from '../model/project-auth';
import { Template } from '../model/template';
import { Project } from '../model/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectAuthService {

  private apiURL="https://localhost:7176/api";
  private url='ProjectAuthorization';

  constructor(private http : HttpClient) {  }
  
  public getAllProjectAuth(): Observable<ProjectAuth[]>{
    return this.http.get<ProjectAuth[]>(`${this.apiURL}/${this.url}`);
  }
 public getEmployeesProjectAuth(id :string): Observable<ProjectAuth[]>{
    return this.http.get<ProjectAuth[]>(`${this.apiURL}/${this.url}/filteredEmployees/` + id);
  }
  public getEmployeeAccessdProjectAuth(id :string): Observable<Template[][]>{
    return this.http.get<Template[][]>(`${this.apiURL}/${this.url}/filteredAccessedProjectAuth/` + id);
  }
  public getEmployeeAccessdProjects(id :string): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.apiURL}/${this.url}/filteredAccessedProjects/` + id);
  }
 /* public getProjectAuthByName(name :string): Observable<ProjectAuth>{
    return this.http.get<ProjectAuth>(`${this.apiURL}/${this.url}/` + name);
  }
  public updateProjectAuth(id :string, ProjectAuth : ProjectAuth): Observable<ProjectAuth>{
    return this.http.put<ProjectAuth>(`${this.apiURL}/${this.url}/` + id, ProjectAuth);
  }
    public deleteProjectAuth(id :string): Observable<ProjectAuth>{
    return this.http.delete<ProjectAuth>(`${this.apiURL}/${this.url}/` + id);
  }
  public CreateProjectAuth(addProjectAuthRequest : ProjectAuth): Observable<ProjectAuth>{
    addProjectAuthRequest.ProjectAuthId='00000000-0000-0000-0000-000000000000';
    console.log("ppp",addProjectAuthRequest)
    return this.http.post<ProjectAuth>(`${this.apiURL}/${this.url}`,addProjectAuthRequest);
  }*/

}