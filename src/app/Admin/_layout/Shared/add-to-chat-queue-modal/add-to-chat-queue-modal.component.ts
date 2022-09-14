import { Component, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-to-chat-queue-modal',
  templateUrl: './add-to-chat-queue-modal.component.html',
  styleUrls: ['./add-to-chat-queue-modal.component.css']
})
export class AddToChatQueueModalComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  // addToChatQueue: any[] = [];
  addToChatQueue: any = {};
  index: any;
  constructor(public bsModalRef: BsModalRef, public translate: TranslateService) {
    console.log(this.addToChatQueue);
    console.log(this.index);
  }

  ngOnInit(): void {
  }

  addToChatQueueData() {
    this.triggerEvent();
  }


  triggerEvent() {
    this.event.emit({ index: this.index, data: this.addToChatQueue });
    this.bsModalRef.hide();
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
