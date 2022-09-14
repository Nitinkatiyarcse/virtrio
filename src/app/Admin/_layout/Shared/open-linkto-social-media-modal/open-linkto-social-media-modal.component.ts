import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoomsService } from 'src/app/Services/rooms.service';

@Component({
  selector: 'app-open-linkto-social-media-modal',
  templateUrl: './open-linkto-social-media-modal.component.html',
  styleUrls: ['./open-linkto-social-media-modal.component.css']
})
export class OpenLinktoSocialMediaModalComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  index: any;
  linkSocialMedia: any[] = [];
  constructor(public bsModalRef: BsModalRef) {

  }

  ngOnInit(): void {
    console.log(this.linkSocialMedia);
    if (!this.linkSocialMedia) {
      this.linkSocialMedia = [];
      this.linkSocialMedia.push({ name: '', url: '' });
    }
  }
  closeModal() {
    this.bsModalRef.hide();
  }


  triggerEvent(item: any) {
    this.event.emit({ data: item, res: 200 });
  }

  saveLinkToSocialMedia() {
    this.triggerEvent(this.linkSocialMedia);
    this.closeModal();
  }
}
