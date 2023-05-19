import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-test-template',
  templateUrl: './test-template.component.html',
  styleUrls: ['./test-template.component.css']
})
export class TestTemplateComponent {

  constructor( public employeeService:EmployeeService    ){}

  ngOnInit(){
    console.log("test template",this.employeeService.GetUser())
  }

}
