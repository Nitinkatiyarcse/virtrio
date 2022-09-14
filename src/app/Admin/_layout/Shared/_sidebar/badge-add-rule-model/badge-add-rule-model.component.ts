import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-badge-add-rule-model',
  templateUrl: './badge-add-rule-model.component.html',
  styleUrls: ['./badge-add-rule-model.component.css']
})
export class BadgeAddRuleModelComponent implements OnInit {
  rule: any = {};
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }


  closeModal() {
    this.bsModalRef.hide();
  }
  AddBadgeRule() {

  }

}
