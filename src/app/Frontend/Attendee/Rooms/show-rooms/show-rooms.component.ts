import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener } from '@angular/core';
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
import { runInThisContext } from 'vm';
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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { appendFile } from 'fs';
import { AttendeeLoggingService } from 'src/app/Services/attendee-logging.service';
import { WebinarPartialComponent } from 'src/app/Frontend/Shared/Partial/webinar-partial/webinar-partial.component';
import { CometChat } from '@cometchat-pro/chat';
import { DataService } from 'src/app/Services/data-service.service';
import { IframePartialComponent } from 'src/app/Frontend/Shared/Partial/iframe-partial/iframe-partial.component';
import { SignalRService } from 'src/app/Services/signal-r.service';
import { Observable } from 'rxjs';
import { BoothRepresentativeService } from 'src/app/Services/booth-representative.service';
import { RoomRepresentativesComponent } from 'src/app/Frontend/Shared/Partial/room-representatives/room-representatives.component';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { textChangeRangeIsUnchanged } from 'typescript';
import { WebSocketService } from 'src/app/Services/web-socket.service';
import { IImageframePartialComponent } from 'src/app/Frontend/Shared/Partial/image-iframe-partial/image-iframe-partial.component';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { CommonService } from 'src/app/Utils/common';

@Component({
  selector: 'app-show-rooms',
  templateUrl: './show-rooms.component.html',
  styleUrls: ['./show-rooms.component.css']
})
export class ShowRoomsComponent implements OnInit {
  eventId: string;
  roomId: string;
  fullWidth: any;
  fullHeight: any;
  imgWidth: any;
  imgHeight: any;
  oldx: any;
  oldY: any;
  attendeeId = '';
  eventLocationUrl = '';
  totalAttendeesCount = 0;
  isRepresentative = '';
  representativeId = '';
  loggedInUserId = '';
  isEventAdmin = '';
  eventAdminId = '';
  // Image section
  // Start
  boothImageArr = [];
  //  End


  // Video Section
  // Start
  videosArr = [];
  videoListStartIndex = 0;
  // End

  // Text section
  // Start
  textArr = [];
  // End


  // audio Section
  // Start
  audiosArr = [];
  // End

  // Infocard Section
  // Start
  infoCardArr = [];
  // End

  // Marquee Section
  // Start
  marqueeArr = [];
  // End

  // Standee Section
  // Start
  standeekArr = [];
  // End


  // Shape Section
  // Start
  shapeArr = [];
  // End

  // Guest Section
  // Start
  guestArr = [];
  // End

  // Facebook Section
  // Start
  faceBookLinkArr = [];
  // End

  // Twitter Section
  // Start
  twitterLinkArr = [];
  // End


  // Insta Section
  // Start
  instagramLinkArr = [];
  // End

  // Linkedin Section
  // Start
  linkedInLinkArr = [];
  // End

  // SideNav Section
  // Start
  IsOpen = false;
  sideMenuItems: any = [];
  // End

  // Top Menu Section
  // Start
  isTopMenuOpen = true;
  // End

  // saving data content section
  // start
  roomDesignDetails: any = {};
  roomTemplates: any;
  representatives: any = [];

  // End

  // info card section
  // start
  boothRepresentatives: any = [];
  // end

  // HTMl Section
  // Start
  htmlArr = [];
  // End

  rooms: any = {};
  whereByChatMeeting: any = {};
  videoChatUrl = '';
  // data for click actions
  linkContentData: any[] = [];
  quizModel: any[] = [];
  pollModel: any[] = [];
  surveyModel: any[] = [];
  webinarModel: any[] = [];
  modalRef: BsModalRef;
  px_ratio: any;
  eventDetails: any = {};
  iframeWebsitePopup = '';
  iframeModalName = '';

  iframeVideoPopup = '';
  iframeVideoModalName = '';

  constructor(private fb: FormBuilder,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private helper: Helper,
    private route: ActivatedRoute,
    private roomService: RoomsService,
    private eventEntitlementService: EventEntitlementService,
    private attendeeService: AttendeesService,
    private langugeService: LanguageService,
    private modalService: BsModalService,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService,
    private dataservice: DataService, private signalRService: SignalRService, private boothRepresentativeService: BoothRepresentativeService,
    private attendeeLoggingService: AttendeeLoggingService, public router: Router, private socketService: WebSocketService, public CommonService: CommonService,
    private getterSetterService: GetterSetterService) {
    this.px_ratio = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;
    // console.log('original value - ' + this.px_ratio);
    this.eventLocationUrl = AppUtils.EventUrl + '/room/';
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.roomId = this.route.snapshot.paramMap.get('roomId');

    if (!this.localStorage.get('SessionId') && !this.router.url.toLowerCase().includes('/preview/')) {
      this.logoutUser();
      return;
    }


  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // console.log('i am resized');
    this.fullWidth = window.innerWidth;
    this.fullHeight = this.fullWidth * 9 / 16; // window.innerHeight;
    this.isZooming();
  }


