import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoomsService } from 'src/app/Services/rooms.service';

@Component({
  selector: 'app-open-briefcase-modal',
  templateUrl: './open-briefcase-modal.component.html',
  styleUrls: ['./open-briefcase-modal.component.css']
})
export class OpenBriefcaseModalComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  index: any;
  briefcase: any;
  constructor(
    public bsModalRef: BsModalRef,
    private roomService: RoomsService,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    console.log(this.index);
    console.log(this.briefcase);
  }

  AddNewBriefcaseUrl() {
    this.briefcase.push({ name: '', linkUrl: '' });
  }
  AddExternalUrl() {
    this.triggerEvent();
  }

  triggerEvent() {
    this.event.emit({ index: this.index, data: this.briefcase });
    this.bsModalRef.hide();
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  deleteElement(elementIndex) {
    this.briefcase.splice(elementIndex, 1);
  }

  onFileChange(event, index) {
    this.spinner.show();
    if (event.target.files.length > 0) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        this.roomService.uploadBoothDocument(formData).subscribe((res) => {
          if (res.isSuccess) {
            this.briefcase[index].linkUrl = res.message;
          }
          this.spinner.hide();
        });
      }
    } else {
      this.spinner.hide();
    }
  }
}
