import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login-partial',
  templateUrl: './login-partial.component.html',
  styleUrls: ['./login-partial.component.css']
})
export class LoginPartialComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
