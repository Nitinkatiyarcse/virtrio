import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';
import { Session } from 'protractor';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import * as AppUtils from 'src/app/Utils/apputils';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from 'src/app/Services/signal-r.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddToChatQueueModalComponent } from 'src/app/Admin/_layout/Shared/add-to-chat-queue-modal/add-to-chat-queue-modal.component';
import { OpenBriefcaseModalComponent } from 'src/app/Admin/_layout/Shared/open-briefcase-modal/open-briefcase-modal.component';
import { OpenLinktoLeaderBoardwithinBoothModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-leader-boardwithin-booth-modal/open-linkto-leader-boardwithin-booth-modal.component';
import { OpenLinktoQuizModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-quiz-modal/open-linkto-quiz-modal.component';
import { OpenLinktoSurveyModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-survey-modal/open-linkto-survey-modal.component';
import { OpenLinktoPollModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-poll-modal/open-linkto-poll-modal.component';
import { OpenLinktoInfoCardModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-info-card-modal/open-linkto-info-card-modal.component';
import { OpenLinktoChatScreenModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-chat-screen-modal/open-linkto-chat-screen-modal.component';
import { OpenLinktoCalendarForBoothRepModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-calendar-for-booth-rep-modal/open-linkto-calendar-for-booth-rep-modal.component';
import { OpenLinktoWallForWriteCommentsModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-wall-for-write-comments-modal/open-linkto-wall-for-write-comments-modal.component';
import { OpenLinktoSocialMediaModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-social-media-modal/open-linkto-social-media-modal.component';
import { LinkWebsiteComponent } from 'src/app/Admin/_layout/Shared/link-website/link-website.component';
import { OpenLinktoWebinarModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-webinar-modal/open-linkto-webinar-modal.component';
import { OpenLinktoPrivateOneToOneMeetingModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-private-one-to-one-meeting-modal/open-linkto-private-one-to-one-meeting-modal.component';
import { LinkContentModalComponent } from 'src/app/Admin/_layout/Shared/link-content-modal/link-content-modal.component';
import { OpenLinkContentModalComponent } from 'src/app/Admin/_layout/Shared/open-link-content-modal/open-link-content-modal.component';
import { QuizService } from 'src/app/Services/quiz.service';
import { PollsService } from 'src/app/Services/polls.service';
import { SurveysService } from 'src/app/Services/surveys.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EventEntitlementService } from 'src/app/Services/event-entitlement.service';
import { ActivatedRoute } from '@angular/router';
import { EventsRegistrationSetsService } from 'src/app/Services/events-registration-sets.service';
import { Helper } from 'src/app/Utils/Helper';
import { RoomsService } from 'src/app/Services/rooms.service';
import { LinkLocationComponent } from 'src/app/Admin/_layout/Shared/link-location/link-location.component';
import { BroadcastMessageService } from 'src/app/Services/broadcast-message.service';
import { textChangeRangeIsUnchanged } from 'typescript';
import { truncate } from 'fs';

@Component({
  selector: 'app-create-broadcast-message-partial',
  templateUrl: './create-broadcast-message-partial.component.html',
  styleUrls: ['./create-broadcast-message-partial.component.css']
})
export class CreateBroadcastMessagePartialComponent implements OnInit {
  to = '';
  eventId = '';
  eventAdminId = '';
  eventDetails: any = {};
  evntId = '';
  evntAdminId='';
  eventName = '';
  modalRef: BsModalRef;
  isMsgDurationEnabled = false;
  isSendLaterSelected = false;

  isByEntitlementSelect = false;
  inputBroadcastMessageModel: any = {};
  entitlementRequiredField = false;
  entitlementDropdownList = [];
  textEntitlementDropdownList = [];
  getByIdViewModel: any = {};
  EntitlementDropdownSettings: IDropdownSettings = {};
  allRegistrationSetsByEvent: any = [];
  locationModel: any = [];
  quizModel: any = [];
  surveyModel: any = [];
  pollMedel: any = [];
  webinarDropdownList: any = [];
  eventEntitlements: any = [];
  messageId: string = '';


  constructor(
    private eventService: EventsManagementService,
    public bsModalRef: BsModalRef, private sessionStorageService: SessionStorageService,
    private modalService: BsModalService,
    private quizService: QuizService,
    private pollService: PollsService,
    private surveyService: SurveysService,
    private spinner: NgxSpinnerService,
    private signalRService: SignalRService,
    private route: ActivatedRoute,
    private helper: Helper,
    private broadcastMessageService: BroadcastMessageService, private translate: TranslateService,
    private eventEntitlementService: EventEntitlementService, private eventsRegistrationSetsService: EventsRegistrationSetsService, private roomService: RoomsService,
    private localStorage: LocalStorageService) {
    this.evntId = this.route.snapshot.paramMap.get('id');
    this.messageId = this.route.snapshot.paramMap.get('msgId');
    this.eventName = this.localStorage.get('EventName');
    this.inputBroadcastMessageModel.clickAction = {};


  }

  ngOnInit(): void {

    this.EntitlementDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.evntId = this.eventId;
    this.evntAdminId=this.eventAdminId;
    this.bindGroupEntitlements(this.evntId);
    this.inputBroadcastMessageModel.registrationSetId = '';
    this.inputBroadcastMessageModel.targetattendee = '';
    this.inputBroadcastMessageModel.selectedClickAction = '';
    this.inputBroadcastMessageModel.sendNow = true;
    this.inputBroadcastMessageModel.eventId = this.evntId;
    this.getRegistrationSets();
    if (this.messageId != '' && this.messageId != null && this.messageId != undefined) {
      // get message details
      this.getMessageDetails();
    }
  }

  getRegistrationSets() {
    const getbyIdViewModel: any = {};
    getbyIdViewModel.id = this.evntId;
    this.eventsRegistrationSetsService.getRegistrationSets(getbyIdViewModel).subscribe((res) => {
      if (res.eventRegistrationSets.length > 0) {
        this.allRegistrationSetsByEvent = res.eventRegistrationSets;
        this.allRegistrationSetsByEvent.forEach(element => {
          element.endDate = this.helper.convertDateToLocalTimezone(element.endDate);
          element.endTime = this.helper.convertDateToLocalTimezone(element.endTime);
          element.startDate = this.helper.convertDateToLocalTimezone(element.startDate);
          element.startTime = this.helper.convertDateToLocalTimezone(element.startTime);
        });

      }
    });
  }

  ifMsgDurationEnabled(e) {
    if (e.target.checked) {
      this.isMsgDurationEnabled = true;

    } else {
      this.isMsgDurationEnabled = false;

    }
  }

  includeMessageDuration() {
    this.inputBroadcastMessageModel.includeMessageDuration = !this.inputBroadcastMessageModel.includeMessageDuration;
  }

  selectTargetattendee(value) {
    if (value === 'ByEntitlement') {
      this.isByEntitlementSelect = true;
    }
    else {
      this.isByEntitlementSelect = false;
    }
  }

  showHideMessageDateAndTime(e, type) {
    if (e.target.checked) {
      if (type === 'SendLater') {
        this.isSendLaterSelected = true;
      } else {
        this.isSendLaterSelected = false;
      }
    }
  }

  selectClickActions(value) {
    if (value === 'addToChatQueue') {
      this.openAddToChatQueueModal(value);
    } else if (value === 'linkContent') {
      this.openLinkContentModal(value);
    } else if (value === 'linkLocation') {
      this.openLinkLocationModal(value);
    } else if (value === 'LinkToLeaderboard') {
      this.openLinkToLeaderboardModal(value);
    } else if (value === 'linkQuiz') {
      this.openLinkToQuizModal(value);
    } else if (value === 'linkSurvey') {
      this.openLinkToSurveyModal(value);
    } else if (value === 'linkPoll') {
      this.openlinkToPollModal(value);
    } else if (value === 'linkToInfocard') {
      this.openlinkToInfocardModal(value);
    } else if (value === 'linkToChatScreen') {
      this.openlinkToChatScreenModal(value);
    }
    //  else if (value === 'linkToCalendar') {
    //   this.openlinkToCalendarModal();
    // }
    else if (value === 'linkToWall') {
      this.openlinkToWallModal(value);
    } else if (value === 'linkToSocialMedia') {
      this.openlinkToSocialMediaModal(value);
    } else if (value === 'linkToWebinar') {
      this.openlinkToWebinarModal(value);
    } else if (value === 'linkToOneToOneChat') {
      this.openlinkToOneToOneChatModal(value);
    }
    else if (value === 'openBriefcase') {
      this.openBriefcase(value);
    }
    else if (value === 'linkWebsite') {
      this.openWebsite(value);
    }
  }

  // Add to chat queue
  openAddToChatQueueModal(index) {
    const initialState = {
      index: index,
      //addToChatQueue: inputBroadcastMessageModel.addToChatQueue
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard:false,
    };
    const modalParams = Object.assign({}, modalConfig, { initialState, class: 'modal-lg',backdrop: 'static',keyboard:false });
    this.modalRef = this.modalService.show(AddToChatQueueModalComponent, modalParams);
    this.modalRef.content.event.subscribe(res => {
      this.inputBroadcastMessageModel.selectedClickAction = 'addToChatQueue';
      this.inputBroadcastMessageModel.clickAction.addToChatQueue = {};
      this.inputBroadcastMessageModel.clickAction.addToChatQueue = res.data;

    });
  }

  // link content
  openLinkContentModal(index) {
    const initialState = {
      index: index,
      //content: arr[index].clickAction[0].linkContent
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard:false,
    };
    this.modalRef = this.modalService.show(OpenLinkContentModalComponent, { initialState, class: 'modal-lg',backdrop: 'static',keyboard:false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalRef.content.event.subscribe(resp => {
      this.inputBroadcastMessageModel.selectedClickAction = 'linkContent';
      this.inputBroadcastMessageModel.clickAction.linkContent = {};
      this.inputBroadcastMessageModel.clickAction.linkContent = resp.data;

    });
  }
  // link to location
  openLinkLocationModal(index) {
    this.getAllLocations();

  }

  getAllLocations() {
    const roomRequestVM: any = {};
    roomRequestVM.eventId = this.evntId;
    roomRequestVM.roleId = '3C52D36D-BE03-4C07-A25B-F2E3934563E1';//this.localStorage.get('RoleId');
    roomRequestVM.boothAdminid = this.evntAdminId;
    this.roomService.getRooms(roomRequestVM).subscribe((res) => {
      if (res.isSuccess) {
        this.locationModel = res.rooms;
        const initialState = {
          allLocations: this.locationModel,
          selectedLocation: [{ name: '', location: '' }]
        };
        this.modalRef = this.modalService.show(LinkLocationComponent, { initialState, class: 'modal-lg',backdrop: 'static',keyboard:false });
        this.modalRef.content.closeBtnName = 'Close';
        this.modalRef.content.event.subscribe(resp => {
          this.inputBroadcastMessageModel.selectedClickAction = 'linkLocation';
          this.inputBroadcastMessageModel.clickAction.linkLocation = {};
          this.inputBroadcastMessageModel.clickAction.linkLocation = resp.data;
        });

      }
    });
  }

  // link to leader board
  openLinkToLeaderboardModal(index) {
    const InitialState = {
      index: index,
    };
    const modalConfigs = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard:false,
    };
    const modalParamss = Object.assign({}, modalConfigs, { InitialState, class: 'modal-lg',backdrop: 'static',keyboard:false });
    this.modalRef = this.modalService.show(OpenLinktoLeaderBoardwithinBoothModalComponent, modalParamss);
    this.modalRef.content.event.subscribe(res => {
      this.inputBroadcastMessageModel.selectedClickAction = 'LinkToLeaderboard';
      this.inputBroadcastMessageModel.clickAction.LinkToLeaderboard = {};
      this.inputBroadcastMessageModel.clickAction.LinkToLeaderboard = res.data;
    });
  }

  // link to quiz
  openLinkToQuizModal(index) {
    this.getQuizList(index);

  }

  // link to survey
  openLinkToSurveyModal(index) {
    this.getSurveyList(index);
  }

  getSurveyList(index: any) {
    const surveyReqModel: any = {};
    surveyReqModel.eventId = this.evntId;
    surveyReqModel.UserId = this.evntAdminId;
    this.surveyService.getSurveylist(surveyReqModel).subscribe((res) => {
      if (res.isSuccess) {
        this.surveyModel = res.createSurveyListViewModels;
        const initialState = {
          allSurveys: this.surveyModel,
          selectedSurveys: []
        };
        this.modalRef = this.modalService.show(OpenLinktoSurveyModalComponent, { initialState, class: 'modal-lg',backdrop: 'static',keyboard:false });
        this.modalRef.content.closeBtnName = 'Close';
        this.modalRef.content.event.subscribe(resp => {
          this.inputBroadcastMessageModel.selectedClickAction = 'linkSurvey';
          this.inputBroadcastMessageModel.clickAction.linkToSurvey = {};
          this.inputBroadcastMessageModel.clickAction.linkToSurvey = resp.data;
        });
      }
    });
  }

  // link to poll
  openlinkToPollModal(index) {
    this.getPollList(index);
  }

  getPollList(index: any) {
    const pollReqModel: any = {};
    pollReqModel.eventId = this.evntId;
    pollReqModel.UserId = this.evntAdminId;
    this.pollService.getPollslist(pollReqModel).subscribe((res) => {
      if (res.isSuccess) {
        this.pollMedel = res.pollsList;
        const initialState = {
          allPolls: this.pollMedel,
          selectedPolls: []
        };
        this.modalRef = this.modalService.show(OpenLinktoPollModalComponent, { initialState, class: 'modal-lg',backdrop: 'static',keyboard:false });
        this.modalRef.content.closeBtnName = 'Close';
        this.modalRef.content.event.subscribe(resp => {
          this.inputBroadcastMessageModel.selectedClickAction = 'linkPoll';
          this.inputBroadcastMessageModel.clickAction.linkToPoll = {};
          this.inputBroadcastMessageModel.clickAction.linkToPoll = resp.data;
        });
      }
    });
  }

  // link to info card
  openlinkToInfocardModal(index) {
    const InitialState = {
      index: index,
      linkLocation: []
    };
    const modalConfigs = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard:false,
    };
    const modalParamss = Object.assign({}, modalConfigs, { InitialState, class: 'modal-lg',backdrop: 'static',keyboard:false });
    this.modalRef = this.modalService.show(OpenLinktoInfoCardModalComponent, modalParamss);
    this.modalRef.content.event.subscribe(res => {
      this.inputBroadcastMessageModel.selectedClickAction = 'linkToInfocard';
      this.inputBroadcastMessageModel.clickAction.linkToInfocard = {};
      this.inputBroadcastMessageModel.clickAction.linkToInfocard = res.data;
    });
  }

  // link to chat screen
  openlinkToChatScreenModal(index) {
    this.inputBroadcastMessageModel.selectedClickAction = 'linkToChatScreen';
  }


  // link to wall
  openlinkToWallModal(index: any) {
    const InitialState = {
      index: index,
      linkLocation: []
    };
    const modalConfigs = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard:false,
    };
    const modalParamss = Object.assign({}, modalConfigs, { InitialState, class: 'modal-lg',backdrop: 'static',keyboard:false });
    this.modalRef = this.modalService.show(OpenLinktoWallForWriteCommentsModalComponent, modalParamss);
    this.modalRef.content.event.subscribe(res => {
      this.inputBroadcastMessageModel.selectedClickAction = 'linkToWall';
      this.inputBroadcastMessageModel.clickAction.linkToWall = {};
      this.inputBroadcastMessageModel.clickAction.linkToWall = res.data;
    });
  }

  // link to socialmedia
  openlinkToSocialMediaModal(index: any) {
    const initialState = {
      index: index,
      linkSocialMedia: [{ name: '', url: '' }]
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard:false,
    };
    this.modalRef = this.modalService.show(OpenLinktoSocialMediaModalComponent, { initialState, class: 'modal-lg',backdrop: 'static',keyboard:false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalRef.content.event.subscribe(resp => {
      this.inputBroadcastMessageModel.selectedClickAction = 'linkToSocialMedia';
      this.inputBroadcastMessageModel.clickAction.linkToSocialMedia = {};
      this.inputBroadcastMessageModel.clickAction.linkToSocialMedia = resp.data;
    });

  }

  // link to webinar
  openlinkToWebinarModal(index: any) {
    const webinarViewModel: any = {};
    webinarViewModel.eventId = this.evntId;
    // webinarViewModel.roomId = this.roomId;
    this.roomService.getEventWebinars(webinarViewModel).subscribe((res) => {
      if (res.isSuccess) {
        let availableWebinar: any = [];
        availableWebinar = res.webinarViewModels;
        const temp = [];
        for (let i = 0; i < availableWebinar.length; i++) {
          temp.push({ item_id: availableWebinar[i].webinarId, item_text: availableWebinar[i].contentTitle });
        }
        this.webinarDropdownList = temp;

        console.log(this.webinarDropdownList);
        const initialState = {
          index: index,
          eventId: this.evntId,
          roomId: AppUtils.emptyGuid,
          webinarDropdownList: this.webinarDropdownList,
          selectedWebinarsArr: []
        };
        this.modalRef = this.modalService.show(OpenLinktoWebinarModalComponent, { initialState, class: 'modal-lg',backdrop: 'static',keyboard:false });
        this.modalRef.content.closeBtnName = 'Close';
        this.modalRef.content.event.subscribe(resp => {
          this.inputBroadcastMessageModel.selectedClickAction = 'linkToWebinar';
          this.inputBroadcastMessageModel.clickAction.linkToWebinar = {};
          this.inputBroadcastMessageModel.clickAction.linkToWebinar = resp.data;
        });


      } else {
        this.webinarDropdownList = [];
      }
    })

  }

  // link to one to one chat
  openlinkToOneToOneChatModal(index: any) {
    // const InitialState = {
    //   index: index,
    //   linkLocation: this.roomDesignDetails
    // };
    // const modalConfigs = {
    //   backdrop: true,
    //   ignoreBackdropClick: true,
    // };
    // const modalParamss = Object.assign({}, modalConfigs, { InitialState, class: 'modal-lg' });
    // this.modalRef = this.modalService.show(OpenLinktoPrivateOneToOneMeetingModalComponent, modalParamss);
    // this.modalRef.content.event.subscribe(res => {
    //   // arr[res.index].clickAction[0].addToChatQueue = res.data;
    // });
    this.inputBroadcastMessageModel.selectedClickAction = 'linkToOneToOneChat';

  }

  // link to external url
  openWebsite(index) {
    const initialState = {
      index: index,
      linkWebsite: [{ name: '', url: '' }]
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard:false,
    };
    const modalParams = Object.assign({}, modalConfig, { initialState, class: 'modal-lg',backdrop: 'static',keyboard:false });
    this.modalRef = this.modalService.show(LinkWebsiteComponent, modalParams);
    this.modalRef.content.event.subscribe(res => {
      this.inputBroadcastMessageModel.selectedClickAction = 'linkWebsite';
      this.inputBroadcastMessageModel.clickAction.linkWebsite = {};
      this.inputBroadcastMessageModel.clickAction.linkWebsite = res.data;
    });




  }

  // briefcase section
  openBriefcase(index) {
    const initialState = {
      index: index,
      briefcase: [{ name: '', linkUrl: '' }]
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard:false,
    };
    const modalParams = Object.assign({}, modalConfig, { initialState, class: 'modal-lg',backdrop: 'static',keyboard:false });
    this.modalRef = this.modalService.show(OpenBriefcaseModalComponent, modalParams);
    this.modalRef.content.event.subscribe(res => {
      this.inputBroadcastMessageModel.selectedClickAction = 'openBriefcase';
      this.inputBroadcastMessageModel.clickAction.briefcase = {};
      this.inputBroadcastMessageModel.clickAction.briefcase = res.data;
    });
  }

  getQuizList(index) {
    const quizReqModel: any = {};
    quizReqModel.eventId = this.evntId;
    quizReqModel.UserId = this.evntAdminId;
    this.quizService.getQuizlist(quizReqModel).subscribe((res) => {
      if (res.isSuccess) {
        this.quizModel = res.quizQuestionsViewModels;

        const initialState = {
          allQuiz: this.quizModel,
          selectedQuiz: []
        };
        this.modalRef = this.modalService.show(OpenLinktoQuizModalComponent, { initialState, class: 'modal-lg',backdrop: 'static',keyboard:false });
        this.modalRef.content.closeBtnName = 'Close';
        this.modalRef.content.event.subscribe(resp => {
          this.inputBroadcastMessageModel.selectedClickAction = 'linkQuiz';
          this.inputBroadcastMessageModel.clickAction.linkToQuiz = {};
          this.inputBroadcastMessageModel.clickAction.linkToQuiz = resp.data;
        });
      }
    });
  }
  //#endregion

  onImgEntitlementSelect(index) {
    //this.inputBroadcastMessageModel.selectedClickAction;
  }

  onImgEntitlementDeSelect(item: any) {
    // const index = this.boothImageArr[indx].selectedEntitlementArray.indexOf(item.item_id, 0);
    // this.boothImageArr[indx].selectedEntitlementArray.splice(index, 1);
    // if (this.boothImageArr[indx].selectedEntitlementArray.length === 0) {
    //   this.requiredField = true;
    // }
  }

  onImgEntitlementSelectAll(items: any, indx) {
    for (let i = 0; i < items.length; i++) {
      // if (this.boothImageArr[indx].selectedEntitlementArray.indexOf(items[i].item_id) === -1) {
      //   this.boothImageArr[indx].selectedEntitlementArray.push(items[i]);
      // }
    }
  }

  onImgEntitlementDeSelectAll(items: any, indx) {
    // this.boothImageArr[indx].selectedEntitlementArray = [];
    // if (this.boothImageArr[indx].selectedEntitlementArray.length === 0) {
    //    this.requiredField = true;
    // }
  }
  // Entitlement Start
  bindGroupEntitlements(evntId) {
    this.getByIdViewModel.id = evntId;
    this.eventEntitlementService.getGroupEntitlemts(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.eventEntitlements = res.groupEntitlementViewModels;
        const temp = [];
        for (let k = 0; k < this.eventEntitlements.length; k++) {
          temp.push({
            item_id: this.eventEntitlements[k].groupId,
            item_text: this.eventEntitlements[k].groupName
          });
          console.log(this.eventEntitlements);
          this.entitlementDropdownList = temp;
          this.textEntitlementDropdownList = temp;
        }
      }
    });
  }

  getMessageDetails() {
    this.spinner.show();
    const msg: any = {};
    msg.id = this.messageId;
    this.broadcastMessageService.getBroadcastMessageDetails(msg).subscribe((res) => {
      if (res.isSuccess) {

        console.log(res);
        this.inputBroadcastMessageModel.clickAction = res.clickAction;
        this.inputBroadcastMessageModel.createdBy = res.CreatedBy;
        this.inputBroadcastMessageModel.createdDate = this.helper.convertDateToLocalTimezone(res.createdDate);
        this.inputBroadcastMessageModel.selectedEntitlement = res.selectedEntitlement;
        this.inputBroadcastMessageModel.eventId = res.eventId;
        this.inputBroadcastMessageModel.isActive = res.isActive;
        this.inputBroadcastMessageModel.messageId = res.messageId;
        this.inputBroadcastMessageModel.messsageStartTime = this.helper.convertDateToLocalTimezone(res.messsageStartTime);
        this.inputBroadcastMessageModel.messageStartDate = this.helper.convertDateToLocalTimezone(res.messageStartDate);
        this.inputBroadcastMessageModel.minutes = res.minutes;
        this.inputBroadcastMessageModel.registrationSetId = res.registrationSetId;
        this.inputBroadcastMessageModel.sendLater = res.sendLater;
        this.inputBroadcastMessageModel.sendNow = res.sendNow;
        this.inputBroadcastMessageModel.targetattendee = res.targetattendee;
        this.inputBroadcastMessageModel.broadcastMsgDesc = res.broadcastMsgDesc;
        this.inputBroadcastMessageModel.stopSendingMessage = res.stopSendingMessage;
        this.inputBroadcastMessageModel.broadcastMessageTitle = res.broadcastMessageTitle;
        this.inputBroadcastMessageModel.selectedClickAction = res.selectedClickAction;
        this.inputBroadcastMessageModel.modifiedBy = this.evntAdminId;
        this.inputBroadcastMessageModel.includeMessageDuration = res.includeMessageDuration;
        this.isSendLaterSelected = this.inputBroadcastMessageModel.sendLater ? true : false;

        if (this.inputBroadcastMessageModel.targetattendee === 'ByEntitlement') {
          this.isByEntitlementSelect = true;
        }
        else {
          this.isByEntitlementSelect = false;
        }

        this.isMsgDurationEnabled = this.inputBroadcastMessageModel.includeMessageDuration;
        this.spinner.hide();
      } else {
        this.spinner.hide();

        Swal.fire({
          title: new SweetAlertMessage(this.translate).alert,
          text: res.message,
          icon: 'error'
        });
      }
    })
  }
  // Entitlement End
  savemessage() {
    this.inputBroadcastMessageModel.includeMessageDuration = this.isMsgDurationEnabled;
    if (this.inputBroadcastMessageModel.selectedClickAction == 'linkToChatScreen' || this.inputBroadcastMessageModel.selectedClickAction == 'linkToOneToOneChat') {
      this.inputBroadcastMessageModel.clickAction = {}
    }
    if (this.inputBroadcastMessageModel.selectedClickAction !== 'linkToChatScreen' && this.inputBroadcastMessageModel.selectedClickAction !== 'linkToOneToOneChat' && this.inputBroadcastMessageModel.clickAction[0] === {}) {
      this.inputBroadcastMessageModel.selectedClickAction = '';
    }
    this.inputBroadcastMessageModel.sendNow = this.isSendLaterSelected ? false : true;
    this.inputBroadcastMessageModel.sendLater = this.isSendLaterSelected ? true : false;
    this.inputBroadcastMessageModel.isActive = true;
    if (this.inputBroadcastMessageModel.messageId != '') {
      this.inputBroadcastMessageModel.createdBy = this.evntAdminId;
    }
    if (this.inputBroadcastMessageModel.messageStartDate == '') {
      this.inputBroadcastMessageModel.messageStartDate = null;
    }
    if (this.inputBroadcastMessageModel.messsageStartTime == '') {
      this.inputBroadcastMessageModel.messsageStartTime = null;
    }
    console.log(this.inputBroadcastMessageModel);

    this.spinner.show();

    this.broadcastMessageService.upsertBroadcastMessage(this.inputBroadcastMessageModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        // if (this.inputBroadcastMessageModel.sendNow) {
        //   // this.signalRService.sendData();
        // }
        Swal.fire({
          title: new SweetAlertMessage(this.translate).success,
          text: new SweetAlertMessage(this.translate).savedSuccessfully,
          icon: 'success'
        }).then(() => {
         // location.href = AppUtils.EventUrl + '/admin/events/broadcastmessage/' + this.evntId;
         this.closeModal();
        });
      }
    })
  }

  closeModal() {
    this.bsModalRef.hide();

  }


}
