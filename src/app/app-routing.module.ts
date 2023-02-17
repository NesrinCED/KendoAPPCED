import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTemplateComponent } from './components/template/add-template/add-template.component';
import { ListTemplateComponent } from './components/template/list-template/list-template.component';

const routes: Routes =  [
  { path: '', redirectTo:'ListTemplate',pathMatch:'full' },
    { path: 'AddTemplate', component: AddTemplateComponent },
    { path: 'ListTemplate', component: ListTemplateComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
