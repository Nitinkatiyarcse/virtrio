import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { BadgeAddRuleModelComponent } from 'src/app/Admin/_layout/Shared/_sidebar/badge-add-rule-model/badge-add-rule-model.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationService } from 'src/app/Utils/NavigationService';
import { Helper } from 'src/app/Utils/Helper';
import { LeaderboardService } from 'src/app/Services/leaderboard.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { isJSDocThisTag, textChangeRangeIsUnchanged } from 'typescript';
import { QuizService } from 'src/app/Services/quiz.service';
import { SurveysService } from 'src/app/Services/surveys.service';
import { PollsService } from 'src/app/Services/polls.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RoomsService } from 'src/app/Services/rooms.service';
import { of } from 'rxjs';
import { AttendeesService } from 'src/app/Services/attendees.service';


@Component({
  selector: 'app-create-badge',
  templateUrl: './create-badge.component.html',
  styleUrls: ['./create-badge.component.css']
})
export class CreateBadgeComponent implements OnInit {
  eventName = '';
  eventId = '';
  modalRef: BsModalRef;
  inputBadgeModel: any = {};
  leaderBoardId = '';
  adminLeaderboardBadges: any = {};
  QualificationRule: any = {};
  rule: any = {};
  leaderboardActivity: any = [];
  tempLeaderboardActivity: any = [];

