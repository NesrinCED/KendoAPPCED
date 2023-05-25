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
import { DatePipe } from '@angular/common';
import { Template } from 'src/app/model/template';

@Component({
  selector: 'app-list-template',
  providers: [DatePipe],
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.css']
})

export class ListTemplateComponent {
  @ViewChild('projectList', { static: false }) projectList: DropDownListComponent;
  @ViewChild('languageList', { static: false }) languageList: DropDownListComponent;
  
  user:any;
  public gridView: GridDataResult;
  public gridData: any[]=[] ;
  public pageSize = 20;
  public buttonCount = 2;
  public sizes = [5,10, 20, 50];
  public opened = true;
  selectedProject:any;
  isSelectedProject=false;
  selectedLanguage:any;
  isSelectedLanguage=false;
  filteredTemplates : string[]=[];
  projects : string[]=[];
  initialLanguages= ['Arabic', 'French', 'English','Korean','Turkish','Chinese','Punjabi','German', 'Japanese', 'Indonesian', 'Portuguese', 'Russian', 'Spanish', 'Hindi'];
  languages = this.initialLanguages;
  filteredTemplatesLangauage : string[]=[];
  dialogDelete=false;
  canceledDelete=true;
  idToDelete:any;

  gridHistoric:any[];
  showHistoric=false;
  template : Template={
    templateId: '',
      name: '',
      language: '',
      content: '',
      createdBy: '',
      modifiedBy: '',
      projectId: '',
      createdDate: undefined,
      modifiedDate: undefined
  };

  project : Project={
    projectId:'',
    projectName:'',
    createdBy:'',
    createdDate: undefined
  };  

  constructor(private router:Router, private templateService:TemplateService,
    private projectService : ProjectService, private employeeService:EmployeeService
    ,private datePipe: DatePipe,private toastr:ToastrService
    ){}

  ngOnInit() : void{
    console.log("list template",this.employeeService.GetUser())
    this.getalltemp();
    this.getAllProj();
    this.user=this.employeeService.GetUser() ;
  }
  viewTemplateHistoric(id:string){
    this.showHistoric=true;
    this.templateService.getTemplate(id).subscribe(
      (res:any) => {
        this.template=res;
      }
    )
    if (id){
      this.templateService.getHistoricByTemplateId(id).subscribe(
        {
          next: (res) => { 
            this.gridHistoric=res;
            console.log("historic ",this.gridHistoric)
          }
        }
      );
    }
    else{
      console.log("error in getting id");
    }
  }
/*this.gridHistoric.forEach((x)=>
this.templateService.getTemplate(x.templateId).subscribe((a:any)=>
{
  x.templateId=a.name;
}
));*/
  onProjectChange(event:any) {
    this.isSelectedProject=true;
    this.selectedProject = event; 
    this.onFilterChange() 
  } 
  onLanguageChange(event:any) {
    this.isSelectedLanguage=true;
    this.selectedLanguage = event; 
    this.onFilterChange() 
  } 
/* if(this.isSelectedLanguage){
  this.languageList.reset()
}*/
   onFilterChange() {
    this.getFilteredTemplates(this.selectedProject?.projectId, this.selectedLanguage);
  } 
  getFilteredTemplates(projectId:string, language:string){
    this.projectService.getFilteredTemplates(projectId,language)
      .subscribe((result: any[]) => {
        this.filteredTemplates = result; 
        this.gridData=this.filteredTemplates;
        const newLang:string[]=[]
        if (this.filteredTemplates.length > 0) {
          this.filteredTemplates.forEach((a: any) => {
            if(!newLang.includes(a.language)){
              newLang.push(a.language);
            }
          });
        }
        this.languages=newLang;
       // console.log(this.filteredTemplates);

        //console.log("modified Lang",this.languages)
   });
   
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
        this.gridData.forEach(
          (a:any) => {
            const formattedCreatedDate = this.datePipe.transform(a.createdDate, 'dd MMMM yyyy');
            const formattedModifiedDate = this.datePipe.transform(a.modifiedDate, 'dd MMMM yyyy');
            a.createdDate=formattedCreatedDate
            a.modifiedDate=formattedModifiedDate
          }
        )
        this.sortData()  
            
    } 
    );
  }
  sortData() {
   // console.log("before sort",this.gridData)
    this.gridData.sort((a:any, b:any) => {
      return a.templateCreatedBy.employeeName != this.user.employeeName ? 1 : -1;
    });
  //  console.log("afetr sort",this.gridData)
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
  ShowDeleteTemplate(id : string){
    this.dialogDelete=true;
    this.idToDelete=id;
  }
  deleteTemplate(id : string){
  //  this.idToDelete=id;
    //this.templateService.getTemplate(id).subscribe(res=>console.log(res));
//    this.dialogDelete=true;
    if(!this.canceledDelete){
      this.templateService.deleteTemplate(id).subscribe
      ( (result) => (
        console.log(result),
        this.getalltemp(),
        this.showSuccessDelete(),
        this.dialogDelete=false
        ),
        (error=>
          this.showErrorDelete()
        )
      );
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
  cancelView(){
    this.showHistoric=false;
  }
  updateTemplate(id : string){
    this.router.navigate(['UpdateTemplate',id]); 
  }
  openDialog(){
    this.opened = true;
    this.router.navigate(['AddTemplate']); 
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
    this.languages = this.initialLanguages;
    this.selectedLanguage=null;
    this.selectedProject=null;
  }
  public showSuccessDelete(): void {
    this.toastr.success('Template Deleted Successefully !', 'Delete Message');
  }
  public showErrorDelete(): void {
    this.toastr.error('Template Not Deleted ', 'Delete Message');
  }
  public showInfo(): void {
    this.toastr.info('Message Info!', 'Title Info!');
  }
  public showWarning(): void {
    this.toastr.warning('Please Fill All Fields  !', 'FORM Warning');
  }
}