  isZooming() {
    // var newPx_ratio = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;
    // if (newPx_ratio != this.px_ratio) {
    //   this.px_ratio = newPx_ratio;
    //   // console.log("zooming");
    //   // console.log(this.px_ratio);
    //   if (this.roomDesignDetails.designData != null) {
    //     this.boothImageArr = this.roomDesignDetails.designData.imageInfo;
    //     // this.videosArr = this.roomDesignDetails.designData.videoInfo;
    //     // this.textArr = this.roomDesignDetails.designData.textInfo;
    //     // this.audiosArr = this.roomDesignDetails.designData.audioInfo;
    //     // this.infoCardArr = this.roomDesignDetails.designData.infoCardInfo;
    //     // this.marqueeArr = this.roomDesignDetails.designData.marqueeInfo;
    //     // this.standeekArr = this.roomDesignDetails.designData.standeeInfo;
    //     // this.guestArr = this.roomDesignDetails.designData.guestInfo;
    //     // this.faceBookLinkArr = this.roomDesignDetails.designData.facebookInfo;
    //     // this.twitterLinkArr = this.roomDesignDetails.designData.twitterInfo;
    //     // this.instagramLinkArr = this.roomDesignDetails.designData.instagramInfo;
    //     // this.linkedInLinkArr = this.roomDesignDetails.designData.linkedInInfo;
    //     this.boothImageArr.forEach(elmt => {
    //       this.loadboothImageArrScreenItems(elmt);
    //     });
    //     // this.videosArr.forEach(elmt => {
    //     //   this.loadvideosArrScreenItems(elmt);
    //     // });
    //     // this.textArr.forEach(elmt => {
    //     //   this.loadTextArrScreenItems(elmt);
    //     // });
    //     // this.infoCardArr.forEach(elmt => {
    //     //   this.loadinfoCardArrScreenItems(elmt);
    //     // });
    //     // this.standeekArr.forEach(elmt => {
    //     //   this.loadStandeekArrScreenItems(elmt);
    //     // });
    //     // this.marqueeArr.forEach(elmt => {
    //     //   this.loadMarqueeScreenItems(elmt);
    //     // });
    //     // this.guestArr.forEach(elmt => {
    //     //   this.loadGuestScreenItems(elmt);
    //     // });

    //     // this.faceBookLinkArr.forEach(elmt => {
    //     //   this.loadFacebookScreenItems(elmt);
    //     // });
    //     // this.twitterLinkArr.forEach(elmt => {
    //     //   this.loadTwitterScreenItems(elmt);
    //     // });
    //     // this.instagramLinkArr.forEach(elmt => {
    //     //   this.loadInstagramScreenItems(elmt);
    //     // });
    //     // this.linkedInLinkArr.forEach(elmt => {
    //     //   this.loadLinkedInScreenItems(elmt);
    //     // });
    //   }
    //   return true;
    // } else {
    //   // console.log("just resizing");
    //   // console.log(this.px_ratio);
    //   return false;
    // }
    this.px_ratio = 1;
  }


  async ngOnInit(): Promise<void> {

    // console.log(window.innerWidth);
    // console.log(window.innerHeight);

    this.getterSetterService.eventDetails.subscribe(res => {
      this.eventDetails = res;
      console.log("eventDetails");
      console.log(this.eventDetails);
    });


    this.fullWidth = window.innerWidth;
    // this.signalRService.sendData();
    this.fullHeight = this.fullWidth * 9 / 16; // window.innerHeight;
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    // log in chat user


    this.isRepresentative = this.sessionStorage.get('IsRepresentative');
    this.isEventAdmin = this.sessionStorage.get('IsEventAdmin');

    if (this.isRepresentative !== null && this.isRepresentative !== undefined && this.isRepresentative === 'true') {
      this.representativeId = this.sessionStorage.get('RepresentativeId');
      this.attendeeId = AppUtils.emptyGuid;
      this.eventAdminId = AppUtils.emptyGuid;
      // this.loggedInUserId = this.representativeId + '_' + this.roomId;
      this.loggedInUserId = this.representativeId;
    }
    else if (this.isEventAdmin !== null && this.isEventAdmin !== undefined && this.isEventAdmin === 'true') {
      this.eventAdminId = this.sessionStorage.get('EventAdminId');
      // this.loggedInUserId = this.representativeId + '_' + this.roomId;
      this.loggedInUserId = this.eventAdminId;
      this.attendeeId = AppUtils.emptyGuid;
      this.representativeId = AppUtils.emptyGuid;
    } else {
      if (this.sessionStorage.get('AttendeeId') !== null && this.sessionStorage.get('AttendeeId') !== undefined && this.sessionStorage.get('AttendeeId') !== '') {
        this.attendeeId = this.sessionStorage.get('AttendeeId');
        this.loggedInUserId = this.attendeeId;
        this.representativeId = AppUtils.emptyGuid;
        this.eventAdminId = AppUtils.emptyGuid;
      }
    }

    if (this.router.url.toLowerCase().includes('/preview/') && this.localStorage.get('isLoggedIn') === null) {
      this.logoutUser();
    }

    if (!this.isRepresentative) {
      // this is attendee. Check if it loggedin from this machine or not. if not then logout this user
      if (this.localStorage.get('SessionId') === null && !this.router.url.toLowerCase().includes('/preview/')) {
        this.logoutUser();
      }
      if (!this.router.url.toLowerCase().includes('/preview/')) {
        this.checkForAttendeeSession();
      }

    }

    // this.getEntitlementForThisRoom();
    this.getRoomDesignDetails();
    // this.getAllRoomsAndBoothForCurrentEvent();
    // this.getLoggedInEventAttendeesCount();



  }

