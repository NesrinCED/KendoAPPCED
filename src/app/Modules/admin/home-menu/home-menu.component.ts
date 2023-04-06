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
  animations: [
    trigger('slideInFromRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('600ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('600ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('slideInFromLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('600ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('600ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class HomeMenuComponent implements OnInit {

public expanded = false;

public selectedItem:string="Home";


public items = [
  {
    title: "Home",
    iconDrawer: "k-i-home",
    selected: true,
  },
  { separator: true },
  {
    title: "Developers",
    description: "Manage Users",
    iconDrawer: "k-i-myspace",
  },
  { separator: true },
  {
    title: "Projects",
    description: "List Of Projects",
    iconDrawer: "k-i-clipboard-code",
  },
  { separator: true },
  {
    title: "Template",
    description: "Go To Template Space",
    iconDrawer: "k-i-track-changes",
  },
  { separator: true },
  {
    title: "My Templates",
    description: "Manage Your Created Templates",
    iconDrawer: "k-i-track-changes-accept-all",
  },
  { separator: true },
  {
    title: "New Template",
    description: "Create New Template",
    iconDrawer: "k-i-file-add",
  },
  { separator: true },
  {
    title: "Settings",
    description: "Manage Your Account",
    iconDrawer: "k-i-settings",
  },
  
];


constructor(private router : Router, private fb:FormBuilder, public employeeService:EmployeeService){}


ngOnInit(): void {
}

public onSelect(ev: DrawerSelectEvent): void {
  this.selectedItem=ev.item.title;
  console.log(this.selectedItem)
}

logout(){
  this.employeeService.logout();
  this.router.navigate(['/login'])
}

}

