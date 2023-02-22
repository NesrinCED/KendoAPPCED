import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTemplateComponent } from './components/template/add-template/add-template.component';
import { DeleteTemplateComponent } from './components/template/delete-template/delete-template.component';
import { ListTemplateComponent } from './components/template/list-template/list-template.component';
import { UpdateTemplateComponent } from './components/template/update-template/update-template.component';

const routes: Routes =  [
  { path: '', redirectTo:'ListTemplate',pathMatch:'full' },
    { path: 'AddTemplate', component: AddTemplateComponent },
    { path: 'ListTemplate', component: ListTemplateComponent },
    { path: 'UpdateTemplate/:id', component: UpdateTemplateComponent },
    { path: 'DeleteTemplate/:id', component: DeleteTemplateComponent }

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
