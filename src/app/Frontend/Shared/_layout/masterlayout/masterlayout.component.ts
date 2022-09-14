import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as THREE from 'three';
// import * as $ from 'jQuery';
import { CdkDragEnd, CdkDragStart, DragDropModule } from '@angular/cdk/drag-drop';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Helper } from 'src/app/Utils/Helper';
import { RoomsService } from 'src/app/Services/rooms.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddToChatQueueModalComponent } from 'src/app/Admin/_layout/Shared/add-to-chat-queue-modal/add-to-chat-queue-modal.component';
import { LinkLocationComponent } from 'src/app/Admin/_layout/Shared/link-location/link-location.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkWebsiteComponent } from 'src/app/Admin/_layout/Shared/link-website/link-website.component';
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
// tslint:disable-next-line:max-line-length
import { OpenLinktoWebinarModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-webinar-modal/open-linkto-webinar-modal.component';
import { OpenLinktoPrivateOneToOneMeetingModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-private-one-to-one-meeting-modal/open-linkto-private-one-to-one-meeting-modal.component';
import { LinkContentModalComponent } from 'src/app/Admin/_layout/Shared/link-content-modal/link-content-modal.component';
import { OpenLinkContentModalComponent } from 'src/app/Admin/_layout/Shared/open-link-content-modal/open-link-content-modal.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { element } from 'protractor';
import { compileFunction, runInThisContext } from 'vm';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EventEntitlementService } from 'src/app/Services/event-entitlement.service';
import { LanguageService } from 'src/app/Services/language.service';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { NgStyle } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as AppUtils from 'src/app/Utils/apputils';
import { QuizService } from 'src/app/Services/quiz.service';
import { QuizPartialComponent } from 'src/app/Frontend/Shared/Partial/quiz-partial/quiz-partial.component';
import { PollPartialComponent } from 'src/app/Frontend/Shared/Partial/poll-partial/poll-partial.component';
import { SurveyPartialComponent } from 'src/app/Frontend/Shared/Partial/survey-partial/survey-partial.component';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { CometChat } from '@cometchat-pro/chat';
import { COMETCHAT_CONSTANTS } from 'src/CONSTS';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subscription, timer } from 'rxjs';
import { DataService } from 'src/app/Services/data-service.service';
import { count } from 'console';
// import { CometChatUserListWithMessages } from 'src/cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Users/CometChat-user-list-with-messages/cometchat-user-list-with-messages.module';
import { BoothRepresentativeService } from 'src/app/Services/booth-representative.service';
import { CountryService } from 'src/app/Services/country.service';
import { identifierModuleUrl } from '@angular/compiler';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { AllAttendeePartialComponent } from '../../Partial/all-attendee-partial/all-attendee-partial.component';
import { SnedInvitationEmailPartialComponent } from '../../Partial/sned-invitation-email-partial/sned-invitation-email-partial.component';
import { SignalRService } from 'src/app/Services/signal-r.service';
import * as signalR from '@aspnet/signalr';
import { AttendeeLoggingService } from 'src/app/Services/attendee-logging.service';
import { IframePartialComponent } from '../../Partial/iframe-partial/iframe-partial.component';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { Modal } from 'bootstrap';
import { ChatQueueAtendeesPartialComponent } from '../../Partial/chat-queue-atendees-partial/chat-queue-atendees-partial.component';
import { BroadcastMessageSignalRService } from 'src/app/Services/broadcast-message-signal-r.service';
import { Message } from 'src/app/Interface/message';
import { BroadcastMessageAlertPartialComponent } from '../../Partial/broadcast-message-alert-partial/broadcast-message-alert-partial.component';
import { CreateBroadcastMessagePartialComponent } from '../../Partial/create-broadcast-message-partial/create-broadcast-message-partial.component';
import { ThankyouPageRegistrationSetViewModel } from 'src/app/Admin/Models/ThankyouPageRegistrationSetViewModel';
import { Square } from 'src/app/Admin/Models/square';
import { WebSocketService } from 'src/app/Services/web-socket.service'
import { SquareChangeRequest } from 'src/app/Admin/Models/square-change-request';
import { textChangeRangeIsUnchanged } from 'typescript';
import { CommonService } from 'src/app/Utils/common';

declare const CometChatWidget: any;


@Component({
  selector: 'app-masterlayout',
  templateUrl: './masterlayout.component.html',
  styleUrls: ['./masterlayout.component.css']
})
export class MasterlayoutComponent implements OnInit {
  modalClass = 'modal-dialog';
  eventId: string;
  roomId: string;
  fullWidth: any;
  fullHeight: any;
  imgWidth: any;
  imgHeight: any;
  oldx: any;
  oldY: any;
  representativeId = '';
  eventLocationUrl = '';
  totalAttendeesCount = 0;
  thisLocationAttendeeCount = 0;
  message: string;
  attendeeLeaderboard: any[] = [];
  attendeeId = '';
  isRepresentative = false;
  chatUserId = '';
  // SideNav Section
  // Start
  IsOpen = false;
  sideMenuItems: any = [];
  selectedLan = 'en';

  // Top Menu Section
  // Start
  isTopMenuOpen = true;
  // End

  // profile data
  profileData: any = {};
  countryList: any[] = [];
  public languages = Array<string>();
  isProfileImageAvailable = false;
  countryCode = '';
  standardFields: any = [];
  customFields: any = [];
  window: any;


  wallmessage: string = '';
  config: any;
  allWallPostsOfRooms: any[] = [];
  roomsModel: any = {};
  allAttendeeModel: any[] = [];
  allBriefcaseItems: any = [];
  eventDetails: any = {};
  private hubNotificationConnection: signalR.HubConnection;
  profileModal: any;
  welcomevideoModal: any;
  private signalRSubscription: Subscription;

  public content: Message;
  isEventAdmin = false;
  eventAdminId = '';

  wherebyChatLink = "";
  wherebyChatModal: any;


