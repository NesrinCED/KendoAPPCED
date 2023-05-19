import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessedWriteTemplatesComponent } from './accessed-write-templates.component';

describe('AccessedWriteTemplatesComponent', () => {
  let component: AccessedWriteTemplatesComponent;
  let fixture: ComponentFixture<AccessedWriteTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessedWriteTemplatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessedWriteTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
