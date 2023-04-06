import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Template } from '../model/template';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private apiURL="https://localhost:7176/api";
  private url='Template';

  public list: Template[];
  constructor(private http : HttpClient) {  }
  
  public getAllTemp(): Observable<Template[]>{
    return this.http.get<Template[]>(`${this.apiURL}/${this.url}`);
  }
  public getTemplate(id :string): Observable<Template>{
    console.log("hekislash importanteeeeeeeee");
    return this.http.get<Template>(`${this.apiURL}/${this.url}/` + id);
  }
  public getTemplateByName(name :string): Observable<Template>{
    console.log("getemployee name in service angular");
    return this.http.get<Template>(`${this.apiURL}/${this.url}/` + name);
  }
  public updateTemplate(id :string, template : Template): Observable<Template>{
    return this.http.put<Template>(`${this.apiURL}/${this.url}/` + id, template);
  }
  public CreateTemplate(addTemplateRequest : Template): Observable<Template>{
    console.log("this is in service",addTemplateRequest);
    addTemplateRequest.templateId='00000000-0000-0000-0000-000000000000';
    return this.http.post<Template>("https://localhost:7176/api/Template",addTemplateRequest);
    
   // return this.http.post<Template>(`${this.apiURL}/${this.url}`,addTemplateRequest);
  }
  public deleteTemplate(id :string): Observable<Template>{
    return this.http.delete<Template>(`${this.apiURL}/${this.url}/` + id);
  }
}