  checkForAttendeeSession() {
    const checkForSession: any = {};
    checkForSession.attendee = {};
    checkForSession.attendee.attendeeId = this.attendeeId;
    checkForSession.sessionId = this.localStorage.get('SessionId');
    this.attendeeService.checkForAttendeeSession(checkForSession).subscribe((res) => {
      if (res.isSuccess) {
      } else {
        this.logoutUser();
      }
    });

  }

  
  videoEnded(playListm4, index) {
    let elem: any = document.getElementById("vidItem_" + index);
    this.videoListStartIndex = this.videoListStartIndex + 1;
    elem.src = playListm4[this.videoListStartIndex].src;
    elem.play();
  }

  playVideolistSlected(playListm4, videoIndex, listIndex) {
    let elem: any = document.getElementById("vidItem_" + videoIndex);
    elem.src = playListm4[listIndex].src;
    var evnt: any;
    this.logAttendeeClicks(evnt, 'video', 'play^^^^' + playListm4[listIndex].src);
    elem.play();
  }

  getNewValue(posValue, oldImgPos, newImgPos) {
    return posValue * (newImgPos / oldImgPos);
  }

  // master data loading functions
  getRoomDesignDetails() {
    const roomDetailsReq: any = {};
    roomDetailsReq.id = this.route.snapshot.paramMap.get('roomId');
    roomDetailsReq.eventId = this.eventId;
    roomDetailsReq.sessionId = this.localStorage.get('SessionId');
    if (this.isEventAdmin) {
      roomDetailsReq.userType = 'EventAdmin';
      roomDetailsReq.userId = this.eventAdminId;
    }
    else if ((this.attendeeId !== null && this.attendeeId !== undefined && this.attendeeId !== '') || (this.representativeId !== null && this.representativeId !== undefined && this.representativeId !== '')) {
      if (!this.isRepresentative) {
        roomDetailsReq.userType = 'Attendee';
        roomDetailsReq.userId = this.attendeeId;
      }
      else {
        if (this.isRepresentative) {
          roomDetailsReq.userType = 'Representative';
          roomDetailsReq.userId = this.representativeId;
        }
      }
    }

    this.roomService.getRoomDesignDetails(roomDetailsReq).subscribe((res) => {
      if (res.isSuccess) {
        console.log(res);
        this.roomDesignDetails = res.roomDesignData;
        this.roomTemplates = res.allRoomTemplates;
        this.representatives = res.representatives;
        this.rooms = res.rooms;
        this.whereByChatMeeting = res.whereByChatMeeting;
        // console.log(this.roomDesignDetails);
        // console.log(this.roomTemplates);
        if (this.roomDesignDetails.designData != null) {
          this.boothImageArr = this.roomDesignDetails.designData.imageInfo;
          this.videosArr = this.roomDesignDetails.designData.videoInfo;
          this.textArr = this.roomDesignDetails.designData.textInfo;
          this.audiosArr = this.roomDesignDetails.designData.audioInfo;
          this.infoCardArr = this.roomDesignDetails.designData.infoCardInfo;
          this.marqueeArr = this.roomDesignDetails.designData.marqueeInfo;
          this.standeekArr = this.roomDesignDetails.designData.standeeInfo;
          this.guestArr = this.roomDesignDetails.designData.guestInfo;
          this.faceBookLinkArr = this.roomDesignDetails.designData.facebookInfo;
          this.twitterLinkArr = this.roomDesignDetails.designData.twitterInfo;
          this.instagramLinkArr = this.roomDesignDetails.designData.instagramInfo;
          this.linkedInLinkArr = this.roomDesignDetails.designData.linkedInInfo;
          this.htmlArr = this.roomDesignDetails.designData.htmlInfo;

          this.boothImageArr.forEach(elmt => {
            this.loadboothImageArrScreenItems(elmt);
          });
          this.videosArr.forEach(elmt => {
            this.loadvideosArrScreenItems(elmt);
          });
          this.textArr.forEach(elmt => {
            this.loadTextArrScreenItems(elmt);
          });
          this.infoCardArr.forEach(elmt => {
            this.loadinfoCardArrScreenItems(elmt);
          });
          this.standeekArr.forEach(elmt => {
            this.loadStandeekArrScreenItems(elmt);
          });
          this.marqueeArr.forEach(elmt => {
            this.loadMarqueeScreenItems(elmt);
          });
          this.guestArr.forEach(elmt => {
            this.loadGuestScreenItems(elmt);
          });

          this.faceBookLinkArr.forEach(elmt => {
            this.loadFacebookScreenItems(elmt);
          });
          this.twitterLinkArr.forEach(elmt => {
            this.loadTwitterScreenItems(elmt);
          });
          this.instagramLinkArr.forEach(elmt => {
            this.loadInstagramScreenItems(elmt);
          });
          this.linkedInLinkArr.forEach(elmt => {
            this.loadLinkedInScreenItems(elmt);
          });
          if (this.htmlArr) {
            this.htmlArr.forEach(element => {
              console.log(element);
              this.loadHtmlScreenItems(element);
            });
          }
        }

        // saving data to the AttendeeRepresentativeRoomLogging
        this.roomService.attendeeRepresentativeRoomLogging(roomDetailsReq).subscribe((res) => {
        });

        // connnect websockets to get polls notifications
        if (!this.isEventAdmin && !this.isRepresentative) {
          this.socketService.startPollService(this.eventId, this.attendeeId, this.rooms.roomTypes.roomType == "Booth" ? "BoothLevel" : "EventLevel");
        }
      } else {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: res.message,
          icon: 'error'
        });
      }
    });


  }



  loadboothImageArrScreenItems(item) {
    const startWidth = item.parentWidth;
    const startHeight = item.parentHeight;
    const transfortransformedCordY = (this.fullHeight * item.parentDragPosition.y / item.parentHeight);
    const transformedCordX = (this.fullWidth * (item.parentDragPosition.x) / item.parentWidth);
    item.dragPosition.x = transformedCordX - 3;
    item.dragPosition.y = transfortransformedCordY - 3;
    const itemWidth = this.fullWidth * item.bannerImageWidth / item.parentWidth;
    const itemHeight = itemWidth * item.bannerImageHeight / item.bannerImageWidth;
    item.bannerImageHeight = itemHeight;
    item.bannerImageWidth = itemWidth - 1;

  }

  loadvideosArrScreenItems(item) {
    const startWidth = item.parentWidth;
    const startHeight = item.parentHeight;
    const transfortransformedCordY = this.fullHeight * item.parentDragPosition.y / item.parentHeight;
    const transformedCordX = (this.fullWidth * (item.parentDragPosition.x) / item.parentWidth);
    item.dragPosition.x = transformedCordX - 3;
    item.dragPosition.y = transfortransformedCordY - 3;
    const itemWidth = this.fullWidth * item.videoWidth / item.parentWidth;
    const itemHeight = itemWidth * item.videoHeight / item.videoWidth;
    item.videoHeight = itemHeight;
    item.videoWidth = itemWidth - 1;
    if (item.isVideoPlaylist) {
      // create video thumbnails
      // const videoListPosters: any = [];
      // item.playList.forEach(element => {
      //   const video: any = document.createElement("video");

      //   video.src = element.src;

      //   const canvas = document.createElement("canvas");
      //   // scale the canvas accordingly
      //   canvas.width = itemWidth;
      //   canvas.height = itemHeight;
      //   // draw the video at that frame
      //   canvas.getContext('2d')
      //     .drawImage(video, 0, 0, canvas.width, canvas.height);
      //   // convert it to a usable data URL
      //   const dataURL = canvas.toDataURL();
      //   videoListPosters.push(dataURL);
      //   // canvas.remove();
      //   // video.remove();

      // });
      // // console.log(videoListPosters);
      // item.videoListPosters=videoListPosters;
    }
  }



  loadTextArrScreenItems(item) {
    const startWidth = item.parentWidth;
    const startHeight = item.parentHeight;
    const transfortransformedCordY = this.fullHeight * item.parentDragPosition.y / item.parentHeight;
    const transformedCordX = (this.fullWidth * (item.parentDragPosition.x) / item.parentWidth);
    item.dragPosition.x = transformedCordX - 3;
    item.dragPosition.y = transfortransformedCordY - 3;
  }

  loadinfoCardArrScreenItems(item) {
    const startWidth = item.parentWidth;
    const startHeight = item.parentHeight;
    const transfortransformedCordY = this.fullHeight * item.parentDragPosition.y / item.parentHeight;
    const transformedCordX = (this.fullWidth * (item.parentDragPosition.x) / item.parentWidth);
    item.dragPosition.x = transformedCordX - 3;
    item.dragPosition.y = transfortransformedCordY - 3;
  }

  loadStandeekArrScreenItems(item) {
    const startWidth = item.parentWidth;
    const startHeight = item.parentHeight;
    const transfortransformedCordY = this.fullHeight * item.parentDragPosition.y / item.parentHeight;
    const transformedCordX = (this.fullWidth * (item.parentDragPosition.x) / item.parentWidth);
    item.dragPosition.x = transformedCordX - 3;
    item.dragPosition.y = transfortransformedCordY - 3;
    const itemWidth = this.fullWidth * item.standeeWidth / item.parentWidth;
    const itemHeight = itemWidth * item.standeeHeight / item.standeeWidth;
    item.standeeHeight = itemHeight;
    item.standeeWidth = itemWidth - 1;
  }


  loadMarqueeScreenItems(item) {
    const startWidth = item.parentWidth;
    const startHeight = item.parentHeight;
    const transfortransformedCordY = this.fullHeight * item.parentDragPosition.y / item.parentHeight;
    const transformedCordX = (this.fullWidth * (item.parentDragPosition.x) / item.parentWidth);
    item.dragPosition.x = transformedCordX - 3;
    item.dragPosition.y = transfortransformedCordY - 3;
    const itemWidth = this.fullWidth * item.marqueeWidth / item.parentWidth;
    const itemHeight = itemWidth * item.marqueeHeight / item.marqueeWidth;
    item.marqueeHeight = itemHeight;
    item.marqueeWidth = itemWidth - 1;
  }


  loadGuestScreenItems(item) {
    const startWidth = item.parentWidth;
    const startHeight = item.parentHeight;
    const transfortransformedCordY = this.fullHeight * item.parentDragPosition.y / item.parentHeight;
    const transformedCordX = (this.fullWidth * (item.parentDragPosition.x) / item.parentWidth);
    item.dragPosition.x = transformedCordX - 3;
    item.dragPosition.y = transfortransformedCordY - 3;
    const itemWidth = this.fullWidth * item.guestWidth / item.parentWidth;
    const itemHeight = itemWidth * item.guestHeight / item.guestWidth;
    item.guestHeight = itemHeight;
    item.guestWidth = itemWidth - 1;

  }

  loadFacebookScreenItems(item) {
    const startWidth = item.parentWidth;
    const startHeight = item.parentHeight;
    const transfortransformedCordY = this.fullHeight * item.parentDragPosition.y / item.parentHeight;
    const transformedCordX = (this.fullWidth * (item.parentDragPosition.x) / item.parentWidth);
    item.dragPosition.x = transformedCordX - 3;
    item.dragPosition.y = transfortransformedCordY - 3;
  }

  loadTwitterScreenItems(item) {
    const startWidth = item.parentWidth;
    const startHeight = item.parentHeight;
    const transfortransformedCordY = this.fullHeight * item.parentDragPosition.y / item.parentHeight;
    const transformedCordX = (this.fullWidth * (item.parentDragPosition.x) / item.parentWidth);
    item.dragPosition.x = transformedCordX - 3;
    item.dragPosition.y = transfortransformedCordY - 3;
  }

  loadInstagramScreenItems(item) {
    const startWidth = item.parentWidth;
    const startHeight = item.parentHeight;
    const transfortransformedCordY = this.fullHeight * item.parentDragPosition.y / item.parentHeight;
    const transformedCordX = (this.fullWidth * (item.parentDragPosition.x) / item.parentWidth);
    item.dragPosition.x = transformedCordX - 3;
    item.dragPosition.y = transfortransformedCordY - 3;
  }

  loadLinkedInScreenItems(item) {
    const startWidth = item.parentWidth;
    const startHeight = item.parentHeight;
    const transfortransformedCordY = this.fullHeight * item.parentDragPosition.y / item.parentHeight;
    const transformedCordX = (this.fullWidth * (item.parentDragPosition.x) / item.parentWidth);
    item.dragPosition.x = transformedCordX - 3;
    item.dragPosition.y = transfortransformedCordY - 3;
  }

  loadHtmlScreenItems(item) {

  }

  textStyle(index): object {
    const returnData = {};
    returnData['font-family'] = this.textArr[index].font;
    returnData['color'] = this.textArr[index].color;
    returnData['font-size'] = this.textArr[index].fontSize.split('px')[0] * 1.44 + 'px';
    returnData['line-height'] = this.textArr[index].lineHeight.split('px')[0] * 1.44 + 'px';
    returnData['text-align'] = this.textArr[index].alignment;
    returnData['text-transform'] = this.textArr[index].textTransform;
    returnData['font-family'] = this.textArr[index].font;
    returnData['font-weight'] = this.textArr[index].fontWeight;
    returnData['font-style'] = this.textArr[index].fontStyle;
    returnData['text-decoration'] = this.textArr[index].textDecoration;
    return returnData;
  }

  marqueeStyle(index): object {
    const returnData = {};
    returnData['font-family'] = this.marqueeArr[index].font;
    // returnData['color'] = this.textArr[index].color;
    returnData['font-size'] = this.marqueeArr[index].fontSize.split('px')[0] * 1.44 + 'px';
    returnData['line-height'] = this.marqueeArr[index].lineHeight.split('px')[0] * 1.44 + 'px';
    // returnData['text-align'] = this.textArr[index].alignment;
    returnData['text-transform'] = this.marqueeArr[index].textTransform;
    // returnData['font-family'] = this.textArr[index].font;
    // returnData['font-weight'] = this.textArr[index].fontWeight;
    //  returnData['font-style'] = this.textArr[index].fontStyle;
    // returnData['text-decoration'] = this.textArr[index].textDecoration;
    return returnData;
  }

  getBoothRepresentatives(infoCardItem) {
    if (infoCardItem.infoCardDescWhenRoomRepsAreAsigned) {
      // get representatives of room
      const getByIdViewModel: any = {};
      getByIdViewModel.id = this.roomId;
      this.boothRepresentativeService.getRepresentatives(getByIdViewModel).subscribe((res) => {
        if (res.isSuccess) {
          this.boothRepresentatives = res.representatives;
          // console.log(this.boothRepresentatives);

          const initialState = {
            boothRepresentatives: this.boothRepresentatives,
            eventDetails: this.eventDetails
          };
          this.modalRef = this.modalService.show(RoomRepresentativesComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
          this.modalRef.content.closeBtnName = 'Close';
          // this.modalRef.content.event.subscribe(resp => {
          //   // console.log(resp);
          // });
        } else {

        }
      });
    }
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
    this.roomService.getRoomsAndBoothsByCategory(getByIdVM).subscribe((res) => {
      if (res.isSuccess) {
        // console.log(res);
        this.sideMenuItems = res.roomsAndBoothsWithRoomTypeListViewModel;
      } else {

      }

    });

  }

  getRepresentativeAssignedRooms() {
    const getByIdVM: any = {};
    getByIdVM.id = this.sessionStorage.get('RepresentativeId');
    this.roomService.getRepresentativeAssignedRooms(getByIdVM).subscribe((res) => {
      if (res.isSuccess) {
        // console.log(res);
      } else {

      }
    });
  }

  getLoggedInEventAttendeesCount() {
    const reqModel: any = {};
    reqModel.id = this.eventId;
    this.attendeeService.getLoggedInEventAttendeesCount(reqModel).subscribe((res) => {
      if (res.isSuccess) {
        this.totalAttendeesCount = res.message;
      } else {
        this.totalAttendeesCount = 0;
      }
    })
  }
  ////#endregion

  //#region  Top Menu Section
  showHideTopMenu() {
    this.isTopMenuOpen = !this.isTopMenuOpen;
  }
  //#endregion


  //#region click to actions
  fillDataForLinkToContent(linkContentData) {
    // console.log(linkContentData);
    this.linkContentData = linkContentData;
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

  }

  openAddToChatQueuePopup(chatToQueueItem) {
    console.log(chatToQueueItem);
    const chatQueue: any = {};
    if (!this.isRepresentative) {
      chatQueue.attendeeId = this.attendeeId;
      chatQueue.eventId = this.eventId;
      chatQueue.roomId = this.roomId;
      this.attendeeService.addAttendeeToChatQueue(chatQueue).subscribe((res) => {
        if (res.isSuccess) {
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
            text: chatToQueueItem.onLineChatQueueDesc,
            icon: 'success'
          })
        }
        else {
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
            text: chatToQueueItem.offlineChatQueueDesc,
            icon: 'error'
          })
        }
      });
    }
    else {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: new SweetAlertMessage(this.translate).representativeCanNotAddinChatQueue,
        icon: 'error'
      })
    }
  }


  openLinkToQuizModal(linkToQuiz) {
    const quizReqModel: any = {};
    quizReqModel.id = linkToQuiz[0].quiz.quizId;
    this.attendeeService.getQuizDetails(quizReqModel).subscribe((res) => {
      if (res.isSuccess) {
        this.quizModel = res.quizQuestionsViewModels;

        const initialState = {
          quiz: this.quizModel,
          eventDetails: this.eventDetails

        };
        this.modalRef = this.modalService.show(QuizPartialComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
        this.modalRef.content.closeBtnName = 'Close';
        this.modalRef.content.event.subscribe(resp => {
          // console.log(resp);
        });
      }
    });
  }

  openLinkToPollModal(linkToPoll) {
    const pollReqModel: any = {};
    pollReqModel.pollId = linkToPoll[0].polls.pollId;
    this.attendeeService.getPollDetails(pollReqModel).subscribe((res) => {
      if (res.isSuccess) {
        this.pollModel = res.pollsList;

        const initialState = {
          polls: this.pollModel,
          eventDetails: this.eventDetails

        };
        this.modalRef = this.modalService.show(PollPartialComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
        this.modalRef.content.closeBtnName = 'Close';
        this.modalRef.content.event.subscribe(resp => {
          // console.log(resp);
        });
      }
    });
  }

  openLinkToSurveyModal(linkToSurvey) {
    const surveyReqModel: any = {};
    surveyReqModel.surveyId = linkToSurvey[0].surveys.surveyId;
    this.attendeeService.getSurveyDetails(surveyReqModel).subscribe((res) => {
      if (res.isSuccess) {
        this.surveyModel = res.createSurveyListViewModels;
        const initialState = {
          surveys: this.surveyModel,
          eventDetails: this.eventDetails

        };
        this.modalRef = this.modalService.show(SurveyPartialComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
        this.modalRef.content.closeBtnName = 'Close';
        this.modalRef.content.event.subscribe(resp => {
          // console.log(resp);
        });
      }
    });
  }

  openLinkToChatScreenPopup() {
    this.dataservice.openChatPopup.emit();
  }

  openLinktoWebinarModal(item, linktoWebinar) {
    const webinarId: any = [];
    linktoWebinar.forEach(element => {
      webinarId.push(element.item_id);
    });
    this.attendeeService.getRoomWebinars(webinarId).subscribe((res) => {
      if (res.isSuccess) {
        this.webinarModel = res.webinarViewModels;
        const initialState = {
          webinarModel: this.webinarModel,
          eventDetails: this.eventDetails

        };
        this.modalRef = this.modalService.show(WebinarPartialComponent, { initialState, class: 'modal-xl', backdrop: 'static', keyboard: false });
        this.modalRef.content.closeBtnName = 'Close';
        this.modalRef.content.event.subscribe(resp => {
          // console.log('webinar response');
          // console.log(resp);
          this.modalRef.content.closeBtnName = 'Close';
          if (resp.res == '200') {
            item.showWebinar = true;
            item.webinarUrl = resp.data;
          }
        });
      }
    });
  }

  openLinkToOneToOneChatPopup() {
    this.dataservice.linkToOneToOneChatPopup.emit();
    this.CommonService.logAttendeeClicks(null, 'One-on-one conversation', this.attendeeId, this.eventDetails.eventId, this.isRepresentative, this.representativeId, this.attendeeId, this.roomId);
  }
  //#endregion

  //#region  Common Logging events
  logAttendeeClicks(event, type, clickedItem) {
    // const reqModel: any = {};
    // reqModel.eventId = this.eventId;
    // if (this.isRepresentative === 'true') {
    //   reqModel.attendeeId = AppUtils.emptyGuid;
    //   reqModel.isAttendee = false;
    //   reqModel.representativeId = this.representativeId;
    // } else {
    //   reqModel.attendeeId = this.attendeeId;
    //   reqModel.isAttendee = true;
    //   reqModel.representativeId = AppUtils.emptyGuid;
    // }
    // reqModel.details = JSON.stringify(clickedItem);
    // if (type === 'banner') {
    //   reqModel.leaderboardActivityId = 'A505CB37-4115-43EA-9C4E-5C8ED97DE233';
    // } else if (type === 'image') {
    //   reqModel.leaderboardActivityId = 'B9C8C1FF-441D-4173-A9CB-68F1077C62EA';
    // } else if (type === 'marquee') {
    //   reqModel.leaderboardActivityId = 'BB4B4308-2EF6-4A77-8616-CB77DB67DC7A';
    // } else if (type === 'video') {
    //   reqModel.leaderboardActivityId = '70F455FD-B202-43AF-B177-C512C9246A0F';
    // } else if (type === 'DocumentsandResources') {
    //   reqModel.leaderboardActivityId = '37EC6CCF-3F4E-45DC-AAB9-783A32FFB322';
    // } else if (type === 'Weblinks') {
    //   reqModel.leaderboardActivityId = 'C2D3D990-A19B-4591-B9D8-183154859E24';
    // } else if (type === 'AnnounceMesssage') {
    //   reqModel.leaderboardActivityId = '70F455FD-B202-43AF-B177-C512C9246A0F';
    // }


    // reqModel.roomId = this.roomId;
    // // console.log(reqModel);
    // console.log("reqModel");

    // console.log(reqModel);
    // this.attendeeLoggingService.logAttendeesClickEvents(reqModel).subscribe((res) => {

    // });
    this.CommonService.logAttendeeClicks(event, type, clickedItem, this.eventId, this.isRepresentative, this.isRepresentative === 'true' ? this.representativeId : AppUtils.emptyGuid, this.attendeeId, this.roomId);
    this.CommonService.logAttendeeClicks(event, 'Downloading or viewing the contents', clickedItem, this.eventId, this.isRepresentative, this.isRepresentative === 'true' ? this.representativeId : AppUtils.emptyGuid, this.attendeeId, this.roomId);
  
  }

  openDocument(documentUrl, title, type) {
    var evnt: any;
    this.CommonService.logAttendeeClicks(evnt, 'DocumentsandResources', title + '^^^^' + documentUrl + '^^^^' + type, this.eventId, this.isRepresentative, this.isRepresentative === 'true' ? this.representativeId : AppUtils.emptyGuid, this.attendeeId, this.roomId);
    this.CommonService.logAttendeeClicks(evnt, 'Downloading or viewing the contents', title + '^^^^' + documentUrl + '^^^^' + type, this.eventId, this.isRepresentative, this.isRepresentative === 'true' ? this.representativeId : AppUtils.emptyGuid, this.attendeeId, this.roomId);
   
    if (this.helper.validateDocFile(documentUrl)) {
      const initialState = {
        documentUrl: documentUrl,
        title: title,
        eventDetails: this.eventDetails

      };
      this.modalRef = this.modalService.show(IframePartialComponent, { initialState, class: 'modal-xl', backdrop: 'static', keyboard: false });
      this.modalRef.content.closeBtnName = 'Close';
    } else {
      window.open(documentUrl);
    }
  }



  openImage(documentUrl, title, type) {
    var evnt: any;
    this.CommonService.logAttendeeClicks(evnt, 'DocumentsandResources', title + '^^^^' + documentUrl + '^^^^' + type, this.eventId, this.isRepresentative, this.isRepresentative === 'true' ? this.representativeId : AppUtils.emptyGuid, this.attendeeId, this.roomId);
    this.CommonService.logAttendeeClicks(evnt, 'Downloading or viewing the contents', title + '^^^^' + documentUrl + '^^^^' + type, this.eventId, this.isRepresentative, this.isRepresentative === 'true' ? this.representativeId : AppUtils.emptyGuid, this.attendeeId, this.roomId);
   
    if (this.helper.validateImageFile(documentUrl)) {
      const initialState = {
        documentUrl: documentUrl,
        title: title,
        eventDetails: this.eventDetails

      };
      this.modalRef = this.modalService.show(IImageframePartialComponent, { initialState, class: 'modal-xl', backdrop: 'static', keyboard: false });
      this.modalRef.content.closeBtnName = 'Close';
    } else {
      window.open(documentUrl);
    }
  }



  logoutUser() {
    const logoutUserModel: any = {};
    logoutUserModel.isRepresentative = this.isRepresentative;
    logoutUserModel.representativeId = this.representativeId;
    logoutUserModel.attendeeId = this.attendeeId;
    logoutUserModel.isEventAdmin = this.isEventAdmin;
    logoutUserModel.eventAdminId = this.eventAdminId;
    if (this.representativeId === '' && this.attendeeId === '') {
      location.href = AppUtils.EventUrl
    } else {
      if (this.attendeeId !== '') {
        logoutUserModel.isRepresentative = false;
      }
      this.attendeeService.logoutUser(logoutUserModel).subscribe((res) => {
        if (res.isSuccess) {
          const redirectUrl = this.sessionStorage.get('MainPageUrl');
          this.sessionStorage.removeAllKeys();
          this.localStorage.remove('SessionId');
          this.signalRService.sendData();
          location.href = AppUtils.EventUrl + redirectUrl;

        }
      })
    }
  }

  openIframeForWebsite(name, link, type) {
    this.iframeWebsitePopup = link;
    this.iframeModalName = name;
    var event: any;
    this.CommonService.logAttendeeClicks(event, 'Weblinks', name + '^^^^' + link + '^^^^' + type, this.eventId, this.isRepresentative, this.isRepresentative === 'true' ? this.representativeId : AppUtils.emptyGuid, this.attendeeId, this.roomId);
  }

  assignChatRoom() {
    if (this.isEventAdmin || this.isRepresentative) {
      this.videoChatUrl = this.whereByChatMeeting.hostRoomUrl;
    } else {
      this.videoChatUrl = this.whereByChatMeeting.roomUrl;
    }
  }
  closeVideoChat() {
    this.videoChatUrl = '';
  }

  openIframeForVideo(name, link, type) {
    this.iframeVideoPopup = link;
    this.iframeVideoModalName = name;
    var evnt: any;
    this.CommonService.logAttendeeClicks(evnt, 'DocumentsandResources', name + '^^^^' + link + '^^^^' + type, this.eventId, this.isRepresentative, this.isRepresentative === 'true' ? this.representativeId : AppUtils.emptyGuid, this.attendeeId, this.roomId);
    if (this.roomDesignDetails.selectedRoomType.roomTypeId.toUpperCase() == '628DC63A-AF75-4005-B980-3C77731DF674') {
      this.CommonService.logAttendeeClicks(evnt, 'Watching Auditorium Videos', name + '^^^^' + link + '^^^^' + type, this.eventId, this.isRepresentative, this.isRepresentative === 'true' ? this.representativeId : AppUtils.emptyGuid, this.attendeeId, this.roomId);
    }
    if (this.roomDesignDetails.selectedRoomType.roomTypeId.toUpperCase() == '6426FB62-E428-43FE-BB58-3F1252FBA304') {
      this.CommonService.logAttendeeClicks(evnt, 'Watching the videos in the booths', name + '^^^^' + link + '^^^^' + type, this.eventId, this.isRepresentative, this.isRepresentative === 'true' ? this.representativeId : AppUtils.emptyGuid, this.attendeeId, this.roomId);
    }
  }

  closeIframeForVideo(name, link) {
    this.iframeVideoPopup = '';
    this.iframeVideoModalName = '';
  }
  openWelcomeVideo(videoUrl) {
    console.log(videoUrl);
    this.dataservice.openWelcomeVideo.emit(videoUrl);
  }
}
