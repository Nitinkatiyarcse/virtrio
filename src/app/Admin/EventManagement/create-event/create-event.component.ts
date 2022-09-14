import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { from, BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

import { EventsManagementService } from 'src/app/Services/events-management.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { isPostfixUnaryExpression } from 'typescript';
import { LanguageService } from 'src/app/Services/language.service';
import { SweetAlertMessage } from '../../../Utils/SweetAlertMessages';
import * as AppUtils from '../../../Utils/apputils';
import { Helper } from 'src/app/Utils/Helper';
import { ClientService } from 'src/app/Services/client.service';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  eventUrl = AppUtils.EventUrl;
  inputEventModel: any = {};
  languageDropdownList = [];
  allTimezones = [];
  selectedLanguagesArr: Array<string> = [];
  requiredField = true;
  dropdownSettings: IDropdownSettings = {};
  isGAEnabled = false;
  isWCEnabled = false;
  isThirdPartyAnalyticsEnabled = false;
  isTermsAndConditionsAddLinkSelected = true;
  isPrivacyPolicyAddLinkSelected = true;
  // selectedTimeZone = '';
  sweetAlertSuccessHeader = '';
  sweetAlertSuccessMessage = '';
  sweetAlertErrorHeader = '';
  sweetAlertErrorMessage = '';
  sweetAlertConfirmButtonText = '';
  InvalidDate = false;
  InvalidTime = false;
  InvalidOpenRegistrationDate = false;
  InvalidOpenRegistrationTime = false;
  InvalidPreviewDate = false;
  InvalidPreviewTime = false;
  InvalidAfterEventAccessDate = false;
  InvaildAfterEventAccessTime = false;
  InvalidReportAccessDate = false;
  InvaildReportAccessTime = false;
  socialMediaAccount = [];
  allClients = [];
  selectedClient = '';
  config: any;
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private location: Location,
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    public router: Router,
    private eventManagementService: EventsManagementService,
    private langugeService: LanguageService,
    private sweetAlertMessage: SweetAlertMessage,
    private helper: Helper,
    private clientService: ClientService
  ) {
    // this.selectedTimeZone = " ";
    this.localStorage.set('isEventSelected', 'false');
    // this.languageDropdownList.push({ item_id: 'cefd899c-b035-4cc2-9008-7a169639aa0b', item_text: 'English' });
    // this.languageDropdownList.push({ item_id: '18b02600-45c8-49f9-859a-afb35c6baae6', item_text: 'Japanese' });

    this.GetAllTimezones();
    this.sweetAlertSuccessHeader = new SweetAlertMessage(this.translate).sweetAlertSuccessHeader;
    this.sweetAlertSuccessMessage = new SweetAlertMessage(this.translate).sweetAlertEventAddedSuccessfullyMessage;
    this.sweetAlertErrorHeader = new SweetAlertMessage(this.translate).sweetAlertErrorHeader;
    this.sweetAlertConfirmButtonText = new SweetAlertMessage(this.translate).sweetAlertOkButtonText;

  }


  ngOnInit(): void {
    this.config = {
      allowedContent: true,
      colorButton: true,
      extraPlugins: ['font', 'colorbutton', 'colordialog']
    };
    this.getAvailableLanguages();
    this.getAllClients();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    // this.selectedTimeZone = ' ';
    this.inputEventModel.timeZone = '';
  }
  getAllClients() {
    this.inputEventModel.clientId = '';
    this.clientService.getAllClients().subscribe((res) => {
      if (res.isSuccess) {

        this.allClients = res.clients;
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

  getAvailableLanguages() {
    this.langugeService.getAvailableLanguages().subscribe((res) => {
      if (res.isSuccess) {
        let availableLang: any = [];
        const temp = [];
        availableLang = res.languageViewModel;
        for (let i = 0; i < availableLang.length; i++) {
          temp.push({ item_id: availableLang[i].languageId, item_text: availableLang[i].language });
        }
        this.languageDropdownList = temp;
      } else {
        // console.log('error in fetching languages');
      }

    });



  }

  GetAllTimezones() {
    this.eventManagementService.TimeZone().subscribe((res) => {
      this.allTimezones = res;
    });
  }

  ifWebcastEnabled(e) {
    if (e.target.checked) {
      this.isWCEnabled = true;

    } else {
      this.isWCEnabled = false;
    }
  }


  getRoomShowOption(e, type) {
    if (e.target.checked) {
      this.inputEventModel.eventRoomsScreenType = type;
    }
  }

  ifGAEnabled(e) {
    if (e.target.checked) {
      this.isGAEnabled = true;

    } else {
      this.isGAEnabled = false;
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
    const eventName = e.target.value;
    this.inputEventModel.eventUrl = this.helper.removeSpecialCharacters(eventName); // eventName.replace(/\s+/g, '');
  }

  checkValidEventUrl(evalue) {
    if (evalue !== '') {
      const eventUrl = evalue + '.' + this.eventUrl;
      this.spinner.show();
      this.eventManagementService.checkValidEventUrl(this.inputEventModel).subscribe((res) => {
        if (res.isSuccess === false) {
          this.inputEventModel.errors = res.errors;
          // console.log(this.inputEventModel);
        } else {
          this.inputEventModel.errors = [];
        }
        this.spinner.hide();
      });
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
        if (this.helper.validateImageFile(file.name)) {
          formData.append('uploadFile', file, file.name);
          this.eventManagementService.uploadEventImage(formData).subscribe((res) => {
            if (res.isSuccess) {
              this.inputEventModel.eventLogo = res.message;
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
        }
      }

    } else {
      this.spinner.hide();
    }
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
  }



  validateEventTime() {
    // console.log(this.inputEventModel.eventStartTime);
    // console.log(this.inputEventModel.eventEndTime);
    if (this.inputEventModel.eventStartTime != null && this.inputEventModel.eventEndTime == null) {
      return false;
    } else if (this.inputEventModel.eventStartTime == null && this.inputEventModel.eventEndTime != null) {
      this.InvalidTime = true;
    } else {
      if (this.inputEventModel.eventStartTime == null) {
        this.InvalidTime = true;
      } else {
        if (new Date(this.inputEventModel.eventStartTime) > new Date(this.inputEventModel.eventEndTime)) {
          this.InvalidTime = true;
        } else {
          this.InvalidTime = false;
        }
      }
    }

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
          this.InvalidOpenRegistrationTime = true;
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
          this.InvalidPreviewTime = true;
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
          this.InvaildAfterEventAccessTime = true;
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
          this.InvaildReportAccessTime = true;
        } else {
          this.InvaildReportAccessTime = false;
        }
      }
    }
  }


  CreateEvent() {
    console.log(this.inputEventModel);
    // check for valid event
    if (!this.InvalidDate
      && !this.InvalidTime
      && !this.InvalidDate
      && !this.InvalidTime
      && !this.InvalidOpenRegistrationDate
      && !this.InvalidOpenRegistrationTime
      && !this.InvalidPreviewDate
      && !this.InvalidPreviewTime
      && !this.InvalidAfterEventAccessDate
      && !this.InvaildAfterEventAccessTime
      && !this.InvalidReportAccessDate
      && !this.InvaildReportAccessTime
    ) {
      this.spinner.show();
      this.eventManagementService.checkValidEventUrl(this.inputEventModel).subscribe((res) => {
        if (res.isSuccess === false) {
          this.inputEventModel.errors = res.errors;
          // console.log(this.inputEventModel);
          this.spinner.hide();
        } else {
          // save event
          // this.inputEventModel.timeZone = this.selectedTimeZone;
          this.inputEventModel.gAEnabled = this.isGAEnabled;
          this.inputEventModel.allowWebcast = this.isWCEnabled;
          this.inputEventModel.thirdPartyAnalyticsEnabled = this.isThirdPartyAnalyticsEnabled;
          this.inputEventModel.isLinkTermsAndConditions = this.isTermsAndConditionsAddLinkSelected;
          this.inputEventModel.isLinkPrivacyPolicy = this.isPrivacyPolicyAddLinkSelected;
          this.inputEventModel.userid = this.localStorage.get('UserId');
          this.inputEventModel.language = this.selectedLanguagesArr;
          this.inputEventModel.roleName = this.localStorage.get('Role');
          this.inputEventModel.socialMedia = this.socialMediaAccount;
          // posting data to apis
          // console.log(this.inputEventModel);
          this.eventManagementService.CreateEvent(this.inputEventModel).subscribe((innerRes) => {
            if (innerRes.isSuccess) {
              Swal.fire({
                title: this.sweetAlertSuccessHeader,
                text: this.sweetAlertSuccessMessage,
                icon: 'success',
                confirmButtonText: this.sweetAlertConfirmButtonText
              });
            } else {
              Swal.fire(
                this.sweetAlertErrorHeader,
                innerRes.errors[0],
                'error'
              );
            }
            this.spinner.hide();
            this.router.navigate(['admin/events']);
          });
        }
      });
    }
  }

  EnableEditRegistrationInfo(event) {
    if (event.target.checked) {
      this.inputEventModel.EnableEditRegistrationInfo = true;
    } else {
      this.inputEventModel.EnableEditRegistrationInfo = false;

    }
  }

  addSocialMediaAccount() {
    if (this.socialMediaAccount.length <= 4) {
      this.socialMediaAccount.push({
        index: this.socialMediaAccount.length + 1,
        socialMedia: 'facebook', value: '', isCustom: false, customSocialMedia: ''
      });
    } else {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: new SweetAlertMessage(this.translate).maxFiveSocialMediaAllowed,
        icon: 'error'
      });
    }
  }

  checkSocialMediaIsCustomSelected(item) {
    if (item.socialMedia === 'custom') {
      item.isCustom = true;
    }
  }

  deleteSocialMediaItem(data_item) {
    this.socialMediaAccount = this.socialMediaAccount.filter(item => item !== data_item);
  }

  askForExitMessage() {
    if (this.inputEventModel) {

      Swal.fire({
        title: new SweetAlertMessage(this.translate).alert,
        text: new SweetAlertMessage(this.translate).LostyourprogressMessage,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: new SweetAlertMessage(this.translate).yes,
        cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
      }).then((result) => {
        if (result.value) {

        } else if (result.dismiss === Swal.DismissReason.cancel) {

        }
      });
    }
  }
}

