import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { EventsRegistrationSetsService } from 'src/app/Services/events-registration-sets.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { LanguageService } from 'src/app/Services/language.service';
import { Helper } from 'src/app/Utils/Helper';
import * as AppUtils from '../../../../Utils/apputils';
@Component({
  selector: 'app-add-registration-sets',
  templateUrl: './add-registration-sets.component.html',
  styleUrls: ['./add-registration-sets.component.css']
})

export class AddRegistrationSetsComponent implements OnInit {
  eventName: string;
  eventURLSlag: string;
  eventId: string;
  // event: any = {};
  // eventUrl = AppUtils.EventUrl;
  inputRegistrationModel: any = {};
  selectedTimeZone = '';
  allTimezones = [];
  SubmitButtonText = new SweetAlertMessage(this.translate).submitButtonText;
  InvalidDate = false;
  InvalidTime = false;
  IsAdd = true;
  getByIdViewModel: any = {};
  languageDropdownList = [];
  showLanguageDDL = false;
  registrationSetEndDate: any;
  registrationSetStartDate: any;
  projectStartDate: any;
  projectEndDate: any;
  domainUrl = '';
  constructor(
    private translate: TranslateService,
    public router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private eventManagementService: EventsManagementService,
    private sweetAlertMessage: SweetAlertMessage,
    private eventsRegistrationSetsService: EventsRegistrationSetsService,
    private localStorage: LocalStorageService,
    public getterSetterService: GetterSetterService,
    private helper: Helper,
    private langugeService: LanguageService
  ) {
    this.domainUrl = AppUtils.EventUrl;
    this.localStorage.set('isEventSelected', 'true');

    this.GetAllTimezones();
    this.selectedTimeZone = '';
    this.eventName = this.localStorage.get('EventName');

    const projectStartDateVal = new Date(this.localStorage.get('ProjectStartDate'));
    this.projectStartDate = {
      'year': projectStartDateVal.getFullYear(),
      'month': projectStartDateVal.getMonth() + 1,
      'day': projectStartDateVal.getDate()
    };

    const projectEndDateVal = new Date(this.localStorage.get('ProjectEndDate'));
    this.projectEndDate = {
      'year': projectEndDateVal.getFullYear(),
      'month': projectEndDateVal.getMonth() + 1,
      'day': projectEndDateVal.getDate()
    };

    this.inputRegistrationModel.languageId='';

  }

  ngOnInit(): void {

    this.inputRegistrationModel.timeZone = '';
    this.inputRegistrationModel.createdBy = this.localStorage.get('UserId');
    this.inputRegistrationModel.eventId = this.route.snapshot.paramMap.get('id');
    this.getEventDetails();
    if (this.route.snapshot.paramMap.get('regId')) {
      this.IsAdd = false;
      this.inputRegistrationModel.registrationSetId = this.route.snapshot.paramMap.get('regId');
      // Get details for registration set
      this.getRegistrationSetDetails();

    }
    
  }

