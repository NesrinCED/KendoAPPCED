import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadUpdateComponent } from './image-upload-update.component';

describe('ImageUploadUpdateComponent', () => {
  let component: ImageUploadUpdateComponent;
  let fixture: ComponentFixture<ImageUploadUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageUploadUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageUploadUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
