import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-open-linkto-chat-screen-modal',
  templateUrl: './open-linkto-chat-screen-modal.component.html',
  styleUrls: ['./open-linkto-chat-screen-modal.component.css']
})
export class OpenLinktoChatScreenModalComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.bsModalRef.hide();
  }
}
