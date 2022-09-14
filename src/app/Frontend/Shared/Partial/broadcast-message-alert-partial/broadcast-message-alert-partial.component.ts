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
import { LinkToContentPartialComponent } from '../link-to-content-data-partial/link-to-content-data-partial.component';

@Component({
  selector: 'app-broadcast-message-alert-partial',
  templateUrl: './broadcast-message-alert-partial.component.html',
  styleUrls: ['./broadcast-message-alert-partial.component.css']
})
export class BroadcastMessageAlertPartialComponent implements OnInit {
  msgDetails: any;
  isLoggedIn: boolean;
  eventDetails: any = {};
  quizModel: any[] = [];
  pollModel: any[] = [];
  surveyModel: any[] = [];
  webinarModel: any[] = [];
  linkContentData = [];
  iframeWebsitePopup = '';
  bsModalRefwebsite: any;
  attendeeId = '';
  isRepresentative = '';
  representativeId = '';
  roomId = '';
  iframeVideoModalName = '';
  iframeVideoPopup = '';
  bsModalRefLinkCOntent: any;
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
    if (this.msgDetails.IncludeMessageDuration) {
      setTimeout(() => {
        this.bsModalRef.hide();
      }, this.msgDetails.Minutes * 60 * 1000);
    }
    if (this.msgDetails.SelectedClickAction === 'linkContent') {
      this.linkContentData = this.msgDetails.ClickAction.linkContent;
    }
  }

  closeModal() {
    // call api to delivered true
    this.bsModalRef.hide();

  }

  redirectToLocation(msgDetails) {
    this.bsModalRef.hide();
    location.href = AppUtils.EventUrl + '/room/' + msgDetails.ClickAction.linkLocation[0].location + '/' + this.eventDetails.eventId;
    var evnt: any;
    this.logAttendeeClicks(evnt, 'AnnounceMesssage', msgDetails);

  }

  openSelectedQuiz(msgDetails) {
    this.bsModalRef.hide();
    const quizReqModel: any = {};
    quizReqModel.id = msgDetails.ClickAction.linkToQuiz[0].quiz.quizId;
    var evnt: any;
    this.logAttendeeClicks(evnt, 'AnnounceMesssage', msgDetails);
    this.attendeeService.getQuizDetails(quizReqModel).subscribe((res) => {
      if (res.isSuccess) {
        this.quizModel = res.quizQuestionsViewModels;

        const initialState = {
          quiz: this.quizModel,
          eventDetails: this.eventDetails

        };
        this.bsModalRefQuiz = this.modalService.show(QuizPartialComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
        this.bsModalRefQuiz.content.closeBtnName = 'Close';
        this.bsModalRefQuiz.content.event.subscribe(resp => {
          // console.log(resp);
        });
      }
    });
  }

  openSelectedSurvey(msgDetails) {
    this.bsModalRef.hide();
    const surveyReqModel: any = {};
    surveyReqModel.surveyId = msgDetails.ClickAction.linkToSurvey[0].surveys.SurveyId;
    var evnt: any;
    this.logAttendeeClicks(evnt, 'AnnounceMesssage', msgDetails);
    this.attendeeService.getSurveyDetails(surveyReqModel).subscribe((res) => {
      if (res.isSuccess) {
        this.surveyModel = res.createSurveyListViewModels;
        const initialState = {
          surveys: this.surveyModel,
          eventDetails: this.eventDetails

        };
        this.bsModalRefSurvey = this.modalService.show(SurveyPartialComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
        this.bsModalRefSurvey.content.closeBtnName = 'Close';
        this.bsModalRefSurvey.content.event.subscribe(resp => {
          // console.log(resp);
        });
      }
    });
  }

  openSelectedPoll(msgDetails) {
    this.modalService.hide();
    const pollReqModel: any = {};
    pollReqModel.pollId = msgDetails.ClickAction.linkToPoll[0].polls.PollId;
    var evnt: any;
    this.logAttendeeClicks(evnt, 'AnnounceMesssage', msgDetails);
    this.attendeeService.getPollDetails(pollReqModel).subscribe((res) => {
      if (res.isSuccess) {
        this.pollModel = res.pollsList;

        const initialState = {
          polls: this.pollModel,
          eventDetails: this.eventDetails

        };
        this.bsModalRefPoll = this.modalService.show(PollPartialComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
        this.bsModalRefPoll.content.closeBtnName = 'Close';
        this.bsModalRefPoll.content.event.subscribe(resp => {
          // console.log(resp);
        });
      }
    });
  }

  openLinkToChatScreen(msgDetails) {
    var evnt: any;
    this.logAttendeeClicks(evnt, 'AnnounceMesssage', msgDetails);
    this.bsModalRef.hide();
    this.dataservice.openChatPopup.emit();

  }

  openLinkToSocialMedia(msgDetails) {
    var evnt: any;
    this.logAttendeeClicks(evnt, 'AnnounceMesssage', msgDetails);
    this.bsModalRef.hide();
    window.open(msgDetails.ClickAction.linktoSocialMedia[0].url);
    //location.href = msgDetails.ClickAction.linktoSocialMedia[0].url;
  }

  openLinkWebsite(msgDetails) {
    this.bsModalRef.hide();
    var evnt: any;
    this.logAttendeeClicks(evnt, 'AnnounceMesssage', msgDetails);
    if (msgDetails.ClickAction.linkWebsite[0].type == 'iFrame') {
      const initialState = {
        title: msgDetails.ClickAction.linkWebsite[0].name,
        iframeWebsitePopup: msgDetails.ClickAction.linkWebsite[0].location,
        eventDetails: this.eventDetails
      };

      this.bsModalRefwebsite = this.modalService.show(IWebsiteframePartialComponent, { initialState, class: 'modal-xl', backdrop: 'static', keyboard: false });
      this.bsModalRefwebsite.content.closeBtnName = 'Close';
      this.bsModalRefwebsite.content.event.subscribe(resp => {
        this.bsModalRefwebsite.content.closeBtnName = 'Close';
      });


      // this.iframeWebsitePopup = msgDetails.ClickAction.linkWebsite[0].location;
      // const elelemt = document.getElementById('openWebisteInIframe') as HTMLElement;
      // var popupModal = new Modal(elelemt);
      // popupModal.show();
    } else {
      window.open(msgDetails.ClickAction.linkWebsite[0].location);
    }

  }
  openlinkToWebinar(msgDetails) {
    this.bsModalRef.hide();
    var evnt: any;
    this.logAttendeeClicks(evnt, 'AnnounceMesssage', msgDetails);
    const webinarId: any = [];
    msgDetails.ClickAction.linktoWebinar.forEach(element => {
      webinarId.push(element.item_id);
    });
    this.attendeeService.getRoomWebinars(webinarId).subscribe((res) => {
      if (res.isSuccess) {
        this.webinarModel = res.webinarViewModels;
        const initialState = {
          webinarModel: this.webinarModel,
          eventDetails: this.eventDetails

        };
        this.bsModalRefwebinar = this.modalService.show(WebinarPartialComponent, { initialState, class: 'modal-xl', backdrop: 'static', keyboard: false });
        this.bsModalRefwebinar.content.closeBtnName = 'Close';
        this.bsModalRefwebinar.content.event.subscribe(resp => {
          // console.log('webinar response');
          // console.log(resp);
          this.bsModalRefwebinar.content.closeBtnName = 'Close';
          // if (resp.res == '200') {
          //   item.showWebinar = true;
          //   item.webinarUrl = resp.data;
          // }
        });
      }
    });
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

    const initialState = {
      linkContentData: this.linkContentData,
      eventDetails: this.eventDetails
    };
    this.bsModalRefLinkCOntent = this.modalService.show(LinkToContentPartialComponent, { initialState, class: 'modal-xl', backdrop: 'static', keyboard: false });
    this.bsModalRefLinkCOntent.content.closeBtnName = 'Close';
    this.bsModalRefLinkCOntent.content.event.subscribe(resp => {
      // console.log('webinar response');
      // console.log(resp);
      this.bsModalRefLinkCOntent.content.closeBtnName = 'Close';
      // if (resp.res == '200') {
      //   item.showWebinar = true;
      //   item.webinarUrl = resp.data;
      // }
    });


    // this.logAttendeeClicks(evnt, 'AnnounceMesssage', msgDetails);
    // console.log(msgDetails);
    // // this.bsModalRef.hide();
    // this.linkContentData = msgDetails.ClickAction.linkContent;
  }

  openDocument(linkUrl, name) {
    var evnt: any;
    // this.logAttendeeClicks(evnt, 'AnnounceMesssage', msgDetails);
  }

  openIframeForVideo(name, link) {
    var evnt: any;
    this.iframeVideoPopup = link;
    this.iframeVideoModalName = name;
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

