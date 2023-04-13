import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IconsModule } from '@progress/kendo-angular-icons';
import { PopupModule } from '@progress/kendo-angular-popup';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { EditorModule } from '@progress/kendo-angular-editor';
import { LoginComponent } from './Modules/authentication/login/login.component';
import { SignupComponent } from './Modules/authentication/signup/signup.component';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { HomeMenuComponent } from './Modules/admin/home-menu/home-menu.component';
import { MenuModule } from '@progress/kendo-angular-menu';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './Modules/admin/home-menu/home/home.component';
import { CommonModule } from '@angular/common';
import { ListTemplatesEmployeeComponent } from './Modules/admin/home-menu/employee/list-templates-employee/list-templates-employee.component';
import { UpdateEmployeeComponent } from './Modules/admin/home-menu/employee/update-employee/update-employee.component';
import { ListProjectComponent } from './Modules/admin/home-menu/list-project/list-project.component';
import { AddTemplateComponent } from './Modules/admin/home-menu/template/add-template/add-template.component';
import { ListTemplateComponent } from './Modules/admin/home-menu/template/list-template/list-template.component';
import { UpdateTemplateComponent } from './Modules/admin/home-menu/template/update-template/update-template.component';
import { ViewTemplateComponent } from './Modules/admin/home-menu/template/view-template/view-template.component';
import { ListEmployeeComponent } from './Modules/admin/home-menu/employee/list-employee/list-employee.component';
import { ImageDialogComponent } from './Modules/admin/home-menu/template/add-template/image-dialog-add/image-dialog.component';
import { ImageUploadComponent } from './Modules/admin/home-menu/template/add-template/image-upload-add/image-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeMenuComponent,
    LoginComponent,
    SignupComponent,
/*    ListEmployeeComponent,
    AddTemplateComponent,
    ListTemplateComponent,
    ListProjectComponent,
    UpdateTemplateComponent,
    ViewTemplateComponent,
    UpdateEmployeeComponent,
    ListTemplatesEmployeeComponent,
    HomeComponent,
    ImageDialogComponent, 
    ImageUploadComponent*/

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DateInputsModule,
    BrowserAnimationsModule,
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
    UploadsModule,
    NavigationModule,
    IndicatorsModule,
    NgbModule,
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
