import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-open-linkto-info-card-modal',
  templateUrl: './open-linkto-info-card-modal.component.html',
  styleUrls: ['./open-linkto-info-card-modal.component.css']
})
export class OpenLinktoInfoCardModalComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.bsModalRef.hide();
  }
}