  announcementSub;
  messages: string[] = [];
  squares: Square[] = [];
  colors: string[] = ["red", "green", "blue"];
  currentColor: string = "red";
  name: string = "";
  welcomeVideoSrc = '';
  roomDetails: any = {};
  attendeeLeaderboardBadges: any = [];
  timerData = 0;
  howToEarnBadges: any = [];
  constructor(private fb: FormBuilder, private router: Router,
    private spinner: NgxSpinnerService,
    private helper: Helper,
    public route: ActivatedRoute,
    public translate: TranslateService,
    private languageService: LanguageService,
    private roomService: RoomsService,
    private eventEntitlementService: EventEntitlementService,
    private attendeeService: AttendeesService,
    private langugeService: LanguageService,
    private modalService: BsModalService,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService,
    private data: DataService, private signalRService: SignalRService,
    private broadcastmessageSignalRService: BroadcastMessageSignalRService,
    private attendeeLoggingService: AttendeeLoggingService,
    private representativeService: BoothRepresentativeService, public modalRef: BsModalRef,
    private socketService: WebSocketService,
    private countryService: CountryService, private eventService: EventsManagementService, private getterSetterService: GetterSetterService,
    private CommonService: CommonService,
    @Inject("Window") window: Window) {


    // this.socketService.announcement$.subscribe(announcement => {
    //   if (announcement) {
    //     this.messages.unshift(announcement);
    //   }
    // });
    // this.socketService.squares$.subscribe(sq => {
    //   this.squares = sq;
    //   // this.getSendNowBroadcastMessages();
    // });
    // this.socketService.name$.subscribe(n => {
    //   this.name = n;
    // });

    this.window = window;
    // this.spinner.show();

    setInterval(() => {
      this.timerData++;
    }, 1000);

    this.window.onbeforeunload = (event) => {
      console.log('timerData');

      console.log(this.timerData);
      this.sessionStorage.set("PreviousPageRoomTypeData", this.roomDetails.roomTypeId == '6426FB62-E428-43FE-BB58-3F1252FBA304' ? 'Login duration in booths' : 'Login duration in rooms');
      this.sessionStorage.set("PreviousPageRoomTimerData", 'sessionId-' + this.localStorage.get('SessionId') + '^^^^timerData-' + this.timerData + '^^^^roomId-' + this.roomId);
      // this.CommonService.logAttendeeClicks(event, this.roomDetails.roomTypeId == '6426FB62-E428-43FE-BB58-3F1252FBA304' ? 'Login duration in booths' : 'Login duration in rooms', 'sessionId-' + this.localStorage.get('SessionId') + '^^^^timerData-' + timerData, this.eventDetails.event, this.isRepresentative, this.representativeId, this.attendeeId, this.roomId);
    }

    this.profileData = {};

    this.eventId = route.snapshot.params.id;//.paramMap.get('id');
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.isRepresentative = this.sessionStorage.get('IsRepresentative') === 'true' ? true : false;
    this.isEventAdmin = this.sessionStorage.get('IsEventAdmin') === 'true' ? true : false;
    this.eventAdminId = this.isEventAdmin ? this.sessionStorage.get('EventAdminId') : '';

    this.attendeeId = !this.isRepresentative ? this.sessionStorage.get('AttendeeId') : '';
    if (this.sessionStorage.get('RepresentativeId') !== null && this.sessionStorage.get('RepresentativeId') !== '') {
      this.representativeId = this.sessionStorage.get('RepresentativeId');
    }

    // this.signalRSubscription = this.broadcastmessageSignalRService.getMessage().subscribe(
    //   (message) => {
    //     this.content = message;
    //     console.log(this.content); let storedLogMessageId: any = [];
    //     storedLogMessageId = this.localStorage.get('storedLogMessageId') == null ? [] : JSON.parse(this.localStorage.get('storedLogMessageId'));
    //     this.content.data.result.forEach(element => {
    //       if (element.attendeeId === this.sessionStorage.get('AttendeeId')) {
    //         // check if logid exists in local storage
    //         if (storedLogMessageId.filter(u => u.logId == element.logId).length <= 0) {
    //           // alert(element.broadcastMsgDesc);

    //           storedLogMessageId.push({ 'logId': element.logId });
    //           this.localStorage.set('storedLogMessageId', JSON.stringify(storedLogMessageId));
    //           const initialState = {
    //             msgDetails: element,
    //             eventDetails: this.eventDetails
    //           };
    //           this.modalRef = this.modalService.show(BroadcastMessageAlertPartialComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
    //         }
    //       }
    //     });
    //   });

    // save previous page roomdata
    this.CommonService.logAttendeeClicks(null, this.sessionStorage.get('PreviousPageRoomTypeData'), this.sessionStorage.get('PreviousPageRoomTimerData'), this.eventId, this.isRepresentative, this.representativeId, this.attendeeId, this.roomId);
    // reset previous page data
    this.sessionStorage.set('PreviousPageRoomTypeData', '');
    this.sessionStorage.set('PreviousPageRoomTimerData', '');

  }

  ngOnDestroy(): void {
    this.broadcastmessageSignalRService.disconnect();
    this.signalRSubscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // console.log('i am resized');
    this.fullWidth = window.innerWidth;
    this.fullHeight = this.fullWidth * 9 / 16; // window.innerHeight;

  }

