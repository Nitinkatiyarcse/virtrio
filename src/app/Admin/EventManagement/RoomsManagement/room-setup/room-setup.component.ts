import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
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
import { element, utils } from 'protractor';
import { runInThisContext } from 'vm';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EventEntitlementService } from 'src/app/Services/event-entitlement.service';
import { LanguageService } from 'src/app/Services/language.service';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import * as AppUtils from 'src/app/Utils/apputils';
import { QuizService } from 'src/app/Services/quiz.service';
import { PollsService } from 'src/app/Services/polls.service';
import { SurveysService } from 'src/app/Services/surveys.service';
import { AllWebinarPartialComponent } from 'src/app/Admin/_layout/Shared/all-webinar-partial/all-webinar-partial.component';
import { SignalRService } from 'src/app/Services/signal-r.service';
@Component({
  selector: 'app-room-setup',
  templateUrl: './room-setup.component.html',
  styleUrls: ['./room-setup.component.css'],
  animations: [
    trigger('openImageSidebar', [
      state('closed', style({
        width: 0,
      })),
      state('open', style({
        width: 400
      })),
      transition('* => open', animate(150))
    ]),
    // trigger('openVideoSidebar', [
    //   state('closed', style({
    //     width: 0
    //   })),
    //   state('open', style({
    //     width: 400
    //   })),
    //   transition('* => *', animate(150))
    // ]),
  ]
})
export class RoomSetupComponent implements OnInit {
  // all page
  // start
  roomDesignModel: any;
  boothColor: any;
  public dragging: boolean;
  eventId: string;
  roomId: string;
  modalRef: BsModalRef;
  inputRoomSetupModel: any = {};
  entitlementDropdownList = [];
  textEntitlementDropdownList = [];
  dropdownSettings: IDropdownSettings = {};
  EntitlementDropdownSettings: IDropdownSettings = {};
  selectedEntitlementsArr: Array<string> = [];
  entitlementRequiredField = false;
  requiredField = true;
  languageDropdownList = [];
  selectedLanguagesArr: Array<string> = [];
  selectedLanguages = [];

  @ViewChild('div')
  div: ElementRef;
  // end

  // Image section
  // Start
  boothImageArr = [];

  // End

  // Video Section
  // Start
  videosArr = [];
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

  // HTMl Section
  // Start
  htmlArr = [];
  // End

  // webinar section
  // start
  webinarDropdownList: any[] = [];
  selectedWebinarsArr: Array<string> = [];
  // end
  // global data variables
  getByIdViewModel: any = {};
  roomDesignDetails: any = {};
  roomTemplates: any;
  quizModel: any = [];
  surveyModel: any = [];
  pollMedel: any = [];
  locationModel: any = [];



  state = '';
  size: any = null;
  position: any = null;
  config: any;


  constructor(private fb: FormBuilder,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private helper: Helper,
    private route: ActivatedRoute,
    private roomService: RoomsService,
    private eventEntitlementService: EventEntitlementService,
    private quizService: QuizService,
    private pollService: PollsService,
    private surveyService: SurveysService,
    private langugeService: LanguageService,
    private modalService: BsModalService,
    private localStorage: LocalStorageService, private signalRService: SignalRService) {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.boothImageArr = [];
    this.videosArr = [];
    this.textArr = [];
    this.infoCardArr = [];
    this.marqueeArr = [];
    this.standeekArr = [];
    this.shapeArr = [];
    this.guestArr = [];
    this.faceBookLinkArr = [];
    this.twitterLinkArr = [];
    this.instagramLinkArr = [];
    this.linkedInLinkArr = [];
  }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.config = {
      allowedContent: true,
      colorButton: true,
      extraPlugins: ['font', 'colorbutton', 'colordialog']
    };


