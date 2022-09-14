import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-event-sponsor-details',
  templateUrl: './event-sponsor-details.component.html',
  styleUrls: ['./event-sponsor-details.component.css']
})
export class EventSponsorDetailsComponent implements OnInit {
  sponsor: any = {};
  list: any[] = [];
  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.sponsor = this.list[0];
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