  ngOnInit(): void {


    this.getCountry();

    this.config = {
      allowedContent: true,
      colorButton: true,
      extraPlugins: ['font', 'colorbutton', 'colordialog', 'emoji'],
      //removeButtons :  'Bold,Underline,JustifyCenter,Bold,Italic,Underline,-,TextColor,BGColor,-,NumberedList,BulletedList,-,HorizontalRule,SpecialChar,-,Unlink,-,Undo,Redo'
      removeButtons: 'Source,Save,NewPage,ocProps,Preview,Print,Templates,document,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,HiddenField,Bold,Italic,Underline,Strike,Subscript,Superscript,RemoveFormat,NumberedList,BulletedList,Outdent,Indent,Blockquote,CreateDiv,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,BidiLtr,BidiRtl,Unlink,Anchor,CreatePlaceholder,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,InsertPre,Styles,Format,Font,FontSize,TextColor,BGColor,UIColor,Maximize,ShowBlocks,button1,button2,button3,oembed,About',
      removePlugins: 'elementspath',
      resize_enabled: false,
      height: 65
    };
    // this.startNotificationRequest();
    this.eventLocationUrl = AppUtils.applicationUrl + '/room/';
    this.data.openChatPopup.subscribe((res) => {
      // console.log(res);
      CometChatWidget.openOrCloseChat(true);
    });
    this.data.linkToOneToOneChatPopup.subscribe((res) => {
      // console.log(res);
      CometChatWidget.openOrCloseChat(true);
    });

    this.data.openWelcomeVideo.subscribe((res) => {
      this.welcomeVideoSrc = res;
    });

    this.fullWidth = window.innerWidth;
    this.fullHeight = this.fullWidth * 9 / 16; // window.innerHeight;
    // this.signalRService.sendData();
    this.getAllRoomsAndBoothForCurrentEvent();
    this.getLoggedInEventAttendeesCount();
    this.bindLeaderBoard();
    this.getUserProfile();
    this.openChat();
    this.getAllWallPosts();
    this.getAvailableLanguages();
    this.getBriefcaseItems();
    this.getRoomDetails();
    if (!this.representativeId && !this.isEventAdmin) {
      this.checkIsProfileUpdated();
    }

    // this.spinner.hide();
    const element = document.getElementById('myProfileModal') as HTMLElement;
    const videoelement = document.getElementById('firstTimeLoggedInVideoModal') as HTMLElement;
    this.welcomevideoModal = new Modal(videoelement);

    this.profileModal = new Modal(element, {
      backdrop: 'static',
      keyboard: false
    });

    const whereByChatElement = document.getElementById('WhereByChatModal') as HTMLElement;
    this.wherebyChatModal = new Modal(whereByChatElement, {
      backdrop: 'static',
      keyboard: false
    });
  }


  getAvailableLanguages() {
    const lang: any = {};
    lang.id = this.eventId;
    this.languageService.getLanguagesByEventId(lang).subscribe((res) => {
      res.languageViewModel.forEach(element => {
        this.languages.push(element.abbreviation);
      });
      this.translate.addLangs(this.languages);
      if (this.localStorage.get('language') != null && this.localStorage.get('language') !== '') {
        this.translate.use(this.localStorage.get('language'));
        this.selectedLan = this.localStorage.get('language');
      } else {
        if (this.languages.length > 0) {
          this.translate.setDefaultLang(this.languages[0]);

        } else {
          this.translate.setDefaultLang('en');

        }
      }
    });
  }

  // squareClick(event, square: Square) {
  //   if (square.Color === this.currentColor)
  //     return;
  //   var req = new SquareChangeRequest();
  //   req.Id = square.Id;
  //   req.Color = this.currentColor;
  //   this.socketService.sendSquareChangeRequest(req);

  // }


  changeLanguage(lanValue) {
    this.translate.use(lanValue);
    this.localStorage.set('language', lanValue);
    this.selectedLan = lanValue;
  }


  getLoggedInEventAttendeesCount() {
    // this.spinner.show();
    const reqModel: any = {};
    reqModel.eventId = this.eventId;
    reqModel.roomId = this.roomId;
    this.attendeeService.getLoggedInEventAttendeesCount(reqModel).subscribe((res) => {
      if (res.isSuccess) {
        //this.spinner.hide();

        this.totalAttendeesCount = res.message.split('^^')[0];
        this.thisLocationAttendeeCount = res.message.split('^^')[1];
        this.data.cartData.emit(this.totalAttendeesCount);


        this.data.thisLocationAttendeeCountData.emit(this.thisLocationAttendeeCount);
      } else {
        //this.spinner.hide();
        this.totalAttendeesCount = 0;
        this.data.cartData.emit(0);
        this.data.thisLocationAttendeeCountData.emit(0);
      }
    })
  }



  //#region SideNav
  openNav() {
    this.IsOpen = true;
    this.openCloseMenuStyle(this.IsOpen);
  }

  closeNav() {
    this.IsOpen = false;
    this.openCloseMenuStyle(this.IsOpen);
  }

  openCloseMenuStyle(type): object {
    const returnData = {};
    if (type) {
      returnData['padding-left'] = '20px';
      returnData['padding-top'] = '20px';
      returnData['margin-left'] = '20px';
      returnData['margin-top'] = '20px';
    } else {
      returnData['padding-left'] = '20px';
      returnData['padding-top'] = '20px';
      returnData['margin-left'] = '0px';
      returnData['margin-top'] = '0px';
    }

    return returnData;
  }



