import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { EmployeeService } from 'src/app/service/employee.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeMenuComponent implements OnInit {

public expanded = false;

public selectedItem:string="";

public items = [
  {
    title: "Home",
    iconDrawer: "k-i-home",
    selected: false,
    link: "Home",

  },
  { separator: true },
  {
    title: "Developers",
    description: "Manage Users",
    iconDrawer: "k-i-myspace",
    link: "Developers",
    selected: false,

  },
  { separator: true },
  {
    title: "Projects",
    description: "List Of Projects",
    iconDrawer: "k-i-clipboard-code",
    link: "Projects",
    selected: false,
  },
  { separator: true },
  {
    title: "Template",
    description: "Go To Template Space",
    iconDrawer: "k-i-track-changes",
    link: "AllTemplates",
    selected: false,
  },
  { separator: true },
  {
    title: "My Templates",
    description: "Manage Your Templates",
    iconDrawer: "k-i-track-changes-accept-all",
    link: "MyTemplates",
    selected: false,
  },
  { separator: true },
  {
    title: "New Template",
    description: "Create New Template",
    iconDrawer: "k-i-file-add",
    link: "AddTemplate",
    selected: false,
  },
  { separator: true },
  {
    title: "Test Template",
    description: "Test Template",
    iconDrawer: "k-i-data-json",
    link: "TestTemplate",
    selected: false,
  },
  { separator: true },
  {
    title: "Settings",
    description: "Manage Your Account",
    iconDrawer: "k-i-settings",
    link: "Settings",
    selected: false,
  },
  
];


constructor(private router : Router, private fb:FormBuilder, public employeeService:EmployeeService){}


ngOnInit(): void {
}

public onSelect(event: any): void {
  this.selectedItem = event.item.title;

  this.items.forEach(item => {
    if (item.title ===  this.selectedItem ) {
      item.selected = true;
    } 
  });
}


logout(){
  this.employeeService.logout();
  this.router.navigate(['/login'])
}

}

