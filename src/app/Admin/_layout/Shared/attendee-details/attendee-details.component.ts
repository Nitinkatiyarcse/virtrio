import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Helper } from 'src/app/Utils/Helper';
@Component({
  selector: 'app-attendee-details',
  templateUrl: './attendee-details.component.html',
  styleUrls: ['./attendee-details.component.css']
})
export class AttendeeDetailsComponent implements OnInit {
  attendee: any = {};
  list: any[] = [];
  companyName = '-';
  designation = '-';
  address = '-';
  city = '-';
  state = '-';
  country = '-';
  zip = '-';
  dateOfBirth :any;
  constructor(public bsModalRef: BsModalRef,
    public helper: Helper) {
  }

  ngOnInit(): void {
    this.attendee = this.list[0];
    this.attendee.emailVerifyDate = this.attendee.emailVerifyDate ? this.helper.convertDateToLocalTimezone(this.attendee.emailVerifyDate) : '';
    this.attendee.registerDate = this.attendee.registerDate ? this.helper.convertDateToLocalTimezone(this.attendee.registerDate) : '';
    this.attendee.approvedDisapprovedDate = this.attendee.approvedDisapprovedDate ?
      this.helper.convertDateToLocalTimezone(this.attendee.approvedDisapprovedDate) : '';
    JSON.parse(this.attendee.standardFields).forEach(element => {
      if (element.label == 'Company Name') {
        this.companyName = element.value;
      }
      if (element.label == 'Designation') {
        this.designation = element.value;
      }
      if (element.label == 'Address') {
        this.address = element.value;
      }
      if (element.label == 'City') {
        this.city = element.value;
      }
      if (element.label == 'State/Province') {
        this.state = element.value;
      }
      if (element.label == 'Country') {
        this.country = element.value;
      }
      if (element.label == 'Zip/Postal Code') {
        this.zip = element.value;
      }
      if (element.label == 'Date of Birth') {
        this.dateOfBirth = this.helper.convertDateToLocalTimezone(element.value);
      }
    });
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