  getAllRoomsAndBoothForCurrentEvent() {
    const getByIdVM: any = {};
    getByIdVM.id = this.eventId;
    this.spinner.show();
    this.roomService.getRoomsAndBoothsByCategory(getByIdVM).subscribe((res) => {
      if (res.isSuccess) {
        // console.log(res);
        var data: any = [];
        res.roomsAndBoothsWithRoomTypeListViewModel.forEach(element => {
          if (element.roomType.roomTypeId!=='6426fb62-e428-43fe-bb58-3f1252fba304' || this.isRepresentative) {
            var x: any = {};
            x.roomType = element.roomType;
            x.events=element.events;
            x.videoType=element.videoType;
            x.videoUrl=element.videoUrl;
            x.firstTimeLoginWelcomeMessage=element.firstTimeLoginWelcomeMessage;
            x.rooms = [];
            element.rooms.forEach(elements => {

              if (elements.startDate != null) {
                if (
                  (this.helper.combineDateAndTime(this.helper.convertDateToLocalTimezone(new Date(elements.startDate)), this.helper.convertDateToLocalTimezone(new Date(elements.startTime)))) <= new Date()
                  &&
                  (this.helper.combineDateAndTime(this.helper.convertDateToLocalTimezone(new Date(elements.endDate)),this.helper.convertDateToLocalTimezone( new Date(elements.endTime)))) > new Date()
                ) {
                  x.rooms.push(elements);
                }
              }
              else {
                x.rooms.push(elements);
              }
            });
            data.push(x);
          }
        });
        console.log(data);
        this.sideMenuItems = data;
        if (this.sideMenuItems.length > 0) {
          this.eventDetails = this.sideMenuItems[0].events;
          this.getterSetterService.eventDetails.emit(this.eventDetails);
          this.data.eventId.emit(this.eventDetails.eventId);
          if (this.attendeeId) {
            this.socketService.startSocket(this.eventId, this.sessionStorage.get('RegistrationSetId'), this.attendeeId, this.eventDetails, this.roomId);

          }
        }
        if (this.sideMenuItems.length > 0) {
          if (this.sessionStorage.get('IsFirstTimeAttendee') == 'true') {
            Swal.fire({
              // title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: this.sideMenuItems[0].firstTimeLoggedInAttendeeWelcomeMessage.replace('{{name}}', this.profileData.firstName),
              //icon: 'success'
            }).then(() => {
              this.sessionStorage.set('IsFirstTimeAttendee', false.toString());
              if (this.eventDetails.videoType !== '' && this.eventDetails.videoUrl !== '' && this.eventDetails.videoUrl != null) {
                this.welcomeVideoSrc = this.eventDetails.videoUrl;
                this.welcomevideoModal.show();
              }



            })
          }
        }
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }

    });

  }

  bindLeaderBoard() {
    const attendeeLeaderboardVm: any = {};
    if (this.isRepresentative) {
      attendeeLeaderboardVm.representativeId = this.sessionStorage.get('RepresentativeId');
      attendeeLeaderboardVm.isAttendee = false;
      attendeeLeaderboardVm.eventId = this.eventId;
    } else {
      attendeeLeaderboardVm.attendeeId = this.attendeeId;
      attendeeLeaderboardVm.isAttendee = true;
      attendeeLeaderboardVm.eventId = this.eventId;
    }


    this.attendeeService.getLeaderBoard(attendeeLeaderboardVm).subscribe((res) => {
      if (res.isSuccess) {
        console.log("attendeeLeaderboardVm");
        this.attendeeLeaderboard = res.attendeeBadges;
        console.log(this.attendeeLeaderboard);
      } else {

      }
    });
  }
  ////#endregion

  //#region  Top Menu Section
  showHideTopMenu() {
    this.isTopMenuOpen = !this.isTopMenuOpen;
  }
  //#endregion


  logoutUser() {

    const logoutUserModel: any = {};
    logoutUserModel.isRepresentative = this.isRepresentative;
    if (this.isEventAdmin) {
      logoutUserModel.isEventAdmin = true;
      logoutUserModel.evendAdminId = this.sessionStorage.get('EventAdminId');
      logoutUserModel.eventRepresentativeId = AppUtils.emptyGuid;
      logoutUserModel.attendeeId = AppUtils.emptyGuid;
    }
    else if (this.isRepresentative) {
      logoutUserModel.eventRepresentativeId = this.representativeId;
      logoutUserModel.attendeeId = AppUtils.emptyGuid;
      logoutUserModel.evendAdminId = AppUtils.emptyGuid;


    } else {
      logoutUserModel.eventRepresentativeId = AppUtils.emptyGuid;
      logoutUserModel.attendeeId = this.attendeeId;
      logoutUserModel.evendAdminId = AppUtils.emptyGuid;

    }

    this.attendeeService.logoutUser(logoutUserModel).subscribe((res) => {
      if (res.isSuccess) {
        this.CommonService.logAttendeeClicks(event, this.roomDetails.roomTypeId == '6426FB62-E428-43FE-BB58-3F1252FBA304' ? 'Login duration in booths' : 'Login duration in rooms', 'sessionId-' + this.localStorage.get('SessionId') + '^^^^timerData-' + this.timerData, this.eventDetails.event, this.isRepresentative, this.representativeId, this.attendeeId, this.roomId);

        const redirectUrl = this.sessionStorage.get('logoutUrl');
        this.sessionStorage.removeAllKeys();
        this.localStorage.remove('SessionId');
        this.signalRService.sendData();
        if (redirectUrl.indexOf('http://') !== -1 || redirectUrl.indexOf('https://') !== -1) {
          location.href = redirectUrl;

        }
        else {
          location.href = AppUtils.EventUrl + redirectUrl;
        }
      } else {
        const redirectUrl = this.sessionStorage.get('logoutUrl');
        this.sessionStorage.removeAllKeys();
        this.localStorage.remove('SessionId');
        this.signalRService.sendData();
        if (redirectUrl.indexOf('http://') !== -1 || redirectUrl.indexOf('https://') !== -1) {
          location.href = redirectUrl;
        }
        else {
          location.href = AppUtils.EventUrl + redirectUrl;
        }
      }
    })

  }

  openChat() {
    // log in chat user
    const evntId: any = this.eventId;
    const rmId: any = this.roomId;
    if (this.sessionStorage.get('RepresentativeId') !== null && this.sessionStorage.get('RepresentativeId') !== '') {
      this.representativeId = this.sessionStorage.get('RepresentativeId');
      const repId: any = this.representativeId;
      // this.chatUserId = evntId.replaceAll('-', '') + '_' + rmId.replaceAll('-', '') + '_' + repId.replaceAll('-', '');
      this.chatUserId = rmId + '_' + repId;

    } else {
      if (this.attendeeId) {
        const atdId: any = this.attendeeId;
        // this.chatUserId = evntId.replaceAll('-', '') + '_' + atdId.replaceAll('-', '');
        this.chatUserId = atdId;
      }
    }

    let limit = 30;
    let UIDs = ["superhero1", "superhero2"];
    if (this.chatUserId !== '' && this.chatUserId !== null) {
      window.addEventListener('DOMContentLoaded', (event) => {
        CometChatWidget.init({
          'appID': COMETCHAT_CONSTANTS.APP_ID,
          'appRegion': COMETCHAT_CONSTANTS.REGION,
          'authKey': COMETCHAT_CONSTANTS.AUTH_KEY
        }).then(response => {
          // console.log('Initialization completed successfully');
          //You can now call login function.
          CometChatWidget.login({
            'uid': this.chatUserId
          }).then(response => {
            // console.log(response);
            CometChatWidget.launch({
              'widgetID': COMETCHAT_CONSTANTS.WIDGET_ID,
              'docked': 'true',
              'alignment': 'right', //left or right
              'roundedCorners': 'true',
              'height': '450px',
              'width': '400px',
              'defaultID': this.chatUserId, //default UID (user) or GUID (group) to show,
              'defaultType': 'user', //user or group,
              'withTags': true,
              'setRoles': "representative"

            });



          }, error => {
            // console.log('User login failed with error:', error);
            //Check the reason for error and take appropriate action.
          });
        }, error => {
          // console.log('Initialization failed with error:', error);
          //Check the reason for error and take appropriate action.
        });
      });
      let usersRequest = new CometChat.UsersRequestBuilder()
        .setLimit(limit)
        .setUIDs(UIDs)
        .build();
    }
  }


