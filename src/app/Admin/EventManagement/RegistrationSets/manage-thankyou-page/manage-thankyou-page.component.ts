import { Component, OnInit } from '@angular/core';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { EventsRegistrationSetsService } from 'src/app/Services/events-registration-sets.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LanguageService } from 'src/app/Services/language.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { importType } from '@angular/compiler/src/output/output_ast';
import { Helper } from 'src/app/Utils/Helper';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { NavigationService } from 'src/app/Utils/NavigationService';
import { SweetAlertMessage } from '../../../../Utils/SweetAlertMessages';
@Component({
  selector: 'app-manage-thankyou-page',
  templateUrl: './manage-thankyou-page.component.html',
  styleUrls: ['./manage-thankyou-page.component.css']
})
export class ManageThankyouPageComponent implements OnInit {
  thankyouPageForm: FormGroup;
  includeSplashImage = false;

  includeThankyouText = false;
  includeCalendarReminder = false;
  enableDefaultCalendarReminder = false;
  includeThankYouEmail = false;
  splashImageType = 'thankyoupagesplashimage';
  defaultLanguageId = '';
  splashScreenImages = [];
  languageDropdownList = [];
  inputManageThankyouPageModel: any = {};
  thankyouEmailHeaderImage: '';
  getByIdViewModel: any = {};
  eventName: string;
  config: any;
  sweetAlertSuccessHeader = '';
  sweetAlertSuccessMessage = '';
  sweetAlertEventUpdatedSuccessfullyMessage = '';
  isImagesOrVideo = false;
  constructor(private fb: FormBuilder,
    private eventManagementService: EventsManagementService,
    private langugeService: LanguageService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private eventRegistrtationSetService: EventsRegistrationSetsService,
    private route: ActivatedRoute,
    private helper: Helper,
    private sweetAlertMessage: SweetAlertMessage,
    private localStorageService: LocalStorageService,
    private navigation: NavigationService) {
    this.isImagesOrVideo = true;
    this.splashScreenImages = [
      { fileType: '', filePath: '' },
      { fileType: '', filePath: '' },
      { fileType: '', filePath: '' },
      { fileType: '', filePath: '' },
      { fileType: '', filePath: '' }];
    this.thankyouPageForm = this.fb.group({
      languageId: this.defaultLanguageId,
      videoSpokesPerson: '',
      includeSplashImage: this.includeSplashImage,
      includeThankyouText: this.includeThankyouText,
      thankyouText: '',
      includeCalendarReminder: this.includeCalendarReminder,
      includeCalendarReminderText: '',
      enableDefaultCalendarReminder: this.enableDefaultCalendarReminder,
      includeThankYouEmail: this.includeThankYouEmail,
      emailSubject: '',
      emailBody: '',
      thankyouEmailHeaderImage: this.thankyouEmailHeaderImage,
      displayHeadingAndIcons: true,
      agendaDocumentHeadingText: '',
      calendarReminderHeadingText: '',
      thankyouforRegistering: '',
      calendarReminders: this.fb.array([]),
      splashScreenImages: Array(this.splashScreenImages),
      registrationSetId: this.route.snapshot.paramMap.get('regSetid'),
      thankyouPageRegistrationSetId: '00000000-0000-0000-0000-000000000000',
      userId: this.localStorageService.get('UserId')
    });
    this.localStorageService.set('isEventSelected', 'true');
    this.eventName = this.localStorageService.get('EventName') + ' > ' + sessionStorage.getItem('regsetname');
    this.sweetAlertSuccessHeader = new SweetAlertMessage(this.translate).sweetAlertSuccessHeader;
    this.sweetAlertEventUpdatedSuccessfullyMessage = new SweetAlertMessage(this.translate).sweetAlertEventUpdatedSuccessfullyMessage;
  }