  requiredField = false;
  dropdownSettings: IDropdownSettings = {};
  allEventLevelSurveys: any = [];
  allboothLevelSurveys: any = [];
  allPolls: any = [];
  allQuiz: any = [];
  allBooths: any = [];
  allAuditorium: any = [];
  allCustomRooms: any = [];
  allExihibitHalls: any = [];
  allMeetingRooms: any = [];
  allLobbies: any = [];
  allLounges: any = [];
  allRooms: any = [];
  allRoomsOtherThanBooths: any = [];
  leaderboardActivityType: any = [];
  clickVisitType: any;
  completeItem: any;
  loginVisitType: any;
  othersVisitType: any;
  presentationVisitType: any;
  durationVisitType: any;
  roomSpecificVisitType: any;
  RuleTypesss: any;
  audiVideoList: any;
  boothVideoList: any;
  webinarList: any;
  constructor(
    private route: ActivatedRoute,
    public getterSetterService: GetterSetterService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private navigation: NavigationService,
    public router: Router,
    private helper: Helper,
    private localStorageService: LocalStorageService,
    private modalService: BsModalService,
    private leaderboardService: LeaderboardService,
    private quizService: QuizService,
    private surveyService: SurveysService,
    private pollService: PollsService, private attendeeService: AttendeesService,
    private roomService: RoomsService) {
    this.eventName = this.localStorageService.get('EventName');
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.leaderBoardId = this.route.snapshot.paramMap.get('leaderboardId');
    this.adminLeaderboardBadges.badgeFor = 'Attendees';
    this.adminLeaderboardBadges.createdBy = this.localStorageService.get('UserId');
    this.adminLeaderboardBadges.adminLeaderboardId = this.leaderBoardId;
    this.initializeActivityTypeItems();
    this.allEventLevelSurveys = [];
    this.allboothLevelSurveys = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: new SweetAlertMessage(this.translate).selectAllText,
      unSelectAllText: new SweetAlertMessage(this.translate).unSelectAllText,
      itemsShowLimit: 3,
      allowSearchFilter: true,

    };
    this.getAllQuiz();
    this.getAllPolls();
    this.getAllEventLevelSurveys();
    this.getAllBoothLevelSurveys();
    this.getRooms();
    this.getLeaderboardActivity();
  }
  ngOnInit(): void {
  }

  initializeActivityTypeItems() {
    if (this.adminLeaderboardBadges === undefined) {
      this.adminLeaderboardBadges = {};
    } else {
      this.adminLeaderboardBadges.visitType = {};
    }

    this.clickVisitType = {
      type: 'click',
      count: 1,
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      typeId: ''
    };
    this.completeItem = {
      type: 'Complete Items',
      itemKey: [],
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: ''
    };
    this.durationVisitType = {
      type: 'Duration',
      itemKey: [],
      minDuration: 60,
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      typeId: ''
    }

    this.loginVisitType = {
      type: 'Login/visit',
      itemKey: [],
      count: 1,
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      typeId: ''
    };
    this.othersVisitType = {
      type: 'Others',
      typeId: ''
    };
    this.presentationVisitType = {
      type: 'Presentation/Resources',
      count: 1,
      minDuration: 0,
      minAttendees: 0,
      presentation: '',
      mode: '',
      typeId: ''
    };
    this.roomSpecificVisitType = {
      type: 'Room Specific',
      itemKey: [],
      count: 1,
      typeId: ''
    };



  }

  setClass() {
    if (this.adminLeaderboardBadges.visitType.itemKey.length > 0) {
      return 'validField';
    } else {
      return 'invalidField';
    }

  }

  getAllQuiz() {
    const reqModel: any = {};
    reqModel.eventId = this.eventId;
    reqModel.userId = this.localStorageService.get('UserId');
    this.quizService.getQuizlist(reqModel).subscribe((res) => {
      if (res.isSuccess) {
        // this.allQuiz = res.quizQuestionsViewModels;
        res.quizQuestionsViewModels.forEach(item => {
          this.allQuiz.push({ 'item_id': item.quiz.quizId, 'item_text': item.quiz.title });
        });
      } else {
        this.allQuiz = [];
      }
    });
  }

  getAllPolls() {
    const reqModel: any = {};
    reqModel.eventId = this.eventId;
    reqModel.userId = this.localStorageService.get('UserId');
    this.pollService.getPollslist(reqModel).subscribe((res) => {
      if (res.isSuccess) {
        //this.allPolls = res.pollsList;
        res.pollsList.forEach(item => {
          this.allPolls.push({ 'item_id': item.polls.pollId, 'item_text': item.polls.pollTitle });
        });
      } else {
        this.allPolls = [];
      }
    });
  }

  getAllEventLevelSurveys() {
    const reqModel: any = {};
    reqModel.eventId = this.eventId;
    reqModel.userId = this.localStorageService.get('UserId');
    this.surveyService.getAllEventLevelSurveyslist(reqModel).subscribe((res) => {
      if (res.isSuccess) {

        res.createSurveyListViewModels.forEach(item => {
          this.allEventLevelSurveys.push({ 'item_id': item.surveys.surveyId, 'item_text': item.surveys.title });
        });
      } else {
        this.allEventLevelSurveys = [];
      }
    })
  }

  getAllBoothLevelSurveys() {
    const reqModel: any = {};
    reqModel.eventId = this.eventId;
    reqModel.userId = this.localStorageService.get('UserId');
    this.surveyService.getAllBoothLevelSurveyslist(reqModel).subscribe((res) => {
      if (res.isSuccess) {

        res.createSurveyListViewModels.forEach(item => {
          this.allboothLevelSurveys.push({ 'item_id': item.surveys.surveyId, 'item_text': item.surveys.title });
        });
      } else {
        this.allboothLevelSurveys = [];
      }
    })
  }
  getRooms() {
    // this.getByIdViewModel.id = this.eventId;
    const roomRequestVM: any = {};
    roomRequestVM.eventId = this.eventId;
    roomRequestVM.roleId = this.localStorageService.get('RoleId');
    roomRequestVM.boothAdminid = this.localStorageService.get('UserId');
    this.roomService.getRooms(roomRequestVM).subscribe((res) => {
      if (res.isSuccess) {
        res.rooms.forEach(item => {
          this.allRooms.push({ 'item_id': item.roomId, 'item_text': item.name });
          if (item.roomTypes.roomType === 'Booth') {
            // room is booth
            this.allBooths.push({ 'item_id': item.roomId, 'item_text': item.name });
          } else {
            this.allRoomsOtherThanBooths.push({ 'item_id': item.roomId, 'item_text': item.name });
          }
          if (item.roomTypes.roomType === 'Auditorium') {
            // room is auditorium
            this.allAuditorium.push({ 'item_id': item.roomId, 'item_text': item.name });
          } else if (item.roomTypes.roomType === 'Custom Room') {
            // room is custom room
            this.allCustomRooms.push({ 'item_id': item.roomId, 'item_text': item.name });
          } else if (item.roomTypes.roomType === 'Meeting Room') {
            // room is Meeting room
            this.allMeetingRooms.push({ 'item_id': item.roomId, 'item_text': item.name });
          } else if (item.roomTypes.roomType === 'Hall') {
            // room isHall
            this.allExihibitHalls.push({ 'item_id': item.roomId, 'item_text': item.name });
          } else if (item.roomTypes.roomType === 'Lobby') {
            // room is Lobby
            this.allLobbies.push({ 'item_id': item.roomId, 'item_text': item.name });
          } else if (item.roomTypes.roomType === 'Lounge') {
            // room is Lounge
            this.allLounges.push({ 'item_id': item.roomId, 'item_text': item.name });
          }
        });
      }
    });

  }
  getLeaderboardActivity() {
    this.leaderboardService.getLeaderboardActivity().subscribe((res) => {
      this.tempLeaderboardActivity = res;
      res.forEach(element => {
        if (this.leaderboardActivityType.indexOf(element.leaderboardActivityType) === -1) {
          this.leaderboardActivityType.push(element.leaderboardActivityType);
        }
      });
      this.leaderboardActivityType.sort();

    });
  }

  saveBadge() {
    console.log(this.adminLeaderboardBadges);
    this.adminLeaderboardBadges.visitType = JSON.stringify(this.adminLeaderboardBadges.visitType);
    console.log(this.adminLeaderboardBadges);

    this.leaderboardService.upsertLeaderBoardBadges(this.adminLeaderboardBadges).subscribe((res) => {
      if (res.isSuccess) {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).savedSuccessfully,
          icon: 'success',
          confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
        }).then(() => {
          location.href = '/admin/events/Leaderboard/' + this.eventId;
        });
      } else {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: res.message,
          icon: 'error',
          confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
        }).then(() => {
          location.href = '/admin/events/Leaderboard/' + this.eventId;
        });
      }
      this.spinner.hide();
    });

  }

  getRoomShowOption(event, type) {

  }

  selectBadgeFor(event, val) {
    if (event.target.checked) {
      this.adminLeaderboardBadges.badgeFor = val;
    }
  }

  addRule() {
    const initialState = {
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard: false,
    };
    const modalParamss = Object.assign({}, modalConfig, { initialState, class: 'modal-lg' });
    this.modalRef = this.modalService.show(BadgeAddRuleModelComponent, modalParamss);
  }

  onFileChange(event, size) {
    this.spinner.show();
    if (event.target.files.length > 0) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        if (this.helper.validateImageFile(file.name)) {
          // if (this.helper.validateIconFileSize(file, size)) {
          formData.append('uploadFile', file, file.name);
          this.leaderboardService.uploadBadgeImage(formData).subscribe((res) => {
            if (res.isSuccess) {
              if (size === 24) {
                this.adminLeaderboardBadges.smallImageUrl = res.message;
              }
              if (size === 48) {
                this.adminLeaderboardBadges.largeImageUrl = res.message;

              }
            }
            this.spinner.hide();
          });
          // } else {
          //   Swal.fire({
          //     title: new SweetAlertMessage(this.translate).invalidFileType,
          //     text:  'upload file of ' + size + '*' + size,
          //     icon: 'error'
          //   });
          //   event.target.value = '';
          //   this.spinner.hide();
          // }
        } else {
          this.spinner.hide();
          Swal.fire({
            title: new SweetAlertMessage(this.translate).invalidFileType,
            text: new SweetAlertMessage(this.translate).onlypngjpgandjpegareallowed,
            icon: 'error'
          });
          event.target.value = '';

        }
      }
    } else {
      this.spinner.hide();
    }
  }


  showActivities(event) {
    this.initializeActivityTypeItems();
    this.leaderboardActivity = this.tempLeaderboardActivity.filter(u => u.leaderboardActivityType === event.target.value).sort();
    console.log("this.leaderboardActivity");
    console.log(this.leaderboardActivity);
  }

  selectRuleType(event) {
    this.initializeActivityTypeItems();
    const selectedActivity = event.target.value.split('_');
    const type = selectedActivity[1];
    const typeId = selectedActivity[0];
    if (type === 'Click') {
      this.adminLeaderboardBadges.visitType = this.clickVisitType;
    }
    else if (type === 'Complete Items') {
      this.adminLeaderboardBadges.visitType = this.completeItem;
      if (type.toLowerCase() === '4e44a845-22bf-41fe-8084-7a6d29d0fcc6') {
        this.adminLeaderboardBadges.itemKey = [];
      }
    }
    else if (type === 'Duration') {
      this.adminLeaderboardBadges.visitType = this.durationVisitType;
    }
    else if (type === 'Login/visit') {
      this.adminLeaderboardBadges.visitType = this.loginVisitType;
    } else if (type === 'Others') {
      this.adminLeaderboardBadges.visitType = this.othersVisitType;
    } else if (type === 'Presentation/Resources') {
      this.adminLeaderboardBadges.visitType = this.presentationVisitType;
      var room: any = {};
      room.eventId = this.eventId;
      room.roomTypes = {};
      if (typeId.toUpperCase() == 'CE8EF9D2-A46E-4887-9880-4D08AD17513E') {
        // watching auditorium videos
        room.roomTypes.roomTypeId = '628DC63A-AF75-4005-B980-3C77731DF674';
        this.getAllVideos(room, 'auditorium');
      }
      if (typeId.toUpperCase() == "B1A5D96E-BB0C-4461-B808-EE1C95A88738") {
        // watching booth videos
        room.roomTypes.roomTypeId = '6426FB62-E428-43FE-BB58-3F1252FBA304';
        this.getAllVideos(room, 'booth');
      }
      if (typeId.toUpperCase() == '8A1BDA04-1C21-43A7-83DF-94A3046CC613') {
        // get webbiners
        this.getWebinars();

      }
    } else if (type === 'Room Specific') {
      this.adminLeaderboardBadges.visitType = this.roomSpecificVisitType;
    } else {
      this.adminLeaderboardBadges.visitType = {};
    }
    this.adminLeaderboardBadges.visitType.typeId = typeId;
    this.adminLeaderboardBadges.leaderboardActvityId = typeId;

  }

  getAllVideos(room, type) {
    this.attendeeService.getEventsVideoItems(room).subscribe((res) => {
      if (res.isSuccess) {
        if (type == 'auditorium') {
          this.audiVideoList = res.videoInfos;

        }
        if (type == 'booth') {
          this.boothVideoList = res.videoInfos
        }
      }
    })
  }

  getWebinars() {
    const webinarViewModel: any = {};
    webinarViewModel.eventId = this.localStorageService.get('EventId');
    //webinarViewModel.roomId = this.roomId;
    this.roomService.getEventWebinars(webinarViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.webinarList = res.webinarViewModels;
      } else {
        this.webinarList = [];
      }
    })
  }
}