  openChatQueuePopup() {
    const initialState = {
      eventId: this.eventId,
      roomId: this.router.url.indexOf('/dashboard') !== -1 ? AppUtils.emptyGuid : this.roomId,
      loggedInAttendees: true,
      representativeId: this.sessionStorage.get('RepresentativeId'),
      eventDetails: this.eventDetails

    };
    this.modalRef = this.modalService.show(ChatQueueAtendeesPartialComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });

  }

  getCountry() {
    // this.spinner.show();
    this.countryService.getAllCountry().subscribe((res) => {
      this.countryList = res;
      // this.profileData.countryCode = '';
    });
  }

  getUserProfile() {
    // this.spinner.show();
    if (this.isRepresentative) {
      // get representative profile details
      const repRequest: any = {};
      repRequest.id = this.representativeId;
      this.representativeService.getEventRepresentativeDetails(repRequest).subscribe((res) => {
        if (res.isSuccess) {
          // bind data to representative
          this.profileData = res.eventRepresentatives[0];
          // console.log(this.profileData);
          if (this.profileData.profileImage !== '') {
            this.isProfileImageAvailable = true;
          } else {
            this.isProfileImageAvailable = false;
          }

          // this.spinner.hide();
        } else {
          // no record found
          //this.spinner.hide();

        }
      });
    } else {
      // get attendee profile details
      const attReq: any = {};
      if (this.attendeeId) {
        attReq.id = this.attendeeId;
        this.attendeeService.getAttendeeDetails(attReq).subscribe((res) => {
          if (res.isSuccess) {
            // bind data to attendees
            this.profileData = res.attendees[0];
            console.log("profileData");
            console.log(this.profileData);
            if (this.profileData.profileImage !== '') {
              this.isProfileImageAvailable = true;
            } else {
              this.isProfileImageAvailable = false;
            }
            const arr = JSON.parse(this.profileData.standardFields);
            this.standardFields = JSON.parse(this.profileData.standardFields);
            this.customFields = JSON.parse(this.profileData.customFields);
            arr.forEach(element => {
              if (element.label == 'Company Name') {
                this.profileData.companyName = element.value;
              }
              if (element.label == 'Designation') {
                this.profileData.designation = element.value;
              }
              if (element.label == 'Address') {
                this.profileData.address = element.value;
              }
              if (element.label == 'City') {
                this.profileData.city = element.value;
              }
              if (element.label == 'State/Province') {
                this.profileData.state = element.value;
              }
              if (element.label == 'Country') {
                this.profileData.country = element.value;
              }
              if (element.label == 'Zip/Postal Code') {
                this.profileData.zip = element.value;
              }
            });
            //this.spinner.hide();

          } else {
            // no record found
            //this.spinner.hide();

          }
        });
      }


    }
  }


  onFileChange(event) {
    this.spinner.show();
    if (event.target.files.length > 0) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        if (this.isRepresentative) {
          this.representativeService.uploadRepProfileImage(formData).subscribe((res) => {
            if (res.isSuccess) {
              this.profileData.profileImage = res.message;
              this.isProfileImageAvailable = true;
            }
            this.spinner.hide();
          });
        } else {
          this.attendeeService.uploadAttendeeProfileImage(formData).subscribe((res) => {
            if (res.isSuccess) {
              this.profileData.profileImage = res.message;
              this.isProfileImageAvailable = true;
            }
            this.spinner.hide();
          });
        }

      }
    } else {
      //this.spinner.hide();
    }
  }


  updateUserProfile() {
    //  this.spinner.show();
    if (this.isRepresentative) {
      this.spinner.show();
      // update representative profile
      this.profileData.representativeId = this.representativeId;
      this.representativeService.updateEventRepresenetativeProfile(this.profileData).subscribe((res) => {
        if (res.isSuccess) {

          this.spinner.hide();
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
            text: new SweetAlertMessage(this.translate).updatedSuccessfullyMessage,
            icon: 'success'
          }).then(() => {
            var evnt: any;
            this.CommonService.logAttendeeClicks(evnt, 'Completing the profile', 'UpdateProfile', this.eventId, this.isRepresentative, this.isRepresentative ? this.representativeId : AppUtils.emptyGuid, this.attendeeId, this.roomId);
            this.getUserProfile();
            this.profileModal.hide();


          });

        } else {
          this.spinner.hide();
          // error in saving profile data
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
            text: new SweetAlertMessage(this.translate).sweetAlertSomeErrorOccuredErrorMessage,
            icon: 'error'
          }).then(() => {
            this.getUserProfile();
            location.reload();
            this.profileModal.hide();

          });
        }
      });

    } else {
      // update attendee profile
      this.profileData.attendeeId = this.attendeeId;
      this.profileData.checkIsProfileUpdated = true;
      this.profileData.standardFields = JSON.stringify(this.standardFields);
      this.profileData.customFields = JSON.stringify(this.customFields);
      console.log(this.profileData);
      this.attendeeService.updateEventAttendeeProfile(this.profileData).subscribe((res) => {
        if (res.isSuccess) {
          //this.spinner.hide();
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
            text: new SweetAlertMessage(this.translate).updatedSuccessfullyMessage,
            icon: 'success'
          }).then(() => {
            var evnt: any;
            this.CommonService.logAttendeeClicks(evnt, 'Completing the profile', 'UpdateProfile', this.eventId, this.isRepresentative, this.isRepresentative ? this.representativeId : AppUtils.emptyGuid, this.attendeeId, this.roomId);
            this.getUserProfile();
            this.sessionStorage.set('ProfileMandatorytocompleteregistrations', "false")
            //this.profileModal.hide();
            this.closeProfileModal();

          });
        } else {
          //this.spinner.hide();
          // error in saving profile data
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
            text: new SweetAlertMessage(this.translate).sweetAlertSomeErrorOccuredErrorMessage,
            icon: 'error'
          }).then(() => {
            this.getUserProfile();
          });
        }
      });
    }
  }

  deleteImage() {
    this.profileData.profileImage = '';
    this.isProfileImageAvailable = false;
  }

  getAllWallPosts() {
    this.roomsModel.eventId = this.eventId;
    this.roomsModel.roomId = this.roomId;
    this.roomsModel.isRepresentative = this.isRepresentative;
    this.eventService.getAllWallPosts(this.roomsModel).subscribe((res) => {
      if (res.isSuccess) {
        this.allWallPostsOfRooms = res.allWallPostsOfRooms;
        this.allWallPostsOfRooms.forEach(element => {
          if (element.attendeeId === this.attendeeId) {
            element.postedBy = 'you'
          }
          element.profileImage = element.profileImage === '' ? AppUtils.noImageEventLogoPath : element.profileImage;
          element.addedDate = this.helper.convertDateToLocalTimezone(element.addedDate);

        });
      } else {

      }
    })
  }

  saveWall() {
    if (this.wallmessage !== '') {
      const wall: any = {};
      wall.eventId = this.eventId;
      wall.roomId = this.roomId
      wall.attendeeId = this.attendeeId
      wall.post = this.wallmessage;
      this.eventService.postWall(wall).subscribe((res) => {
        if (res.isSuccess) {
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
            text: new SweetAlertMessage(this.translate).savedSuccessfully,
            icon: 'success'
          }).then(() => {
            var evnt: any;
            if (this.roomDetails.roomTypeId.toUpperCase() == 'CF324B5C-DD72-4635-B308-BA2E736A1CC2' || this.roomDetails.roomTypeId.toUpperCase() == '6426FB62-E428-43FE-BB58-3F1252FBA304') {
              this.CommonService.logAttendeeClicks(evnt, this.roomDetails.roomTypeId.toUpperCase() == 'CF324B5C-DD72-4635-B308-BA2E736A1CC2' ? 'Writing on the wall - in the lobby' : this.roomDetails.roomTypeId.toUpperCase() == '6426FB62-E428-43FE-BB58-3F1252FBA304' ? 'Writing on the wall - in the booths' : '', wall, this.eventDetails.eventId, this.isRepresentative, this.representativeId, this.attendeeId, this.roomId)
            }
            this.getAllWallPosts();
            this.wallmessage = '';
          });
        } else {
          //this.spinner.hide();
          // error in saving profile data
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
            text: new SweetAlertMessage(this.translate).sweetAlertSomeErrorOccuredErrorMessage,
            icon: 'error'
          }).then(() => {
            this.getAllWallPosts();
          });
        }
      })
    } else {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: new SweetAlertMessage(this.translate).pleaseAddSomeContentToPost,
        icon: 'error'
      }).then(() => {

      });
    }

  }

  goToDetailsPage() {
    const redirectUrl = this.sessionStorage.get('MainPageUrl');
    location.href = AppUtils.EventUrl + redirectUrl;
  }

  allAttendeelist() {
    this.modalRef.hide();
    const initialState = {
      eventId: this.eventId,
      locationWise: false,
      roomId: AppUtils.emptyGuid,
      loggedInAttendees: true,
      eventDetails: this.eventDetails

    };
    this.modalRef = this.modalService.show(AllAttendeePartialComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });


  }


  allLocationWiseAttendeelist() {
    this.modalRef.hide();
    const initialState = {
      eventId: this.eventId,
      locationWise: true,
      roomId: this.roomId,
      loggedInAttendees: false,
      eventDetails: this.eventDetails
    };
    this.modalRef = this.modalService.show(AllAttendeePartialComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });


  }

  getBriefcaseItems() {
    const getByIdViewModel: any = {};
    getByIdViewModel.id = this.roomId;
    this.attendeeLoggingService.getRoomWiseBriefcaseItems(getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        // console.log(res);
        this.allBriefcaseItems = res.linkContents;

      } else {
        this.allBriefcaseItems = [];

      }

    })
  }

  openBriefcaseLink(item) {
    if (this.helper.validateDocFile(item.linkUrl)) {
      const initialState = {
        title: item.name,
        documentUrl: item.linkUrl,
        eventDetails: this.eventDetails
      };
      this.modalRef = this.modalService.show(IframePartialComponent, { initialState, class: 'modal-xl', backdrop: 'static', keyboard: false });
      this.modalRef.content.closeBtnName = 'Close';
    } else {
      window.open(item.linkUrl, '_blank');
    }
  }
  inviteFromAttendee() {
    const initialState = {
      eventId: this.eventId,
      eventName: this.sessionStorage.get('EventName'),
      eventUrl: this.route.url,
      isLoggedIn: true,
      eventDetails: this.eventDetails

    };
    this.modalRef = this.modalService.show(SnedInvitationEmailPartialComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });

  }

  startNotificationRequest() {
    // this.hubNotificationConnection = new signalR.HubConnectionBuilder()
    //   .withUrl(AppUtils.NotificationUrl)
    //   .build();
    // this.hubNotificationConnection.start().then(() => console.log('connection started')).catch(err => {
    //   console.log('error in connection started')
    // });
    // this.hubNotificationConnection.serverTimeoutInMilliseconds = 100000;
    // this.hubNotificationConnection.on('BroadCastMessage', (data) => {
    //   this.getLoggedInEventAttendeesCount();
    //   // this.getSendNowBroadcastMessages();
    //   // this.bindLeaderBoard();
    //   // this.getUserProfile();
    //   // this.openChat();
    //   // this.getAllWallPosts();

    // });
  }

  openChatPopup() {
    this.data.openChatPopup.emit();
  }

  goToDashboard() {
    location.href = AppUtils.applicationUrl + 'room/' + this.roomId + '/' + this.eventId + '/dashboard';
  }

  checkIsProfileUpdated() {
    if (this.sessionStorage.get('ProfileMandatorytocompleteregistrations') === 'true') {    // const getByIdViewModel:any={};
      const getByIdViewModel: any = {};
      getByIdViewModel.id = this.attendeeId;
      this.attendeeService.checkIsProfileUpdated(getByIdViewModel).subscribe((res) => {
        if (!res.isSuccess) {


          this.profileModal.show();
        } else {
        }
      });

    }
  }
  closeProfileModal() {
    if (this.isRepresentative || this.isEventAdmin) {
      this.profileModal.hide();
      location.reload();

    } else {
      console.log(this.profileData);
      if (!this.isRepresentative && this.sessionStorage.get('ProfileMandatorytocompleteregistrations') !== 'true') {
        this.profileModal.hide();
        location.reload();

      } else {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: new SweetAlertMessage(this.translate).pleaseUpdateYourProfileFirst,
          icon: 'error'
        });
      }
    }
  }







  stopVideo() {
    var src = $('#welcomeVideoIFrame').children('iframe').attr('src');
    $('#welcomeVideoIFrame').children('iframe').attr('src', '');
    $('#welcomeVideoIFrame').children('iframe').attr('src', src);


    //$('#welcomeVideoIFrame').children('iframe').contents().find('video')[0].pause();
  }


  getSendNowBroadcastMessages() {
    this.eventService.getSendNowBroadcastMessge().subscribe((res) => {

      console.log(res); let storedLogMessageId: any = [];
      storedLogMessageId = this.localStorage.get('storedLogMessageId') == null ? [] : JSON.parse(this.localStorage.get('storedLogMessageId'));
      res.forEach(element => {
        if (element.attendeeId === this.sessionStorage.get('AttendeeId')) {
          // check if logid exists in local storage
          if (storedLogMessageId.filter(u => u.logId == element.logId).length <= 0) {
            // alert(element.broadcastMsgDesc);
            storedLogMessageId.push({ 'logId': element.logId });
            this.localStorage.set('storedLogMessageId', JSON.stringify(storedLogMessageId));
            const initialState = {
              msgDetails: element,
              eventDetails: this.eventDetails
            };
            this.modalRef = this.modalService.show(BroadcastMessageAlertPartialComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
          }
        }
      });
    })
  }

  openBroadcastMessage() {
    const initialState = {
      eventId: this.eventId,
      eventAdminId: this.eventAdminId,
      eventDetails: this.eventDetails
    };
    this.modalRef = this.modalService.show(CreateBroadcastMessagePartialComponent, { initialState, class: 'modal-lg' });
  }

  // createMeetingForWhereby() {
  //   const meeting: any = {};
  //   meeting.createdBy = this.sessionStorage.get('IsRepresentative') === 'true' ? this.sessionStorage.get('RepresentativeId') : this.sessionStorage.get('IsEventAdmin') === 'true' ? this.sessionStorage.get('EventAdminId') : this.sessionStorage.get('AttendeeId');
  //   meeting.userType = this.sessionStorage.get('IsRepresentative') === 'true' ? 'Representative' : this.sessionStorage.get('IsEventAdmin') === 'true' ? 'EventAdmin' : 'Attendee';


  //   this.roomService.createMeetingForWhereby(meeting).subscribe((res) => {
  //     if (res.isSuccess) {
  //       this.wherebyChatLink = res.message;
  //       this.wherebyChatModal.show();
  //     }
  //   });
  // }

  closeWelcomeVideo(videoUrl) {
    this.welcomeVideoSrc = '';
    // this.eventDetails.videoUrl = '';
    // this.eventDetails.videoUrl = videoUrl;
  }

  onResumeFileChange(event, item: any) {
    if (this.profileData.firstName === '' || this.profileData.firstName === undefined || this.profileData.firstName === null) {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: 'Please provide first name', // new SweetAlertMessage(this.translate).pleaseProvideFirstName,
        icon: 'error'
      });
    } else if (this.profileData.lastName === '' || this.profileData.lastName === undefined || this.profileData.lastName === null) {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: 'Please provide last name',// new SweetAlertMessage(this.translate).pleaseProvideLastName,
        icon: 'error'
      });

    }
    else {
      this.spinner.show();
      if (event.target.files.length > 0) {
        // upload file to server
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
          const file: File = fileList[0];
          const formData: FormData = new FormData();
          if (this.helper.validateDocFile(file.name)) {
            // formData.append('uploadFile', file, file.name);
            const ext = file.name.substring(file.name.lastIndexOf('.') + 1);
            formData.append('uploadFile', file, this.profileData.firstName + '_' + this.profileData.lastName + '_.' + ext.toLowerCase());
            this.attendeeService.uploadResume(formData).subscribe((res) => {
              if (res.isSuccess) {
                this.profileData.resumeLink = res.message;
                item.value = res.message;
              }
              this.spinner.hide();
            });
          } else {
            this.spinner.hide();
            Swal.fire({
              title: new SweetAlertMessage(this.translate).invalidFileType,
              text: new SweetAlertMessage(this.translate).onlyPdfAreAllowed,
              icon: 'error'
            });
            // this.myInputVariable.nativeElement.value = '';
            item.value = "";

          }
        }

      } else {
        // this.myInputVariable.nativeElement.value = '';
        item.value = "";
        this.spinner.hide();
      }
    }


  }

  deleteResume(item: any) {
    this.profileData.resumeLink = '';
    item.value = "";


  }

  onProfilePicFileChange(event, item: any) {
    if (this.profileData.firstName === '' || this.profileData.firstName === undefined || this.profileData.firstName === null) {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: 'Please provide first name', // new SweetAlertMessage(this.translate).pleaseProvideFirstName,
        icon: 'error'
      });
    } else if (this.profileData.lastName === '' || this.profileData.lastName === undefined || this.profileData.lastName === null) {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: 'Please provide last name',// new SweetAlertMessage(this.translate).pleaseProvideLastName,
        icon: 'error'
      });

    }
    else {
      this.spinner.show();
      if (event.target.files.length > 0) {
        // upload file to server
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
          const file: File = fileList[0];
          const formData: FormData = new FormData();
          if (this.helper.validateImageFile(file.name)) {
            // formData.append('uploadFile', file, file.name);
            const ext = file.name.substring(file.name.lastIndexOf('.') + 1);
            formData.append('uploadFile', file, this.profileData.firstName + '_' + this.profileData.lastName + '_.' + ext.toLowerCase());
            this.attendeeService.uploadAttendeeProfileImage(formData).subscribe((res) => {
              if (res.isSuccess) {
                item.value = res.message;
              }
              this.spinner.hide();
            });
          } else {
            this.spinner.hide();
            Swal.fire({
              title: new SweetAlertMessage(this.translate).invalidFileType,
              text: new SweetAlertMessage(this.translate).onlyPdfAreAllowed,
              icon: 'error'
            });
            item.value = "";

          }
        }

      } else {
        item.value = "";
        this.spinner.hide();
      }
    }


  }

  deleteProfilePic(item: any) {
    item.value = "";
  }

  getRoomDetails() {
    const getByIdViewModel: any = {};
    getByIdViewModel.id = this.roomId;
    this.roomService.getRoomDetails(getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.roomDetails = res.rooms[0];
        console.log('this.roomDetails');

        console.log(this.roomDetails);
        var evnt: any;
        this.CommonService.logAttendeeClicks(evnt,
          this.roomDetails.roomTypeId.toUpperCase() == '66EEEED5-4F92-457F-9C4D-290CC1F30310' ? 'Visit meeting rooms'
            : this.roomDetails.roomTypeId.toUpperCase() == '628DC63A-AF75-4005-B980-3C77731DF674' ? 'Visit Auditorium'
              : this.roomDetails.roomTypeId.toUpperCase() == '6426FB62-E428-43FE-BB58-3F1252FBA304' ? 'Visit booth'
                : this.roomDetails.roomTypeId.toUpperCase() == '0D24BB6A-9436-473E-BE06-5E04EE9384E7' ? 'Visit custom room'
                  : this.roomDetails.roomTypeId.toUpperCase() == 'BF708BD5-4F64-4727-889D-9704704B00F9' ? 'Visit exhibit hall'
                    : this.roomDetails.roomTypeId.toUpperCase() == 'CF324B5C-DD72-4635-B308-BA2E736A1CC2' ? 'Visit lobby'
                      : this.roomDetails.roomTypeId.toUpperCase() == '27182A32-8A4D-4EFC-8CB4-E13EFE5D7FB9' ? 'Visit launge'
                        : 'visit some room',
          this.roomDetails.roomTypeId.toUpperCase() == '66EEEED5-4F92-457F-9C4D-290CC1F30310' ? 'Visit meeting rooms^^^^visitedRoom-' + this.roomId
            : this.roomDetails.roomTypeId.toUpperCase() == '628DC63A-AF75-4005-B980-3C77731DF674' ? 'Visit Auditorium^^^^visitedRoom-' + this.roomId
              : this.roomDetails.roomTypeId.toUpperCase() == '6426FB62-E428-43FE-BB58-3F1252FBA304' ? 'Visit booth^^^^visitedRoom-' + this.roomId
                : this.roomDetails.roomTypeId.toUpperCase() == '0D24BB6A-9436-473E-BE06-5E04EE9384E7' ? 'Visit custom room^^^^visitedRoom-' + this.roomId
                  : this.roomDetails.roomTypeId.toUpperCase() == 'BF708BD5-4F64-4727-889D-9704704B00F9' ? 'Visit exhibit hall^^^^visitedRoom-' + this.roomId
                    : this.roomDetails.roomTypeId.toUpperCase() == 'CF324B5C-DD72-4635-B308-BA2E736A1CC2' ? 'Visit lobby^^^^visitedRoom-' + this.roomId
                      : this.roomDetails.roomTypeId.toUpperCase() == '27182A32-8A4D-4EFC-8CB4-E13EFE5D7FB9' ? 'Visit launge^^^^visitedRoom-' + this.roomId
                        : 'visit some room^^^^visitedRoom-' + this.roomId, this.roomDetails.eventId, this.isRepresentative, this.representativeId, this.attendeeId, this.roomId);
      }
    });
  }

  showBadgeDetails(leaderboardData) {
    this.attendeeService.showBadgeDetails(leaderboardData).subscribe((res) => {
      if (res.isSuccess) {
        this.attendeeLeaderboardBadges = res.leaderboardBadgesList;
      }
    });

  }

  getLeaderboardInfo() {
    var postData: any = {};
    postData.id = this.eventId;
    if (this.isRepresentative) {
      // get represenatative leaderboard info
      this.attendeeService.getAllRepLeaderboardBadges(postData).subscribe((res) => {
        if (res.isSuccess) {
          this.howToEarnBadges = res.leaderboardBadgesList;
        } else {
          this.howToEarnBadges = [];
        }
      });
    } else {
      // get atendee leaderboard info
      this.attendeeService.getAllAttendeeLeaderboardBadges(postData).subscribe((res) => {
        if (res.isSuccess) {
          this.howToEarnBadges = res.leaderboardBadgesList;
        } else {
          this.howToEarnBadges = [];
        }
      });
    }
  }
}