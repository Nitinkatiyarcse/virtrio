import { Component, OnInit } from '@angular/core';
import { SweetAlertMessage } from '../../../../Utils/SweetAlertMessages';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { EventEmailTemplatesService } from 'src/app/Services/event-email-templates.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CountryService } from 'src/app/Services/country.service';
import { strictEqual } from 'assert';
import { EventsRegistrationSetsService } from 'src/app/Services/events-registration-sets.service';
import { gunzip } from 'zlib';
import * as AppUtils from '../../../../Utils/apputils';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Helper } from 'src/app/Utils/Helper';

@Component({
  selector: 'app-create-emailtemplate',
  templateUrl: './create-emailtemplate.component.html',
  styleUrls: ['./create-emailtemplate.component.css']
})
export class CreateEmailtemplateComponent implements OnInit {

  eventName = '';
  EventTemplateId = '';
  inputEmailTemplateModel: any = {};
  sweetAlertSuccessHeader = '';
  sweetAlertSuccessMessage = '';
  sweetAlertEventUpdatedSuccessfullyMessage = '';
  sweetAlertErrorHeader = '';
  sweetAlertErrorMessage = '';
  sweetAlertConfirmButtonText = '';
  allEmailTemplatesTypes = [];
  getByIdViewModel: any = {};
  isEventReminder = false;
  isTemplateName = false;
  isAdd = true;
  message = '';
  config: any;
  timeBracketEnabled = false;
  // custom emmail event template
  templateTrigger = '';
  emailList: any[] = [];
  selectedEmails: any = [];
  countryList: any = [];
  requiredField = false;
  dropdownSettings: IDropdownSettings = {};
  tempVar = '';
  otherEmails: string = '';
  registrationSets: [];
  customAndStandardFieldsData: any = [];
  selectedCustomValue: any = {};
  customSelectedValueForEmailTemplate: any = [];
  showHideTimeBracket = false;
  constructor
    (public router: Router,
      private route: ActivatedRoute,
      private spinner: NgxSpinnerService,
      private sweetAlertMessage: SweetAlertMessage,
      private translate: TranslateService,
      private localStorage: LocalStorageService,
      private countryService: CountryService,
      private eventEmailTemplatesService: EventEmailTemplatesService,
      private eventsRegistrationSetsService: EventsRegistrationSetsService,
      private helper: Helper,

  ) {
    this.sweetAlertSuccessHeader = new SweetAlertMessage(this.translate).sweetAlertSuccessHeader;
    this.sweetAlertEventUpdatedSuccessfullyMessage = new SweetAlertMessage(this.translate).sweetAlertEventUpdatedSuccessfullyMessage;
    this.sweetAlertErrorHeader = this.translate.instant('Error');
    this.sweetAlertConfirmButtonText = this.translate.instant('OK');
    this.inputEmailTemplateModel.reminderFrequency = [];
    this.inputEmailTemplateModel.createdBy = this.localStorage.get('UserId');
    this.inputEmailTemplateModel.modifiedBy = this.localStorage.get('UserId');
    this.inputEmailTemplateModel.eventId = this.route.snapshot.paramMap.get('id');
    this.getEventRegistrationSets();
    this.eventName = this.localStorage.get('EventName');
    this.emailList = [];
    this.selectedEmails = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: new SweetAlertMessage(this.translate).selectAllText,
      unSelectAllText: new SweetAlertMessage(this.translate).unSelectAllText,
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: new SweetAlertMessage(this.translate).selectEmail
    };

  }

  getEventRegistrationSets() {
    const model: any = {};
    this.inputEmailTemplateModel.registrationSetId = '';
    model.id = this.inputEmailTemplateModel.eventId;
    this.eventsRegistrationSetsService.getRegistrationSets(model).subscribe((res) => {
      if (res.eventRegistrationSets.length > 0) {
        this.registrationSets = res.eventRegistrationSets;
      }
    });

  }
  getEmailTemplateDetails(eventEmailTemplatesId: any) {
    this.getByIdViewModel.id = eventEmailTemplatesId;
    this.eventEmailTemplatesService.getEventEmailTemplateDetails(this.getByIdViewModel).subscribe(async (res) => {
      if (res.isSuccess) {
        console.log(res);
        this.inputEmailTemplateModel.bCC = res.bcc;
        this.inputEmailTemplateModel.bodyTemplate = res.bodyTemplate;
        this.inputEmailTemplateModel.cC = res.cc;
        this.inputEmailTemplateModel.emailTemplateTypesId = res.emailTemplateTypesId;
        this.inputEmailTemplateModel.eventEmailTemplatesId = res.eventEmailTemplatesId;
        this.inputEmailTemplateModel.eventId = this.route.snapshot.paramMap.get('id');
        this.inputEmailTemplateModel.isActive = res.isActive;
        this.inputEmailTemplateModel.reminderFrequency = res.reminderFrequency;
        this.inputEmailTemplateModel.replyTo = res.replyTo;
        this.inputEmailTemplateModel.subjectLine = res.subjectLine;
        this.inputEmailTemplateModel.templateName = res.templateName;
        this.templateTrigger = res.templateTrigger;
        this.inputEmailTemplateModel.templateTrigger = this.templateTrigger;
        this.inputEmailTemplateModel.registrationSetId = res.registrationSetId;
        this.inputEmailTemplateModel.isInLogger = res.isInLogger;
        if (this.inputEmailTemplateModel.emailTemplateTypesId === 'a2e93ee2-cb1b-4ec1-b4dc-97bae1cb4728' || this.inputEmailTemplateModel.emailTemplateTypesId === '8d9b0e4c-d53f-46fd-ac06-18607d857896') {
          this.showHideTimeBracket = true;

        } else {
          this.showHideTimeBracket = false;
        }
        this.inputEmailTemplateModel.enableTimeBracket = res.enableTimeBracket;
        this.inputEmailTemplateModel.startDate = this.helper.convertDateToLocalTimezone(res.startDate);
        this.inputEmailTemplateModel.startTime = this.helper.convertDateToLocalTimezone(res.startTime);
        // if (res.frequency == false && res.reminderTime == false) {
        //   this.inputEmailTemplateModel.frequency = true;
        //   this.inputEmailTemplateModel.reminderTime = false;
        // } else {
        //   this.inputEmailTemplateModel.frequency = res.frequency;
        //   this.inputEmailTemplateModel.reminderTime = res.reminderTime;
        // }
        if (this.inputEmailTemplateModel.frequency = true)
          if (this.templateTrigger === 'Others') {
            this.otherEmails = res.templateTriggerSelectedEmails;
            this.inputEmailTemplateModel.templateTriggerSelectedEmails = res.templateTriggerSelectedEmails;
          } else if (this.templateTrigger !== null && this.templateTrigger !== 'Others') {
            const temp: any = [];
            if (res.templateTriggerSelectedEmails !== '') {
              this.GetEmailLists();
              res.templateTriggerSelectedEmails.split(',').forEach(element => {
                temp.push({ item_id: element, item_text: element })
              });
              this.selectedEmails = temp;
            }
            this.inputEmailTemplateModel.templateTriggerSelectedEmails = res.templateTriggerSelectedEmails;
          }

        if (this.inputEmailTemplateModel.templateName) {
          this.isTemplateName = true;
        }
        if (this.inputEmailTemplateModel.emailTemplateTypesId === '0cc6d7b3-09c3-4f13-a42d-9dd081a19832') {
          this.isEventReminder = true;
        } else {
          this.isEventReminder = false;
        }
      }
    });
  }


  getEmailTemplatesTypes() {
    this.eventEmailTemplatesService.getEmailTemplatesTypes().subscribe((res) => {
      if (res.isSuccess) {
        console.log(res);
        this.allEmailTemplatesTypes = res.emailTemplateTypes;
      }
    });
  }



  ngOnInit(): void {
    this.config = {
      allowedContent: true,
      colorButton: true,
      extraPlugins: ['font', 'colorbutton', 'colordialog']
    };
    this.getEmailTemplatesTypes();
    if (this.route.snapshot.paramMap.get('templtId')) {
      this.isAdd = false;
      this.inputEmailTemplateModel.eventEmailTemplatesId = this.route.snapshot.paramMap.get('templtId');
      this.getEmailTemplateDetails(this.inputEmailTemplateModel.eventEmailTemplatesId);
      if (this.inputEmailTemplateModel.emailTemplateTypesId === '0cc6d7b3-09c3-4f13-a42d-9dd081a19832') {
        this.isEventReminder = true;

      } else {
        this.isEventReminder = false;
      }
    } else {
      this.isAdd = true;
      this.inputEmailTemplateModel.frequency = true;
      this.inputEmailTemplateModel.reminderFrequency = [];
      this.inputEmailTemplateModel.reminderFrequency[0] = { targetType: 'frequency', number: 1, type: '' };;
      this.inputEmailTemplateModel.eventEmailTemplatesId = '00000000-0000-0000-0000-000000000000';
      this.inputEmailTemplateModel.emailTemplateTypesId = '';
      this.isEventReminder = false;
    }
    this.getCountry();
  }








  // addreminderFrequency(event) {
  //   if (event.target.checked) {
  //     if (this.inputEmailTemplateModel.reminderFrequency.length <= 1) {
  //       const index = this.inputEmailTemplateModel.reminderFrequency.length + 1;
  //       this.inputEmailTemplateModel.reminderFrequency.push({ index: index, number: '', type: '' });
  //       this.inputEmailTemplateModel.reminderFrequency[index].type = '';
  //       this.inputEmailTemplateModel.reminderFrequency[index].number = '';
  //     } else {
  //       Swal.fire({
  //         title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
  //         text: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
  //         icon: 'error'
  //       });
  //     }
  //   }

  // }

  checkFrequencyOrTime(event) {
    if (event.target.checked) {
      if (event.target.value == "frequency") {
        this.inputEmailTemplateModel.frequency = true;
        this.inputEmailTemplateModel.reminderTime = false;
        if (this.inputEmailTemplateModel.reminderFrequency.length <= 1) {
          const index = 1;
          this.inputEmailTemplateModel.reminderFrequency[0] = { targetType: 'frequency', number: 1, type: '' };
        }
      }
      else {
        this.inputEmailTemplateModel.frequency = false;
        this.inputEmailTemplateModel.reminderTime = true;
        this.inputEmailTemplateModel.reminderFrequency[0] = { targetType: 'time', startDate: '', startTime: '' };
      }
    }
  }

  deleteReminder(data_item) {
    this.inputEmailTemplateModel.reminderFrequency = this.inputEmailTemplateModel.reminderFrequency.filter(item => item !== data_item);
  }

  upsertEmailTemplate() {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertUpdateMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertWhitelistUpdateMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).no
    }).then((result) => {
      if (result.value) {
        console.log(this.inputEmailTemplateModel);
        if (this.inputEmailTemplateModel.emailTemplateTypesId == 'e63ec1b6-5d90-4da5-8d02-02c1e601479f'
          || this.inputEmailTemplateModel.emailTemplateTypesId == '71869983-0bf8-4b88-9039-c18f38a72425'
          || this.inputEmailTemplateModel.emailTemplateTypesId == 'a0241252-c107-41dd-8fdd-41409347a548'
          || this.inputEmailTemplateModel.emailTemplateTypesId == 'cd67b252-5bdd-4553-9ff1-38197b825094'
          || this.inputEmailTemplateModel.emailTemplateTypesId == 'd8a708df-c718-4dcf-9973-2a2e1a8df21d') {
          this.inputEmailTemplateModel.registrationSetId = AppUtils.emptyGuid;
        }
        this.inputEmailTemplateModel.isActive = true;
        if (!this.isTemplateName) {
          this.inputEmailTemplateModel.templateName = '';
        }
        this.spinner.show();

        this.inputEmailTemplateModel.templateTrigger = this.templateTrigger;
        if (this.templateTrigger === 'Others') {
          this.tempVar = this.otherEmails;
        }
        else {
          if (this.selectedEmails.length > 0) {
            this.tempVar = '';
            this.selectedEmails.forEach(element => {
              this.tempVar += element.item_id + ',';
            });
          }
        }
        this.inputEmailTemplateModel.templateTriggerSelectedEmails = this.tempVar.replace(/^,|,$/g, '');
        this.inputEmailTemplateModel.selectedCustomValue = this.selectedCustomValue;
        if (this.inputEmailTemplateModel.startDate == "") {
          this.inputEmailTemplateModel.startDate = null;
        }
        if (this.inputEmailTemplateModel.startTime == "") {
          this.inputEmailTemplateModel.startTime = null;
        }
        this.eventEmailTemplatesService.upsertEventEmailTemplate(this.inputEmailTemplateModel).subscribe((res) => {
          if (res.isSuccess) {
            const emailTemplateUrl = '/admin/events/emailtemplate/' + this.route.snapshot.paramMap.get('id');;
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: new SweetAlertMessage(this.translate).savedSuccessfully,
              icon: 'success',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
            }).then(function () {
              location.href = emailTemplateUrl;
            });

          } else {
            Swal.fire(
              new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              res.errors[0],
              'error'
            );
          }
          this.spinner.hide();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
      // this.spinner.hide();
    });
  }

  showhideEventReminder() {
    if (this.inputEmailTemplateModel.emailTemplateTypesId === 'abea082d-ecbb-49d4-9541-be6a088c011b') {
      this.isTemplateName = true;
    } else {
      this.isTemplateName = false;
    }
    if (this.inputEmailTemplateModel.emailTemplateTypesId === '0cc6d7b3-09c3-4f13-a42d-9dd081a19832') {
      this.isEventReminder = true;
    } else {
      this.isEventReminder = false;
    }
    if (this.inputEmailTemplateModel.emailTemplateTypesId === 'a2e93ee2-cb1b-4ec1-b4dc-97bae1cb4728' || this.inputEmailTemplateModel.emailTemplateTypesId === '8d9b0e4c-d53f-46fd-ac06-18607d857896') {
      this.showHideTimeBracket = true;

    } else {
      this.showHideTimeBracket = false;
    }
  }

  ActiveInactveTemplate(event) {

    if (event.target.checked) {
      // activate
      this.message = new SweetAlertMessage(this.translate).Areyousuretoactivatethisitem;
      this.inputEmailTemplateModel.isActive = true;

    } else {
      // inactive
      this.message = new SweetAlertMessage(this.translate).Areyousuretoinactivatethisitem;
      this.inputEmailTemplateModel.isActive = false;
    }

    Swal.fire({
      title: this.message,
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).no
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.inputEmailTemplateModel.modifiedBy = this.localStorage.get('UserId');
        const param = this.inputEmailTemplateModel;
        param.startDate = new Date();
        param.startTime = new Date();
        this.eventEmailTemplatesService.activeInactiveEmailTemplate(param).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: new SweetAlertMessage(this.translate).savedSuccessfully,
              icon: 'success',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
            }).then(() => {
              location.href = '/admin/events/emailtemplate/' + this.route.snapshot.paramMap.get('id');
            });
          }
          this.spinner.hide();
        });
      }
    });
  }

  //#region Custom Email Template

  setClass() {
    if (this.selectedEmails.length > 0) {
      return 'validField';
    } else {
      return 'invalidField';
    }

  }



  selectTemplateTrigger(event) {
    console.log(this.templateTrigger);
    console.log(event.target.value);
    this.getByIdViewModel.id = this.route.snapshot.paramMap.get('id');
    this.selectedEmails = [];
    this.GetEmailLists();

  }


  GetEmailLists() {
    this.spinner.show();
    if (this.templateTrigger === 'AdminInvite') {
      // get list of all admins who have not verified their email
      const reqParam: any = {};
      reqParam.id = this.route.snapshot.paramMap.get('id');
      this.eventEmailTemplatesService.getAllUnverifiedEmailAdmins(reqParam).subscribe((res) => {
        if (res.isSuccess) {
          // Bind all admins who have not verified their email
          this.emailList = res.data;
        } else {
          // do nothing
          this.emailList = [];
        }
        this.spinner.hide();
      });

    } else if (this.templateTrigger === 'AttendeeInviteEmail') {
      // get list of all attendees who have not verified their email
      const reqParam: any = {};
      reqParam.id = this.route.snapshot.paramMap.get('id');
      this.eventEmailTemplatesService.getAllUnverifiedEmailAttendees(reqParam).subscribe((res) => {
        if (res.isSuccess) {
          // Bind all admins who have not verified their email
          this.emailList = res.data;
        } else {
          // do nothing
          this.emailList = [];
        }
        this.spinner.hide();
      });
    } else if (this.templateTrigger === 'ProfileCompletion') {
      // get list of all admin who has completed their profile
      const reqParam: any = {};
      reqParam.id = this.route.snapshot.paramMap.get('id');
      this.eventEmailTemplatesService.getAllAdminsCompletedProfile(reqParam).subscribe((res) => {
        if (res.isSuccess) {
          // Bind all admins who have not verified their email
          this.emailList = res.data;
        } else {
          // do nothing
          this.emailList = [];
        }
        this.spinner.hide();

      });

    } else if (this.templateTrigger === 'BoothRepresentativeInvite') {
      // get list of all booth representatives
      const reqParam: any = {};
      reqParam.id = this.route.snapshot.paramMap.get('id');
      this.eventEmailTemplatesService.getAllBoothRepresentatives(reqParam).subscribe((res) => {
        if (res.isSuccess) {
          // Bind all admins who have not verified their email
          this.emailList = res.data;
        } else {
          // do nothing
          this.emailList = [];
        }
        this.spinner.hide();

      });
    } else if (this.templateTrigger === 'EventReminder') {
      // send event reminder
      const reqParam: any = {};
      reqParam.id = this.route.snapshot.paramMap.get('id');
      this.eventEmailTemplatesService.getAllAttendeesToSendReminder(reqParam).subscribe((res) => {
        if (res.isSuccess) {
          // Bind all admins who have not verified their email
          this.emailList = res.data;
        } else {
          // do nothing
          this.emailList = [];
        }
        this.spinner.hide();

      });
    } else if (this.templateTrigger === 'All') {
      // send customised email
      const reqParam: any = {};
      reqParam.id = this.route.snapshot.paramMap.get('id');
      this.eventEmailTemplatesService.getAllEmails(reqParam).subscribe((res) => {
        if (res.isSuccess) {
          // Bind all admins who have not verified their email
          this.emailList = res.data;
        } else {
          // do nothing
          this.emailList = [];
        }
        this.spinner.hide();

      });
    } else if (this.templateTrigger === 'Others') {
      this.spinner.hide();
    } else {
      this.templateTrigger = '';
    }
  }


  onSelect(item: any) {
    this.selectedEmails.push(item.item_id);
    if (this.selectedEmails.length === 0) {
      this.requiredField = true;
    }
  }

  onSelectAll(items: any) {
    for (let i = 0; i < items.length; i++) {
      if (this.selectedEmails.indexOf(items[i].item_id) === -1) {
        this.selectedEmails.push(items[i].item_id);
      }
    }
    if (this.selectedEmails.length === 0) {
      this.requiredField = true;
    }
  }

  onItemDeSelect(item: any) {
    const index = this.selectedEmails.indexOf(item.item_id, 0);
    if (index !== -1) {
      this.selectedEmails.splice(index, 1);
      if (this.selectedEmails.length === 0) {
        this.requiredField = true;
      }
    }
  }
  onDeSelectAll(items: any) {
    this.selectedEmails = [];
    if (this.selectedEmails.length === 0) {
      this.requiredField = true;
    }
  }

  sendEmails() {
    this.getByIdViewModel.id = this.route.snapshot.paramMap.get('templtId');
    this.spinner.show();
    this.eventEmailTemplatesService.sendCustomEmails(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).emailSentSuccessfully,
          icon: 'success'
        }).then(function () {

        });
        this.spinner.hide();

      } else {
        // do nothing
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          icon: 'error'
        });
      }
      this.spinner.hide();

    });
  }
  //#endregion
  bindItemValue(ketItem, event) {
    ketItem.value = event.target.value;
  }


  getCountry() {

    this.countryService.getAllCountry().subscribe((res) => {
      this.countryList = res;

    });

  }

  getCustomAndStandardFields() {
    if (this.inputEmailTemplateModel.emailTemplateTypesId == 'abea082d-ecbb-49d4-9541-be6a088c011b') {
      const registrationSetsModel: any = {};
      registrationSetsModel.id = this.inputEmailTemplateModel.registrationSetId;
      this.eventsRegistrationSetsService.getCustomAndStandardFieldsAndValue(registrationSetsModel).subscribe((res) => {
        if (res.isSuccess) {
          this.customAndStandardFieldsData = res.keyValuePairs;
          this.customAndStandardFieldsData.forEach(element => {
            this.selectedCustomValue[element.key] = {};
          });
          console.log(this.customAndStandardFieldsData);
        } else {
          this.customAndStandardFieldsData = [];
        }
      });
    }
  }

  onCustomItemSelect(event, key, index) {
    console.log(key);
    console.log(this.selectedCustomValue);
    // if (this.customSelectedValueForEmailTemplate.indexOf(key) === -1) {
    //   this.customSelectedValueForEmailTemplate.push({ key: this.selectedCustomValue });
    // } else{
    //   // let index =  this.customSelectedValueForEmailTemplate.indexOf(updateItem);
    // }
  }
  onCustomItemDeSelect(event, key, index) {
    console.log(key);
    console.log(this.selectedCustomValue);


  }
  onCustomSelectAll(event, key, index) {
    console.log(key);
    console.log(this.selectedCustomValue);

  }
  onCustomDeSelectAll(event, key, index) {
    console.log(key);
    console.log(this.selectedCustomValue);

  }

  timeBracketChangedChanged() {
    this.timeBracketEnabled = !this.timeBracketEnabled;
    this.inputEmailTemplateModel.enableTimeBracket = this.timeBracketEnabled;
    if (this.timeBracketEnabled) {
      this.inputEmailTemplateModel.startDate = null;
      this.inputEmailTemplateModel.startTime = null;
    }
  }

  getTemplateeInfo() {
    alert('get email info');
  }
}
