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
import { FilterModule } from '@progress/kendo-angular-filter';
import { ToastrModule } from 'ngx-toastr';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';


@NgModule({
  declarations: [
    AppComponent,
    HomeMenuComponent,
    LoginComponent,
    SignupComponent,
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
    FilterModule,
    ToastrModule.forRoot({
      timeOut: 2000, // 3 seconds
      closeButton: true,
      progressBar: true,
    }),
    ProgressBarModule,
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