  getAvailableLanguages(eventId) {
    const eventLangId: any = {};
    eventLangId.id = eventId;
    this.langugeService.getLanguagesByEventId(eventLangId).subscribe((res) => {
      if (res.isSuccess) {
        console.log(res);
        this.languageDropdownList = res.languageViewModel;
        if (this.route.snapshot.paramMap.get('regId')) {
        this.inputRegistrationModel.languageId = this.languageDropdownList[0].languageId;
        }
        if (this.languageDropdownList.length <= 1) {
          this.showLanguageDDL = false;
        } else {
          this.showLanguageDDL = true;
        }

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

  validateRegistrationDates() {
    if (this.inputRegistrationModel.StartDate != null && this.inputRegistrationModel.StartDate == null) {
      return false;
    } else if (this.inputRegistrationModel.StartDate == null && this.inputRegistrationModel.StartDate != null) {
      this.InvalidDate = true;
    } else {
      if (this.inputRegistrationModel.StartDate == null) {
        this.InvalidDate = true;
      } else {
        if (new Date(this.inputRegistrationModel.StartDate) > new Date(this.inputRegistrationModel.EndDate)) {
          this.InvalidDate = true;
        } else {
          this.InvalidDate = false;

          const dt = new Date(this.inputRegistrationModel.StartDate);
          this.registrationSetEndDate = {
            'year': dt.getFullYear(),
            'month': dt.getMonth() + 1,
            'day': dt.getDate()
          };
          if (this.inputRegistrationModel.EndDate) {
            const dt1 = new Date(this.inputRegistrationModel.EndDate);
            this.registrationSetStartDate = {
              'year': dt1.getFullYear(),
              'month': dt1.getMonth() + 1,
              'day': dt1.getDate()
            };
          }


        }
      }
    }

  }

  validateRegistrationTime() {
    // console.log(this.inputRegistrationModel.StartTime);
    // console.log(this.inputRegistrationModel.EndTime);

    if (this.inputRegistrationModel.StartTime != null && this.inputRegistrationModel.EndTime == null) {
      return false;
    } else if (this.inputRegistrationModel.StartTime == null && this.inputRegistrationModel.EndTime != null) {
      this.InvalidTime = true;
    } else {
      if (this.inputRegistrationModel.StartTime == null) {
        this.InvalidTime = true;
      } else {
        if (new Date(this.inputRegistrationModel.StartTime) > new Date(this.inputRegistrationModel.EndTime)) {
          if (this.inputRegistrationModel.StartDate === this.inputRegistrationModel.EndDate) {
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

  getRegistrationSetDetails() {
    
    this.spinner.show();
    this.getByIdViewModel.id = this.inputRegistrationModel.registrationSetId;
    this.eventsRegistrationSetsService.getEventRegistrationSetDetails(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        console.log(res);
        this.inputRegistrationModel.createdBy = res.createdBy;
        this.inputRegistrationModel.createdDate = res.createdDate;
        this.inputRegistrationModel.EndDate = this.helper.convertDateToLocalTimezone(res.endDate);
        this.inputRegistrationModel.EndTime = this.helper.convertDateToLocalTimezone(res.endTime);
        this.inputRegistrationModel.eventId = res.eventId;
        this.inputRegistrationModel.isActive = res.isActiv;
        this.inputRegistrationModel.modifiedBy = res.modifiedBy;
        this.inputRegistrationModel.modifiedDate = res.modifiedDate;
        this.inputRegistrationModel.Name = res.name;
        this.inputRegistrationModel.StartDate = this.helper.convertDateToLocalTimezone(res.startDate);
        this.inputRegistrationModel.StartTime = this.helper.convertDateToLocalTimezone(res.startTime);
        this.inputRegistrationModel.timeZone = res.timeZone;
        this.inputRegistrationModel.UrlSlug = res.urlSlug;
        this.inputRegistrationModel.languageId = res.languageId;
      } else {
        Swal.fire(
          new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          res.message,
          'error'
        );
      }
      this.spinner.hide();
    });

  }

  upsertRegistrationSet() {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertUpdateMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertWhitelistUpdateMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).no
    }).then((result) => {

      if (result.value) {
        // this.inputRegistrationModel.timeZone=this.selectedTimeZone;
        if (this.InvalidDate === false && this.InvalidTime === false) {
          this.spinner.show();
          console.log(this.inputRegistrationModel);
          const redirectUrl = '/admin/events/registrationset/manageregistrationset/' + this.inputRegistrationModel.eventId;
          this.eventsRegistrationSetsService.UpsertEventRegistration(this.inputRegistrationModel).subscribe((res) => {
            if (res.isSuccess) {

              Swal.fire({
                title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
                text: this.IsAdd ? new SweetAlertMessage(this.translate).savedSuccessfully :
                  new SweetAlertMessage(this.translate).updatedSuccessfullyMessage,
                icon: 'success'
              }).then(function () {
                location.href = redirectUrl;
              });
            } else {
              Swal.fire(
                new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
                res.message,
                'error'
              );
            }
            this.spinner.hide();
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.spinner.hide();
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
            if (img.width > 1280 || img.height > 720) {
              this.spinner.hide();
              Swal.fire({
                title: new SweetAlertMessage(this.translate).invalidFileType,
                text: new SweetAlertMessage(this.translate).imageSizeShouldNotMoreThan1920,
                icon: 'error'
              });
            } else {
            formData.append('uploadFile', file, file.name);
            this.eventsRegistrationSetsService.uploadBanner(formData).subscribe((res) => {
              if (res.isSuccess) {
                this.inputRegistrationModel.banner = res.message;
              }
              this.spinner.hide();
            });
          } 
        
      }, false);
      
          // else {
          //   this.spinner.hide();
          //   // Swal.fire({
          //   //   title: new SweetAlertMessage(this.translate).invalidFileType,
          //   //   text: new SweetAlertMessage(this.translate).imageSizeShouldNotMoreThan200,
          //   //   icon: 'error'
          //   // });
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
      }
    } else {
      this.spinner.hide();
    }
  }

  removeBanner() {
    this.inputRegistrationModel.banner = '';
  }

  getEventDetails() {
    this.spinner.show();
    this.getByIdViewModel.id = this.route.snapshot.paramMap.get('id');
    this.eventManagementService.GetEventDetails(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.eventURLSlag = res.usersEvent.eventUrl;
        this.eventId = res.usersEvent.eventId;
        this.getAvailableLanguages(this.eventId);

      } else {

      }
      this.spinner.hide();
    });
  }

}
