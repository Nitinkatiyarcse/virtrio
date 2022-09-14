import { Component, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AttendeeLoggingService } from 'src/app/Services/attendee-logging.service';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { DataService } from 'src/app/Services/data-service.service';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { SignalRService } from 'src/app/Services/signal-r.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';
import * as AppUtils from '../../../../Utils/apputils';
import { WebinarIframePartialComponent } from '../webinar-iframe-partial/webinar-iframe-partial.component';
@Component({
  selector: 'app-webinar-partial',
  templateUrl: './webinar-partial.component.html',
  styleUrls: ['./webinar-partial.component.css']
})
export class WebinarPartialComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  modalClass = 'modal-xl';
  hide = false;
  eventDetails: any = {};

  constructor(
    private translate: TranslateService, public bsModalRef: BsModalRef, private signalRService: SignalRService, private data: DataService,
    private sessionStorage: SessionStorageService
    , private spinner: NgxSpinnerService, private attendeeService: AttendeesService, private modalService: BsModalService, private attendeeLoggingService: AttendeeLoggingService) { }
  webinarModel: any[] = [];
  ngOnInit(): void {
    // console.log(this.webinarModel);
    this.data.allowFullScreen.subscribe((res) => {
      if (res) {
        this.modalClass = 'modal-fullscreen';
      }
      else {
        this.modalClass = 'modal-xl';
      }
    });
  }

  joinWebinar(webinar) {
    this.spinner.show();
    // first of all collect all information of attendee and send it to the api 
    const attendeeWebinar: any = {};
    // check if user is representative
    if (this.sessionStorage.get('AttendeeId') || this.sessionStorage.get('RepresentativeId')) {
      if (this.sessionStorage.get('IsRepresentative')) {
        attendeeWebinar.isAttendee = false;
        attendeeWebinar.representativeId = this.sessionStorage.get('RepresentativeId');
        attendeeWebinar.attendeedId = AppUtils.emptyGuid;
      } else {
        attendeeWebinar.isAttendee = true;
        attendeeWebinar.attendeedId = this.sessionStorage.get('AttendeeId');
        attendeeWebinar.representativeId = AppUtils.emptyGuid;
      }
      attendeeWebinar.webinarId = webinar.webinarId;
      // console.log(attendeeWebinar);
      this.attendeeService.attendWebinar(attendeeWebinar).subscribe((res) => {
        if (res.isSuccess) {
          this.spinner.hide();
          this.signalRService.sendData();
          // window.open(res.message, '_blank');
          this.triggerEvent(res.message, webinar);
          const reqModel: any = {};
          reqModel.eventId = webinar.eventId;
          if (this.sessionStorage.get('IsRepresentative')) {
            reqModel.attendeeId = AppUtils.emptyGuid;
            reqModel.isAttendee = false;
            reqModel.representativeId = this.sessionStorage.get('RepresentativeId');
          } else {
            reqModel.attendeeId = this.sessionStorage.get('AttendeeId');
            reqModel.isAttendee = true;
            reqModel.representativeId = AppUtils.emptyGuid;
          }
          reqModel.details = attendeeWebinar.webinarId;
          reqModel.leaderboardActivityId = '8A1BDA04-1C21-43A7-83DF-94A3046CC613';
          reqModel.roomId = webinar.roomId;
          // console.log(reqModel);
          this.attendeeLoggingService.logAttendeesClickEvents(reqModel).subscribe((res) => {

          });





          this.bsModalRef.hide();
        } else {
          this.spinner.hide();
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
            text: new SweetAlertMessage(this.translate).sweetAlertSomeErrorOccuredErrorMessage,
            icon: 'error'
          });
          return;
        }
      })
    } else {
      this.spinner.hide();
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: new SweetAlertMessage(this.translate).loginFirstToOperate,
        icon: 'error'
      });
      return;
    }
  }
  triggerEvent(message: any, webinar: any) {
    // this.event.emit({ data: message, res: 200 });
    console.log("webinar");

    console.log(webinar);
    this.bsModalRef.hide();

    const initialState = {
      title: webinar.contentTitle,
      documentUrl: message,
      eventDetails: this.eventDetails,
      webinarId: webinar.webinarId
    };
    // this.bsModalRef = this.modalService.show(WebinarIframePartialComponent, { initialState, class: 'modal-fullscreen' });
    this.bsModalRef = this.modalService.show(WebinarIframePartialComponent, { initialState, class: this.modalClass });

    this.bsModalRef.content.closeBtnName = 'Close';

  }

  closeModal() {
    this.bsModalRef.hide();
  }

  changeHide(val: boolean) {
    this.hide = val;
    if (this.hide) {

    }
  }




}
