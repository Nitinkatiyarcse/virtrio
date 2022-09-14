import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-open-linkto-private-one-to-one-meeting-modal',
  templateUrl: './open-linkto-private-one-to-one-meeting-modal.component.html',
  styleUrls: ['./open-linkto-private-one-to-one-meeting-modal.component.css']
})
export class OpenLinktoPrivateOneToOneMeetingModalComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.bsModalRef.hide();
  }
}