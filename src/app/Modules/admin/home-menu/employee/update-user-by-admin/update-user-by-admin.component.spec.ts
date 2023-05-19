import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserByAdminComponent } from './update-user-by-admin.component';

describe('UpdateUserByAdminComponent', () => {
  let component: UpdateUserByAdminComponent;
  let fixture: ComponentFixture<UpdateUserByAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserByAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
