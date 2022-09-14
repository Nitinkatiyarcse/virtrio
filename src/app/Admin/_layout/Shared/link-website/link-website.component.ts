import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-link-website',
  templateUrl: './link-website.component.html',
  styleUrls: ['./link-website.component.css']
})
export class LinkWebsiteComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  index: any;
  linkWebsite: any;
  constructor(public bsModalRef: BsModalRef) {

  }

  ngOnInit(): void {
    console.log(this.index);
    console.log(this.linkWebsite);
    this.linkWebsite.forEach(element => {
      if (element.type === '') {
        element.type = 'iFrame';
      }
    });
  }

  AddNewExternalUrl() {
    this.linkWebsite.push({ name: '', url: '', type: '' });
  }
  AddExternalUrl() {
    this.triggerEvent();
  }

  triggerEvent() {
    console.log(this.linkWebsite);
    let proceed = true;;
    this.linkWebsite.forEach(element => {
      if (element.type == undefined || element.type == '') {
        proceed = false;
      }
    });
    if (!proceed) {
      alert('please select type');
      return;
    }
    this.event.emit({ index: this.index, data: this.linkWebsite });
    this.bsModalRef.hide();
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  deleteElement(elementIndex) {
    this.linkWebsite.splice(elementIndex, 1);
  }
}
