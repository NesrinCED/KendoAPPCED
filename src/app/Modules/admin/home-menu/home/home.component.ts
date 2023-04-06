import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public userName:string;

constructor(private router : Router, private fb:FormBuilder, public employeeService:EmployeeService){}


ngOnInit(): void {
  this.userName=this.employeeService.GetUser().employeeName
}

}
