import { Component, Output, EventEmitter } from '@angular/core';
import { SelectEvent, FileInfo } from '@progress/kendo-angular-upload';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

export interface ImageInfo {
  src: string;
  width: number;
  height: number;
}
@Component({
  selector: 'app-image-upload-update',
  templateUrl: './image-upload-update.component.html',
  styleUrls: ['./image-upload-update.component.css']
})
export class ImageUploadUpdateComponent {

  constructor(private httpClient : HttpClient,private sanitizer: DomSanitizer) {  }

    public uploadSaveUrl = "https://localhost:7176/api/Template/upload";
    public uploadRemoveUrl = 'removeUrl'; 

    @Output() public valueChange: EventEmitter<ImageInfo> = new EventEmitter<ImageInfo>();

    public onSelect(ev: SelectEvent): void {
      const formData = new FormData();
      ev.files.forEach((file: FileInfo) => {
        if (file.rawFile) {
          formData.append('file', file.rawFile);
          const reader = new FileReader();
                reader.onloadend = () => {
                    const img = new Image();

                    img.src = <string>reader.result;
                    img.onload = () => {
                      const sanitizedSrc = this.sanitizer.bypassSecurityTrustResourceUrl(img.src);
                      this.valueChange.emit({
                        src: sanitizedSrc.toString(),
                        height: img.height,
                        width: img.width
                      });
                    }; 
                };       
                          
                reader.readAsDataURL(file.rawFile);
        }
      });
      this.httpClient.post(this.uploadSaveUrl, formData).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
}
    
public onRemove(): void {
    this.valueChange.emit();
}
}
