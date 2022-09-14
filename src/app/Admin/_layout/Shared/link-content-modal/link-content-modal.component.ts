import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-link-content-modal',
  templateUrl: './link-content-modal.component.html',
  styleUrls: ['./link-content-modal.component.css']
})
export class LinkContentModalComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.bsModalRef.hide();
  }
}
