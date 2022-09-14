import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { EventsRegistrationSetsService } from 'src/app/Services/events-registration-sets.service';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { from, BehaviorSubject } from 'rxjs';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';

import { ActivatedRoute, Router, CanActivate, NavigationEnd, Event } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { IfStmt } from '@angular/compiler';
import { LanguageService } from 'src/app/Services/language.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { CometChat } from '@cometchat-pro/chat';
import { COMETCHAT_CONSTANTS } from 'src/CONSTS';
import { SocialAuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider } from 'angularx-social-login';
import { Helper } from 'src/app/Utils/Helper';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { textSpanIntersectsWithPosition } from 'typescript';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  clientName = '';
  eventName = '';
  registrationSet = '';
  loginPageUIDetails: any = {};
  attendeeLoginDetail: any = {};
  isOTPReceived = false;
  public languages = Array<string>();
  selectedLan = 'en';
  loginFormControl: any = {};
  socialUser: SocialUser;
  isLoggedin: boolean;
  timerData = '';
  eventStartDate: any;
  registrationStartDate: any;
  registrationEndDate: any;
  registrationStartTime: any;
  registrationEndTime: any;
  eventEndDate: any;
  futuredateModal: any;
  isLoggedinFirstTime = false;
  eventDetails: any = {};
  showTimer = false;

  constructor(private sessionStorageService: SessionStorageService,
    private getterSetterService: GetterSetterService,
    private languageService: LanguageService,
    public router: Router,
    private socialAuthService: SocialAuthService,
    private route: ActivatedRoute,
    private helper: Helper,
    public translate: TranslateService,
    private spinner: NgxSpinnerService,
    private localStorage: LocalStorageService,
    private attendeeService: AttendeesService,
    private eventService: EventsManagementService) {
    this.sessionStorageService.removeAllKeys();
    this.clientName = this.route.snapshot.paramMap.get('clientName');
    this.eventName = this.route.snapshot.paramMap.get('eventName');
    this.registrationSet = this.route.snapshot.paramMap.get('registrationset') ? this.route.snapshot.paramMap.get('registrationset') : 'Default';
    this.getEventDetails()
    this.getLoginPageDetails();



  }


  getEventDetails() {
    const eventDetailsForFrontendModel: any = {};
    this.spinner.show();
    eventDetailsForFrontendModel.eventName = this.eventName;
    eventDetailsForFrontendModel.clientName = this.clientName;
    eventDetailsForFrontendModel.registrationSet = this.registrationSet;
    this.eventService.getEventDetailsByEventName(eventDetailsForFrontendModel).subscribe((res) => {
      if (res.isSuccess) {
        // console.log(res);
        this.eventDetails = res.event;
        this.getterSetterService.eventDetails.emit(res);

      }
      var eventpreviewStartDate = (this.helper.convertDateToLocalTimezone(new Date(this.eventDetails.previewStartDate)));
      var eventpreviewEndDate = (this.helper.convertDateToLocalTimezone(new Date(this.eventDetails.previewEndDate)));
      // if (new Date() > eventpreviewStartDate && new Date() < eventpreviewEndDate) {
      //   this.futuredateModal.hide();
      // }
      // else {
      //   this.futuredateModal.show();
      // }
    });
  }



  ngOnInit(): void {

    const videoelement = document.getElementById('futureDateModal') as HTMLElement;
    // this.futuredateModal = new Modal(videoelement, { backdrop: 'static', keyboard: false });

    // CometChat.login('ryhxb', COMETCHAT_CONSTANTS.AUTH_KEY).then(
    //   (loggedInUser) => {
    //     // console.log('Login Successful:', { loggedInUser });
    //   },
    //   (error) => {
    //     // console.log('Login failed with exception:', { error });
    //   }
    // );
    // this.socialAuthService.authState.subscribe((user) => {
    //   this.socialUser = user;
    //   this.isLoggedin = (user != null);
    //   // console.log(this.socialUser);
    //   this.loginFormControl.registeredFrom = this.socialUser.provider;
    //   this.loginFormControl.email = this.socialUser.email;
    //   this.submitLoginForm();
    // });


  }

  getAvailableLanguages(getByIdViewModel: any) {
    this.languageService.getLanguagesByEventId(getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        res.languageViewModel.forEach(element => {
          this.languages.push(element.abbreviation);
        });
        this.translate.addLangs(this.languages);
        if (this.sessionStorageService.get('language') != null && this.sessionStorageService.get('language') !== '') {
          this.translate.use(this.sessionStorageService.get('language'));
          this.selectedLan = this.sessionStorageService.get('language');
        } else {
          this.translate.setDefaultLang('en');
        }
      }
      else {
        this.translate.setDefaultLang('en');
      }
    });
  }

  getLoginPageDetails() {

    this.spinner.show();
    const reqModel: any = {};
    reqModel.eventName = this.eventName;
    reqModel.clientName = this.clientName;
    reqModel.registrationSetName = this.registrationSet;
    //console.log(reqModel);
    this.attendeeService.getAttendeeLoginPage(reqModel).subscribe((res) => {
      if (res.isSuccess) {
        //console.log(res);
        this.loginPageUIDetails = res;



        this.eventStartDate =this.helper.combineDateAndTime(this.helper.convertDateToLocalTimezone(this.loginPageUIDetails.eventStartDate),this.helper.convertDateToLocalTimezone(this.loginPageUIDetails.eventStartTime));
        this.eventEndDate = this.helper.combineDateAndTime(this.helper.convertDateToLocalTimezone(this.loginPageUIDetails.eventEndDate),this.helper.convertDateToLocalTimezone(this.loginPageUIDetails.eventEndTime));

        var regStartDate = this.helper.combineDateAndTime(this.helper.convertDateToLocalTimezone(new Date(this.loginPageUIDetails.registrationStartDate)), this.helper.convertDateToLocalTimezone(new Date(this.loginPageUIDetails.registrationStartTime)));

        var regEndDate = this.helper.combineDateAndTime(new Date(this.loginPageUIDetails.registrationEndDate), new Date(this.loginPageUIDetails.registrationEndTime));

        // if (new Date() > regStartDate && new Date() < regEndDate) {
        //   this.futuredateModal.show();
        // } else {
        //   this.futuredateModal.hide();
        // }


        // var eventpreviewStartDate = new Date(this.helper.convertDateToLocalTimezone(this.loginPageUIDetails.previewStartDate));

        // var eventpreviewEndDate = new Date(this.helper.convertDateToLocalTimezone(this.loginPageUIDetails.previewEndDate));

        // if (new Date() > eventpreviewStartDate && new Date() < eventpreviewEndDate) {
        //   alert("Preview not open yet!!")
        // }


        const endDateForTimer = new Date(this.helper.convertDateToLocalTimezone(this.loginPageUIDetails.eventStartDate));
        const endTimeForTimer = new Date(this.helper.convertDateToLocalTimezone(this.loginPageUIDetails.eventStartTime));

        const endDateTimeForTimer = new Date(endDateForTimer.getFullYear(),
          endDateForTimer.getMonth(),
          endDateForTimer.getDate(),
          endTimeForTimer.getHours(),
          endTimeForTimer.getMinutes(),
          endTimeForTimer.getSeconds()
        );
        if (endDateTimeForTimer < this.helper.convertDateToLocalTimezone( new Date())) {
          this.initializeClock(endDateTimeForTimer);
        } else {
          this.showTimer = true;
        }



        if (this.loginPageUIDetails.includeLanguageSelector) {
          const lang: any = {};
          lang.id = res.eventId;
          this.getAvailableLanguages(lang);
        }
        this.getterSetterService.loginPageDetails.emit(res);

        this.spinner.hide();
      } else {
        // console.log(res);
      }

    });
  }

  submitLoginForm() {
    this.loginFormControl.registrationSetId = this.loginPageUIDetails.registrationSetId;
    this.loginFormControl.eventId = this.loginPageUIDetails.eventId;
    // this.loginFormControl.registrationPageId = this.loginPageUIDetails.loginPageRegistrationSetId;
    if (this.loginFormControl.registeredFrom === undefined) {
      this.loginFormControl.registeredFrom = 'local';
    }

    // check if event started or not
    if (this.eventStartDate >new Date())  {
      alert('Event has not been started yet. Please try later');
      return;
    }
    else if (new Date() > this.eventEndDate) {
      alert('Event has been ended.');
      return;
    }
    this.spinner.show();
    this.attendeeService.loginAttendeeAndGetOtp(this.loginFormControl).subscribe((res) => {
      if (res.isSuccess) {
        this.isOTPReceived = true;
        this.loginFormControl.attendeeId = res.attendeeId;
        this.loginFormControl.isRepresentative = res.isRepresentative;
        this.loginFormControl.isEventAdmin = res.isEventAdmin;
        this.isLoggedinFirstTime = res.isFirstTimeAttendee;
        if (res.isRepresentative) {
          this.loginFormControl.eventRepresentativeId = res.eventRepresentativeId;
        }
        if (res.isEventAdmin) {
          this.loginFormControl.evendAdminId = res.evendAdminId;

        }
        this.sessionStorageService.set('EventName', this.eventName);
        console.log(this.loginFormControl);

      } else {
        this.isOTPReceived = false;
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: this.translate.instant((res.message)),
          icon: 'error'
        }).then(() => { });
      }
      this.spinner.hide();
    });
  }

  verifyLoginOTP() {
    this.spinner.show();

    this.attendeeService.verifyOTP(this.loginFormControl).subscribe((res) => {
      if (res.isSuccess) {
        this.sessionStorageService.set('IsFirstTimeAttendee', this.isLoggedinFirstTime.toString());
        this.localStorage.set('SessionId', res.sessionId);
        // alert('you are loggedin');
        // redirect to user according to the selected page of this registration set
        // console.log(res);
        this.sessionStorageService.set('MainPageUrl', '/' + this.clientName + '/' + this.eventName + '/' + this.registrationSet);
        this.sessionStorageService.set('logoutUrl', this.loginPageUIDetails.logoutUrl);
        this.sessionStorageService.set('UserLoggedIn', '1');
        this.sessionStorageService.set('ProfileMandatorytocompleteregistrations', res.profileMandatorytocompleteregistrations);
        this.sessionStorageService.set('RegistrationSetId', this.loginFormControl.registrationSetId);
        if (res.isEventAdmin) {
          this.sessionStorageService.set('IsEventAdmin', 'true');
          this.sessionStorageService.set('EventAdminId', res.eventAdmin.userId);
          location.href = '/room/' + res.rooms.roomId + '/' + res.rooms.eventId;
        }
        else if (res.isReperesentative) {
          this.sessionStorageService.set('IsRepresentative', 'true');
          this.sessionStorageService.set('RepresentativeId', res.representatives[0].eventRepresntativeId);
          location.href = '/room/' + res.representatives[0].roomId + '/' + res.representatives[0].eventRepresentatives.eventId + '/dashboard';
        } else {
          this.sessionStorageService.set('AttendeeId', res.attendee.attendeeId);
          location.href = '/room/' + res.rooms.roomId + '/' + res.rooms.eventId;
        }
      } else {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: this.translate.instant(res.message),
          icon: 'error'
        }).then(() => { });
      }
      this.spinner.hide();

    });

  }

  changeLanguage(lanValue) {
    this.translate.use(lanValue);
    this.localStorage.set('language', lanValue);
    this.selectedLan = lanValue;
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

  }
  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);

  }
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



}
