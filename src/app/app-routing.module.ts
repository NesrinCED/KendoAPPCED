import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Modules/authentication/login/login.component';
import { SignupComponent } from './Modules/authentication/signup/signup.component';
import { HomeMenuComponent } from './Modules/admin/home-menu/home-menu.component';
import { ListProjectComponent } from './Modules/admin/home-menu/list-project/list-project.component';
import { AuthGaurdService } from './service/auth-gaurd-.service';
import { ListTemplatesEmployeeComponent } from './Modules/admin/home-menu/employee/list-templates-employee/list-templates-employee.component';
import { UpdateEmployeeComponent } from './Modules/admin/home-menu/employee/update-employee/update-employee.component';
import { AddTemplateComponent } from './Modules/admin/home-menu/template/add-template/add-template.component';
import { ListTemplateComponent } from './Modules/admin/home-menu/template/list-template/list-template.component';
import { UpdateTemplateComponent } from './Modules/admin/home-menu/template/update-template/update-template.component';
import { HomeComponent } from './Modules/admin/home-menu/home/home.component';
import { ImageUploadComponent } from './Modules/admin/home-menu/template/add-template/image-upload-add/image-upload.component';
import { ImageDialogComponent } from './Modules/admin/home-menu/template/add-template/image-dialog-add/image-dialog.component';

const routes: Routes =  [
/* {path: 'home', component:HomeMenuComponent,canActivate:[AuthGaurdService] ,children : [

  ]},*/  
  { path: '',loadChildren:()=>import('./Modules/admin/admin.module')
  .then((m)=>m.AdminModule)},
  { path: '', redirectTo:'login',pathMatch:'full' },
  { path: 'login', component: LoginComponent }, 
  { path: 'signup', component: SignupComponent},

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
