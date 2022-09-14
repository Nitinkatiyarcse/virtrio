import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoomsService } from 'src/app/Services/rooms.service';
import { Helper } from 'src/app/Utils/Helper';

@Component({
  selector: 'app-open-link-content-modal',
  templateUrl: './open-link-content-modal.component.html',
  styleUrls: ['./open-link-content-modal.component.css']
})
export class OpenLinkContentModalComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  index: any;
  content: any[] = [];
  constructor(
    public bsModalRef: BsModalRef,
    private roomService: RoomsService,
    private spinner: NgxSpinnerService, private helper: Helper) {
  }

  ngOnInit(): void {
    console.log(this.index);
    console.log(this.content);

  }

  AddNewcontentUrl() {
    this.content.push({ name: '', linkUrl: '', type: '', targetType: 'anotherWindow' });
  }



  AddExternalUrl() {
    this.triggerEvent();
  }

  triggerEvent() {
    this.event.emit({ index: this.index, data: this.content });
    this.bsModalRef.hide();
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  deleteElement(elementIndex) {
    this.content.splice(elementIndex, 1);
  }

  // onFileChange(event, index) {
  //   this.spinner.show();
  //   if (event.target.files.length > 0) {
  //     // upload file to server
  //     const fileList: FileList = event.target.files;
  //     if (fileList.length > 0) {
  //       const file: File = fileList[0];
  //       const formData: FormData = new FormData();
  //       formData.append('uploadFile', file, file.name);
  //       this.roomService.uploadBoothDocument(formData).subscribe((res) => {
  //         if (res.isSuccess) {
  //           this.content[index].linkUrl = res.message;
  //         }
  //         this.spinner.hide();
  //       });
  //     }
  //   } else {
  //     this.spinner.hide();
  //   }
  // }

  onFileChange(event, index) {
    this.spinner.show();
    if (event.target.files.length > 0) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        if (this.helper.validateMovieFile(file.name)) {
          this.content[index].type = 'video';
        } else {
          this.content[index].type = 'others';
        }
        formData.append('uploadFile', file, file.name);
        this.roomService.uploadBoothDocument(formData).subscribe((res) => {
          if (res.isSuccess) {
            this.content[index].linkUrl = res.message;
          }
          this.spinner.hide();
        });
      } else {
        this.spinner.hide();
      }
    }
  }
}
