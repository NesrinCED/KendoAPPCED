import { Component, OnInit, ViewEncapsulation,Input  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { EmployeeService } from 'src/app/service/employee.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { ProjectAuthService } from 'src/app/service/projectAuth.service';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeMenuComponent implements OnInit {

public expanded = false;

roleName:any;
user:any;
employeeId:any;
listAccessedWriteTemplates:any;

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
    description: "Project's List ",
    iconDrawer: "k-i-clipboard-code",
    link: "Projects",
    selected: false,
  },
  { separator: true },
  {
    title: "Templates",
    description: "Template's List",
    iconDrawer: "k-i-track-changes",
    link: "AllTemplates",
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
    description: "Manage Account",
    iconDrawer: "k-i-settings",
    link: "Settings",
    selected: false,
  },
  
];


constructor(private router : Router, private fb:FormBuilder, public employeeService:EmployeeService
  ,private toastr:ToastrService, private projectAuthService:ProjectAuthService){}


ngOnInit(): void {
  this.user=this.employeeService.GetUser();
  this.roleName=this.employeeService.GetUser().roleDTO.roleName;
  this.changeItemsUeer();
}
changeItemsUeer(){
  /*console.log("home", this.roleName);
  console.log("home", this.user);*/
  if(this.roleName=="User"){
      this.employeeId=this.user.employeeId;
      const itemsToRemove = ['Developers', 'Projects', 'Template'];
      this.items = this.items.filter(item => item.title && !itemsToRemove.includes(item.title));
      //console.log(this.items);
      this.items.push(
        { separator: true },
        {
          title: "Template",
          description: "Go To Template Space",
          iconDrawer: "k-i-track-changes",
          link: "Templates",
          selected: false,
        },
      )
    }  

}

  public onSelect(event: any): void {
    this.selectedItem = event.item.title;
  // console.log("onselectt  ",this.items)
    this.items.forEach(item => {
      if (item.title ===  this.selectedItem ) {
        item.selected = true;
      } 
    });
  }

  logout(){
    this.employeeService.logout();
    this.showInfo()
    this.router.navigate(['/login']);                   
  }
  /*****alerts****/
  public showSuccessDelete(): void {
    this.toastr.success('Template Deleted Successefully !', 'Delete Message');
  }
  public showErrorDelete(): void {
    this.toastr.error('Template Not Deleted ', 'Delete Message');
  }
  public showInfo(): void {
    this.toastr.info('Message Info!', 'You Have Logged Out !');
  }
  public showWarning(): void {
    this.toastr.warning('Please Fill All Fields  !', 'FORM Warning');
  }

}