    this.EntitlementDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.bindGroupEntitlements();
    this.getAvailableLanguages();
    this.getRoomDesignDetails();

  }

  //#region  Images Start

  addImage() {
    this.boothImageArr.push({
      zIndex: 5,
      selectedAction: '',
      state: 'closed',
      dragPosition: { x: 0, y: 0 },
      parentDragPosition: { x: 0, y: 0 },
      parentHeight: this.div.nativeElement.offsetHeight,
      parentWidth: this.div.nativeElement.offsetWidth,
      bannerImageSrc: '/assets/Images/image.png',
      bannerImageHeight: '100',
      bannerImageWidth: '100',
      shortDescription: '',
      imageType: 'single',
      isSlider: false,
      imageUrl: [
        {
          selectedAction: '',
          path: '../../../assets/Images/NoImage.png',
          clickAction: [{
            addToChatQueue: {
              name: '',
              chatQueueTitle: '',
              onLineChatQueueDesc: '',
              offlineChatQueueDesc: ''
            },
            linkWebsite: [{ name: '', location: '' }],
            briefcase: [{}],
            linkContent: [{ name: '', filePath: '' }],
            linkToQuiz: [],
            linkToSurvey: [],
            linkToPoll: [],
            linkToInfocard: [],
            linkToChatScreen: [],
            linkLocation: [{ name: '', location: '' }],
            linkToLeaderboard: [{ name: '', value: '' }],
            linkToCalendar: [],
            linkToWall: [],
            linktoSocialMedia: [],
            linktoWebinar: [],
            linkToOnebyOneMeeting: [],
            // linkToUploadSection: [],
            selectedEntitlementArray: [],
            selectedLanguagesArr: []
          }]
        }
      ],
      transitionTime: 1000,
      entitlement: [],
      clickAction: [{
        addToChatQueue: {
          name: '',
          chatQueueTitle: '',
          onLineChatQueueDesc: '',
          offlineChatQueueDesc: ''
        },
        linkWebsite: [{ name: '', location: '' }],
        briefcase: [{}],
        linkContent: [{ name: '', filePath: '' }],
        linkToQuiz: [],
        linkToSurvey: [],
        linkToPoll: [],
        linkToInfocard: [],
        linkToChatScreen: [],
        linkLocation: [{ name: '', location: '' }],
        linkToLeaderboard: [{ name: '', value: '' }],
        linkToCalendar: [],
        linkToWall: [],
        linktoSocialMedia: [],
        linktoWebinar: [],
        linkToOnebyOneMeeting: [],
        // linkToUploadSection: [],
        selectedEntitlementArray: [],
        selectedLanguagesArr: []
      }]
    });
  }

  selectImageType(item, index, value) {
    if (value === 'slider') {
      item.isSlider = true;
    } else {
      item.isSlider = false;
    }
    // this.boothImageArr[index].patchValue({ isSlider: item.isSlider });
  }

  removeImageElement(i: number) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.value) {
        if (this.boothImageArr[i].state === 'open') {
          this.boothImageArr[i].state = 'closed';
          document.getElementById('content').style.marginRight = '0px';
          document.getElementById('content').style.marginLeft = '215px';
          document.getElementById('content').style.overflow = 'none';
        }
        this.boothImageArr.splice(i, 1);
      }
    });
  }

  showImageDetails(item, index) {
    this.closeAllSidebars();

    document.getElementById('content').style.marginRight = '-400px';
    document.getElementById('content').style.marginLeft = '-0px';
    document.getElementById('content').style.overflow = 'scroll';
    (this.boothImageArr[index].state === 'closed') ?
      this.boothImageArr[index].state = 'open' : this.boothImageArr[index].state = 'closed';
  }

  public handleDragStart(event: CdkDragStart): void {
    this.dragging = true;
  }

  onFileChange(event, index) {
    this.spinner.show();
    if (event.target.files.length > 0) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        if (this.helper.validateImageFile(file.name)) {
          formData.append('uploadFile', file, file.name);
          this.roomService.UploadBoothBannerImage(formData).subscribe((res) => {
            if (res.isSuccess) {
              this.boothImageArr[index].bannerImageSrc = res.message;
            }
            this.spinner.hide();
          });
        } else {
          this.spinner.hide();
          Swal.fire({
            title: new SweetAlertMessage(this.translate).invalidFileType,
            text: new SweetAlertMessage(this.translate).onlypngjpgandjpegareallowed,
            icon: 'error'
          });
        }
      }

    } else {
      this.spinner.hide();
    }
  }

  onSlideUploadControlFileChange(event, index, imgIndex) {
    console.log(index);
    this.spinner.show();
    if (event.target.files.length > 0) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        this.roomService.UploadBoothBannerImage(formData).subscribe((res) => {
          if (res.isSuccess) {
            this.boothImageArr[index].imageUrl[imgIndex].path = res.message;

          }
          // this.isProfileImageExists = true;
          this.spinner.hide();
        });
      }

    } else {
      this.spinner.hide();
    }
  }

  setCarouselWidth(index) {
    if (this.boothImageArr[index].isSlider) {
      $('#imgSlider_' + index).css('width', this.boothImageArr[index].bannerImageWidth);
    }

  }

  dragEnd($event: CdkDragEnd, index) {
    console.log($event.source.getFreeDragPosition());
    this.boothImageArr[index].dragPosition = $event.source.getFreeDragPosition();
    this.boothImageArr[index].parentDragPosition = $event.source.getFreeDragPosition();
    // this.boothImageArr[index].parentDragPosition.y = this.boothImageArr[index].parentDragPosition.y + 32;
    this.boothImageArr[index].parentDragPosition.y = this.boothImageArr[index].parentDragPosition.y;


  }

  onImgEntitlementSelect(item: any, index) {
    this.boothImageArr[index].selectedEntitlementArray.push(item);
  }

  onImgEntitlementDeSelect(item: any, indx) {
    const index = this.boothImageArr[indx].selectedEntitlementArray.indexOf(item.item_id, 0);
    this.boothImageArr[indx].selectedEntitlementArray.splice(index, 1);
    if (this.boothImageArr[indx].selectedEntitlementArray.length === 0) {
      this.requiredField = true;
    }
  }

  onImgEntitlementSelectAll(items: any, indx) {
    for (let i = 0; i < items.length; i++) {
      if (this.boothImageArr[indx].selectedEntitlementArray.indexOf(items[i].item_id) === -1) {
        this.boothImageArr[indx].selectedEntitlementArray.push(items[i]);
      }
    }
  }

  onImgEntitlementDeSelectAll(items: any, indx) {
    this.boothImageArr[indx].selectedEntitlementArray = [];
    if (this.boothImageArr[indx].selectedEntitlementArray.length === 0) {
      // this.requiredField = true;
    }
  }


  onImgLanguagesSelect(item: any, index) {
    this.boothImageArr[index].selectedLanguagesArr.push(item);
  }

  onImgLanguagesSelectAll(item: any, indx) {
    for (let i = 0; i < item.length; i++) {
      if (this.boothImageArr[indx].selectedLanguagesArr.indexOf(item[i].item_id) === -1) {
        this.boothImageArr[indx].selectedLanguagesArr.push(item[i]);
      }
    }
  }

  onImgLanguagesDeSelect(item: any, indx) {
    const index = this.boothImageArr[indx].selectedLanguagesArr.indexOf(item.item_id, 0);
    this.boothImageArr[indx].selectedLanguagesArr.splice(index, 1);
    if (this.boothImageArr[indx].selectedLanguagesArr.length === 0) {
      this.requiredField = true;
    }
  }

  onImgLanguagesDeSelectAll(item: any, indx) {
    this.boothImageArr[indx].selectedLanguagesArr = [];
    if (this.boothImageArr[indx].selectedLanguagesArr.length === 0) {
      this.requiredField = true;
    }
  }

  hideMe(index) {
    if (this.boothImageArr[index].state === 'open') {
      this.boothImageArr[index].state = 'closed';
      //   document.getElementById('content').style.marginLeft='215px';

      document.getElementById('content').style.marginRight = '0px';
      document.getElementById('content').style.marginLeft = '215px';
      document.getElementById('content').style.overflow = 'none';

    }
  }



  onResizeStart(evnt, imgItem) {
    this.state = 'Resize Started';
    this.size = evnt.size;
    this.position = evnt.position;
    imgItem.bannerImageHeight = this.size.height;
    imgItem.bannerImageWidth = this.size.width;
  }

  onResizing(evnt, imgItem) {
    this.state = 'Resizing';
    this.size = evnt.size;
    this.position = evnt.position;
    console.log(this.position);
    imgItem.bannerImageHeight = this.size.height;
    imgItem.bannerImageWidth = this.size.width;

  }

  onResizeStop(evnt, imgItem) {
    this.state = 'Resize Stopped';
    this.size = evnt.size;
    this.position = evnt.position;
    imgItem.bannerImageHeight = this.size.height;
    imgItem.bannerImageWidth = this.size.width;
  }

  deleteImage(index, imgIndex) {
    //console.log(this.boothImageArr[index].imageUrl[imgIndex])
    this.boothImageArr[index].imageUrl.splice(imgIndex, 1);

  }

  addArrayImage(index) {
    this.boothImageArr[index].imageUrl.push({
      path: '../../../assets/Images/NoImage.png',
      clickAction: [{
        addToChatQueue: {
          name: '',
          chatQueueTitle: '',
          onLineChatQueueDesc: '',
          offlineChatQueueDesc: ''
        },
        linkWebsite: [{ name: '', location: '' }],
        briefcase: [{}],
        linkContent: [{ name: '', filePath: '' }],
        linkToQuiz: [],
        linkToSurvey: [],
        linkToPoll: [],
        linkToInfocard: [],
        linkToChatScreen: [],
        linkLocation: [{ name: '', location: '' }],
        linkToLeaderboard: [{ name: '', value: '' }],
        linkToCalendar: [],
        linkToWall: [],
        linktoSocialMedia: [],
        linktoWebinar: [],
        linkToOnebyOneMeeting: [],
        // linkToUploadSection: [],
        selectedEntitlementArray: [],
        selectedLanguagesArr: []
      }]
    });
  }
  //#endregion

  //#region  Videos

  addVideo() {
    this.videosArr.push({
      zIndex: 5,
      state: 'closed',
      dragPosition: { x: 0, y: 0 },
      parentDragPosition: { x: 0, y: 0 },
      parentHeight: this.div.nativeElement.offsetHeight,
      parentWidth: this.div.nativeElement.offsetWidth,
      videoBanner: '/assets/Images/video-player.png',
      videoTitle: '',
      videoDescription: '',
      playOnEntry: false,
      videoHeight: '100',
      videoWidth: '100',
      isVideoPlaylist: false,
      playList: [{
        type: '',
        src: '',
        Title: ''
      }],

    });
  }

  showVideoDetails(item, index) {
    this.closeAllSidebars();
    document.getElementById('content').style.marginRight = '-400px';
    document.getElementById('content').style.marginLeft = '-0px';
    document.getElementById('content').style.overflow = 'scroll';
    (this.videosArr[index].state === 'closed') ?
      this.videosArr[index].state = 'open' : this.videosArr[index].state = 'closed';

  }


  vidDragEnd($event: CdkDragEnd, index) {
    console.log($event.source.getFreeDragPosition());
    this.videosArr[index].dragPosition = $event.source.getFreeDragPosition();
    this.videosArr[index].parentDragPosition = $event.source.getFreeDragPosition();
    this.videosArr[index].parentDragPosition.y = this.videosArr[index].parentDragPosition.y;

  }


  selectVideoType(item, index, vtype) {
    this.videosArr[index].playList = [{
      type: '',
      src: '',
      Title: ''

    }];
    if (vtype === 'playlist') {
      this.videosArr[index].isVideoPlaylist = true;
    } else {

      this.videosArr[index].isVideoPlaylist = false;
    }
  }

  SelectedVideoTypes(event, index, videoIndex) {
    // this.videosArr[index].playList[videoIndex].type = event.target.value;
    // if (event.target.value === 'webinar') {

    // }
    this.videosArr[index].playList[videoIndex].src = "";
  }

  onVideoFileChange(event, index, videoIndex) {
    this.spinner.show();
    if (event.target.files.length > 0) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        if (this.helper.validateMovieFile(file.name)) {
          if (this.helper.validateVideoSize(file)) {
            formData.append('uploadFile', file, file.name);
            this.roomService.UploadBoothBannerImage(formData).subscribe((res) => {
              if (res.isSuccess) {
                this.videosArr[index].playList[videoIndex].src = res.message;
              }
              this.spinner.hide();
            });
          } else {
            this.spinner.hide();
            Swal.fire({
              title: new SweetAlertMessage(this.translate).invalidFileType,
              text: 'video size must not be more than 1 gb',
              icon: 'error'
            });
          }
        } else {
          this.spinner.hide();
          Swal.fire({
            title: new SweetAlertMessage(this.translate).invalidFileType,
            text: new SweetAlertMessage(this.translate).onlypngjpgandjpegareallowed,
            icon: 'error'
          });
        }
      }

    } else {
      this.spinner.hide();
    }
  }

  addVideoItem(index, videoIndex) {
    this.videosArr[index].playList.push({ type: '', src: '', Title: '' });
  }

  removeVideoElement(i: number) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.value) {
        if (this.videosArr[i].state === 'open') {
          this.videosArr[i].state = 'closed';
          document.getElementById('content').style.marginRight = '0px';
          document.getElementById('content').style.marginLeft = '215px';
          document.getElementById('content').style.overflow = 'none';
        }
        this.videosArr.splice(i, 1);
      }
    });
  }

  hideVidSidenav(index) {
    if (this.videosArr[index].state === 'open') {
      this.videosArr[index].state = 'closed';
      document.getElementById('content').style.marginRight = '0px';
      document.getElementById('content').style.marginLeft = '215px';
      document.getElementById('content').style.overflow = 'none';
    }
  }

  deleteUploadedVideo(item) {
    item.src = '';
  }


  onVidItemResizeStart(evnt, vdoItem) {
    this.state = 'Resize Started';
    this.size = evnt.size;
    this.position = evnt.position;
    vdoItem.videoHeight = this.size.height;
    vdoItem.videoWidth = this.size.width;
  }

  onVidItemResizing(evnt, vdoItem) {
    this.state = 'Resizing';
    this.size = evnt.size;
    this.position = evnt.position;
    console.log(this.position);
    vdoItem.videoHeight = this.size.height;
    vdoItem.videoWidth = this.size.width;

  }

  onVidItemResizeStop(evnt, vdoItem) {
    this.state = 'Resize Stopped';
    this.size = evnt.size;
    this.position = evnt.position;
    vdoItem.videoHeight = this.size.height;
    vdoItem.videoWidth = this.size.width;
  }


  //#endregion

  //#region  Text

  addText() {
    this.textArr.push({
      zIndex: 5,
      selectedAction: '',
      state: 'closed',
      dragPosition: { x: 0, y: 0 },
      parentDragPosition: { x: 0, y: 0 },
      parentHeight: this.div.nativeElement.offsetHeight,
      parentWidth: this.div.nativeElement.offsetWidth,
      text: 'testing text',
      description: '',
      font: '',
      isStyleAllowed: false,
      color: '#000000',
      fontSize: '12px',
      lineHeight: '12px',
      paragraph: 0,
      fontWeight: '',
      fontStyle: '',
      textDecoration: '',
      textTransform: 'capitalize',
      alignment: 'left',
      selectedEntitlementsArr: [],
      selectedLanguagesArr: [],
      clickAction: [{
        addToChatQueue: {
          name: '',
          chatQueueTitle: '',
          onLineChatQueueDesc: '',
          offlineChatQueueDesc: ''
        },
        linkWebsite: [{ name: '', location: '' }],
        briefcase: [{}],
        linkContent: [{ name: '', filePath: '' }],
        linkToQuiz: [],
        linkToSurvey: [],
        linkToPoll: [],
        linkToInfocard: [],
        linkToChatScreen: [],
        linkLocation: [{ name: '', location: '' }],
        linkToLeaderboard: [{ name: '', value: '' }],
        linkToCalendar: [],
        linkToWall: [],
        linktoSocialMedia: [],
        linktoWebinar: [],
        linkToOnebyOneMeeting: [],
        selectedTextLanguagesArr: []
        // linkToUploadSection: []
      }]

    });
  }

  textItemDragEnd($event: CdkDragEnd, index) {
    console.log($event.source.getFreeDragPosition());
    this.textArr[index].dragPosition = $event.source.getFreeDragPosition();
    this.textArr[index].parentDragPosition = $event.source.getFreeDragPosition();
    this.textArr[index].parentDragPosition.y = this.textArr[index].parentDragPosition.y;

  }

  showTextDetails(item, index) {
    this.closeAllSidebars();
    document.getElementById('content').style.marginRight = '-400px';
    document.getElementById('content').style.marginLeft = '-0px';
    document.getElementById('content').style.overflow = 'scroll';
    (this.textArr[index].state === 'closed') ?
      this.textArr[index].state = 'open' : this.textArr[index].state = 'closed';

  }

  selectAlignment(type, index) {

    this.textArr[index].alignment = type;
  }

  changeFontStyle(type, index) {

    if (type === 'bold') {
      if (this.textArr[index].fontWeight === type) {
        this.textArr[index].fontWeight = '';
      } else {
        this.textArr[index].fontWeight = type;
      }
    } else if (type === 'italic') {
      if (this.textArr[index].fontStyle === type) {
        this.textArr[index].fontStyle = '';
      } else {
        this.textArr[index].fontStyle = type;
      }
    } else if (type === 'underline') {
      if (this.textArr[index].textDecoration === type) {
        this.textArr[index].textDecoration = '';
      } else {
        this.textArr[index].textDecoration = type;
      }
    }
  }

  changemarqueeFontStyle(type, index) {

    if (type === 'bold') {
      if (this.marqueeArr[index].fontWeight === type) {
        this.marqueeArr[index].fontWeight = '';
      } else {
        this.marqueeArr[index].fontWeight = type;
      }
    } else if (type === 'italic') {
      if (this.marqueeArr[index].fontStyle === type) {
        this.marqueeArr[index].fontStyle = '';
      } else {
        this.marqueeArr[index].fontStyle = type;
      }
    } else if (type === 'underline') {
      if (this.marqueeArr[index].textDecoration === type) {
        this.marqueeArr[index].textDecoration = '';
      } else {
        this.marqueeArr[index].textDecoration = type;
      }
    }
  }

  allowTextColor(item, index) {
    this.textArr[index].isStyleAllowed = !this.textArr[index].isStyleAllowed;
    if (this.textArr[index].isStyleAllowed === false) {
      this.textArr[index].color = '#000000';
    }
  }

  removeTextElement(i: number) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.value) {
        if (this.textArr[i].state === 'open') {
          this.textArr[i].state = 'closed';
          document.getElementById('content').style.marginRight = '0px';
          document.getElementById('content').style.marginLeft = '215px';
          document.getElementById('content').style.overflow = 'none';
        }
        this.textArr.splice(i, 1);
      }
    });
  }

  textStyle(index): object {
    const returnData = {};
    returnData['font-family'] = this.textArr[index].font;
    returnData['color'] = this.textArr[index].color;
    returnData['font-size'] = this.textArr[index].fontSize;
    returnData['line-height'] = this.textArr[index].lineHeight;
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
    returnData['font-size'] = this.marqueeArr[index].fontSize;
    returnData['line-height'] = this.marqueeArr[index].lineHeight;
    returnData['text-align'] = this.marqueeArr[index].alignment;
    returnData['text-transform'] = this.marqueeArr[index].textTransform;
    returnData['font-family'] = this.marqueeArr[index].font;
    returnData['font-weight'] = this.marqueeArr[index].fontWeight;
    returnData['font-style'] = this.marqueeArr[index].fontStyle;
    returnData['text-decoration'] = this.marqueeArr[index].textDecoration;
    return returnData;
  }


  ontextItemEntitlementSelect(item, index) {
    this.textArr[index].selectedEntitlementsArr.push(item.item_id);
  }

  ontextItemEntitlementDeSelect(item, indx) {
    const index = this.textArr[indx].selectedEntitlementsArr.indexOf(item.item_id, 0);
    this.textArr[indx].selectedEntitlementsArr.splice(index, 1);
    if (this.textArr[indx].selectedEntitlementsArr.length === 0) {

    }
  }

  ontextItemEntitlementSelectAll(item: any, indx) {
    for (let i = 0; i < item.length; i++) {
      if (this.textArr[indx].selectedEntitlementsArr.indexOf(item[i].item_id) === -1) {
        this.textArr[indx].selectedEntitlementsArr.push(item[i].item_id);
      }
    }
  }

  ontextItemEntitlementDeSelectAll(item: any, indx) {
    this.textArr[indx].selectedEntitlementsArr = [];
    if (this.textArr[indx].selectedEntitlementsArr.length === 0) {

    }
  }


  onTextLanguageSelect(item: any, index) {
    this.textArr[index].selectedLanguagesArr.push(item.item_id);
  }

  onTextLanguageSelectAll(item: any, indx) {
    for (let i = 0; i < item.length; i++) {
      if (this.textArr[indx].selectedLanguagesArr.indexOf(item[i].item_id) === -1) {
        this.textArr[indx].selectedLanguagesArr.push(item[i].item_id);
      }
    }
  }

  onTextLanguageDeSelect(item: any, indx) {
    const index = this.textArr[indx].selectedLanguagesArr.indexOf(item.item_id, 0);
    this.textArr[indx].selectedLanguagesArr.splice(index, 1);
    if (this.textArr[indx].selectedLanguagesArr.length === 0) {
      this.requiredField = true;
    }
  }

  onTextLanguageDeSelectAll(item: any, indx) {
    this.textArr[indx].selectedLanguagesArr = [];
    if (this.textArr[indx].selectedLanguagesArr.length === 0) {
      this.requiredField = true;
    }
  }

  hideTextItemSidenav(index) {
    if (this.textArr[index].state === 'open') {
      this.textArr[index].state = 'closed';
      document.getElementById('content').style.marginRight = '0px';
      document.getElementById('content').style.marginLeft = '215px';
      document.getElementById('content').style.overflow = 'none';

    }

  }
  //#endregion


  //#region  Audios

  addaudio() {
    this.audiosArr.push({
      zIndex: 5,
      state: 'closed',
      dragPosition: { x: 0, y: 0 },
      parentDragPosition: { x: 0, y: 0 },
      parentHeight: this.div.nativeElement.offsetHeight,
      parentWidth: this.div.nativeElement.offsetWidth,
      audioBanner: '/assets/Images/music.png',
      audioTitle: '',
      audioDescription: '',
      playOnEntry: false,
      playList: [{
        type: '',
        src: ''
      }],

    });
  }

  showAudioDetails(item, index) {
    this.closeAllSidebars();
    document.getElementById('content').style.marginRight = '-400px';
    document.getElementById('content').style.marginLeft = '-0px';
    document.getElementById('content').style.overflow = 'scroll';
    (this.audiosArr[index].state === 'closed') ?
      this.audiosArr[index].state = 'open' : this.audiosArr[index].state = 'closed';

  }


  audioDragEnd($event: CdkDragEnd, index) {
    console.log($event.source.getFreeDragPosition());
    this.audiosArr[index].dragPosition = $event.source.getFreeDragPosition();
    this.audiosArr[index].parentDragPosition = $event.source.getFreeDragPosition();
    this.audiosArr[index].parentDragPosition.y = this.audiosArr[index].parentDragPosition.y;


  }


  selectaudioType(item, index, type) {
    this.audiosArr[index].playList = [{
      type: '',
      src: ''
    }];
    if (type === 'playlist') {
      this.audiosArr[index].isaudioPlaylist = true;
    } else {

      this.audiosArr[index].isaudioPlaylist = false;
    }
  }

  SelectedaudioTypes(event, index, audioIndex) {
    this.audiosArr[index].playList[audioIndex].type = event.target.value;
  }

  onAudioFileChange(event, index, audioIndex) {
    this.spinner.show();
    if (event.target.files.length > 0) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        if (this.helper.validateAudioFile(file.name)) {
          if (this.helper.validateaudioSize(file)) {
            formData.append('uploadFile', file, file.name);
            this.roomService.UploadBoothBannerImage(formData).subscribe((res) => {
              if (res.isSuccess) {
                this.audiosArr[index].playList[audioIndex].src = res.message;
              }
              this.spinner.hide();
            });
          } else {
            this.spinner.hide();
            Swal.fire({
              title: new SweetAlertMessage(this.translate).invalidFileType,
              text: new SweetAlertMessage(this.translate).audioSizeMustNotBeMoreThan10Mb,
              icon: 'error'
            });
          }
        } else {
          this.spinner.hide();
          Swal.fire({
            title: new SweetAlertMessage(this.translate).invalidFileType,
            text: new SweetAlertMessage(this.translate).onlyMP3FilesAreAllowed,
            icon: 'error'
          });
        }
      }
    } else {
      this.spinner.hide();
    }
  }

  addaudioItem(index, audioIndex) {
    this.audiosArr[index].playList.push({ type: '', src: '' });
  }

  removeaudioElement(i: number) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.value) {
        if (this.audiosArr[i].state === 'open') {
          this.audiosArr[i].state = 'closed';
          document.getElementById('content').style.marginRight = '0px';
          document.getElementById('content').style.marginLeft = '215px';
          document.getElementById('content').style.overflow = 'none';
        }
        this.audiosArr.splice(i, 1);
      }
    });
  }

  hideAudioSidenav(index) {
    if (this.audiosArr[index].state === 'open') { this.audiosArr[index].state = 'closed'; }
    document.getElementById('content').style.marginRight = '0px';
    document.getElementById('content').style.marginLeft = '215px';
    document.getElementById('content').style.overflow = 'none';
  }
  //#endregion

  //#region Info Card
  // Start

  addInfoCard() {
    this.infoCardArr.push({
      zIndex: 5,
      state: 'closed',
      dragPosition: { x: 0, y: 0 },
      parentDragPosition: { x: 0, y: 0 },
      parentHeight: this.div.nativeElement.offsetHeight,
      parentWidth: this.div.nativeElement.offsetWidth,
      infoImageSrc: '/assets/Images/info.png',
      infoCardImageHeight: '32',
      infoCardImageWidth: '32',
      infoCardTitle: '',
      infoCardDescWhenRoomRepsAreAsigned: '',
      infoCardDescWhenNoRoomRepsAreAsigned: ''
    });
  }

  showInfoCardDetails(item, index) {
    this.closeAllSidebars();
    document.getElementById('content').style.marginRight = '-400px';
    document.getElementById('content').style.marginLeft = '-0px';
    document.getElementById('content').style.overflow = 'scroll';
    (this.infoCardArr[index].state === 'closed') ?
      this.infoCardArr[index].state = 'open' : this.infoCardArr[index].state = 'closed';

  }

  infoCardDragEnd($event: CdkDragEnd, index) {
    console.log($event.source.getFreeDragPosition());
    this.infoCardArr[index].dragPosition = $event.source.getFreeDragPosition();
    this.infoCardArr[index].parentDragPosition = $event.source.getFreeDragPosition();
    this.infoCardArr[index].parentDragPosition.y = this.infoCardArr[index].parentDragPosition.y;

  }

  removeInfoCard(i: number) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.value) {
        if (this.infoCardArr[i].state === 'open') {
          this.infoCardArr[i].state = 'closed';
          document.getElementById('content').style.marginRight = '0px';
          document.getElementById('content').style.marginLeft = '215px';
          document.getElementById('content').style.overflow = 'none';
        }
        this.infoCardArr.splice(i, 1);
      }
    });
  }

  hideinfoCardSidenav(index) {
    if (this.infoCardArr[index].state === 'open') { this.infoCardArr[index].state = 'closed'; }
    document.getElementById('content').style.marginRight = '0px';
    document.getElementById('content').style.marginLeft = '215px';
    document.getElementById('content').style.overflow = 'none';
  }

  // End
  //#endregion



  //#region  Standee
  addstandee() {
    this.standeekArr.push({
      zIndex: 5,
      selectedAction: '',
      state: 'closed',
      dragPosition: { x: 0, y: 0 },
      parentDragPosition: { x: 0, y: 0 },
      parentHeight: this.div.nativeElement.offsetHeight,
      parentWidth: this.div.nativeElement.offsetWidth,
      standeeBanner: '/assets/Images/standee.png',
      standeeDescription: '',
      standeeHeight: '300',
      standeeWidth: '75',
      clickAction: [{
        addToChatQueue: {
          name: '',
          chatQueueTitle: '',
          onLineChatQueueDesc: '',
          offlineChatQueueDesc: ''
        },
        linkWebsite: [{ name: '', location: '' }],
        briefcase: [{}],
        linkContent: [{ name: '', filePath: '' }],
        linkToQuiz: [],
        linkToSurvey: [],
        linkToPoll: [],
        linkToInfocard: [],
        linkToChatScreen: [],
        linkLocation: [{ name: '', location: '' }],
        linkToLeaderboard: [{ name: '', value: '' }],
        linkToCalendar: [],
        linkToWall: [],
        linktoSocialMedia: [],
        linktoWebinar: [],
        linkToOnebyOneMeeting: [],
        selectedEntitlementArray: [],
        selectedLanguagesArr: []
        // linkToUploadSection: []
      }]


    });

  }

  showStandeeDetails(item, index) {
    this.closeAllSidebars();
    document.getElementById('content').style.marginRight = '-400px';
    document.getElementById('content').style.marginLeft = '-0px';
    document.getElementById('content').style.overflow = 'scroll';
    (this.standeekArr[index].state === 'closed') ?
      this.standeekArr[index].state = 'open' : this.standeekArr[index].state = 'closed';

  }


  removeStandeeElement(i: number) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.value) {
        if (this.standeekArr[i].state === 'open') {
          this.standeekArr[i].state = 'closed';
          document.getElementById('content').style.marginRight = '0px';
          document.getElementById('content').style.marginLeft = '215px';
          document.getElementById('content').style.overflow = 'none';
        }
        this.standeekArr.splice(i, 1);
      }
    });
  }


  onStandeeFileChange(event, index) {
    this.spinner.show();
    if (event.target.files.length > 0) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        if (this.helper.validateImageFile(file.name)) {
          formData.append('uploadFile', file, file.name);
          this.roomService.UploadBoothBannerImage(formData).subscribe((res) => {
            if (res.isSuccess) {
              this.standeekArr[index].standeeBanner = res.message;
            }
            this.spinner.hide();
          });
        } else {
          this.spinner.hide();
          Swal.fire({
            title: new SweetAlertMessage(this.translate).invalidFileType,
            text: new SweetAlertMessage(this.translate).onlypngjpgandjpegareallowed,
            icon: 'error'
          });
        }
      }

    } else {
      this.spinner.hide();
    }
  }

  standeeDragEnd($event: CdkDragEnd, index) {
    console.log($event.source.getFreeDragPosition());
    this.standeekArr[index].dragPosition = $event.source.getFreeDragPosition();
    this.standeekArr[index].parentDragPosition = $event.source.getFreeDragPosition();
    this.standeekArr[index].parentDragPosition.y = this.standeekArr[index].parentDragPosition.y;


  }


  onStandeeEntitlementSelect(item, index) {
    this.standeekArr[index].selectedEntitlementArray.push(item.item_id);
  }

  onEntitlementDeSelect(item, indx) {
    const index = this.standeekArr[indx].selectedEntitlementArray.indexOf(item.item_id, 0);
    this.standeekArr[indx].selectedEntitlementArray.splice(index, 1);
    if (this.standeekArr[indx].selectedEntitlementArray.length === 0) {

    }
  }

  onStandeeEntitlementSelectAll(item: any, indx) {
    for (let i = 0; i < item.length; i++) {
      if (this.standeekArr[indx].selectedEntitlementArray.indexOf(item[i].item_id) === -1) {
        this.standeekArr[indx].selectedEntitlementArray.push(item[i].item_id);
      }
    }
  }

  onStandeeEntitlementDeSelectAll(item: any, indx) {
    this.standeekArr[indx].selectedEntitlementArray = [];
    if (this.standeekArr[indx].selectedEntitlementArray.length === 0) {

    }
  }

  hideStandeeSidenav(index) {
    if (this.standeekArr[index].state === 'open') { this.standeekArr[index].state = 'closed'; }
    document.getElementById('content').style.marginRight = '0px';
    document.getElementById('content').style.marginLeft = '215px';
    document.getElementById('content').style.overflow = 'none';
  }



  onStandeeLanguageSelect(item: any, index) {
    this.standeekArr[index].selectedLanguagesArr.push(item.item_id);
  }

  onStandeeLanguageSelectAll(item: any, indx) {
    for (let i = 0; i < item.length; i++) {
      if (this.standeekArr[indx].selectedLanguagesArr.indexOf(item[i].item_id) === -1) {
        this.standeekArr[indx].selectedLanguagesArr.push(item[i].item_id);
      }
    }
  }

  onStandeeLanguageDeSelect(item: any, indx) {
    const index = this.standeekArr[indx].selectedLanguagesArr.indexOf(item.item_id, 0);
    this.standeekArr[indx].selectedLanguagesArr.splice(index, 1);
    if (this.standeekArr[indx].selectedLanguagesArr.length === 0) {
      this.requiredField = true;
    }
  }

  onStandeeLanguageDeSelectAll(item: any, indx) {
    this.standeekArr[indx].selectedLanguagesArr = [];
    if (this.standeekArr[indx].selectedLanguagesArr.length === 0) {
      this.requiredField = true;
    }
  }


  onStandeeItemResizeStart(evnt, standeeItem) {
    this.state = 'Resize Started';
    this.size = evnt.size;
    this.position = evnt.position;
    standeeItem.standeeHeight = this.size.height;
    standeeItem.standeeWidth = this.size.width;
  }

  onStandeeItemResizeStop(evnt, standeeItem) {
    this.state = 'Resizing';
    this.size = evnt.size;
    this.position = evnt.position;
    console.log(this.position);
    standeeItem.standeeHeight = this.size.height;
    standeeItem.standeeWidth = this.size.width;

  }

  onStandeeItemResizing(evnt, standeeItem) {
    this.state = 'Resize Stopped';
    this.size = evnt.size;
    this.position = evnt.position;
    standeeItem.standeeHeight = this.size.height;
    standeeItem.standeeWidth = this.size.width;
  }

  //#endregion


  //#region  Marquee
  // Start

  addMarquee() {
    this.marqueeArr.push({
      zIndex: 5,
      selectedAction: '',
      state: 'closed',
      dragPosition: { x: 0, y: 0 },
      parentDragPosition: { x: 0, y: 0 },
      parentHeight: this.div.nativeElement.offsetHeight,
      parentWidth: this.div.nativeElement.offsetWidth,
      marqueeBanner: '/assets/Images/hollowPlus.png',
      marqueeDescription: '',
      marqueeHeight: '50',
      marqueeWidth: '400',
      text: 'text',
      font: '',
      fontStyle: '',
      transition: 'left',
      backgroundColor: '#efefef',
      textColor: '#000000',
      fontSize: '12px',
      lineHeight: '12px',
      clickAction: [{
        addToChatQueue: {
          name: '',
          chatQueueTitle: '',
          onLineChatQueueDesc: '',
          offlineChatQueueDesc: ''
        },
        linkWebsite: [{ name: '', location: '' }],
        briefcase: [{}],
        linkContent: [{ name: '', filePath: '' }],
        linkToQuiz: [],
        linkToSurvey: [],
        linkToPoll: [],
        linkToInfocard: [],
        linkToChatScreen: [],
        linkLocation: [{ name: '', location: '' }],
        linkToLeaderboard: [{ name: '', value: '' }],
        linkToCalendar: [],
        linkToWall: [],
        linktoSocialMedia: [],
        linktoWebinar: [],
        linkToOnebyOneMeeting: [],
        selectedEntitlementArray: [],
        selectedLanguagesArr: []
        // linkToUploadSection: []
      }]
    });

  }


  showMarqueeDetails(item, index) {
    this.closeAllSidebars();
    document.getElementById('content').style.marginRight = '-400px';
    document.getElementById('content').style.marginLeft = '-0px';
    document.getElementById('content').style.overflow = 'scroll';
    (this.marqueeArr[index].state === 'closed') ?
      this.marqueeArr[index].state = 'open' : this.marqueeArr[index].state = 'closed';

  }

  removeMarqueeElement(i: number) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.value) {
        if (this.marqueeArr[i].state === 'open') {
          this.marqueeArr[i].state = 'closed';
          document.getElementById('content').style.marginRight = '0px';
          document.getElementById('content').style.marginLeft = '215px';
          document.getElementById('content').style.overflow = 'none';
        }
        this.marqueeArr.splice(i, 1);
      }
    });
  }

  changeMarqueeTransition(type, index) {
    this.marqueeArr[index].transition = type;
  }

  marqueeDragEnd($event: CdkDragEnd, index) {
    console.log($event.source.getFreeDragPosition());
    this.marqueeArr[index].dragPosition = $event.source.getFreeDragPosition();
    this.marqueeArr[index].parentDragPosition = $event.source.getFreeDragPosition();
    this.marqueeArr[index].parentDragPosition.y = this.marqueeArr[index].parentDragPosition.y;


  }


  onmarqueeEntitlementSelect(item, index) {
    this.marqueeArr[index].selectedEntitlementArray.push(item.item_id);
  }

  onmarqueeEntitlementDeSelect(item, indx) {
    const index = this.marqueeArr[indx].selectedEntitlementArray.indexOf(item.item_id, 0);
    this.marqueeArr[indx].selectedEntitlementArray.splice(index, 1);
    if (this.marqueeArr[indx].selectedEntitlementArray.length === 0) {

    }
  }

  onmarqueeEntitlementSelectAll(item: any, indx) {
    for (let i = 0; i < item.length; i++) {
      if (this.marqueeArr[indx].selectedEntitlementArray.indexOf(item[i].item_id) === -1) {
        this.marqueeArr[indx].selectedEntitlementArray.push(item[i].item_id);
      }
    }
  }

  onmarqueeEntitlementDeSelectAll(item: any, indx) {
    this.marqueeArr[indx].selectedEntitlementArray = [];
    if (this.marqueeArr[indx].selectedEntitlementArray.length === 0) {

    }
  }

  hideMarqueeSidenav(index) {
    if (this.marqueeArr[index].state === 'open') { this.marqueeArr[index].state = 'closed'; }
    document.getElementById('content').style.marginRight = '0px';
    document.getElementById('content').style.marginLeft = '215px';
    document.getElementById('content').style.overflow = 'none';
  }

  makeBackgroundTransparent(event, index) {
    if (event.target.checked) {
      this.marqueeArr[index].backgroundColor = 'transparent';
    } else {
      this.marqueeArr[index].backgroundColor = '#ffffff';
    }
  }



  onMarqueeLanguageSelect(item: any, index) {
    this.marqueeArr[index].selectedLanguagesArr.push(item.item_id);
  }

  onMarqueeLanguageSelectAll(item: any, indx) {
    for (let i = 0; i < item.length; i++) {
      if (this.marqueeArr[indx].selectedLanguagesArr.indexOf(item[i].item_id) === -1) {
        this.marqueeArr[indx].selectedLanguagesArr.push(item[i].item_id);
      }
    }
  }

  onMarqueeLanguageDeSelect(item: any, indx) {
    const index = this.marqueeArr[indx].selectedLanguagesArr.indexOf(item.item_id, 0);
    this.marqueeArr[indx].selectedLanguagesArr.splice(index, 1);
    if (this.marqueeArr[indx].selectedLanguagesArr.length === 0) {
      this.marqueeArr[indx].requiredField = true;
    }
  }

  onMarqueeLanguageDeSelectAll(item: any, indx) {
    this.marqueeArr[indx].selectedLanguagesArr = [];
    if (this.marqueeArr[indx].selectedLanguagesArr.length === 0) {
      this.requiredField = true;
    }
  }



  onmarqueeItemResizeStart(evnt, marqueeItem) {
    this.state = 'Resize Started';
    this.size = evnt.size;
    this.position = evnt.position;
    marqueeItem.marqueeHeight = this.size.height;
    marqueeItem.marqueeWidth = this.size.width;
  }

  onmarqueeItemResizeStop(evnt, marqueeItem) {
    this.state = 'Resizing';
    this.size = evnt.size;
    this.position = evnt.position;
    console.log(this.position);
    marqueeItem.marqueeHeight = this.size.height;
    marqueeItem.marqueeWidth = this.size.width;

  }

  onmarqueeItemResizing(evnt, marqueeItem) {
    this.state = 'Resize Stopped';
    this.size = evnt.size;
    this.position = evnt.position;
    marqueeItem.marqueeHeight = this.size.height;
    marqueeItem.marqueeWidth = this.size.width;
  }

  //#endregion

  //#region Shape Sction
  // Start

  selectShapes(content) {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard: false,
    };
    this.modalRef = this.modalService.show(content);
  }


  addShape(type) {
    this.shapeArr.push({
      state: 'closed',
      dragPosition: { x: 0, y: 0 },
      parentDragPosition: { x: 0, y: 0 },
      parentHeight: this.div.nativeElement.offsetHeight,
      parentWidth: this.div.nativeElement.offsetWidth,
      type: type === 'arrow_next' ? 'arrow' : type,
      width: (type === 'line') ? 200 : (type === 'arrow_next') ? '50' : 200,
      height: (type === 'line') ? 10 : (type === 'arrow_next') ? '50' : 200,
      rotation: type === 'arrow_next' ? '-45' : '0',
      fillColor: ''
    });
  }

  shapeItemDragEnd($event: CdkDragEnd, index) {
    console.log($event.source.getFreeDragPosition());
    this.shapeArr[index].dragPosition = $event.source.getFreeDragPosition();
    this.shapeArr[index].parentDragPosition = $event.source.getFreeDragPosition();
    this.shapeArr[index].parentDragPosition.y = this.shapeArr[index].parentDragPosition.y;
  }

  showShapeItemDetails(item, index) {
    this.closeAllSidebars();
    (this.shapeArr[index].state === 'closed') ?
      this.shapeArr[index].state = 'open' : this.shapeArr[index].state = 'closed';
  }

  removeShapeElement(i: number) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.value) {
        if (this.shapeArr[i].state === 'open') {
          this.shapeArr[i].state = 'closed';
          document.getElementById('content').style.marginRight = '0px';
          document.getElementById('content').style.marginLeft = '215px';
          document.getElementById('content').style.overflow = 'none';
        }
        this.shapeArr.splice(i, 1);
      }
    });
  }

  shapeStyle(index): object {
    const returnData = {};
    returnData['object-fit'] = 'cover';
    returnData['width'] = this.shapeArr[index].width + 'px';
    returnData['height'] = this.shapeArr[index].height + 'px';
    returnData['transform'] = 'rotate(' + this.shapeArr[index].rotation + 'deg)';

    return returnData;
  }

  hideShapeItemSidenav(index) {
    if (this.shapeArr[index].state === 'open') { this.shapeArr[index].state = 'closed'; }
    document.getElementById('content').style.marginRight = '-400px';
    document.getElementById('content').style.marginLeft = '-0px';
    document.getElementById('content').style.overflow = 'scroll';
  }


  //#endregion

  //#region Guest Section

  addguest() {
    this.guestArr.push({
      zIndex: 5,
      state: 'closed',
      dragPosition: { x: 0, y: 0 },
      parentDragPosition: { x: 0, y: 0 },
      parentHeight: this.div.nativeElement.offsetHeight,
      parentWidth: this.div.nativeElement.offsetWidth,
      guestBanner: '/assets/Images/guest.png',
      guestDescription: '',
      guestHeight: '100',
      guestWidth: '100',
      selectedGuestEntitlementsArr: [],
    });
  }

  showGuestDetails(item, index) {
    this.closeAllSidebars();
    document.getElementById('content').style.marginRight = '-400px';
    document.getElementById('content').style.marginLeft = '-0px';
    document.getElementById('content').style.overflow = 'scroll';

    (this.guestArr[index].state === 'closed') ?
      this.guestArr[index].state = 'open' : this.guestArr[index].state = 'closed';
  }



  removeGuestElement(i: number) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.value) {
        if (this.guestArr[i].state === 'open') {
          this.guestArr[i].state = 'closed';
          document.getElementById('content').style.marginRight = '0px';
          document.getElementById('content').style.marginLeft = '215px';
          document.getElementById('content').style.overflow = 'none';
        }
        this.guestArr.splice(i, 1);
      }
    });
  }


  onGuestFileChange(event, index) {
    this.spinner.show();
    if (event.target.files.length > 0) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        if (this.helper.validateImageFile(file.name)) {
          formData.append('uploadFile', file, file.name);
          this.roomService.UploadBoothBannerImage(formData).subscribe((res) => {
            if (res.isSuccess) {
              this.guestArr[index].guestBanner = res.message;
            }
            this.spinner.hide();
          });
        } else {
          this.spinner.hide();
          Swal.fire({
            title: new SweetAlertMessage(this.translate).invalidFileType,
            text: new SweetAlertMessage(this.translate).onlypngjpgandjpegareallowed,
            icon: 'error'
          });
        }
      }

    } else {
      this.spinner.hide();
    }
  }

  selectAvatar(imgSrc, index) {
    this.guestArr[index].guestBanner = '/assets/Images/' + imgSrc + '.png';
  }
  guestDragEnd($event: CdkDragEnd, index) {
    console.log($event.source.getFreeDragPosition());
    this.guestArr[index].dragPosition = $event.source.getFreeDragPosition();
    this.guestArr[index].parentDragPosition = $event.source.getFreeDragPosition();
    this.guestArr[index].parentDragPosition.y = this.guestArr[index].parentDragPosition.y;

  }

  onguestEntitlementSelect(item, index) {
    this.guestArr[index].selectedEntitlementArray.push(item.item_id);
  }

  onguestEntitlementDeSelect(item, indx) {
    const index = this.guestArr[indx].selectedEntitlementArray.indexOf(item.item_id, 0);
    this.guestArr[indx].selectedEntitlementArray.splice(index, 1);
    if (this.guestArr[indx].selectedEntitlementArray.length === 0) {

    }
  }

  onguestEntitlementSelectAll(item: any, indx) {
    for (let i = 0; i < item.length; i++) {
      if (this.guestArr[indx].selectedEntitlementArray.indexOf(item[i].item_id) === -1) {
        this.guestArr[indx].selectedEntitlementArray.push(item[i].item_id);
      }
    }
  }

  onguestEntitlementDeSelectAll(item: any, indx) {
    this.guestArr[indx].selectedEntitlementArray = [];
    if (this.guestArr[indx].selectedEntitlementArray.length === 0) {

    }
  }

  hideGuestSidenav(index) {
    if (this.guestArr[index].state === 'open') { this.guestArr[index].state = 'closed'; }
    document.getElementById('content').style.marginRight = '0px';
    document.getElementById('content').style.marginLeft = '215px';
    document.getElementById('content').style.overflow = 'none';
  }



  onguestItemResizeStart(evnt, guestItem) {
    this.state = 'Resize Started';
    this.size = evnt.size;
    this.position = evnt.position;
    guestItem.guestHeight = this.size.height;
    guestItem.guestWidth = this.size.width;
  }

  onguestItemResizeStop(evnt, guestItem) {
    this.state = 'Resizing';
    this.size = evnt.size;
    this.position = evnt.position;
    console.log(this.position);
    guestItem.guestHeight = this.size.height;
    guestItem.guestWidth = this.size.width;

  }

  onguestItemResizing(evnt, guestItem) {
    this.state = 'Resize Stopped';
    this.size = evnt.size;
    this.position = evnt.position;
    guestItem.guestHeight = this.size.height;
    guestItem.guestWidth = this.size.width;
  }

  //#endregion

  //#region  Facebook

  addFacebook() {
    this.faceBookLinkArr.push({
      zIndex: 5,
      dragPosition: { x: 0, y: 0 },
      parentDragPosition: { x: 0, y: 0 },
      parentHeight: this.div.nativeElement.offsetHeight,
      parentWidth: this.div.nativeElement.offsetWidth,
      linkUrl: '',
      state: 'closed'
    });
  }

  showFacebookItemDetails(item, index) {
    this.closeAllSidebars();
    document.getElementById('content').style.marginRight = '-400px';
    document.getElementById('content').style.marginLeft = '-0px';
    document.getElementById('content').style.overflow = 'scroll';
    (this.faceBookLinkArr[index].state === 'closed') ?
      this.faceBookLinkArr[index].state = 'open' : this.faceBookLinkArr[index].state = 'closed';

  }

  removeFBElement(i: number) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.value) {
        if (this.faceBookLinkArr[i].state === 'open') {
          this.faceBookLinkArr[i].state = 'closed';
          document.getElementById('content').style.marginRight = '0px';
          document.getElementById('content').style.marginLeft = '215px';
          document.getElementById('content').style.overflow = 'none';
        }
        this.faceBookLinkArr.splice(i, 1);
      }
    });
  }

  fbItemDragEnd($event: CdkDragEnd, index) {
    console.log($event.source.getFreeDragPosition());
    this.faceBookLinkArr[index].dragPosition = $event.source.getFreeDragPosition();
    this.faceBookLinkArr[index].parentDragPosition = $event.source.getFreeDragPosition();
    this.faceBookLinkArr[index].parentDragPosition.y = this.faceBookLinkArr[index].parentDragPosition.y;
  }

  hideFacebookSidenav(index) {
    if (this.faceBookLinkArr[index].state === 'open') { this.faceBookLinkArr[index].state = 'closed'; }
    document.getElementById('content').style.marginRight = '0px';
    document.getElementById('content').style.marginLeft = '215px';
    document.getElementById('content').style.overflow = 'none';
  }
  //#endregion

  //#region  Twitter

  addTwitter() {
    this.twitterLinkArr.push({
      zIndex: 5,
      dragPosition: { x: 0, y: 0 },
      parentDragPosition: { x: 0, y: 0 },
      parentHeight: this.div.nativeElement.offsetHeight,
      parentWidth: this.div.nativeElement.offsetWidth,
      linkUrl: '',
      state: 'closed'
    });
  }

  showTwitterItemDetails(item, index) {
    this.closeAllSidebars();
    document.getElementById('content').style.marginRight = '-400px';
    document.getElementById('content').style.marginLeft = '-0px';
    document.getElementById('content').style.overflow = 'scroll';
    (this.twitterLinkArr[index].state === 'closed') ?
      this.twitterLinkArr[index].state = 'open' : this.twitterLinkArr[index].state = 'closed';

  }

  removetwitterElement(i: number) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.value) {
        if (this.twitterLinkArr[i].state === 'open') {
          this.twitterLinkArr[i].state = 'closed';
          document.getElementById('content').style.marginRight = '0px';
          document.getElementById('content').style.marginLeft = '215px';
          document.getElementById('content').style.overflow = 'none';
        }
        this.twitterLinkArr.splice(i, 1);
      }
    });
  }

  twitterItemDragEnd($event: CdkDragEnd, index) {
    console.log($event.source.getFreeDragPosition());
    this.twitterLinkArr[index].dragPosition = $event.source.getFreeDragPosition();
    this.twitterLinkArr[index].parentDragPosition = $event.source.getFreeDragPosition();
    this.twitterLinkArr[index].parentDragPosition.y = this.twitterLinkArr[index].parentDragPosition.y;


  }

  hideTwitterSidenav(index) {
    if (this.twitterLinkArr[index].state === 'open') { this.twitterLinkArr[index].state = 'closed'; }
    document.getElementById('content').style.marginRight = '0px';
    document.getElementById('content').style.marginLeft = '215px';
    document.getElementById('content').style.overflow = 'none';
  }
  //#endregion

  //#region  Instagram
  addInstagram() {
    this.instagramLinkArr.push({
      zIndex: 5,
      dragPosition: { x: 0, y: 0 },
      parentDragPosition: { x: 0, y: 0 },
      parentHeight: this.div.nativeElement.offsetHeight,
      parentWidth: this.div.nativeElement.offsetWidth,
      linkUrl: '',
      state: 'closed'
    });
  }

  showinstaItemItemDetails(item, index) {
    this.closeAllSidebars();
    document.getElementById('content').style.marginRight = '-400px';
    document.getElementById('content').style.marginLeft = '-0px';
    document.getElementById('content').style.overflow = 'scroll';
    (this.instagramLinkArr[index].state === 'closed') ?
      this.instagramLinkArr[index].state = 'open' : this.instagramLinkArr[index].state = 'closed';

  }

  removeInstaElement(i: number) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.value) {
        if (this.instagramLinkArr[i].state === 'open') {
          this.instagramLinkArr[i].state = 'closed';
          document.getElementById('content').style.marginRight = '0px';
          document.getElementById('content').style.marginLeft = '215px';
          document.getElementById('content').style.overflow = 'none';
        }
        this.instagramLinkArr.splice(i, 1);
      }
    });
  }

  instaItemItemDragEnd($event: CdkDragEnd, index) {
    console.log($event.source.getFreeDragPosition());
    this.instagramLinkArr[index].dragPosition = $event.source.getFreeDragPosition();
    this.instagramLinkArr[index].parentDragPosition = $event.source.getFreeDragPosition();
    this.instagramLinkArr[index].parentDragPosition.y = this.instagramLinkArr[index].parentDragPosition.y;


  }

  hideInstaItemSidenav(index) {
    if (this.instagramLinkArr[index].state === 'open') {
      this.instagramLinkArr[index].state = 'closed';
      document.getElementById('content').style.marginRight = '0px';
      document.getElementById('content').style.marginLeft = '215px';
      document.getElementById('content').style.overflow = 'none';
    }
  }
  //#endregion

  //#region  LinkedIn
  addLinkedIn() {
    this.linkedInLinkArr.push({
      zIndex: 5,
      dragPosition: { x: 0, y: 0 },
      parentDragPosition: { x: 0, y: 0 },
      parentHeight: this.div.nativeElement.offsetHeight,
      parentWidth: this.div.nativeElement.offsetWidth,
      linkUrl: '',
      state: 'closed'
    });
  }

  showLinkedInItemDetails(item, index) {
    this.closeAllSidebars();
    document.getElementById('content').style.marginRight = '-400px';
    document.getElementById('content').style.marginLeft = '-0px';
    document.getElementById('content').style.overflow = 'scroll';

    (this.linkedInLinkArr[index].state === 'closed') ?
      this.linkedInLinkArr[index].state = 'open' : this.linkedInLinkArr[index].state = 'closed';
  }

  removeLinkedInElement(i: number) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.value) {
        if (this.linkedInLinkArr[i].state === 'open') {
          this.linkedInLinkArr[i].state = 'closed';
          document.getElementById('content').style.marginRight = '0px';
          document.getElementById('content').style.marginLeft = '215px';
          document.getElementById('content').style.overflow = 'none';
        }
        this.linkedInLinkArr.splice(i, 1);
      }
    });
  }

  linkedInItemDragEnd($event: CdkDragEnd, index) {
    console.log($event.source.getFreeDragPosition());
    this.linkedInLinkArr[index].dragPosition = $event.source.getFreeDragPosition();
    this.linkedInLinkArr[index].parentDragPosition = $event.source.getFreeDragPosition();
    this.linkedInLinkArr[index].parentDragPosition.y = this.linkedInLinkArr[index].parentDragPosition.y;

  }

  hideLinkedInSidenav(index) {
    if (this.linkedInLinkArr[index].state === 'open') {
      this.linkedInLinkArr[index].state = 'closed';
      document.getElementById('content').style.marginRight = '0px';
      document.getElementById('content').style.marginLeft = '215px';
      document.getElementById('content').style.overflow = 'none';

    }


  }
  //#endregion


  //#region HTML
  addHtml() {
    this.htmlArr.push({
      zIndex: 5,
      dragPosition: { x: 0, y: 0 },
      parentDragPosition: { x: 0, y: 0 },
      parentHeight: this.div.nativeElement.offsetHeight,
      parentWidth: this.div.nativeElement.offsetWidth,
      htmlCode: '',
      state: 'closed'
    });
  }

  htmlItemDragEnd($event: CdkDragEnd, index) {
    console.log($event.source.getFreeDragPosition());
    this.htmlArr[index].dragPosition = $event.source.getFreeDragPosition();
    this.htmlArr[index].parentDragPosition = $event.source.getFreeDragPosition();
    this.htmlArr[index].parentDragPosition.y = this.htmlArr[index].parentDragPosition.y;

  }

  showHTMLDetails(item, index) {
    this.closeAllSidebars();
    document.getElementById('content').style.marginRight = '-400px';
    document.getElementById('content').style.marginLeft = '-0px';
    document.getElementById('content').style.overflow = 'scroll';

    (this.htmlArr[index].state === 'closed') ?
      this.htmlArr[index].state = 'open' : this.htmlArr[index].state = 'closed';
  }

  hidehtmlItemSidenav(index) {
    if (this.htmlArr[index].state === 'open') {
      this.htmlArr[index].state = 'closed';
      document.getElementById('content').style.marginRight = '0px';
      document.getElementById('content').style.marginLeft = '215px';
      document.getElementById('content').style.overflow = 'none';

    }
  }

  removeHTMTLElement(i: number) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.value) {
        if (this.htmlArr[i].state === 'open') {
          this.htmlArr[i].state = 'closed';
          document.getElementById('content').style.marginRight = '0px';
          document.getElementById('content').style.marginLeft = '215px';
          document.getElementById('content').style.overflow = 'none';
        }
        this.htmlArr.splice(i, 1);
      }
    });
  }

  //#endregion


  //#region  Common Functions
  // form submit
  // start
  onSubmit() {
    console.log('Form Submitted');
    this.roomDesignDetails.boothColor = this.boothColor;
    this.roomDesignDetails.createdBy = this.localStorage.get('UserId');
    this.roomDesignDetails.roomId = this.roomId;
    this.roomDesignDetails.eventId = this.eventId;
    if (this.roomDesignDetails.designData === null) {
      this.roomDesignDetails.designData = {};
    }
    this.roomDesignDetails.designData.ImageInfo = this.boothImageArr;
    this.roomDesignDetails.designData.videoInfo = this.videosArr;
    this.roomDesignDetails.designData.textInfo = this.textArr;
    this.roomDesignDetails.designData.audioInfo = this.audiosArr;
    this.roomDesignDetails.designData.infoCardInfo = this.infoCardArr;
    this.roomDesignDetails.designData.marqueeInfo = this.marqueeArr;
    this.roomDesignDetails.designData.standeeInfo = this.standeekArr;
    this.roomDesignDetails.designData.guestInfo = this.guestArr;
    this.roomDesignDetails.designData.facebookInfo = this.faceBookLinkArr;
    this.roomDesignDetails.designData.twitterInfo = this.twitterLinkArr;
    this.roomDesignDetails.designData.instagramInfo = this.instagramLinkArr;
    this.roomDesignDetails.designData.linkedInInfo = this.linkedInLinkArr;
    this.roomDesignDetails.designData.htmlInfo = this.htmlArr;
    console.log(this.roomDesignDetails);

    this.roomService.saveRoomDesign(this.roomDesignDetails).subscribe((res) => {
      if (res.isSuccess) {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).savedSuccessfully,
          icon: 'success',
          confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
        }).then(() => {
          this.getRoomDesignDetails();

        });
      } else {
        Swal.fire(
          new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          res.message,
          'error'
        );
      }
    });
  }
  // end

  // master data loading functions
  getRoomDesignDetails() {
    const roomDetailsReq: any = {};
    roomDetailsReq.id = this.route.snapshot.paramMap.get('roomId');
    roomDetailsReq.eventId = this.eventId;
    console.log(roomDetailsReq);
    this.roomService.getRoomDesignDetails(roomDetailsReq).subscribe((res) => {
      if (res.isSuccess) {
        console.log(res);
        this.roomDesignDetails = res.roomDesignData;
        this.roomTemplates = res.allRoomTemplates;
        console.log(this.roomDesignDetails);
        console.log(this.roomTemplates);
        console.log(this.roomDesignDetails.designData);
        if (this.roomDesignDetails.designData) {

          this.boothImageArr = this.roomDesignDetails.designData.imageInfo ? this.roomDesignDetails.designData.imageInfo : [];
          if (this.boothImageArr.length > 0) {
            this.boothImageArr.forEach(elmt => {
              if (elmt.selectedEntitlementArray !== null) {

                // for (let i = 0; i < elmt.selectedEntitlementArray !== null ? elmt.selectedEntitlementArray.length : 0; i++) {
                //   if (!elmt.selectedEntitlementsArr.includes(elmt.selectedEntitlementArray[i].item_id)) {
                //     elmt.selectedEntitlementsArr.push(elmt.selectedEntitlementArray[i].item_id);
                //   }
                // }
              }
            });
          }
          this.videosArr = this.roomDesignDetails.designData.videoInfo ? this.roomDesignDetails.designData.videoInfo : [];
          this.textArr = this.roomDesignDetails.designData.textInfo ? this.roomDesignDetails.designData.textInfo : [];
          this.audiosArr = this.roomDesignDetails.designData.audioInfo ? this.roomDesignDetails.designData.audioInfo : [];
          this.infoCardArr = this.roomDesignDetails.designData.infoCardInfo ? this.roomDesignDetails.designData.infoCardInfo : [];
          this.marqueeArr = this.roomDesignDetails.designData.marqueeInfo ? this.roomDesignDetails.designData.marqueeInfo : [];
          this.standeekArr = this.roomDesignDetails.designData.standeeInfo ? this.roomDesignDetails.designData.standeeInfo : [];
          this.guestArr = this.roomDesignDetails.designData.guestInfo ? this.roomDesignDetails.designData.guestInfo : [];
          this.faceBookLinkArr = this.roomDesignDetails.designData.facebookInfo ? this.roomDesignDetails.designData.facebookInfo : [];
          this.twitterLinkArr = this.roomDesignDetails.designData.twitterInfo ? this.roomDesignDetails.designData.twitterInfo : [];
          this.instagramLinkArr = this.roomDesignDetails.designData.instagramInfo ? this.roomDesignDetails.designData.instagramInfo : [];
          this.linkedInLinkArr = this.roomDesignDetails.designData.linkedInInfo ? this.roomDesignDetails.designData.linkedInInfo : [];
          this.htmlArr = this.roomDesignDetails.designData.htmlInfo ? this.roomDesignDetails.designData.htmlInfo : [];
          if (this.roomDesignDetails.roomDesignId === null || this.roomDesignDetails.roomDesignId === AppUtils.emptyGuid) {
            this.roomDesignDetails.roomDesignId = AppUtils.emptyGuid;
          }
        }

      }
    });
  }
  changeRoomTemplate(event) {
    this.roomDesignDetails.selectedRoomTemplates = this.roomTemplates.filter(u => u.roomTemplateId === event.target.value)[0];
    this.roomDesignDetails.selectedRoomTemplateId = this.roomDesignDetails.selectedRoomTemplates.roomTemplateId;
    console.log(this.roomDesignDetails.selectedRoomTemplateId);
  }

  // close all sidebars
  closeAllSidebars() {
    this.boothImageArr.forEach(boothImageArrElements => {
      boothImageArrElements.state = 'closed';
    });
    this.videosArr.forEach(videosArrElement => {
      videosArrElement.state = 'closed';
    });
    this.faceBookLinkArr.forEach(faceBookLinkArrElement => {
      faceBookLinkArrElement.state = 'closed';
    });
    this.twitterLinkArr.forEach(twitterLinkArrElement => {
      twitterLinkArrElement.state = 'closed';
    });
    this.instagramLinkArr.forEach(instagramLinkArrElement => {
      instagramLinkArrElement.state = 'closed';
    });
    this.linkedInLinkArr.forEach(linkedInLinkArrElement => {
      linkedInLinkArrElement.state = 'closed';
    });

  }

  // Click to Action Modal

  selectClickActions(value, index, arr) {
    if (value === 'addToChatQueue') {
      this.openAddToChatQueueModal(index, arr);
    } else if (value === 'linkContent') {
      this.openLinkContentModal(index, arr);
    } else if (value === 'linkLocation') {
      this.openLinkLocationModal(index, arr);
    } else if (value === 'LinkToLeaderboard') {
      this.openLinkToLeaderboardModal(index, arr);
    } else if (value === 'linkQuiz') {
      this.openLinkToQuizModal(index, arr);
    } else if (value === 'linkSurvey') {
      this.openLinkToSurveyModal(index, arr);
    } else if (value === 'linkPoll') {
      this.openlinkToPollModal(index, arr);
    } else if (value === 'linkToInfocard') {
      this.openlinkToInfocardModal(index, arr);
    } else if (value === 'linkToChatScreen') {
      this.openlinkToChatScreenModal(index, arr);
    } else if (value === 'linkToCalendar') {
      this.openlinkToCalendarModal(index, arr);
    } else if (value === 'linkToWall') {
      this.openlinkToWallModal(index, arr);
    } else if (value === 'linkToSocialMedia') {
      this.openlinkToSocialMediaModal(index, arr);
    } else if (value === 'linkWebinar') {
      this.openlinkToWebinarModal(index, arr);
    } else if (value === 'linkToOneToOneChat') {
      this.openlinkToOneToOneChatModal(index, arr);
    } else if (value === 'openBriefcase') {
      this.openBriefcase(index, arr);
    } else if (value === 'linkWebsite') {
      this.openWebsite(index, arr);
    }
  }

  // Add to chat queue
  openAddToChatQueueModal(index, arr) {
    const initialState = {
      index: index,
      addToChatQueue: arr[index].clickAction[0].addToChatQueue
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard: false,
    };
    const modalParams = Object.assign({}, modalConfig, { initialState, class: 'modal-lg' });
    this.modalRef = this.modalService.show(AddToChatQueueModalComponent, modalParams);
    this.modalRef.content.event.subscribe(res => {
      arr[res.index].clickAction[0].addToChatQueue = res.data;
    });
    arr[index].selectedAction = 'addToChatQueue';
  }

  // link content
  openLinkContentModal(index, arr) {
    const initialState = {
      index: index,
      content: arr[index].clickAction[0].linkContent
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard: false,
    };
    this.modalRef = this.modalService.show(OpenLinkContentModalComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalRef.content.event.subscribe(resp => {
      if (arr[index].clickAction[0].linkContent) {
        arr[index].clickAction[0].linkContent = resp.data;
      } else {
        arr[index].clickAction[0].linkContent = [];
        arr[index].clickAction[0].linkContent = (resp.data);
      }
      arr[index].selectedAction = 'linkContent';
      this.signalRService.sendData();
    });
  }

  // link to location
  openLinkLocationModal(index: any, arr) {
    this.getAllLocations(index, arr);
  }

  // link to leader board
  openLinkToLeaderboardModal(index: any, arr) {
    // const InitialState = {
    //   index: index,
    //   linkLocation: this.roomDesignDetails
    // };
    // const modalConfigs = {
    //   backdrop: true,
    //   ignoreBackdropClick: true,
    // };
    // const modalParamss = Object.assign({}, modalConfigs, { InitialState, class: 'modal-lg' });
    // this.modalRef = this.modalService.show(OpenLinktoLeaderBoardwithinBoothModalComponent, modalParamss);
    // this.modalRef.content.event.subscribe(res => {
    //   arr[res.index].clickAction[0].addToChatQueue = res.data;
    // });
    arr[index].selectedAction = 'linktoLeaderboard';
  }

  // link to quiz
  openLinkToQuizModal(index: any, arr) {
    this.getQuizList(index, arr);

  }

  // link to survey
  openLinkToSurveyModal(index: any, arr) {
    this.getSurveyList(index, arr);
  }

  // link to poll
  openlinkToPollModal(index: any, arr) {
    this.getPollList(index, arr);
  }

  // link to info card
  openlinkToInfocardModal(index: any, arr) {
    const InitialState = {
      index: index,
      linkLocation: this.roomDesignDetails
    };
    const modalConfigs = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard: false,
    };
    const modalParamss = Object.assign({}, modalConfigs, { InitialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
    this.modalRef = this.modalService.show(OpenLinktoInfoCardModalComponent, modalParamss);
    this.modalRef.content.event.subscribe(res => {
      arr[res.index].clickAction[0].addToChatQueue = res.data;
    });
    arr[index].selectedAction = 'linkToInfocard';

  }

  // link to chat screen
  openlinkToChatScreenModal(index: any, arr) {
    // const InitialState = {
    //   index: index,
    //   linkLocation: this.roomDesignDetails
    // };
    // const modalConfigs = {
    //   backdrop: true,
    //   ignoreBackdropClick: true,
    // };
    // const modalParamss = Object.assign({}, modalConfigs, { InitialState, class: 'modal-lg' });
    // this.modalRef = this.modalService.show(OpenLinktoChatScreenModalComponent, modalParamss);
    // this.modalRef.content.event.subscribe(res => {
    //   arr[res.index].clickAction[0].addToChatQueue = res.data;
    // });
    arr[index].selectedAction = 'linkToChatScreen';
  }

  // link to calendar
  openlinkToCalendarModal(index: any, arr) {
    const InitialState = {
      index: index,
      linkLocation: this.roomDesignDetails
    };
    const modalConfigs = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard: false,
    };
    const modalParamss = Object.assign({}, modalConfigs, { InitialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
    this.modalRef = this.modalService.show(OpenLinktoCalendarForBoothRepModalComponent, modalParamss);
    this.modalRef.content.event.subscribe(res => {
      arr[res.index].clickAction[0].addToChatQueue = res.data;
    });
    arr[index].selectedAction = 'linkToCalendar';

  }

  // link to wall
  openlinkToWallModal(index: any, arr) {
    const InitialState = {
      index: index,
      linkLocation: this.roomDesignDetails
    };
    const modalConfigs = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard: false,
    };
    const modalParamss = Object.assign({}, modalConfigs, { InitialState, class: 'modal-lg' });
    this.modalRef = this.modalService.show(OpenLinktoWallForWriteCommentsModalComponent, modalParamss);
    this.modalRef.content.event.subscribe(res => {
      arr[res.index].clickAction[0].addToChatQueue = res.data;
    });
    arr[index].selectedAction = 'linkToWall';
  }

  // link to socialmedia
  openlinkToSocialMediaModal(index: any, arr) {
    const initialState = {
      index: index,
      linkSocialMedia: arr[index].clickAction[0].linkToSocialMedia
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard: false,
    };
    this.modalRef = this.modalService.show(OpenLinktoSocialMediaModalComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalRef.content.event.subscribe(resp => {
      if (arr[index].clickAction[0].linkToSocialMedia) {
        arr[index].clickAction[0].linkToSocialMedia = resp.data;
      } else {
        arr[index].clickAction[0].linkToSocialMedia = [];
        arr[index].clickAction[0].linkToSocialMedia = (resp.data);
      }
    });
    arr[index].selectedAction = 'linkToSocialMedia';

  }

  // link to webinar
  openlinkToWebinarModal(index: any, arr) {
    const webinarViewModel: any = {};
    webinarViewModel.eventId = this.eventId;
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
          eventId: this.eventId,
          roomId: this.roomId,
          webinarDropdownList: this.webinarDropdownList,
          selectedWebinarsArr: arr[index].clickAction[0].linktoWebinar ? arr[index].clickAction[0].linktoWebinar : []
        };
        this.modalRef = this.modalService.show(OpenLinktoWebinarModalComponent, { initialState, class: 'modal-lg', backdrop: 'static' });
        this.modalRef.content.closeBtnName = 'Close';
        this.modalRef.content.event.subscribe(resp => {
          if (arr[index].clickAction[0].linkToWebinar) {
            arr[index].clickAction[0].linkToWebinar = resp.data;
          } else {
            arr[index].clickAction[0].linkToWebinar = [];
            arr[index].clickAction[0].linkToWebinar = (resp.data);
          }
          arr[index].selectedAction = 'linkWebinar';
        });


      } else {
        this.webinarDropdownList = [];
      }
    })

  }

  // link to one to one chat
  openlinkToOneToOneChatModal(index: any, arr) {
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
    arr[index].selectedAction = 'linkToOneToOneChat';


  }


  // link to external url
  openWebsite(index, arr) {
    const initialState = {
      index: index,
      linkWebsite: arr[index].clickAction[0].linkWebsite
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard: false,
    };
    const modalParams = Object.assign({}, modalConfig, { initialState, class: 'modal-lg' });
    this.modalRef = this.modalService.show(LinkWebsiteComponent, modalParams);
    this.modalRef.content.event.subscribe(res => {
      arr[res.index].clickAction[0].linkWebsite = res.data;
    });
    arr[index].selectedAction = 'linkWebsite';
  }

  // briefcase section
  openBriefcase(index, arr) {
    const initialState = {
      index: index,
      briefcase: arr[index].clickAction[0].briefcase
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard: false,
    };
    const modalParams = Object.assign({}, modalConfig, { initialState, class: 'modal-lg' });
    this.modalRef = this.modalService.show(OpenBriefcaseModalComponent, modalParams);
    this.modalRef.content.event.subscribe(res => {
      arr[res.index].clickAction[0].briefcase = res.data;

    });
    arr[index].selectedAction = 'openBriefcase';
  }
  //#endregion

  // Entitlement Start
  bindGroupEntitlements() {
    this.getByIdViewModel.id = this.route.snapshot.paramMap.get('id');
    this.eventEntitlementService.getGroupEntitlemts(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.inputRoomSetupModel.eventEntitlements = res.groupEntitlementViewModels;
        const temp = [];
        for (let k = 0; k < this.inputRoomSetupModel.eventEntitlements.length; k++) {
          temp.push({
            item_id: this.inputRoomSetupModel.eventEntitlements[k].groupId,
            item_text: this.inputRoomSetupModel.eventEntitlements[k].groupName
          });
          console.log(this.inputRoomSetupModel.eventEntitlements);
          this.entitlementDropdownList = temp;
          this.textEntitlementDropdownList = temp;
        }
      }
    });
  }

  // Entitlement End

  //#region Language Start

  getAvailableLanguages() {
    this.langugeService.getAvailableLanguages().subscribe((res) => {
      if (res.isSuccess) {
        let availableLang: any = [];
        availableLang = res.languageViewModel;
        const temp = [];
        for (let i = 0; i < availableLang.length; i++) {
          temp.push({ item_id: availableLang[i].languageId, item_text: availableLang[i].language });
        }
        this.languageDropdownList = temp;
      } else {
        // console.log('error in fetching languages');
      }
      this.selectedLanguagesArr = [];
    });

  }

  setClass() {
    this.requiredField = true;
    if (this.selectedLanguagesArr.length > 0) {
      return 'validField';
    } else {
      return 'invalidField';
    }
  }


  onItemSelect(item: any) {
    this.selectedLanguagesArr.push(item.item_id);
  }

  onSelectAll(items: any) {
    for (let i = 0; i < items.length; i++) {
      if (this.selectedLanguagesArr.indexOf(items[i].item_id) === -1) {
        this.selectedLanguagesArr.push(items[i].item_id);
      }
    }
  }

  onItemDeSelect(item: any) {
    const index = this.selectedLanguagesArr.indexOf(item.item_id, 0);
    this.selectedLanguagesArr.splice(index, 1);
    if (this.selectedLanguagesArr.length === 0) {
      this.requiredField = true;
    }
  }

  onDeSelectAll(items: any) {
    this.selectedLanguagesArr = [];
    if (this.selectedLanguagesArr.length === 0) {
      this.requiredField = true;
    }
  }
  // Language End


  //#region common functions to get data

  getQuizList(index: any, arr) {
    const quizReqModel: any = {};
    quizReqModel.eventId = this.eventId;
    quizReqModel.UserId = this.localStorage.get('UserId');
    this.quizService.getQuizlist(quizReqModel).subscribe((res) => {
      if (res.isSuccess) {
        this.quizModel = res.quizQuestionsViewModels;

        const initialState = {
          allQuiz: this.quizModel,
          selectedQuiz: arr[index].clickAction[0].linkToQuiz
        };
        this.modalRef = this.modalService.show(OpenLinktoQuizModalComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
        this.modalRef.content.closeBtnName = 'Close';
        this.modalRef.content.event.subscribe(resp => {
          if (arr[index].clickAction[0].linkToQuiz) {
            arr[index].clickAction[0].linkToQuiz = resp.data;
          } else {
            arr[index].clickAction[0].linkToQuiz = [];
            arr[index].clickAction[0].linkToQuiz = (resp.data);
          }
          arr[index].selectedAction = 'linkQuiz';
        });
      }
    });
  }

  getPollList(index: any, arr) {
    const pollReqModel: any = {};
    pollReqModel.eventId = this.eventId;
    pollReqModel.UserId = this.localStorage.get('UserId');
    this.pollService.getPollslist(pollReqModel).subscribe((res) => {
      if (res.isSuccess) {
        this.pollMedel = res.pollsList;
        const initialState = {
          allPolls: this.pollMedel,
          selectedPolls: arr[index].clickAction[0].linkToPoll
        };
        this.modalRef = this.modalService.show(OpenLinktoPollModalComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
        this.modalRef.content.closeBtnName = 'Close';
        this.modalRef.content.event.subscribe(resp => {
          if (arr[index].clickAction[0].linkToPoll) {
            arr[index].clickAction[0].linkToPoll = resp.data;
          } else {
            arr[index].clickAction[0].linkToPoll = [];
            arr[index].clickAction[0].linkToPoll = (resp.data);
          }
          arr[index].selectedAction = 'linkPoll';
        });
        console.log(arr[index].clickAction[0].linkToPoll);
      }

    });
  }

  getSurveyList(index: any, arr) {
    const surveyReqModel: any = {};
    surveyReqModel.eventId = this.eventId;
    surveyReqModel.UserId = this.localStorage.get('UserId');
    this.surveyService.getSurveylist(surveyReqModel).subscribe((res) => {
      if (res.isSuccess) {
        this.surveyModel = res.createSurveyListViewModels;
        const initialState = {
          allSurveys: this.surveyModel,
          selectedSurveys: arr[index].clickAction[0].linkToSurvey
        };
        this.modalRef = this.modalService.show(OpenLinktoSurveyModalComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
        this.modalRef.content.closeBtnName = 'Close';
        this.modalRef.content.event.subscribe(resp => {
          if (arr[index].clickAction[0].linkToSurvey) {
            arr[index].clickAction[0].linkToSurvey = resp.data;
          } else {
            arr[index].clickAction[0].linkToSurvey = [];
            arr[index].clickAction[0].linkToSurvey = (resp.data);
          }
          arr[index].selectedAction = 'linkSurvey';
        });
        console.log(arr[index].clickAction[0].linkToSurvey);
      }
    });
  }


  getAllLocations(index: any, arr: any) {
    const roomRequestVM: any = {};
    roomRequestVM.eventId = this.eventId;
    roomRequestVM.roleId = this.localStorage.get('RoleId');
    roomRequestVM.boothAdminid = this.localStorage.get('UserId');
    this.roomService.getRooms(roomRequestVM).subscribe((res) => {
      if (res.isSuccess) {
        this.locationModel = res.rooms;
        const initialState = {
          allLocations: this.locationModel,
          selectedLocation: arr[index].clickAction[0].linkLocation
        };
        this.modalRef = this.modalService.show(LinkLocationComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
        this.modalRef.content.closeBtnName = 'Close';
        this.modalRef.content.event.subscribe(resp => {
          if (arr[index].clickAction[0].linkLocation) {
            arr[index].clickAction[0].linkLocation = resp.data;
          } else {
            arr[index].clickAction[0].linkLocation = [];
            arr[index].clickAction[0].linkLocation = (resp.data);
          }
        });
        console.log(arr[index].clickAction[0].linkLocation);
        arr[index].selectedAction = 'linkLocation';
      }
    });
  }


  bringToFrontItem(item) {
    item.zIndex = item.zIndex + 5;
  }

  bringToBackItem(item) {
    item.zIndex = item.zIndex - 5;
    if (item.zIndex < 0) {
      item.zIndex = 0;
    }
  }

  //#endregion


  ConvertToInt(val) {
    return parseInt(val) + 2;
  }
}
