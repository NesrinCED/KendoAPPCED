import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTemplateComponent } from './home-menu/template/add-template/add-template.component';
import { ListTemplateComponent } from './home-menu/template/list-template/list-template.component';
import { UpdateTemplateComponent } from './home-menu/template/update-template/update-template.component';
import { ViewTemplateComponent } from './home-menu/template/view-template/view-template.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ImageDialogComponent } from './home-menu/template/add-template/image-dialog-add/image-dialog.component';
import { ImageUploadComponent } from './home-menu/template/add-template/image-upload-add/image-upload.component';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { AdminRoutingModule } from './admin-routing.module';
import { ImageUploadUpdateComponent } from './home-menu/template/update-template/image-upload-update/image-upload-update.component';
import { ImageDialogUpdateComponent } from './home-menu/template/update-template/image-dialog-update/image-dialog-update.component';
import { TestTemplateComponent } from './home-menu/test-template/test-template.component';
import { SendEmailComponent } from './home-menu/test-template/send-email/send-email.component';
import { GeneratePdfComponent } from './home-menu/test-template/generate-pdf/generate-pdf.component';
import { UpdateUserByAdminComponent } from './home-menu/employee/update-user-by-admin/update-user-by-admin.component';
import { AccessedWriteTemplatesComponent } from './home-menu/employee/accessed-write-templates/accessed-write-templates.component';


@NgModule({
  declarations: [ 
    ListEmployeeComponent,
    AddTemplateComponent,
    ListTemplateComponent,
    ListProjectComponent,
    UpdateTemplateComponent,
    ViewTemplateComponent,
    UpdateEmployeeComponent,
    ListTemplatesEmployeeComponent,
    HomeComponent,
    ImageDialogComponent, 
    ImageUploadComponent,
    ImageUploadUpdateComponent,
    ImageDialogUpdateComponent,
    TestTemplateComponent,
    SendEmailComponent,
    GeneratePdfComponent,
    UpdateUserByAdminComponent,
    AccessedWriteTemplatesComponent,
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
    NgbModule,
    UploadsModule,
    AdminRoutingModule,
    
    
  ]
})
export class AdminModule { }
