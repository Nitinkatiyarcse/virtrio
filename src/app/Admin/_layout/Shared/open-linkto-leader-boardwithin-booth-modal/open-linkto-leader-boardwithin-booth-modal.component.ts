import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-open-linkto-leader-boardwithin-booth-modal',
  templateUrl: './open-linkto-leader-boardwithin-booth-modal.component.html',
  styleUrls: ['./open-linkto-leader-boardwithin-booth-modal.component.css']
})
export class OpenLinktoLeaderBoardwithinBoothModalComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.bsModalRef.hide();
  }
}
