import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Template } from './model/template';
import { TemplateService } from './service/template.service';
import {enableProdMode} from '@angular/core';
import { AppModule } from "./app.module";


enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'kendoApp';
  }
  


