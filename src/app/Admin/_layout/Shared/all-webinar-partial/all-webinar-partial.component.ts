import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { RoomsService } from 'src/app/Services/rooms.service';
import * as AppUtils from 'src/app/Utils/apputils';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/Services/language.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Helper } from 'src/app/Utils/Helper';
import { SurveysService } from 'src/app/Services/surveys.service';
import { threadId } from 'worker_threads';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-all-webinar-partial',
  templateUrl: './all-webinar-partial.component.html',
  styleUrls: ['./all-webinar-partial.component.css']
})
export class AllWebinarPartialComponent implements OnInit {

  // index:  any;
  // roomId:  any;
  // addToWebinar: any = [];

  eventName = '';
  showAddOrUpdate = false;
  showWebinarList = true;
  showWebinarCategoryAddUpdate = false;
  ShowWebinarCategory = false;
  webinarCategories: any[] = [];
  isWebinarCategoryAdd = false;
  inputWebinarModel: any = {};
  languageDropdownList = [];
  selectedLanguagesArr: Array<string> = [];
  dropdownSettings: IDropdownSettings = {};
  timeBracketEnabled = false;
  useSurvey = false;
  InvalidDate = false;
  InvalidTime = false;
  createroomEndMinDate: any;
  roomStartMinDate: any;
  roomEndMaxDate: any;
  allEventLevelSurveys: any[] = [];
  webinarList: any[] = [];
  isWebinarUpdate = false;
  constructor(
    private localStorageService: LocalStorageService,
    private translate: TranslateService,
    public bsModalRef: BsModalRef,
    private roomService: RoomsService,
    private route: ActivatedRoute,
    private langugeService: LanguageService,
    private eventManagementService: EventsManagementService,
    private spinner: NgxSpinnerService,
    private helper: Helper,
    private surveyService: SurveysService) {

    this.inputWebinarModel.webinarCategoryId = '';
    this.inputWebinarModel.webinarType = 'webinar.net';
    this.eventName = this.localStorageService.get('EventName');
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
    this.getEventDetails();
    this.getAllEventLevelSurveys();
    this.getAvailableLanguages();
    this.getWebinarCategory();
    this.getWebinarList();
  }


  getEventDetails() {
    const reqModel: any = {};
    reqModel.id = this.localStorageService.get('EventId');
    this.eventManagementService.GetEventDetails(reqModel).subscribe((res) => {
      if (res.isSuccess) {
        const roomStartMinDate = new Date(res.usersEvent.eventStartDate);
        this.roomStartMinDate = {
          'year': roomStartMinDate.getFullYear(),
          'month': roomStartMinDate.getMonth() + 1,
          'day': roomStartMinDate.getDate()
        };

        const roomEndMaxDate = new Date(res.usersEvent.eventEndDate);
        this.roomEndMaxDate = {
          'year': roomEndMaxDate.getFullYear(),
          'month': roomEndMaxDate.getMonth() + 1,
          'day': roomEndMaxDate.getDate()
        };


      } else {
        // console.log(res.errors);
      }

    });
  }


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


  AddWebinar() {
    this.showAddOrUpdate = true;
    this.showWebinarList = false;
    this.ShowWebinarCategory = false;
    this.inputWebinarModel = {};
    
  }

  showWebinarCategory() {
    this.showAddOrUpdate = false;
    this.showWebinarList = false;
    this.ShowWebinarCategory = true;
  }

  BackToWebinarList() {
    this.showAddOrUpdate = false;
    this.showWebinarList = true;
    this.ShowWebinarCategory = false;
  }

  getWebinarCategory() {
    const reqModel: any = {};
    reqModel.id = this.localStorageService.get('EventId');
    this.roomService.getWebinarCategoryList(reqModel).subscribe((res) => {
      if (res.isSuccess) {
        res.webinarCategories.forEach(element => {
          element.isWebinarCategoryAdd = false;
        });
        this.webinarCategories = res.webinarCategories;
      } else {

      }
    })
  }

