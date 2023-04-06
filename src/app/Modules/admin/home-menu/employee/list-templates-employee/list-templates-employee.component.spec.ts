import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTemplatesEmployeeComponent } from './list-templates-employee.component';

describe('ListTemplatesEmployeeComponent', () => {
  let component: ListTemplatesEmployeeComponent;
  let fixture: ComponentFixture<ListTemplatesEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTemplatesEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTemplatesEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
