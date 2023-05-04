import { Component,ViewChild, ViewEncapsulation } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { PopupModule } from '@progress/kendo-angular-popup';
import { PopupService ,PopupRef} from '@progress/kendo-angular-popup';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
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
export class ListEmployeeComponent {


  public list: any[] ;
  private popupRef: PopupRef | null = null;
  opened:boolean=false;
  name:string;
  employee:any;

  public numTemplatesCreated :number;
  public numTemplatesModified :number;
  public totalNumTemplates = 10;

  public get percentageTemplatesCreated(): number {
    return (this.numTemplatesCreated / this.totalNumTemplates) * 100;
  }
  constructor(private popupService: PopupService,private router:Router, private employeeService:EmployeeService){}

  
  getAll(){
    this.employeeService
    .getAllemp()
    .subscribe( (result: any[]) => {
      this.list=result; 
      console.log(this.list) 
    } 
    );

  }
  ngOnInit() : void{
    this.getAll();
  }
  over(name:string,createdTemplates:any,modifiedTemplates:any){
    this.name=name;
    this.opened=true;
    this.numTemplatesCreated=createdTemplates.length
    this.numTemplatesModified=modifiedTemplates.length
    console.log(createdTemplates) 

  }
  close(){
    this.opened=false
  }

  

}


