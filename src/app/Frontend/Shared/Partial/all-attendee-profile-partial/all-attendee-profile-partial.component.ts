import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { isThisTypeNode } from 'typescript';
import { DataService } from 'src/app/Services/data-service.service';
import { MessageToRepresentativePartialComponent } from '../message-to-representative-partial/message-to-representative-partial.component';
import { SendEmailFromAttendeeComponent } from '../send-email-from-attendee/send-email-from-attendee.component';

@Component({
  selector: 'app-all-attendee-profile-partial',
  templateUrl: './all-attendee-profile-partial.component.html',
  styleUrls: ['./all-attendee-profile-partial.component.css']
})
export class AllAttendeeProfilePartialComponent implements OnInit {
  attendeesProfileData: any = {};
  attendeeId = '';
  // profile data
  profileData: any = {};
  countryList: any[] = [];
  companyName = '-';
  city = '-';
  country = '-';

  isProfileImageAvailable = false;
  countryCode = '';
  isAttendee = false;
  eventDetails:any={};
  constructor(
    private spinner: NgxSpinnerService,
    private sessionStorage: SessionStorageService,
    private attendeeService: AttendeesService,
    public bsModalRef: BsModalRef, private dataservice: DataService, private modalService: BsModalService
  ) {
    this.profileData = {};
    if (this.sessionStorage.get('IsRepresentative') == 'true') {
      this.isAttendee = false;
    } else {
      this.isAttendee = true;
    }
  }

  ngOnInit(): void {
    // this.getUserProfile();
    // console.log(this.attendeesProfileData);
    JSON.parse(this.attendeesProfileData.standardFields).forEach(element => {
      if (element.label == 'Company Name') {
        this.companyName = element.value;
      }
      if (element.label == 'City') {
        this.city = element.value;
      }
      if (element.label == 'Country') {
        this.country = element.value;
      }
    });

  }

  closeModal() {
    this.bsModalRef.hide();
  }

  sendEmail() {
    this.bsModalRef.hide();

    const initialState = {
      attendee: this.attendeesProfileData,
      from: this.sessionStorage.get('AttendeeId')
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard:false,
    };

    const popupModalParams = Object.assign({}, modalConfig, { initialState, class: 'modal-lg',backdrop: 'static',keyboard:false });
    this.bsModalRef = this.modalService.show(SendEmailFromAttendeeComponent, popupModalParams);
  }
  openChat() {
    this.dataservice.openChatPopup.emit();
  }
}
