import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-open-linkto-wall-for-write-comments-modal',
  templateUrl: './open-linkto-wall-for-write-comments-modal.component.html',
  styleUrls: ['./open-linkto-wall-for-write-comments-modal.component.css']
})
export class OpenLinktoWallForWriteCommentsModalComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.bsModalRef.hide();
  }
}
