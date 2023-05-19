import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images = ['assets/images/email.png', 'assets/images/PDF.jpg'];
  currentImageIndex = 0;
  public userName:string;

  // An observable that emits every 5 seconds
  timer$: Observable<number> = timer(0, 3000);

  ngOnInit() {
   console.log("in home welcome",this.employeeService.GetUser())
    this.userName = this.employeeService.GetUser().employeeName;
    this.timer$.subscribe(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    });
  }

constructor(private router : Router, private fb:FormBuilder, public employeeService:EmployeeService
  ,private toastr:ToastrService){}

}


