import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Session } from 'protractor';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import * as AppUtils from 'src/app/Utils/apputils';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from 'src/app/Services/signal-r.service';
import { CommonService } from 'src/app/Utils/common';
@Component({
  selector: 'app-message-to-representative-partial',
  templateUrl: './message-to-representative-partial.component.html',
  styleUrls: ['./message-to-representative-partial.component.css']
})
export class MessageToRepresentativePartialComponent implements OnInit {
  to = '';
  eventName = '';
  boothName = '';
  roomId = '';
  eventId = '';
  eventRepresentativeId = '';
  isLoggedIn = false;
  isMessage = false;
  isMeetingRequest = false;
  eventStartDate: any = '';
  eventEndDate: any = '';
  messageToREpresentativeModel: any = {};
  preferredMinDate: any;
  preferredMaxDate: any;
  eventDetails: any = {};

  constructor(private eventService: EventsManagementService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    public translate: TranslateService, private http: HttpClient, private signalRService: SignalRService,
    public bsModalRef: BsModalRef, private sessionStorageService: SessionStorageService,
    private modalService: BsModalService) {
    if (this.sessionStorageService.get('AttendeeId') != '' && this.sessionStorageService.get('AttendeeId') != null && this.sessionStorageService.get('AttendeeId') != undefined) {
      this.isLoggedIn = true;
    }
  }

  ngOnInit(): void {
    this.messageToREpresentativeModel.repEmailAddress = this.to;
    this.messageToREpresentativeModel.eventName = this.eventName;
    this.messageToREpresentativeModel.boothName = this.boothName;
    this.messageToREpresentativeModel.roomId = this.roomId;
    this.messageToREpresentativeModel.eventId = this.eventId;
    this.messageToREpresentativeModel.eventRepresentativeId = this.eventRepresentativeId;
    this.messageToREpresentativeModel.isMessage = this.isMessage;
    this.messageToREpresentativeModel.isMeetingRequest = this.isMeetingRequest;


    // console.log(this.messageToREpresentativeModel);
    const minDate = new Date(this.eventStartDate);
    this.preferredMinDate = {
      'year': minDate.getFullYear(),
      'month': minDate.getMonth() + 1,
      'day': minDate.getDate()
    };
    const maxDate = new Date(this.eventEndDate);
    this.preferredMaxDate = {
      'year': maxDate.getFullYear(),
      'month': maxDate.getMonth() + 1,
      'day': maxDate.getDate()
    };
  }

  sendMessageToREp() {
    this.bsModalRef.hide();
    this.spinner.show();
    // console.log(this.messageToREpresentativeModel);
    if (this.isLoggedIn) {
      this.messageToREpresentativeModel.attendeeId = this.sessionStorageService.get('AttendeeId');
    } else {
      this.messageToREpresentativeModel.attendeeId = AppUtils.emptyGuid;
    }
    this.eventService.sendMessageToRepresentative(this.messageToREpresentativeModel).subscribe((res) => {
      if (res.isSuccess) {
        if (this.isLoggedIn) {
          this.commonService.logAttendeeClicks(null,this.messageToREpresentativeModel.isMeetingRequest? 'Meeting set up':'Email to booth rep', this.messageToREpresentativeModel, this.eventId, false, AppUtils.emptyGuid, this.sessionStorageService.get('AttendeeId'), this.roomId);
        }
        this.spinner.hide();
        this.signalRService.sendData();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).messageSentSuccessfully,
          icon: 'success'
        });
      } else {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: res.message,
          icon: 'error'
        });
      }
    });
  }
  closeModal() {
    this.bsModalRef.hide();

  }


}
