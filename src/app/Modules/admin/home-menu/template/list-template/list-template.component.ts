import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Align } from '@progress/kendo-angular-popup';
import { Employee } from 'src/app/model/employee';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/service/project.service';
import { TemplateService } from 'src/app/service/template.service';
import { FilterExpression } from "@progress/kendo-angular-filter";
import { CompositeFilterDescriptor, orderBy } from "@progress/kendo-data-query";
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
import { SortDescriptor } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { EmployeeService } from 'src/app/service/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-template',
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.css']
})

export class ListTemplateComponent {
  @ViewChild('projectList', { static: false }) projectList: DropDownListComponent;
  @ViewChild('languageList', { static: false }) languageList: DropDownListComponent;
  
  user:any;
  public gridView: GridDataResult;
  public gridData: any[]=[] ;
  public pageSize = 5;
  public buttonCount = 2;
  public sizes = [5,10, 20, 50];
  public opened = true;
  selectedProject:any;
  isSelectedProject=false;
  selectedLanguage:any;
  isSelectedLanguage=false;
  filteredTemplates : string[]=[];
  projects : string[]=[];
  languages = ['Arabic', 'French', 'English','Korean','Turkish','Chinese','Punjabi','German', 'Japanese', 'Indonesian', 'Portuguese', 'Russian', 'Spanish', 'Hindi'];
  filteredTemplatesLangauage : string[]=[];
  dialogDelete=false;
  canceledDelete=true;
  idToDelete:any;

  project : Project={
    projectId:'',
    projectName:'',
    createdBy:'',
    createdDate: undefined
  };  

  
  constructor(private router:Router, private templateService:TemplateService,
    private projectService : ProjectService, private employeeService:EmployeeService
    ,private toastr:ToastrService
    ){}

  ngOnInit() : void{
    this.getalltemp();
    this.getAllProj();
    this.user=this.employeeService.GetUser() ;
  }

  
  onLanguageChange(event:any) {
    if(this.isSelectedProject){
      this.projectList.reset()
    }
    this.isSelectedLanguage=true;
    this.selectedLanguage = event; 
    this.getFilteredTemplatesByLanguage(this.selectedLanguage);
  } 
   onProjectChange(event:any) {
    if(this.isSelectedLanguage){
      this.languageList.reset()
    }
    this.isSelectedProject=true;
    this.selectedProject = event; 
    this.getFilteredTemplates(this.selectedProject?.projectId);
  } 
  getFilteredTemplatesByLanguage(language:string){
    if(language){
      this.templateService.getFilteredTemplatesByLanguage(language).subscribe(
        (result:any)=>{
          console.log(result);
          this.filteredTemplatesLangauage=result;
          this.gridData=this.filteredTemplatesLangauage;
        }
      )
    }
  }
  getFilteredTemplates(projectId:string){
    if (projectId) {
      this.projectService.getFilteredTemplates(projectId)
        .subscribe((result: any[]) => {
          this.filteredTemplates = result; 
          console.log(this.filteredTemplates);
          this.gridData=this.filteredTemplates;
        });
    } else {
      this.filteredTemplates = []; 
    }
  }
   goListProj(){
    this.router.navigate(["ListProject"]);
   }
  getalltemp(){
    this.templateService
    .getAllTemp()
    .subscribe(
       (result: any[]) => {
        this.gridData=result;
        this.sortData()      
    } 
    );
  }
  sortData() {
    console.log("before sort",this.gridData)
    this.gridData.sort((a:any, b:any) => {
      return a.templateCreatedBy.employeeName != this.user.employeeName ? 1 : -1;
    });
    console.log("afetr sort",this.gridData)
  }
  getAllProj(){
    this.projectService.getAllProj()
    .subscribe( (result: any[]) =>{
     (this.projects=result)
    });
  }

  public close(status: string): void {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
    this.router.navigate(['AddTemplate']);
  }

  deleteTemplate(id : string){
    this.idToDelete=id;
    //this.templateService.getTemplate(id).subscribe(res=>console.log(res));
    this.dialogDelete=true;
    if(!this.canceledDelete){
      this.templateService.deleteTemplate(id).subscribe
      ( (result) => (
        console.log(result),
        this.getalltemp(),
        this.dialogDelete=false
        ));
    }
  }
  yes(){
    this.canceledDelete=false;
    this.deleteTemplate(this.idToDelete);
  }
  cancelDelete(){
    this.canceledDelete=true;
    this.dialogDelete=false;

  }
  updateTemplate(id : string){
    this.router.navigate(['admin/AllTemplates/UpdateTemplate',id]); 
  }
  openDialog(){
    this.opened = true;
    this.router.navigate(['admin/AddTemplate']); 
  }
  closeDialog(){
    this.opened = false;
  }
  reset(){
    this.getalltemp();
    this.projectList.reset();
    this.languageList.reset();
    this.isSelectedLanguage=false;
    this.isSelectedProject=false;
  }
 
}
