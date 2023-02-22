import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Template } from 'src/app/model/template';
import { TemplateService } from 'src/app/service/template.service';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.css']
})
export class AddTemplateComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  languages = ['Arabic', 'French', 'English'];
  public gridData: any[] ;

  addTemplateRequest : Template={
      id: '',
      name: '',
      language: '',
      content: '',
      createdBy: '',
      modifiedBy: '',
      project: '',
      createdDate: undefined,
      modifiedDate: undefined
  };

  ngOnInit() {}

  constructor(private router:Router,private formBuilder: FormBuilder, private templateService : TemplateService) { }

  onSubmit() {
    this.addTemplate();
  } 

addTemplate() {
  console.log(this.addTemplateRequest);
  this.templateService.CreateTemplate(this.addTemplateRequest).subscribe
  ({next: (template) =>{
    console.log(template);
    this.submitted = false;
    this.router.navigate(['ListTemplate']);
  }})
}
onReset() {
   this.registerForm.reset();
}
public opened = true;

public close(status: string): void {
  console.log(`Dialog result: ${status}`);
  this.opened = false;
  this.router.navigate(['ListTemplate']);
}

public open(): void {
  this.opened = true;
}
 /* get f() { return this.registerForm.controls; }

  constructor(private formBuilder: FormBuilder, private templateService : TemplateService) { }
 
  ngOnInit() {
      this.registerForm = this.formBuilder.group
      ({  id: null,
          modifiedBy: null,
          createdDate: null,
          modifiedDate: null,
          language: ['', Validators.required],
          name: ['', Validators.required],
          createdBy: ['', Validators.required],
          project: ['', Validators.required],
          content: ['', Validators.required],
      });
  }
  onReset() {
   // this.submitted = false;
    this.registerForm.reset();
}
onSubmit() {
      this.addTemplate();
}
  addTemplate() {
    const formData = new  FormData();
    const template = this.registerForm.value;
    formData.append('template',JSON.stringify(template));
    this.templateService.CreateTemplate(formData).subscribe
    ( data => {  console.log(data) ;console.log(template)   });
 }*/

  /*addTemplate() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }*/


}
