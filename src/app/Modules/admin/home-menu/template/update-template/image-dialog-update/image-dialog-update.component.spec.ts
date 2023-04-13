import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDialogUpdateComponent } from './image-dialog-update.component';

describe('ImageDialogUpdateComponent', () => {
  let component: ImageDialogUpdateComponent;
  let fixture: ComponentFixture<ImageDialogUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageDialogUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDialogUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