  calendarReminders(): FormArray {
    return this.thankyouPageForm.get('calendarReminders') as FormArray;
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      calendarReminderName: '',
      calendarReminderText: ''
      , calendarReminderStartDate: '',
      calendarReminderEndDate: ''
    });
  }

  addCalendarReminder() {
    this.calendarReminders().push(this.newQuantity());

  }

  removeCalendarReminder(i: number) {
    this.calendarReminders().removeAt(i);
  }

  onSubmit() {
    let process = true;
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertUpdateMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertWhitelistUpdateMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).no
    }).then((result) => {

      if (result.value) {
        console.log(this.thankyouPageForm.value);
        if (this.includeSplashImage) {
          if (this.splashScreenImages[0].fileType === '' && this.splashScreenImages[0].filePath === ''
            && this.splashScreenImages[0].fileType === '' && this.splashScreenImages[0].filePath === ''
            && this.splashScreenImages[0].fileType === '' && this.splashScreenImages[0].filePath === ''
            && this.splashScreenImages[0].fileType === '' && this.splashScreenImages[0].filePath === ''
            && this.splashScreenImages[0].fileType === '' && this.splashScreenImages[0].filePath === '') {
            alert(new SweetAlertMessage(this.translate).sweetAlertSplaceImageMessage);
            process = false;
          }
        }
        if (process) {
          this.spinner.show();
          this.eventRegistrtationSetService.upsertEventRegistrationThankyouPage(this.thankyouPageForm.value).subscribe((res) => {
            if (res.isSuccess) {
              Swal.fire(
                'Success',
                'saved successfully',
                'success'
                ).then((result)=>{
                  this.goBack();
                });
              // this.getEventRegistrationThankyouPage();
            } else {
              Swal.fire(
                'Error',
                res.message,
                'error'
              );
            }
            this.spinner.hide();
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {

        }
        // this.spinner.hide();
      }
    });
  }

  ngOnInit(): void {
    this.config = {
      allowedContent: true,
      colorButton: true,
      extraPlugins: ['font', 'colorbutton', 'colordialog']
    };
    this.getAvailableLanguages();
    this.getEventRegistrationThankyouPage();

  }

  getEventRegistrationThankyouPage() {
    this.spinner.show();
    this.getByIdViewModel.id = this.route.snapshot.paramMap.get('regSetid');
    this.eventRegistrtationSetService.getEventRegistrationThankyouPage(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        // console.log(res);
        this.assignValues(res);
        this.spinner.hide();
      } else {
        this.thankyouPageForm = this.fb.group({
          languageId: this.defaultLanguageId,
          videoSpokesPerson: '',
          includeSplashImage: this.includeSplashImage,
          includeThankyouText: this.includeThankyouText,
          thankyouText: '',
          includeCalendarReminder: this.includeCalendarReminder,
          includeCalendarReminderText: '',
          enableDefaultCalendarReminder: this.enableDefaultCalendarReminder,
          includeThankYouEmail: this.includeThankYouEmail,
          emailSubject: '',
          emailBody: '',
          thankyouEmailHeaderImage: this.thankyouEmailHeaderImage,
          displayHeadingAndIcons: true,
          agendaDocumentHeadingText: '',
          calendarReminderHeadingText: '',
          thankyouforRegistering: '',
          calendarReminders: this.fb.array([]),
          splashScreenImages: Array(this.splashScreenImages),
          registrationSetId: this.route.snapshot.paramMap.get('regSetid'),
          thankyouPageRegistrationSetId: '00000000-0000-0000-0000-000000000000',
          userId: this.localStorageService.get('UserId')
        });
      }
      this.spinner.hide();
    });
  }

  assignValues(res: any) {
    if (res.calendarReminders.length > 0) {
      for (let i = 0; i < res.calendarReminders.length; i++) {
        this.calendarReminders().push(this.fb.group({
          calendarReminderName: res.calendarReminders[i].calendarReminderName,
          calendarReminderText: res.calendarReminders[i].calendarReminderText,
          calendarReminderStartDate: res.calendarReminders[i].calendarReminderStartDate,
          calendarReminderEndDate: res.calendarReminders[i].calendarReminderEndDate
        }));
      }
    }

    this.includeThankYouEmail = res.includeThankYouEmail;
    this.includeThankyouText = res.includeThankyouText;
    this.thankyouEmailHeaderImage = res.thankyouEmailHeaderImage;
    this.includeCalendarReminder = res.includeCalendarReminder;
    this.isImagesOrVideo = true;
    if (res.includeSplashImage) {
      this.splashScreenImages = res.splashScreenImages;
      this.includeSplashImage = res.includeSplashImage;
      this.splashImageType = 'thankyoupagesplashimage';
      for (let i = 0; i < this.splashScreenImages.length; i++) {
        if (this.splashScreenImages[i].fileType === 'thankyoupagesplashmovie') {
          this.splashImageType = 'thankyoupagesplashmovie';
          this.isImagesOrVideo = false;
          break;
        }
      }
    }

    this.thankyouPageForm = this.fb.group({
      languageId: res.languageId,
      videoSpokesPerson: res.videoSpokesPerson,
      includeSplashImage: res.includeSplashImage,
      includeThankyouText: res.includeThankyouText,
      thankyouText: res.thankyouText,
      includeCalendarReminder: this.includeCalendarReminder,
      includeCalendarReminderText: res.includeCalendarReminderText,
      enableDefaultCalendarReminder: res.enableDefaultCalendarReminder,
      includeThankYouEmail: this.includeThankYouEmail,
      emailSubject: res.emailSubject,
      emailBody: res.emailBody,
      thankyouEmailHeaderImage: this.thankyouEmailHeaderImage,
      displayHeadingAndIcons: res.displayHeadingAndIcons,
      agendaDocumentHeadingText: res.agendaDocumentHeadingText,
      calendarReminderHeadingText: res.calendarReminderHeadingText,
      thankyouforRegistering: res.thankyouforRegistering,
      calendarReminders: this.calendarReminders(),
      splashScreenImages: Array(res.splashScreenImages),
      registrationSetId: this.route.snapshot.paramMap.get('regSetid'),
      thankyouPageRegistrationSetId: res.thankyouPageRegistrationSetId,
      userId: this.localStorageService.get('UserId')
    });

  }


  includeLanguageSelectorCheckChanged() {
    this.inputManageThankyouPageModel.includeLanguageSelector = !this.inputManageThankyouPageModel.includeLanguageSelector;
  }

  includeSplashImagesCheckChanged() {
    this.includeSplashImage = !this.includeSplashImage;
  }
  includeThankyouTextCheckChanged() {
    this.includeThankyouText = !this.includeThankyouText;

  }
  includeCalendarReminderTextCheckChanged() {
    this.includeCalendarReminder = !this.includeCalendarReminder;
  }

  includeThankYouEmailCheckChanged() {
    this.includeThankYouEmail = !this.includeThankYouEmail;
  }

  enableDefaultCalendarReminderCheckChanged() {
    this.enableDefaultCalendarReminder = !this.enableDefaultCalendarReminder;
  }

  changeSplashType(e, type) {
    this.splashScreenImages = [
      { fileType: '', filePath: '' },
      { fileType: '', filePath: '' },
      { fileType: '', filePath: '' },
      { fileType: '', filePath: '' },
      { fileType: '', filePath: '' }];
    if (e.target.checked) {
      if (type === 'thankyoupagesplashimage') {
        this.splashImageType = 'thankyoupagesplashimage';
        this.isImagesOrVideo = true;
      } else {
        this.splashImageType = 'thankyoupagesplashmovie';
        this.isImagesOrVideo = false;
      }
    }
  }

  thankuSplashimagesFileChange(event, index) {
    this.spinner.show();
    if (event.target.files.length === 1) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        const isValidFile = (this.splashImageType === 'thankyoupagesplashmovie'
          ? this.helper.validateMovieFile(file.name)
          : this.helper.validateImageFile(file.name));

        if (isValidFile) {
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
          this.eventRegistrtationSetService.uploadThankyoupageSplashImages(formData).subscribe((res) => {
            if (res.isSuccess) {
              this.splashScreenImages[index] = { fileType: this.splashImageType, filePath: res.message };
              this.inputManageThankyouPageModel.splashScreenImages = this.splashScreenImages;
              this.thankyouPageForm.patchValue({ splashScreenImages: this.splashScreenImages });
            }
            this.spinner.hide();
          });
        }
      }, false);
        } else {
          this.spinner.hide();
          Swal.fire({
            title: new SweetAlertMessage(this.translate).invalidFileType,
            text: this.splashImageType === 'thankyoupagesplashmovie'
              ? new SweetAlertMessage(this.translate).onlyMp4AndWavAreAllowed
              : new SweetAlertMessage(this.translate).onlypngjpgandjpegareallowed,
            icon: 'error'
          });
        }
      }

    } else {
      this.spinner.hide();
    }
  }


  headerImagesFileChange(event) {
    this.spinner.show();
    if (event.target.files.length === 1) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        const isValidFile = this.helper.validateImageFile(file.name);
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
        //if (isValidFile) {
          
          formData.append('uploadFile', file, file.name);
          this.eventRegistrtationSetService.uploadThankyouPageHeaderGraphics(formData).subscribe((res) => {
            if (res.isSuccess) {
              this.thankyouEmailHeaderImage = res.message;
              this.thankyouPageForm.patchValue({
                thankyouEmailHeaderImage: this.thankyouEmailHeaderImage
              });
            }
            this.spinner.hide();
          });
        }
      }, false);
        //  else {
        //   this.spinner.hide();
        //   Swal.fire({
        //     title: new SweetAlertMessage(this.translate).invalidFileType,
        //     text: new SweetAlertMessage(this.translate).onlypngjpgandjpegareallowed,
        //     icon: 'error'
        //   });
         }
      }
      

     } 
    
     //else {
    //   this.spinner.hide();
    // }
  




  deleteSplashImage(index) {
    this.splashScreenImages[index] = { fileType: '', filePath: '' };
  }

  getAvailableLanguages() {
    this.langugeService.getAvailableLanguages().subscribe((res) => {
      if (res.isSuccess) {
        this.languageDropdownList = res.languageViewModel;
        this.defaultLanguageId = this.languageDropdownList[0].languageId;
      } else {
        // console.log('error in fetching languages');
      }
    });
  }


  goBack() {
    this.navigation.back();
  }

  deletethankyouEmailHeaderImage() {
    this.thankyouEmailHeaderImage = '';
  }

}








