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
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { QuizService } from 'src/app/Services/quiz.service';
import { SurveysService } from 'src/app/Services/surveys.service';
import { PollsService } from 'src/app/Services/polls.service';
import { RoomsService } from 'src/app/Services/rooms.service';

@Component({
  selector: 'app-update-badge',
  templateUrl: './update-badge.component.html',
  styleUrls: ['./update-badge.component.css']
})
export class UpdateBadgeComponent implements OnInit {
  eventName = '';
  badgeId = '';
  eventId = '';
  modalRef: BsModalRef;
  inputBadgeModel: any = {};
  leaderBoardId = '';
  adminLeaderboardBadges: any = {};
  getbyIdViewModel: any = {};
  leaderboardActivity: [];
  ruleType = '';
  QualificationRule: any = {};
  rule: any = {};
  tempLeaderboardActivity: any = [];
  rules: string = '';
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
  ruleTypesss = '';


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
    private pollService: PollsService,
    private roomService: RoomsService) {
    this.eventName = this.localStorageService.get('EventName');
    this.badgeId = this.route.snapshot.paramMap.get('badgeId');
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.adminLeaderboardBadges.badgeFor = 'Attendees';

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
    this.getBadgeDetails();
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
      type: 'completeItem',
      itemKey: [],
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: ''
    };
    this.durationVisitType = {
      type: 'duration',
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
      type: 'others',
      typeId: ''
    };
    this.presentationVisitType = {
      type: 'presentation/web cast',
      count: 1,
      minDuration: 0,
      minAttendees: 0,
      presentation: '',
      mode: '',
      typeId: ''
    };
    this.roomSpecificVisitType = {
      type: 'room specific',
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

  getBadgeDetails() {
    this.getbyIdViewModel.id = this.badgeId;
    this.leaderboardService.getLeaderBoardBadges(this.getbyIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.adminLeaderboardBadges = res.adminLeaderboardBadges;
        if (this.adminLeaderboardBadges.visitType && this.adminLeaderboardBadges.visitType !== '' && this.adminLeaderboardBadges.visitType !== null) {

          this.adminLeaderboardBadges.visitType = JSON.parse(this.adminLeaderboardBadges.visitType);
          this.ruleType = this.adminLeaderboardBadges.visitType.type.toLowerCase();
          this.leaderboardActivity = this.tempLeaderboardActivity.filter(u => u.leaderboardActivityType.toLowerCase() === this.ruleType.toLowerCase()).sort();
          
           this.ruleTypesss = this.adminLeaderboardBadges.visitType.typeId.toLowerCase() + '_' + this.adminLeaderboardBadges.visitType.type.toLowerCase();
        }
        this.adminLeaderboardBadges.modifiedBy = this.localStorageService.get('UserId');
      } else {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: res.message,
          icon: 'warning',
          confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertOkButtonText
        }).then(() => {
        });
      }
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
      keyboard:false,
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
          if (this.helper.validateIconFileSize(file, size)) {
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
          } else {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).invalidFileType,
              text: 'upload file of ' + size + '*' + size,
              icon: 'error'
            });
            this.spinner.hide();
          }
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
    this.leaderboardActivity = this.tempLeaderboardActivity.filter(u => u.leaderboardActivityType.toLowerCase() === event.target.value.toLowerCase()).sort();
  }

  selectRuleType(event) {
    this.initializeActivityTypeItems();
    const selectedActivity =  event.target.value.split('_');
    const type = selectedActivity[1].toLowerCase();
    const typeId = selectedActivity[0].toLowerCase();
    if (type === 'Click'.toLowerCase()) {
      this.adminLeaderboardBadges.visitType = this.clickVisitType;
    }
    else if (type === 'completeItem'.toLowerCase()) {
      this.adminLeaderboardBadges.visitType = this.completeItem;
      if (type.toLowerCase() === '4e44a845-22bf-41fe-8084-7a6d29d0fcc6') {
        this.adminLeaderboardBadges.itemKey = [];
      }
    }
    else if (type === 'Duration'.toLowerCase()) {
      this.adminLeaderboardBadges.visitType = this.durationVisitType;
    }
    else if (type === 'Login/visit'.toLowerCase()) {
      this.adminLeaderboardBadges.visitType = this.loginVisitType;
    } else if (type === 'Others'.toLowerCase()) {
      this.adminLeaderboardBadges.visitType = this.othersVisitType;
    } else if (type === 'Presentation/Web cast'.toLowerCase()) {
      this.adminLeaderboardBadges.visitType = this.presentationVisitType;
    } else if (type === 'Room Specific'.toLowerCase()) {
      this.adminLeaderboardBadges.visitType = this.roomSpecificVisitType;
    } else {
      this.adminLeaderboardBadges.visitType = {};
    }
    this.adminLeaderboardBadges.visitType.typeId = typeId;
    this.adminLeaderboardBadges.leaderboardActvityId=typeId;

console.log(this.adminLeaderboardBadges);
  }
}
