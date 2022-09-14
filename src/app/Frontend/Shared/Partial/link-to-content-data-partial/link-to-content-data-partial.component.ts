import { Component, OnInit } from '@angular/core';
import { contains } from 'jquery';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { DataService } from 'src/app/Services/data-service.service';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import *  as AppUtils from 'src/app/Utils/apputils';
import { textChangeRangeIsUnchanged } from 'typescript';
import { PollPartialComponent } from '../poll-partial/poll-partial.component';
import { QuizPartialComponent } from '../quiz-partial/quiz-partial.component';
import { SurveyPartialComponent } from '../survey-partial/survey-partial.component';
import { WebinarPartialComponent } from '../webinar-partial/webinar-partial.component';
import { Modal } from 'bootstrap';
import { AttendeeLoggingService } from 'src/app/Services/attendee-logging.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { CommonService } from 'src/app/Utils/common';
import { IWebsiteframePartialComponent } from '../website-iframe-partial.component/website-iframe-partial.component';
import { Helper } from 'src/app/Utils/Helper';
import { IImageframePartialComponent } from '../image-iframe-partial/image-iframe-partial.component';
import { IframePartialComponent } from '../iframe-partial/iframe-partial.component';
import { IframeVideoPartialComponent } from '../iframe-video-partial/iframe-video-partial.component';

@Component({
  selector: 'app-link-to-content-data-partial',
  templateUrl: './link-to-content-data-partial.component.html',
  styleUrls: ['./link-to-content-data-partial.component.css']
})
export class LinkToContentPartialComponent implements OnInit {
  msgDetails: any;
  isLoggedIn: boolean;
  eventDetails: any = {};

  linkContentData = [];
  iframeWebsitePopup = '';
  attendeeId = '';
  isRepresentative = '';
  representativeId = '';
  roomId = '';
  iframeVideoModalName = '';
  iframeVideoPopup = '';

  constructor(public bsModalRef: BsModalRef,
    public bsModalRefwebinar: BsModalRef,
    public bsModalRefQuiz: BsModalRef,
    public bsModalRefSurvey: BsModalRef,
    private helper: Helper,
    public bsModalRefPoll: BsModalRef,
    private modalService: BsModalService, private CommonService: CommonService,
    private sessionStorageService: SessionStorageService, private dataservice: DataService, private attendeeLoggingService: AttendeeLoggingService,
    private attendeeService: AttendeesService) {
    if (this.sessionStorageService.get('AttendeeId') != '' && this.sessionStorageService.get('AttendeeId') != null && this.sessionStorageService.get('AttendeeId') != undefined) {
      this.isLoggedIn = true;
    }
    this.isRepresentative = this.sessionStorageService.get('IsRepresentative');
    this.attendeeId = this.sessionStorageService.get('AttendeeId');
    this.representativeId = this.sessionStorageService.get('RepresentativeId');
  }
  ngOnInit(): void {
    console.log(this.msgDetails);
    console.log(this.eventDetails);
    console.log(this.roomId);
    // if (this.msgDetails.IncludeMessageDuration) {
    //   setTimeout(() => {
    //     this.bsModalRef.hide();
    //   }, this.msgDetails.Minutes * 60 * 1000);
    // }
    if (this.msgDetails.SelectedClickAction === 'linkContent') {
      this.linkContentData = this.msgDetails.ClickAction.linkContent;
    }
  }

  closeModal() {
    // call api to delivered true
    this.bsModalRef.hide();

  }



  fillDataForLinkToContent(msgDetails) {
    this.bsModalRef.hide();
    var evnt: any;
    this.bsModalRef.hide();
    this.linkContentData = msgDetails.ClickAction.linkContent;
    this.linkContentData.forEach(element => {
      if (this.helper.validateMovieFile(element.linkUrl)) {
        element.isVideo = true;
      }
      if (this.helper.validateDocFile(element.linkUrl)) {
        element.isPDF = true;
      }
      if (this.helper.validateImageFile(element.linkUrl)) {
        element.isImage = true;
      }
    });

    // this.logAttendeeClicks(evnt, 'AnnounceMesssage', msgDetails);
    // console.log(msgDetails);
    // // this.bsModalRef.hide();
    // this.linkContentData = msgDetails.ClickAction.linkContent;
  }

  openDocument(linkUrl, name) {
    var evnt: any;
    window.open(linkUrl, "_blank");
    // this.logAttendeeClicks(evnt, 'AnnounceMesssage', msgDetails);
  }

  openIframeForVideo(item) {
    var evnt: any;
    if (item.isImage) {
      const initialState = {
        documentUrl: item.linkUrl,
        title: item.name,
        eventDetails: this.eventDetails

      };
      this.bsModalRefwebinar = this.modalService.show(IImageframePartialComponent, { initialState, class: 'modal-xl', backdrop: 'static', keyboard: false });
      this.bsModalRefwebinar.content.closeBtnName = 'Close';
    } else if (item.isPDF) {
      const initialState = {
        documentUrl: item.linkUrl,
        title: item.name,
        eventDetails: this.eventDetails
      };
      this.bsModalRefQuiz = this.modalService.show(IframePartialComponent, { initialState, class: 'modal-xl', backdrop: 'static', keyboard: false });
      this.bsModalRefQuiz.content.closeBtnName = 'Close';
    } else if (item.isVideo) {
      const initialState = {
        iframeVideoPopup: item.linkUrl,
        iframeVideoModalName: item.name,
        eventDetails: this.eventDetails
      };
      this.bsModalRefPoll = this.modalService.show(IframeVideoPartialComponent, { initialState, class: 'modal-xl', backdrop: 'static', keyboard: false });
      this.bsModalRefPoll.content.closeBtnName = 'Close';
   

    }


    // this.logAttendeeClicks(evnt, 'AnnounceMesssage', msgDetails);
  }

  closeIframeForVideo() {
    var evnt: any;
    this.iframeVideoPopup = '';
    this.iframeVideoModalName = '';
    // this.logAttendeeClicks(evnt, 'AnnounceMesssage', msgDetails);

  }


  //#region  Common Logging events
  logAttendeeClicks(event, type, clickedItem) {
    this.CommonService.logAttendeeClicks(event, type, clickedItem, this.eventDetails.eventId, this.isRepresentative, this.isRepresentative === 'true' ? this.representativeId : AppUtils.emptyGuid, this.attendeeId, this.roomId);
  }
}

