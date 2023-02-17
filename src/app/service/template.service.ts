import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Template } from '../model/template';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private apiURL="https://localhost:7235/api";
  private url='Template';
  constructor(private http : HttpClient) {  }
  
  public getAllTemp(): Observable<Template[]>{
    return this.http.get<Template[]>(`${this.apiURL}/${this.url}`);
  }
  public updateTemplate(template : Template): Observable<Template[]>{
    return this.http.put<Template[]>(`${this.apiURL}/${this.url}`,template);
  }
  public CreateTemplate(template : Template): Observable<Template[]>{
    return this.http.post<Template[]>(`${this.apiURL}/${this.url}`,template);
  }
  public deleteTemplate(template : Template): Observable<Template[]>{
    return this.http.delete<Template[]>(`${this.apiURL}/${this.url}/${template.id}`);
  }
}