  AddNewCategory() {
    var item: any = {};
    item.webinarCategoryId = AppUtils.emptyGuid;
    item.categoryName = '';
    item.eventId = this.localStorageService.get('EventId');
    item.createdBy = this.localStorageService.get('UserId');
    item.isWebinarCategoryAdd = true;
    this.webinarCategories.push(item);
  }

  editWebinarCategory(webinarCategoryItem) {
    webinarCategoryItem.isWebinarCategoryAdd = true;
    webinarCategoryItem.modifiedBy = this.localStorageService.get('UserId');
  }

  deleteWebinarCategory(webinarCategoryItem) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.value) {
        webinarCategoryItem.isActive = false;
        webinarCategoryItem.modifiedBy = this.localStorageService.get('UserId');
        this.roomService.upsertWebinarCategory(webinarCategoryItem).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: new SweetAlertMessage(this.translate).sweetAlertDeletedSuccessMessage,
              icon: 'success'
            });
            this.getWebinarCategory();
          } else {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              text: res.message,
              icon: 'error'
            });
          }
        });
      }
    });
  }


  upsertWebinarCategory(webinarCategoryItem) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertUpdateMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertWhitelistUpdateMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).no
    }).then((result) => {
      if (result.value) {
        this.roomService.upsertWebinarCategory(webinarCategoryItem).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: webinarCategoryItem.webinarCategoryId === AppUtils.emptyGuid ? new SweetAlertMessage(this.translate).savedSuccessfully : new SweetAlertMessage(this.translate).updatedSuccessfullyMessage,
              icon: 'success'
            });
            this.getWebinarCategory();
          } else {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              text: res.message,
              icon: 'error'
            });
          }
        });
      }
    });
  }

  cancelWebinarCategory(webinarCategoryItem) {
    this.getWebinarCategory();
  }


  timeBracketChangedChanged() {
    this.timeBracketEnabled = !this.timeBracketEnabled;
    this.inputWebinarModel.enableTimeBracket = this.timeBracketEnabled;
    if (this.timeBracketEnabled) {
      this.inputWebinarModel.startDate = null;
      this.inputWebinarModel.startTime = null;
      this.inputWebinarModel.endDate = null;
      this.inputWebinarModel.endTime = null;
    }
  }


  validateRoomDates() {
    if (this.inputWebinarModel.startDate != null && this.inputWebinarModel.startDate == null) {
      return false;
    } else if (this.inputWebinarModel.startDate == null && this.inputWebinarModel.startDate != null) {
      this.InvalidDate = true;
    } else {
      if (this.inputWebinarModel.startDate == null) {
        this.InvalidDate = true;
      } else {
        if (new Date(this.inputWebinarModel.startDate) > new Date(this.inputWebinarModel.endDate)) {
          this.InvalidDate = true;
        } else {
          this.InvalidDate = false;
        }
      }
    }
    const createroomEndMinDate = new Date(this.inputWebinarModel.startDate);
    this.createroomEndMinDate = {
      'year': createroomEndMinDate.getFullYear(),
      'month': createroomEndMinDate.getMonth() + 1,
      'day': createroomEndMinDate.getDate()
    };
  }

  validateRoomTime() {

    if (this.inputWebinarModel.startTime != null && this.inputWebinarModel.endTime == null) {
      return false;
    } else if (this.inputWebinarModel.startTime == null && this.inputWebinarModel.endTime != null) {
      this.InvalidTime = true;
    } else {
      if (this.inputWebinarModel.startTime == null) {
        this.InvalidTime = true;
      } else {
        if (new Date(this.inputWebinarModel.startTime).getTime() > new Date(this.inputWebinarModel.endTime).getTime()) {
          if (this.inputWebinarModel.startDate === this.inputWebinarModel.endDate) {
            this.InvalidTime = true;
          } else {
            this.InvalidTime = false;
          }
        } else {
          this.InvalidTime = false;
        }


      }
    }

  }


  closeModal() {
    this.bsModalRef.hide();
  }


  onFileChange(event) {
    this.spinner.show();
    if (event.target.files.length > 0) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        if (this.helper.validateImageFile(file.name)) {
          formData.append('uploadFile', file, file.name);
          this.roomService.uploadWebinarLogo(formData).subscribe((res) => {
            if (res.isSuccess) {
              this.inputWebinarModel.logo = res.message;
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
          event.target.value = '';

        }
      }
    } else {
      this.spinner.hide();
    }
  }


  useSurveyCheckChanged() {
    this.useSurvey = !this.useSurvey;
    this.inputWebinarModel.useSurvey = this.useSurvey;
    if (this.useSurvey) {
      this.inputWebinarModel.survey = '';
    }
  }

  getAllEventLevelSurveys() {
    const reqModel: any = {};
    reqModel.eventId = this.localStorageService.get('EventId');
    reqModel.userId = this.localStorageService.get('UserId');
    this.surveyService.getAllEventLevelSurveyslist(reqModel).subscribe((res) => {
      if (res.isSuccess) {
        this.allEventLevelSurveys = res.createSurveyListViewModels;
      } else {
        this.allEventLevelSurveys = [];
      }
    })
  }
  removeBoothIcon() {
    this.inputWebinarModel.logo = '';
  }
  saveWebinar() {
    console.log(this.inputWebinarModel);
    this.inputWebinarModel.createdBy = this.localStorageService.get('UserId');
    this.inputWebinarModel.modifiedBy = this.localStorageService.get('UserId');
    this.inputWebinarModel.eventId = this.localStorageService.get('EventId');
    this.inputWebinarModel.isActive = true;
    this.roomService.upsertWebinar(this.inputWebinarModel).subscribe((res) => {
      if (res.isSuccess) {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: this.inputWebinarModel.webinarId === AppUtils.emptyGuid ? new SweetAlertMessage(this.translate).savedSuccessfully : new SweetAlertMessage(this.translate).updatedSuccessfullyMessage,
          icon: 'success'
        });
        this.getWebinarList();
      } else {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: res.message,
          icon: 'error'
        });
      }
    })
  }

  getWebinarList() {
    this.BackToWebinarList();
    this.isWebinarUpdate = false;
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

  editWebinar(webinarItem) {
    this.isWebinarUpdate = true;
    this.showAddOrUpdate = true;
    this.showWebinarList = false;
    this.ShowWebinarCategory = false;
    this.inputWebinarModel = webinarItem;
    this.useSurvey = this.inputWebinarModel.useSurvey;
    console.log(this.inputWebinarModel);
  }
  deleteWebinar(webinarItem) {
    webinarItem.createdBy = this.localStorageService.get('UserId');
    webinarItem.modifiedBy = this.localStorageService.get('UserId');
    webinarItem.eventId = this.localStorageService.get('EventId');
    webinarItem.isActive = false;
    this.roomService.upsertWebinar(webinarItem).subscribe((res) => {
      if (res.isSuccess) {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).sweetAlertDeletedSuccessMessage,
          icon: 'success'
        });
        this.getWebinarList();

      } else {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: res.message,
          icon: 'error'
        });
      }
    })
  }
  upsertWebinar(webinarItem) {
    webinarItem.createdBy = this.localStorageService.get('UserId');
    webinarItem.modifiedBy = this.localStorageService.get('UserId');
    webinarItem.eventId = this.localStorageService.get('EventId');
    webinarItem.isActive = true;
    this.roomService.upsertWebinar(webinarItem).subscribe((res) => {
      if (res.isSuccess) {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: webinarItem.webinarId === AppUtils.emptyGuid ? new SweetAlertMessage(this.translate).savedSuccessfully : new SweetAlertMessage(this.translate).updatedSuccessfullyMessage,
          icon: 'success'
        });
        this.getWebinarList();
      } else {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: res.message,
          icon: 'error'
        });
      }
    })
  }
  cancelWebinar(webinarItem) {
    this.isWebinarUpdate = false;
    this.getWebinarList();
  }
}
