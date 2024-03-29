import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Template } from '../model/template';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { TemplateHistory } from '../model/templatehistory';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private apiURL="https://localhost:7176/api";
  private url='Template';
  private urlTH='TemplateHistory/historic';
  private urlG='Template/pdf';
  private urlS='Template/email';
  public list: Template[];

  constructor(private http : HttpClient) {  }
  
  public getAllTemp(): Observable<Template[]>{
    return this.http.get<Template[]>(`${this.apiURL}/${this.url}`);
  }
  public getTemplate(id :string): Observable<Template>{
    return this.http.get<Template>(`${this.apiURL}/${this.url}/` + id);
  }
  public getTemplateByName(name :string): Observable<Template>{
    return this.http.get<Template>(`${this.apiURL}/${this.url}/` + name);
  }
  public updateTemplate(id :string, template : Template): Observable<Template>{
    return this.http.put<Template>(`${this.apiURL}/${this.url}/` + id, template);
  }
  public CreateTemplate(addTemplateRequest : Template): Observable<Template>{
    addTemplateRequest.templateId='00000000-0000-0000-0000-000000000000';
    console.log("ssssssssssss",addTemplateRequest);

    return this.http.post<Template>("https://localhost:7176/api/Template",addTemplateRequest);
  }
  public deleteTemplate(id :string): Observable<Template>{
    return this.http.delete<Template>(`${this.apiURL}/${this.url}/` + id);
  }
  public SendEmail(id :string, body: any): any{
    return this.http.post(`${this.apiURL}/${this.urlS}/${id}`, body);
  }  
  public GeneratePDF(id :string, jsonData : any): any{
    const options = {
      responseType: 'blob' as const // response type is blob
    };
    return this.http.post(`${this.apiURL}/${this.urlG}/${id}` , jsonData,options);
  }
  public getHistoricByTemplateId(id:string): Observable<TemplateHistory[]>{
    return this.http.get<TemplateHistory[]>(`${this.apiURL}/${this.urlTH}/` + id);
  }
}
