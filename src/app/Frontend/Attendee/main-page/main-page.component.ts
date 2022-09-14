import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { Helper } from 'src/app/Utils/Helper';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { EventSponsorsService } from 'src/app/Services/event-sponsors.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { CountryService } from 'src/app/Services/country.service';
import * as AppUtils from 'src/app/Utils/apputils';
import { RegisterPartialComponent } from 'src/app/Frontend/Shared/Partial/register-partial/register-partial.component';
import { BoothDetailsPartialComponent } from '../../Shared/Partial/booth-details-partial/booth-details-partial.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  alert: boolean = false;
  modalRef: BsModalRef;
  IsOpen = false;
  registrationset = '';
  eventRegistrationSets: any;
  manageRegistrationPage: any = {};
  timerData = '';
  showTimer = false;
  @Input() eventName = '';
  @Input() clientName = '';
  @Input() eventId = '';
  @Input() eventDetails: any = {};
  @Input() attedees: any = [];
  @Input() booths: any = [];
  @Input() eventSponsors: any = [];
  @Input() similarEvents: any = [];
  eventStartDate: any;
  eventEndDate: any;
  countryList: any = [];
  @Input() eventSocialMedia: any = [];
  sponsorInput: any = {};
  isProfileImageAvailable = false;
  noImageEventLogoPath = '';
  isUserLoggedIn = false;
  loginPageDetails: any = {};

  constructor(
    private modalService: BsModalService,
    private route: ActivatedRoute,
    public router: Router,
    private eventService: EventsManagementService,
    private eventSponsorService: EventSponsorsService,
    private eventSponsorsService: EventSponsorsService,
    private helper: Helper,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    public bsModalRef: BsModalRef,
    private titleService: Title,
    private metaService: Meta,
    private countryService: CountryService,
    private sessionStorageService: SessionStorageService,
    private getterSetterService: GetterSetterService
  ) {
    this.noImageEventLogoPath = AppUtils.noImageEventLogoPath;
    this.clientName = this.route.snapshot.paramMap.get('clientName');
    this.eventName = this.route.snapshot.paramMap.get('eventName');
    this.sponsorInput.sponsorshipItem = '';
    this.sponsorInput.countryCode = '';
    this.loginPageDetails = {};
    this.loginPageDetails.includeRegisterBox = false;

    // this.getEventDetails();
    if (this.sessionStorageService.get('UserLoggedIn') === '1') {
      this.isUserLoggedIn = true;
    }
    // if (this.router.url.indexOf('/register') > -1) {
    //   this.openRegisterPopup();
    // }
  }

  generateGuid(): string {

    return (Math.random() + 1).toString(36).substring(7);

  }

  ngOnInit(): void {
    this.spinner.show();
    this.getCountry();
    this.getterSetterService.eventDetails.subscribe(res => {
      this.eventDetails = res.event;
      this.eventId = this.eventDetails.eventId;
      this.attedees = res.attendees;
      this.booths = res.booths;
      this.eventSponsors = res.eventSponsors;
      this.similarEvents = res.similarEvents;
      // parsing social media for event
      if (this.eventDetails.socialMedia) {
        this.eventSocialMedia = JSON.parse(this.eventDetails.socialMedia);
        // console.log(this.eventSocialMedia);
      }


      // });

      // this.getterSetterService.eventDetails.subscribe(res => {
      //   this.eventDetails = res.event;
      this.clientName = this.eventDetails.clients.urlSlug;
      this.eventName = this.eventDetails.urlSlug;

      if (res.eventRegistrationSets) {
        this.registrationset = res.eventRegistrationSets.urlSlug;
      } else {
        this.registrationset = '';
      }


      this.eventRegistrationSets = res.eventRegistrationSets;
      this.manageRegistrationPage = res.manageRegistrationPage;
      this.eventId = this.eventDetails.eventId;
      this.getterSetterService.eventDetails.emit(res);
      this.eventStartDate = new Date(this.helper.convertDateToLocalTimezone(this.eventDetails.eventStartDate));
      this.eventEndDate = new Date(this.helper.convertDateToLocalTimezone(this.eventDetails.eventEndDate));
      const endDateForTimer = new Date(this.helper.convertDateToLocalTimezone(this.eventDetails.eventStartDate));
      const endTimeForTimer = new Date(this.helper.convertDateToLocalTimezone(this.eventDetails.eventStartTime));
      const endDateTimeForTimer = new Date(endDateForTimer.getFullYear(),
        endDateForTimer.getMonth(),
        endDateForTimer.getDate(),
        endTimeForTimer.getHours(),
        endTimeForTimer.getMinutes(),
        endTimeForTimer.getSeconds()
      );




      if (endDateTimeForTimer < this.helper.convertDateToLocalTimezone(new Date())) {
        this.initializeClock(endDateTimeForTimer);
      } else {
        this.showTimer = true;
      }


      this.sessionStorageService.set('eventId', this.eventId);

    });
    this.getterSetterService.loginPageDetails.subscribe(res => {
      this.loginPageDetails = res;
    });

  }



  getCountry() {

    this.countryService.getAllCountry().subscribe((res) => {
      this.countryList = res;

    });

  }



  onFileChange(event) {
    this.spinner.show();
    if (event.target.files.length > 0) {
      // upload file to server
      const fileList: FileList = event.target.files;
      const file: File = fileList[0];
      if (fileList.length > 0) {
        if (this.helper.validateImageFile(file.name)) {
          // if (this.helper.validateProfileImageSize(file)) {


          const formData: FormData = new FormData();
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
              this.eventSponsorService.uploadSponsorProfileImage(formData).subscribe((res) => {
                if (res.isSuccess) {
                  this.isProfileImageAvailable = true;
                  this.sponsorInput.profileImage = res.message;
                } else {
                  this.isProfileImageAvailable = false;
                  this.spinner.hide();
                  // Swal.fire(
                  //   'Invalid file size',
                  //   'Max Image size allowed 200*200',
                  //   'error'
                  // );
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
        }
      } else {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).invalidFileType,
          text: new SweetAlertMessage(this.translate).pleaseSelectValidFile,
          icon: 'error'
        });
      }
    } else {
      this.spinner.hide();
    }
  }

  deleteImage() {
    this.sponsorInput.profileImage = '';
    this.isProfileImageAvailable = false;
  }

  addSponsor() {
    this.sponsorInput.eventId = this.eventDetails.eventId;
    this.sponsorInput.mobileNo = this.sponsorInput.countryCode + '' + this.sponsorInput.mobileNo1;
    console.log(this.sponsorInput);
    this.eventSponsorsService.addEventSponsors(this.sponsorInput).subscribe((res) => {
      if (!this.isProfileImageAvailable) {
        Swal.fire
          ('Sorry...', 'Please Upload Profile Image!', 'error');
        return;
      }
      this.spinner.show();

      if (res.isSuccess) {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).requestSentSuccessfully,
          icon: 'success',
          confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
        }).then(() => {

          this.sponsorInput = '';
          this.bsModalRef.hide();

        });
      } else {
      }
      this.spinner.hide();
    });

  }






  getEventDetails() {
    const eventDetailsForFrontendModel: any = {};
    this.spinner.show();
    eventDetailsForFrontendModel.eventName = this.eventName;
    eventDetailsForFrontendModel.clientName = this.clientName;
    eventDetailsForFrontendModel.registrationSet = this.registrationset === '' ? 'Default' : this.registrationset;
    this.eventService.getEventDetailsByEventName(eventDetailsForFrontendModel).subscribe((res) => {
      if (res.isSuccess) {
        this.eventDetails = res.event;
        this.eventRegistrationSets = res.eventRegistrationSets;
        this.manageRegistrationPage = res.manageRegistrationPage;
        this.eventId = this.eventDetails.eventId;
        this.getterSetterService.eventDetails.emit(res);
        this.eventStartDate = new Date(this.helper.convertDateToLocalTimezone(this.eventDetails.eventStartDate));
        this.eventEndDate = new Date(this.helper.convertDateToLocalTimezone(this.eventDetails.eventEndDate));
        const endDateForTimer = new Date(this.helper.convertDateToLocalTimezone(this.eventDetails.eventStartDate));
        const endTimeForTimer = new Date(this.helper.convertDateToLocalTimezone(this.eventDetails.eventStartTime));
        const endDateTimeForTimer = new Date(endDateForTimer.getFullYear(),
          endDateForTimer.getMonth(),
          endDateForTimer.getDate(),
          endTimeForTimer.getHours(),
          endTimeForTimer.getMinutes(),
          endTimeForTimer.getSeconds()
        );
        if (endDateTimeForTimer < new Date()) {
          this.initializeClock(endDateTimeForTimer);
        }

        this.spinner.hide();
        this.sessionStorageService.set('eventId', this.eventId);

      }

    });
  }



  /**
  * Start clock(timer)
  * @param endtime
  */
  initializeClock(endtime) {
    const timeinterval = setInterval(() => {
      const t = this.getTimeRemaining(endtime);
      if (t.seconds > 0) {
        this.showTimer = true;

        this.timerData = t.days + ' ' + this.translate.instant('days') + ', ' +
          t.hours + ' ' + this.translate.instant('hours') + ', ' +
          t.minutes + ' ' + this.translate.instant('minutes');
        // + ',' + t.seconds + this.translate.instant('seconds');
        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      } else {
        this.showTimer = false;
      }
    }, 1000);
  }

  // get time remaining
  getTimeRemaining(endtime) {
    const currentDate: any = new Date();
    const total = Date.parse(endtime) - Date.parse(currentDate);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }

  openLoginPopup() {
    // this.IsOpen = false;
    // if (this.registrationset) {
    if (this.route.snapshot.paramMap.get('clientName') == null && this.route.snapshot.paramMap.get('eventName') == null
      && this.route.snapshot.paramMap.get('registrationset') == null) {

    } else {
      this.clientName = this.route.snapshot.paramMap.get('clientName');
      this.eventName = this.route.snapshot.paramMap.get('eventName');
      this.registrationset = this.route.snapshot.paramMap.get('registrationset');
    }

    if (this.registrationset == null || this.registrationset == '') {
      this.router.navigate(['/' + this.clientName + '/' +
        this.eventName + '/Default/login']);
    } else {
      this.router.navigate(['/' + this.clientName + '/' +
        this.eventName + '/' + this.registrationset + '/login']);
    }

    // } else {
    //   const initialState = {
    //   };
    //   const modalConfig = {
    //     backdrop: true,
    //     ignoreBackdropClick: true,
    //   };
    //   const modalParams = Object.assign({}, modalConfig, { initialState });
    //   this.modalRef = this.modalService.show(LoginPartialComponent, modalParams);
    //   // this.modalRef.content.event.subscribe(res => {

    //   // });
    // }

  }

  openRegisterPopup() {
    this.IsOpen = false;
    // if (this.registrationset) {
    //   this.router.navigate(['/' + this.clientName + '/' + this.eventName + '/' + this.registrationset + '/register']);
    // } else {
    if (this.route.snapshot.paramMap.get('clientName') == null && this.route.snapshot.paramMap.get('eventName') == null
      && this.route.snapshot.paramMap.get('registrationset') == null) {

    } else {
      this.clientName = this.route.snapshot.paramMap.get('clientName');
      this.eventName = this.route.snapshot.paramMap.get('eventName');
      this.registrationset = this.route.snapshot.paramMap.get('registrationset') === null || this.route.snapshot.paramMap.get('registrationset') === '' ? 'Default' : this.route.snapshot.paramMap.get('registrationset');
    }
    const initialState = {
      clientName: this.clientName,
      eventName: this.eventName,
      registrationSetName: this.registrationset
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard: false,
    };

    const registerPopupModalParams = Object.assign({}, modalConfig, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
    this.modalRef = this.modalService.show(RegisterPartialComponent, registerPopupModalParams);
    // this.modalRef.content.event.subscribe(res => {

    // });
    // this.modalService.show(RegisterPartialComponent, {initialState});
    // }
  }

  getBoothDetails(boothItem) {
    // console.log(boothItem);
    const initialState = {
      boothDetails: boothItem,
      eventName: this.eventName,
      eventStartDate: this.eventStartDate,
      eventEndDate: this.eventEndDate,
      manageRegistrationPage: this.manageRegistrationPage,
      eventDetails: this.eventDetails
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard: false,
    };

    const boothDetailsPopupModalParams = Object.assign({}, modalConfig, { initialState, class: 'modal-xl', backdrop: 'static', keyboard: false });
    this.modalRef = this.modalService.show(BoothDetailsPartialComponent, boothDetailsPopupModalParams);
  }
}
