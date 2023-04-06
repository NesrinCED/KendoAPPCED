import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { HomeComponent } from './home-menu/home/home.component';
import { ListProjectComponent } from './home-menu/list-project/list-project.component';
import { ListTemplateComponent } from './home-menu/template/list-template/list-template.component';



const routes: Routes =  [
  { path: 'admin', component: HomeMenuComponent,
    children: [
      {path: 'contentHome', component: HomeComponent },
      { path: 'contentProject', component: ListProjectComponent },
      {path: 'contentTemplate',component: ListTemplateComponent
      },
    ]
  }
];


  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AdminRoutingModule { }
