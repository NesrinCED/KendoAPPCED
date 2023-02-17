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
import { AddTemplateComponent } from './components/template/add-template/add-template.component';
import { DeleteTemplateComponent } from './components/template/delete-template/delete-template.component';
import { UpdateTemplateComponent } from './components/template/update-template/update-template.component';
import { ViewTemplateComponent } from './components/template/view-template/view-template.component';
import { ListTemplateComponent } from './components/template/list-template/list-template.component';
import { HttpClientModule } from '@angular/common/http';
import { IconsModule } from '@progress/kendo-angular-icons';
import { PopupModule } from '@progress/kendo-angular-popup';



 
@NgModule({
  declarations: [
    AppComponent,
    AddTemplateComponent,
    DeleteTemplateComponent,
    UpdateTemplateComponent,
    ViewTemplateComponent,
    ListTemplateComponent,
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
    ReactiveFormsModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
