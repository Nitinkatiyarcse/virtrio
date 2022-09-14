import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-entitlement-addcriteria',
  templateUrl: './entitlement-addcriteria.component.html',
  styleUrls: ['./entitlement-addcriteria.component.css']
})
export class EntitlementAddcriteriaComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
