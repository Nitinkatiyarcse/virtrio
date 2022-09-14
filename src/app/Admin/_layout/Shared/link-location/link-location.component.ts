import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-link-location',
  templateUrl: './link-location.component.html',
  styleUrls: ['./link-location.component.css']
})
export class LinkLocationComponent implements OnInit {

  public event: EventEmitter<any> = new EventEmitter();
  index;
  linkLocation;
  allLocations: any[] = [];
  selectedLocation: any[] = [];


  constructor(
    public bsModalRef: BsModalRef
  ) {

  }

  ngOnInit(): void {
    console.log(this.allLocations);
    console.log(this.selectedLocation);
  }

  saveLocation() {
    this.triggerEvent(this.selectedLocation);
    this.bsModalRef.hide();
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  triggerEvent(item: any) {
    this.event.emit({ data: item, res: 200 });
  }

  selectLocation(event) {
    this.selectedLocation[0].location = event.target.value;
  }
}
