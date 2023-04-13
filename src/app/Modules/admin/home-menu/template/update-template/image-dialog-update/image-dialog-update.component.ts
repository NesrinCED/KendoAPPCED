import { Component, Input } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EditorComponent } from '@progress/kendo-angular-editor';
import { ImageInfo } from '../image-upload-update/image-upload-update.component';

@Component({
  selector: 'app-image-dialog-update',
  templateUrl: './image-dialog-update.component.html',
  styleUrls: ['./image-dialog-update.component.css']
})
export class ImageDialogUpdateComponent implements HttpInterceptor {
  @Input() public editor: EditorComponent;

  public opened = false;
  public src: string;
  public height: number;
  public width: number;

  public get canInsert(): boolean {
      return !this.src;
  }

  public uploadImage(): void {
      if (!this.editor) {
        console.log('Editor is not defined');
        return;
    }
      this.editor.exec('insertImage', this.imageInfo);

      this.close();
  }

  public get imageInfo(): ImageInfo {
      return {
          src: this.src,
          height: this.height,
          width: this.width
      };
  }

  public setImageInfo(value: ImageInfo) {
      if (value) {
          this.src = value.src;
          this.height = value.height;
          this.width = value.width;
      } else {
          this.resetData();
      }
  }

  public open(): void {
      this.opened = true;
  }

  public close(): void {
      this.opened = false;
      this.resetData();
  }

  public resetData(): void {
      this.src = "";
      this.width = 0;
      this.height = 0;
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (req.url === 'saveUrl' || req.url === 'removeUrl') {
          return of(new HttpResponse({ status: 200 }));
      }

      return next.handle(req);
  }
}

