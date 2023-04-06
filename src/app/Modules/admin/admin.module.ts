import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTemplateComponent } from './home-menu/template/add-template/add-template.component';
import { ListTemplateComponent } from './home-menu/template/list-template/list-template.component';
import { UpdateTemplateComponent } from './home-menu/template/update-template/update-template.component';
import { ViewTemplateComponent } from './home-menu/template/view-template/view-template.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { EditorModule } from '@progress/kendo-angular-editor';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { MenuModule } from '@progress/kendo-angular-menu';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { PopupModule } from '@progress/kendo-angular-popup';
import { UpdateEmployeeComponent } from './home-menu/employee/update-employee/update-employee.component';
import { ListTemplatesEmployeeComponent } from './home-menu/employee/list-templates-employee/list-templates-employee.component';
import { ListProjectComponent } from './home-menu/list-project/list-project.component';
import { HomeComponent } from './home-menu/home/home.component';
import { ListEmployeeComponent } from './home-menu/employee/list-employee/list-employee.component';



@NgModule({
  declarations: [ 
   /* AddTemplateComponent,
    ListTemplateComponent,
    ListProjectComponent,
    UpdateTemplateComponent,
    ViewTemplateComponent,
    UpdateEmployeeComponent,
    ListTemplatesEmployeeComponent,
    CreatedTemplateEmployeeComponent,
    HomeComponent,*/
  
  ],
  imports: [
    CommonModule,
    DateInputsModule,
    GridModule,
    DropDownsModule,
    FormsModule,
    ButtonsModule,
    InputsModule,
    IconsModule,
    PopupModule,
    ReactiveFormsModule,
    DialogsModule,
    EditorModule,
    LabelModule,
    LayoutModule,
    MenuModule,
    PDFExportModule,
    NavigationModule,
    IndicatorsModule,
    NgbModule
  ]
})
export class AdminModule { }
