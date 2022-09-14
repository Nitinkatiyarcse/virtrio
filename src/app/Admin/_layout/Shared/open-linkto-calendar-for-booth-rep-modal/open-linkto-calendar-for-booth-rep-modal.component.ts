import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-open-linkto-calendar-for-booth-rep-modal',
  templateUrl: './open-linkto-calendar-for-booth-rep-modal.component.html',
  styleUrls: ['./open-linkto-calendar-for-booth-rep-modal.component.css']
})
export class OpenLinktoCalendarForBoothRepModalComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.bsModalRef.hide();
  }
}
