import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { from, BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { EventEntitlementService } from 'src/app/Services/event-entitlement.service';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { isPostfixUnaryExpression } from 'typescript';
import { LanguageService } from 'src/app/Services/language.service';
import { SweetAlertMessage } from '../../../Utils/SweetAlertMessages';
import * as AppUtils from '../../../Utils/apputils';
import { Helper } from 'src/app/Utils/Helper';
import { ClientService } from 'src/app/Services/client.service';
import { RoomsService } from 'src/app/Services/rooms.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";


@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent implements OnInit {
  @ViewChild('fileuploadeventBrochure') fileuploadeventBrochure: ElementRef;

  eventName = '';
  isDisabled = false;
  progress: number;
  eventUrl = AppUtils.EventUrl;
  getByIdViewModel: any = {};
  inputEventModel: any = {};
  isEnableEditRegistrationInfoAllowed = false;
  languageDropdownList = [];
  entitlementDropdownList = [];
  selectedLanguagesArr: Array<string> = [];
  selectedEntitlementsArr: Array<string> = [];
  selectedLanguages = [];
  requiredField = true;
  entitlementRequiredField = false;
  dropdownSettings: IDropdownSettings = {};
  EntitlementDropdownSettings: IDropdownSettings = {};
  isGAEnabled = false;
  isWCEnabled = false;
  isThirdPartyAnalyticsEnabled = false;
  isTermsAndConditionsAddLinkSelected = true;
  isPrivacyPolicyAddLinkSelected = true;
  // selectedTimeZone = '';
  sweetAlertSuccessHeader = '';
  sweetAlertSuccessMessage = '';
  sweetAlertEventUpdatedSuccessfullyMessage = '';
  sweetAlertErrorHeader = '';
  sweetAlertErrorMessage = '';
  sweetAlertConfirmButtonText = '';
  InvalidDate = false;
  InvalidTime = false;
  InvalidProjectDate = false;
  InvalidOpenRegistrationDate = false;
  InvalidOpenRegistrationTime = false;
  InvalidPreviewDate = false;
  InvalidPreviewTime = false;
  InvalidAfterEventAccessDate = false;
  InvaildAfterEventAccessTime = false;
  InvalidReportAccessDate = false;
  InvaildReportAccessTime = false;
  allTimezones = [];
  allClients: any;
  isSuperAdmin = false;
  projectStartMinDate: any;
  projectEndMinDate: any;
  projectEndMaxDate: any;
  afterEventAccessMinDate: any;
  eventStartMinDate: any;
  eventEndMinDate: any;

  eventEndDate: any;

  openRegistrationMinEndDate: any;
  eventPreviewMinEndDate: any;
  afterEventAccessMinEndDate: any;
  reportAccessStartMinDate: any;
  reportAccessMinEndDate: any;
  domainUrl = '';
  clientUrlSlug = '';
  config: any;
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private location: Location,
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    public router: Router,
    private roomService: RoomsService,
    private eventManagementService: EventsManagementService,
    private langugeService: LanguageService,
    private sweetAlertMessage: SweetAlertMessage,
    private helper: Helper,
    private eventEntitlementService: EventEntitlementService,
    private clientService: ClientService
  ) {
    this.localStorage.set('isEventSelected', 'true');
    this.domainUrl = AppUtils.EventUrl;
    this.GetAllTimezones();
    this.sweetAlertSuccessHeader = new SweetAlertMessage(this.translate).sweetAlertSuccessHeader;
    this.sweetAlertEventUpdatedSuccessfullyMessage = new SweetAlertMessage(this.translate).sweetAlertEventUpdatedSuccessfullyMessage;
    this.sweetAlertErrorHeader = this.translate.instant('Error');
    this.sweetAlertConfirmButtonText = this.translate.instant('OK');
    this.isSuperAdmin = (this.localStorage.get('Role') === 'SuperAdmin' ? true : false);
    const currentDate = new Date();
    this.projectStartMinDate = {
      'year': currentDate.getFullYear(),
      'month': currentDate.getMonth() + 1,
      'day': currentDate.getDate()
    };




  }

  ngOnInit(): void {
    this.config = {
      allowedContent: true,
      colorButton: true,
      extraPlugins: ['font', 'colorbutton', 'colordialog']
    };
    this.getByIdViewModel.id = this.route.snapshot.paramMap.get('id');
    this.inputEventModel.timeZoneId = '';
    // this.languageDropdownList.push({ item_id: 'cefd899c-b035-4cc2-9008-7a169639aa0b', item_text: 'English' });
    // this.languageDropdownList.push({ item_id: '18b02600-45c8-49f9-859a-afb35c6baae6', item_text: 'Japanese' });
    // this.getEntitelment();
    // this.bindGroupEntitlements();

    this.getAllClients();

    this.isGAEnabled = true;
    this.isWCEnabled = true;
    this.isThirdPartyAnalyticsEnabled = true;
    this.getAvailableLanguages();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
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

  }


  getSlugUrl(event) {
    this.clientUrlSlug = this.allClients.filter(x => x.clientId === event.target.value)[0].urlSlug;
  }


  getAllClients() {
    this.inputEventModel.clientId = '';
    this.clientService.getAllClients().subscribe((res) => {
      if (res.isSuccess) {

        this.allClients = res.clients;
        this.getEventDetails();
      } else {

      }

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


  setEntitlementClass() {
    this.entitlementRequiredField = true;
    if (this.selectedEntitlementsArr.length > 0) {
      return 'validField';
    } else {
      return 'invalidField';
    }
  }

  onEntitlementSelect(item: any) {
    this.selectedEntitlementsArr.push(item.item_id);
  }

  onEntitlementSelectAll(items: any) {
    for (let i = 0; i < items.length; i++) {
      if (this.selectedEntitlementsArr.indexOf(items[i].item_id) === -1) {
        this.selectedEntitlementsArr.push(items[i].item_id);
      }
    }
  }

  onEntitlementDeSelect(item: any) {
    const index = this.selectedEntitlementsArr.indexOf(item.item_id, 0);
    this.selectedEntitlementsArr.splice(index, 1);
    if (this.selectedEntitlementsArr.length === 0) {
      this.entitlementRequiredField = true;
    }
  }

  onEntitlementDeSelectAll(items: any) {
    this.selectedEntitlementsArr = [];
    if (this.selectedEntitlementsArr.length === 0) {
      this.entitlementRequiredField = true;
    }
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

  ifGAEnabled(e) {
    if (e.target.checked) {
      this.isGAEnabled = true;

    } else {
      this.isGAEnabled = false;
    }

  }

  ifWebcastEnabled(e) {
    if (e.target.checked) {
      this.isWCEnabled = true;
      this.inputEventModel.allowWebcast = true;
      this.inputEventModel.noOfWebcast = 0;
      this.inputEventModel.webcastMaxDuration = 0;

    } else {
      this.isWCEnabled = false;
      this.inputEventModel.allowWebcast = false;
      this.inputEventModel.noOfWebcast = 0;
      this.inputEventModel.webcastMaxDuration = 0;
    }
  }



  ifThirdPartyAnalyticsEnabled(e) {
    if (e.target.checked) {
      this.isThirdPartyAnalyticsEnabled = true;
    } else {
      this.isThirdPartyAnalyticsEnabled = false;
    }
  }

  showHideTAndCControls(e, type) {
    if (e.target.checked) {
      if (type === 'AddLink') {
        this.isTermsAndConditionsAddLinkSelected = true;

      } else {
        this.isTermsAndConditionsAddLinkSelected = false;
      }
    }
  }

  showHideEventPrivacyPolicyControls(e, type) {
    if (e.target.checked) {
      if (type === 'AddLink') {
        this.isPrivacyPolicyAddLinkSelected = true;
      } else {
        this.isPrivacyPolicyAddLinkSelected = false;
      }
    }
  }

  // selectTimeZone(value) {
  //   this.selectedTimeZone = value;
  // }

  getEventUrl(e) {
    this.inputEventModel.urlSlug = this.helper.removeSpecialCharacters(e.target.value).substring(0, 15);
    // const eventName = e.target.value;
    // this.inputEventModel.eventUrl = eventName.replace(/\s+/g, '');
    // const eventName = e.target.value;
    // this.urlSlug = this.helper.removeSpecialCharacters(eventName);
    // this.inputEventModel.eventUrl = AppUtils.EventUrl + '/' +
    //   this.allClients.filter(x => x.clientId === this.inputEventModel.clientId)[0].urlSlug + '/' +
    //   this.urlSlug;
  }

  saveEvent() {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertUpdateMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertWhitelistUpdateMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).no
    }).then((result) => {
      if (result.value) {
        this.inputEventModel.noOfBooths = 0;
        this.inputEventModel.noOfBooths = this.inputEventModel.noOfRooms;
        if (this.clientUrlSlug !== '' && this.inputEventModel.urlSlug !== '') {
          this.inputEventModel.eventUrl = '/' + this.clientUrlSlug + '/' + this.inputEventModel.urlSlug;
          if (this.inputEventModel.eventUrl !== '') {

            this.eventManagementService.checkValidEventUrl(this.inputEventModel).subscribe((res) => {
              if (res.isSuccess === false) {
                this.inputEventModel.errors = res.errors;
                console.log(this.inputEventModel);
              } else {
                this.inputEventModel.errors = [];
                this.UpdateEvent();
              }

            });
          }
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
      // this.spinner.hide();
    });
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
          const img = new Image();
          img.src = window.URL.createObjectURL(file);
          var x = true;
          img.addEventListener('load', () => {
            if (img.width > 200 || img.height > 200) {
              this.spinner.hide();
              Swal.fire({
                title: new SweetAlertMessage(this.translate).invalidFileType,
                text: new SweetAlertMessage(this.translate).imageSizeShouldNotMoreThan200,
                icon: 'error'
              });
            } else {
          formData.append('uploadFile', file, file.name);
          this.eventManagementService.uploadEventImage(formData).subscribe((res) => {
            if (res.isSuccess) {
              this.inputEventModel.eventLogo = res.message;
            }
            this.spinner.hide();
          });
        }
      }, false);
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

  deleteEventLogo() {
    this.inputEventModel.eventLogo = '';
  }

  onMainPageBannerImageFileChange(event) {
    this.spinner.show();
    if (event.target.files.length > 0) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        if (this.helper.validateImageFile(file.name)) {
          const img = new Image();
          img.src = window.URL.createObjectURL(file);
          var x = true;
          img.addEventListener('load', () => {
            if (img.width > 1280 || img.height > 720) {
              this.spinner.hide();
              Swal.fire({
                title: new SweetAlertMessage(this.translate).invalidFileType,
                text: new SweetAlertMessage(this.translate).imageSizeShouldNotMoreThan1920,
                icon: 'error'
              });
            } else {
          formData.append('uploadFile', file, file.name);
          this.eventManagementService.uploadEventImage(formData).subscribe((res) => {
            if (res.isSuccess) {
              this.inputEventModel.mainPageBannerImage = res.message;
            }
            this.spinner.hide();
          });
        }
      }, false);
          // } else {
          //   this.spinner.hide();
          //   Swal.fire({
          //     title: new SweetAlertMessage(this.translate).invalidFileType,
          //     text: new SweetAlertMessage(this.translate).imageSizeShouldNotMoreThan200,
          //     icon: 'error'
          //   });
          //   event.target.value = '';
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
      //}
    } else {
      this.spinner.hide();
    }
  }
}

  deleteMainPageBannerImage() {
    this.inputEventModel.mainPageBannerImage = '';
  }

  deleteEventBrochureFile() {
    this.inputEventModel.eventBrochure = '';
    this.fileuploadeventBrochure.nativeElement.value = '';
  }

  oneventBrochureFileChange(event) {
    this.spinner.show();
    if (event.target.files.length > 0) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        if (this.helper.validateDocFile(file.name)) {
          formData.append('uploadFile', file, file.name);
          this.eventManagementService.uploadEventBrochure(formData).subscribe((res) => {
            if (res.isSuccess) {
              this.inputEventModel.eventBrochure = res.message;
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
          event.target.value = '';
        }
      }

    } else {
      this.spinner.hide();
    }
  }


  getEventDetails() {
    this.spinner.show();
    this.eventManagementService.GetEventDetails(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {

        this.inputEventModel = res.usersEvent;
        console.log(this.inputEventModel);
        this.eventName = res.usersEvent.eventName;
        this.inputEventModel.afterEventAccessEndDate = (this.inputEventModel.afterEventAccessEndDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.afterEventAccessEndDate) : '';

        this.inputEventModel.afterEventAccessEndTime = (this.inputEventModel.afterEventAccessEndTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.afterEventAccessEndTime) : '';

        this.inputEventModel.afterEventAccessStartDate = (this.inputEventModel.afterEventAccessStartDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.afterEventAccessStartDate) : '';

        this.inputEventModel.afterEventAccessStartTime = (this.inputEventModel.afterEventAccessStartTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.afterEventAccessStartTime) : '';

        this.inputEventModel.eventEndDate = (this.inputEventModel.eventEndDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.eventEndDate) : '';

        this.inputEventModel.eventEndTime = (this.inputEventModel.eventEndTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.eventEndTime) : '';

        this.inputEventModel.eventStartDate = (this.inputEventModel.eventStartDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.eventStartDate) : '';

        this.inputEventModel.eventStartTime = (this.inputEventModel.eventStartTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.eventStartTime) : '';

        this.inputEventModel.previewEndDate = (this.inputEventModel.previewEndDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.previewEndDate) : '';

        this.inputEventModel.previewEndTime = (this.inputEventModel.previewEndTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.previewEndTime) : '';

        this.inputEventModel.previewStartDate = (this.inputEventModel.previewStartDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.previewStartDate) : '';

        this.inputEventModel.previewStartTime = (this.inputEventModel.previewStartTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.previewStartTime) : '';

        this.inputEventModel.projectStartDate = (this.inputEventModel.projectStartDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.projectStartDate) : '';

        this.inputEventModel.projectEndDate = (this.inputEventModel.projectEndDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.projectEndDate) : '';


        this.inputEventModel.registrationEndDate = (this.inputEventModel.registrationEndDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.registrationEndDate) : '';

        this.inputEventModel.registrationEndTime = (this.inputEventModel.registrationEndTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.registrationEndTime) : '';

        this.inputEventModel.registrationStartDate = (this.inputEventModel.registrationStartDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.registrationStartDate) : '';

        this.inputEventModel.registrationStartTime = (this.inputEventModel.registrationStartTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.registrationStartTime) : '';

        this.inputEventModel.reportAccessEndDate = (this.inputEventModel.reportAccessEndDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.reportAccessEndDate) : '';

        this.inputEventModel.reportAccessEndTime = (this.inputEventModel.reportAccessEndTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.reportAccessEndTime) : '';

        this.inputEventModel.reportAccessStartDate = (this.inputEventModel.reportAccessStartDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.reportAccessStartDate) : '';

        this.inputEventModel.reportAccessStartTime = (this.inputEventModel.reportAccessStartTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.inputEventModel.reportAccessStartTime) : '';


        if (this.inputEventModel.languageIds === ',') {
          this.inputEventModel.languageIds = '';

        }
        // this.selectedTimeZone = this.inputEventModel.timeZoneId;
        const tempSelectedlanArr = [];
        for (let i = 0; i < this.inputEventModel.languageIds.length; i++) {
          if (this.inputEventModel.languageIds[i] !== '') {
            if (this.selectedLanguagesArr.indexOf(this.inputEventModel.languageIds[i]) === -1) {
              this.selectedLanguagesArr.push(this.inputEventModel.languageIds[i]);
              tempSelectedlanArr.push({ item_id: this.inputEventModel.languageIds[i], item_text: this.inputEventModel.language[i] });
            }
          }
          this.selectedLanguages = tempSelectedlanArr;
          this.isGAEnabled = this.inputEventModel.gaEnabled;
          this.isWCEnabled = this.inputEventModel.allowWebcast;
          this.isThirdPartyAnalyticsEnabled = this.inputEventModel.thirdPartyAnalyticsEnabled;
          this.isPrivacyPolicyAddLinkSelected = this.inputEventModel.isLinkPrivacyPolicy;
          this.isTermsAndConditionsAddLinkSelected = this.inputEventModel.isLinkTermsAndConditions;
          // const temp = [];
          // for (let k = 0; k < this.inputEventModel.eventEntitlements.length; k++) {
          //   temp.push({
          //     item_id: this.inputEventModel.eventEntitlements[k].entitlementId,
          //     item_text: this.inputEventModel.eventEntitlements[k].entitlement
          //   });


          // }

          // this.entitlementDropdownList = temp;

          const tempEntitlementSelectedArr = [];
          for (let j = 0; j < this.entitlementDropdownList.length; j++) {


            this.selectedEntitlementsArr.push(this.entitlementDropdownList[j].item_id);
            tempEntitlementSelectedArr.push({
              item_id: this.entitlementDropdownList[j].item_id,
              item_text: this.entitlementDropdownList[j].item_text
            });

          }
          if (tempEntitlementSelectedArr.length > 0) {
            this.entitlementRequiredField = false;
          }
          this.selectedEntitlementsArr = tempEntitlementSelectedArr;




          const projectEndMinDateVal = new Date(this.inputEventModel.projectStartDate);
          this.projectEndMinDate = {
            'year': projectEndMinDateVal.getFullYear(),
            'month': projectEndMinDateVal.getMonth() + 1,
            'day': projectEndMinDateVal.getDate()
          };


          const projectEndMaxDateVal = new Date(this.inputEventModel.projectEndDate);
          this.projectEndMaxDate = {
            'year': projectEndMaxDateVal.getFullYear(),
            'month': projectEndMaxDateVal.getMonth() + 1,
            'day': projectEndMaxDateVal.getDate()
          };

          const reportAccessStartMinDateVal = new Date(this.inputEventModel.registrationStartDate);
          this.reportAccessStartMinDate = {
            'year': reportAccessStartMinDateVal.getFullYear(),
            'month': reportAccessStartMinDateVal.getMonth() + 1,
            'day': reportAccessStartMinDateVal.getDate()
          };


          const afterEventAccessMinDateVal = new Date(this.inputEventModel.eventEndDate);
          this.afterEventAccessMinDate = {
            'year': afterEventAccessMinDateVal.getFullYear(),
            'month': afterEventAccessMinDateVal.getMonth() + 1,
            'day': afterEventAccessMinDateVal.getDate()
          };



          if (this.inputEventModel.timeZoneId === null) {
            this.inputEventModel.timeZoneId = '';
          }
          this.clientUrlSlug = this.allClients.filter(x => x.clientId === this.inputEventModel.clientId)[0].urlSlug;
        }
      } else {
        // console.log(res.errors);
      }
      this.spinner.hide();
    });
  }

  GetAllTimezones() {
    this.eventManagementService.TimeZone().subscribe((res) => {
      this.allTimezones = res;
    });
  }

  UpdateEvent() {
    // check for valid event
    //   this.validateProjectDates();
    //   this.validateEventDates();
    //   this.validateEventTime();
    //   this.validateRegistrationDates();
    //   this.validateRegistrationTime();
    // this.validatePreviewDates();
    //   this.validatePreviewTime();
    //   this.validateAftereventDates();
    //   this.validateAftereventTime();




    //   this.validateRepaccessDates();
    //   this.validateRepaccessTime();

    if (
      !this.InvalidProjectDate &&
      !this.InvalidDate &&
      !this.InvalidTime &&
      !this.InvalidOpenRegistrationDate &&
      !this.InvalidOpenRegistrationTime &&
      !this.InvalidPreviewDate &&
      !this.InvalidPreviewTime &&
      !this.InvalidAfterEventAccessDate &&
      !this.InvaildAfterEventAccessTime &&
      !this.InvalidReportAccessDate &&
      !this.InvaildReportAccessTime
    ) {

      //if (this.CompareRoomAndBoothValues()) {
      if (this.inputEventModel.termsAndConditions != null
        && this.inputEventModel.privacyPolicy != null
      ) {
        if (this.inputEventModel.allowWebcast &&
          (this.inputEventModel.noOfWebcast === 0 || this.inputEventModel.webcastMaxDuration === 0)) {
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
            text: new SweetAlertMessage(this.translate).valuesMustBeGreaterThanZero,
            icon: 'error'
          });

        } else {
          // update event
          this.spinner.show();
          this.inputEventModel.timeZone = this.inputEventModel.timeZoneId; // this.selectedTimeZone;
          this.inputEventModel.gAEnabled = this.isGAEnabled;
          this.inputEventModel.wCEnabled = this.isWCEnabled;
          this.inputEventModel.thirdPartyAnalyticsEnabled = this.isThirdPartyAnalyticsEnabled;
          this.inputEventModel.isLinkTermsAndConditions = this.isTermsAndConditionsAddLinkSelected;
          this.inputEventModel.isLinkPrivacyPolicy = this.isPrivacyPolicyAddLinkSelected;
          this.inputEventModel.userid = this.localStorage.get('UserId');
          this.inputEventModel.language = this.selectedLanguagesArr;
          // this.selectedEntitlementsArr.forEach(element => {
          //   this.inputEventModel.eventEntitlements.push({
          //     entitlementId: element['item_id']

          //   });
          // });
          this.inputEventModel.roleName = this.localStorage.get('Role');
          this.inputEventModel.enableEditRegistrationInfoAllowed=false;
          // posting data to apis
          console.log(this.inputEventModel);
          const evnturl = '/admin/events/details/' + this.route.snapshot.paramMap.get('id');
          this.eventManagementService.UpdateEvent(this.inputEventModel).subscribe((res) => {
            if (res.isSuccess) {
              Swal.fire({
                title: this.sweetAlertSuccessHeader,
                text: new SweetAlertMessage(this.translate).sweetAlertEventUpdatedSuccessfullyMessage,
                icon: 'success',
                confirmButtonText: this.sweetAlertConfirmButtonText
              }).then(function () {
                location.href = evnturl;
              });
            } else {
              Swal.fire(
                this.sweetAlertErrorHeader,
                res.errors[0],
                'error'
              );
            }
            this.spinner.hide();
          });
        }
      }

    }
  }
  //}

  getRoomShowOption(e, type) {
    if (e.target.checked) {
      this.inputEventModel.eventRoomsScreenType = type;
    }
  }

  addSocialMediaAccount() {
    if (this.inputEventModel.socialMedia !== null) {
      if (this.inputEventModel.socialMedia.length <= 4) {
        this.inputEventModel.socialMedia.push({ index: this.inputEventModel.socialMedia.length + 1, socialMedia: 'facebook', value: '' });
      } else {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: new SweetAlertMessage(this.translate).maxFiveSocialMediaAllowed,
          icon: 'error'
        });
      }
    } else {
      this.inputEventModel.socialMedia = [];
      this.inputEventModel.socialMedia.push({ index: this.inputEventModel.socialMedia.length + 1, socialMedia: 'facebook', value: '' });

    }
  }

  deleteSocialMediaItem(data_item) {
    this.inputEventModel.socialMedia = this.inputEventModel.socialMedia.filter(item => item !== data_item);
  }

  EnableEditRegistrationInfo(event) {
    if (event.target.checked) {
      this.inputEventModel.enableEditRegistrationInfo = true;
    } else {
      this.inputEventModel.enableEditRegistrationInfo = false;
    }
  }


  askForExitMessage() {
    if (this.inputEventModel) {
      const eId = this.inputEventModel.eventId;
      Swal.fire({
        title: new SweetAlertMessage(this.translate).alert,
        text: new SweetAlertMessage(this.translate).LostyourprogressMessage,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: new SweetAlertMessage(this.translate).yes,
        cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
      }).then((result) => {
        if (result.value) {
          location.href = '/admin/events/details/' + eId;
        } else if (result.dismiss === Swal.DismissReason.cancel) {

        }
      });
    }
  }

  checkSocialMediaIsCustomSelected(item) {
    if (item.socialMedia === 'custom') {
      item.isCustom = true;
    }
  }

  validateProjectDates() {



    const currentDate = new Date(this.inputEventModel.projectStartDate);
    this.projectEndMinDate = {
      'year': currentDate.getFullYear(),
      'month': currentDate.getMonth() + 1,
      'day': currentDate.getDate()
    };

    if (this.inputEventModel.projectStartDate != null && this.inputEventModel.projectStartDate == null) {
      return false;
    } else if (this.inputEventModel.projectStartDate == null && this.inputEventModel.projectStartDate != null) {
      this.InvalidProjectDate = true;
    } else {
      if (this.inputEventModel.projectStartDate == null) {
        this.InvalidProjectDate = true;
      } else {
        if (new Date(this.inputEventModel.projectStartDate) > new Date(this.inputEventModel.projectEndDate)) {
          this.InvalidProjectDate = true;
        } else {
          this.InvalidProjectDate = false;
        }
      }
    }
    const projectEndMaxDate = new Date(this.inputEventModel.projectEndDate);
    this.projectEndMaxDate = {
      'year': projectEndMaxDate.getFullYear(),
      'month': projectEndMaxDate.getMonth() + 1,
      'day': projectEndMaxDate.getDate()
    };
  }




  validateEventDates() {
    if (this.inputEventModel.eventStartDate != null && this.inputEventModel.eventStartDate == null) {
      return false;
    } else if (this.inputEventModel.eventStartDate == null && this.inputEventModel.eventStartDate != null) {
      this.InvalidDate = true;
    } else {
      if (this.inputEventModel.eventStartDate == null) {
        this.InvalidDate = true;
      } else {
        if (new Date(this.inputEventModel.eventStartDate) > new Date(this.inputEventModel.eventEndDate)) {
          this.InvalidDate = true;
        } else {
          this.InvalidDate = false;
        }
      }
    }
    const eventEndMinDate = new Date(this.inputEventModel.eventStartDate);
    this.eventEndMinDate = {
      'year': eventEndMinDate.getFullYear(),
      'month': eventEndMinDate.getMonth() + 1,
      'day': eventEndMinDate.getDate()
    };

    const afterEventAccessMinDateVal = new Date(this.inputEventModel.eventEndDate);
    this.afterEventAccessMinDate = {
      'year': afterEventAccessMinDateVal.getFullYear(),
      'month': afterEventAccessMinDateVal.getMonth() + 1,
      'day': afterEventAccessMinDateVal.getDate()
    };
  }


  validateRegistrationDates() {
    if (this.inputEventModel.registrationStartDate != null && this.inputEventModel.registrationStartDate == null) {
      return false;
    } else if (this.inputEventModel.registrationStartDate == null && this.inputEventModel.registrationStartDate != null) {
      this.InvalidOpenRegistrationDate = true;
    } else {
      if (this.inputEventModel.registrationStartDate == null) {
        this.InvalidOpenRegistrationDate = true;
      } else {
        if (new Date(this.inputEventModel.registrationStartDate) > new Date(this.inputEventModel.registrationEndDate)) {
          this.InvalidOpenRegistrationDate = true;
        } else {
          this.InvalidOpenRegistrationDate = false;
        }
      }
    }
    const openRegistrationMinEndDate = new Date(this.inputEventModel.registrationStartDate);
    this.openRegistrationMinEndDate = {
      'year': openRegistrationMinEndDate.getFullYear(),
      'month': openRegistrationMinEndDate.getMonth() + 1,
      'day': openRegistrationMinEndDate.getDate()
    };
    const reportAccessStartMinDateVal = new Date(this.inputEventModel.registrationStartDate);
    this.reportAccessStartMinDate = {
      'year': reportAccessStartMinDateVal.getFullYear(),
      'month': reportAccessStartMinDateVal.getMonth() + 1,
      'day': reportAccessStartMinDateVal.getDate()
    };
  }


  validatePreviewDates() {
    if (this.inputEventModel.previewStartDate != null && this.inputEventModel.previewStartDate == null) {
      return false;
    } else if (this.inputEventModel.previewStartDate == null && this.inputEventModel.previewStartDate != null) {
      this.InvalidPreviewDate = true;
    } else {
      if (this.inputEventModel.previewStartDate == null) {
        this.InvalidPreviewDate = true;
      } else {
        if (new Date(this.inputEventModel.previewStartDate) > new Date(this.inputEventModel.previewEndDate)) {
          this.InvalidPreviewDate = true;
        } else {
          this.InvalidPreviewDate = false;
        }
      }
    }
    const eventPreviewMinEndDate = new Date(this.inputEventModel.previewStartDate);
    this.eventPreviewMinEndDate = {
      'year': eventPreviewMinEndDate.getFullYear(),
      'month': eventPreviewMinEndDate.getMonth() + 1,
      'day': eventPreviewMinEndDate.getDate()
    };
  }


  validateAftereventDates() {
    if (this.inputEventModel.afterEventAccessStartDate != null && this.inputEventModel.afterEventAccessStartDate == null) {
      return false;
    } else if (this.inputEventModel.afterEventAccessStartDate == null && this.inputEventModel.afterEventAccessStartDate != null) {
      this.InvalidAfterEventAccessDate = true;
    } else {
      if (this.inputEventModel.afterEventAccessStartDate == null) {
        this.InvalidAfterEventAccessDate = true;
      } else {
        if (new Date(this.inputEventModel.afterEventAccessStartDate) > new Date(this.inputEventModel.afterEventAccessEndDate)) {
          this.InvalidAfterEventAccessDate = true;
        } else {
          this.InvalidAfterEventAccessDate = false;
        }
      }
    }
    const afterEventAccessMinEndDate = new Date(this.inputEventModel.afterEventAccessStartDate);
    this.afterEventAccessMinEndDate = {
      'year': afterEventAccessMinEndDate.getFullYear(),
      'month': afterEventAccessMinEndDate.getMonth() + 1,
      'day': afterEventAccessMinEndDate.getDate()
    };
  }


  validateRepaccessDates() {
    if (this.inputEventModel.reportAccessStartDate != null && this.inputEventModel.reportAccessStartDate == null) {
      return false;
    } else if (this.inputEventModel.reportAccessStartDate == null && this.inputEventModel.reportAccessStartDate != null) {
      this.InvalidReportAccessDate = true;
    } else {
      if (this.inputEventModel.reportAccessStartDate == null) {
        this.InvalidReportAccessDate = true;
      } else {
        if (new Date(this.inputEventModel.reportAccessStartDate) > new Date(this.inputEventModel.reportAccessEndDate)) {
          this.InvalidReportAccessDate = true;
        } else {
          this.InvalidReportAccessDate = false;
        }
      }
    }
    const reportAccessMinEndDate = new Date(this.inputEventModel.reportAccessStartDate);
    this.reportAccessMinEndDate = {
      'year': reportAccessMinEndDate.getFullYear(),
      'month': reportAccessMinEndDate.getMonth() + 1,
      'day': reportAccessMinEndDate.getDate()
    };
  }


  validateEventTime() {

    if (this.inputEventModel.eventStartTime != null && this.inputEventModel.eventEndTime == null) {
      return false;
    } else if (this.inputEventModel.eventStartTime == null && this.inputEventModel.eventEndTime != null) {
      this.InvalidTime = true;
    } else {
      if (this.inputEventModel.eventStartTime == null) {
        this.InvalidTime = true;
      } else {
        if (new Date(this.inputEventModel.eventStartTime) > new Date(this.inputEventModel.eventEndTime)) {
          if (this.inputEventModel.eventStartDate < this.inputEventModel.eventEndDate) {
            this.InvalidTime = false;
          } else {
            this.InvalidTime = true;
          }
        } else {
          this.InvalidTime = false;
        }
      }
    }

  }

  validateRegistrationTime() {
    if (this.inputEventModel.registrationStartTime != null && this.inputEventModel.registrationEndTime == null) {
      return false;
    } else if (this.inputEventModel.registrationStartTime == null && this.inputEventModel.registrationEndTime != null) {
      this.InvalidOpenRegistrationTime = true;
    } else {
      if (this.inputEventModel.registrationStartTime == null) {
        this.InvalidOpenRegistrationTime = true;
      } else {
        if (new Date(this.inputEventModel.registrationStartTime) > new Date(this.inputEventModel.registrationEndTime)) {
          if (this.inputEventModel.registrationStartDate < this.inputEventModel.registrationEndDate) {
            this.InvalidOpenRegistrationTime = false;
          } else {
            this.InvalidOpenRegistrationTime = true;
          }
        } else {
          this.InvalidOpenRegistrationTime = false;
        }
      }
    }
  }



  validatePreviewTime() {
    if (this.inputEventModel.previewStartTime != null && this.inputEventModel.previewEndTime == null) {
      return false;
    } else if (this.inputEventModel.previewStartTime == null && this.inputEventModel.previewEndTime != null) {
      this.InvalidPreviewTime = true;
    } else {
      if (this.inputEventModel.previewStartTime == null) {
        this.InvalidPreviewTime = true;
      } else {
        if (new Date(this.inputEventModel.previewStartTime) > new Date(this.inputEventModel.previewEndTime)) {
          if (this.inputEventModel.previewStartDate < this.inputEventModel.previewEndDate) {
            this.InvalidPreviewTime = false;
          } else {
            this.InvalidPreviewTime = true;
          }
        } else {
          this.InvalidPreviewTime = false;
        }
      }
    }
  }


  validateAftereventTime() {
    if (this.inputEventModel.afterEventAccessStartTime != null && this.inputEventModel.afterEventAccessEndTime == null) {
      return false;
    } else if (this.inputEventModel.afterEventAccessStartTime == null && this.inputEventModel.afterEventAccessEndTime != null) {
      this.InvaildAfterEventAccessTime = true;
    } else {
      if (this.inputEventModel.afterEventAccessStartTime == null) {
        this.InvaildAfterEventAccessTime = true;
      } else {
        if (new Date(this.inputEventModel.afterEventAccessStartTime) > new Date(this.inputEventModel.afterEventAccessEndTime)) {
          if (this.inputEventModel.afterEventAccessStartDate < this.inputEventModel.afterEventAccessEndDate) {
            this.InvaildAfterEventAccessTime = false;
          } else {
            this.InvaildAfterEventAccessTime = true;
          }
        } else {
          this.InvaildAfterEventAccessTime = false;
        }
      }
    }
  }


  validateRepaccessTime() {
    if (this.inputEventModel.reportAccessStartTime != null && this.inputEventModel.reportAccessEndTime == null) {
      return false;
    } else if (this.inputEventModel.reportAccessStartTime == null && this.inputEventModel.reportAccessEndTime != null) {
      this.InvaildReportAccessTime = true;
    } else {
      if (this.inputEventModel.reportAccessStartTime == null) {
        this.InvaildReportAccessTime = true;
      } else {
        if (new Date(this.inputEventModel.reportAccessStartTime) > new Date(this.inputEventModel.reportAccessEndTime)) {
          if (this.inputEventModel.reportAccessStartDate < this.inputEventModel.reportAccessEndDate) {
            this.InvaildReportAccessTime = false;
          } else {
            this.InvaildReportAccessTime = true;
          }
        } else {
          this.InvaildReportAccessTime = false;
        }
      }
    }
  }

  // CompareRoomAndBoothValues() {
  //   if (!this.inputEventModel.noOfBooth) {
  //     if (this.inputEventModel.noOfBooths > this.inputEventModel.noOfRooms) {
  //       Swal.fire(
  //         'Invalid no of booth value',
  //         'No of booth can not be greater than no of rooms',
  //         'error'
  //       );
  //       this.inputEventModel.noOfBooth = '';
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   }
  // }


  includeShoweventmenuCheckChanged() {
    this.inputEventModel.showAttenteeCountInEventMenu = !this.inputEventModel.showAttenteeCountInEventMenu;
  }

  includeShowboothmenuCheckChanged() {
    this.inputEventModel.showAttenteeCountInAdminMenu = !this.inputEventModel.showAttenteeCountInAdminMenu;
  }

  ifEnableEditRegistrationInfoAllowed(e) {
    if (e.target.checked) {
      this.isEnableEditRegistrationInfoAllowed = true;
      this.inputEventModel.enableEditRegistrationInfoAllowed = true;

    } else {
      this.isEnableEditRegistrationInfoAllowed = false;
      this.inputEventModel.enableEditRegistrationInfoAllowed = false;
    }

  }

  bindGroupEntitlements() {
    this.getByIdViewModel.id = this.route.snapshot.paramMap.get('id');
    this.eventEntitlementService.getGroupEntitlemts(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.inputEventModel.eventEntitlements = res.groupEntitlementViewModels;
        const temp = [];
        for (let k = 0; k < this.inputEventModel.eventEntitlements.length; k++) {
          temp.push({
            item_id: this.inputEventModel.eventEntitlements[k].groupId,
            item_text: this.inputEventModel.eventEntitlements[k].groupName
          });
          console.log(this.inputEventModel.eventEntitlements);
          this.entitlementDropdownList = temp;
        }
      }
    });
  }

  SelectedVideoTypes(event) {
    // this.videosArr[index].playList[videoIndex].type = event.target.value;
    // if (event.target.value === 'webinar') {

    // }
  }

  onVideoFileChange(event) {
    //this.spinner.show();
    this.isDisabled = true;
    this.progress = 1;
    if (event.target.files.length > 0) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        if (this.helper.validateMovieFile(file.name)) {
          if (this.helper.validateVideoSize(file)) {
            formData.append('uploadFile', file, file.name);
            this.http
              .post(AppUtils.EventRooms_Base_Url + 'UploadBoothBannerImage', formData, {
                reportProgress: true,
                observe: "events"
              })
              .pipe(
                map((event: any) => {
                  console.log(event);
                  if (event.type == HttpEventType.UploadProgress) {
                    this.progress = Math.round((100 / event.total) * event.loaded);
                  } else if (event.type == HttpEventType.Response) {
                    this.progress = null;
                    this.isDisabled = false;
                    this.inputEventModel.videoUrl = event.body.message;
                  }
                }),
                catchError((err: any) => {
                  this.progress = null;
                  alert(err.message);
                  return throwError(err.message);
                })
              )
              .toPromise();
            // this.roomService.UploadBoothBannerImage(formData).subscribe((res) => {
            //   if (res.isSuccess) {
            //     this.inputEventModel.videoUrl = res.message;
            //   }
            //   this.spinner.hide();
            // });
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

  // addVideoItem() {
  //   this.videosArr[index].playList.push({ type: '', src: '' });
  // }


}
