import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { from, BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { ActivatedRoute, Router, CanActivate, NavigationEnd, Event } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { AccountService } from 'src/app/Services/account.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { LanguageService } from 'src/app/Services/language.service';
import { ViewChild } from '@angular/core';
import { MainPageComponent } from 'src/app/Frontend/Attendee/main-page/main-page.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { EventSponsorsService } from 'src/app/Services/event-sponsors.service';
import { Helper } from 'src/app/Utils/Helper';
import { Meta, Title } from '@angular/platform-browser';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { RegisterPartialComponent } from '../../Partial/register-partial/register-partial.component';
import * as AppUtils from 'src/app/Utils/apputils';
import Swal from 'sweetalert2';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-login-registration-shared-layout',
  templateUrl: './login-registration-shared-layout.component.html',
  styleUrls: ['./login-registration-shared-layout.component.css']
})
export class LoginRegistrationSharedLayoutComponent implements OnInit {

  timerData = '';
  eventName = '';
  clientName = '';
  registrationSet = '';
  eventId = '';
  eventDetails: any = {};
  attedees: any = [];
  booths: any = [];
  eventSponsors: any = [];
  similarEvents: any = [];
  eventStartDate: any;
  eventEndDate: any;
  eventSocialMedia: any = [];
  sponsorInput: any = {};
  isProfileImageAvailable = false;
  public languages = Array<string>();
  selectedLan = 'en';
  urlParams: any;
  subscription: any;
  eventRegistrationSets: any;
  manageRegistrationPage:any={};
  backgroundStyle: any;
  modalRef: BsModalRef;
  noImageEventLogoPath = '';
  inviteToFriendModel: any = {};
  isLoggedIn=false;
  constructor(
    private modalService: BsModalService,
    private route: ActivatedRoute,
    public router: Router,
    private eventService: EventsManagementService,
    private eventSponsorService: EventSponsorsService,
    private helper: Helper,
    public translate: TranslateService,
    private spinner: NgxSpinnerService,
    public bsModalRef: BsModalRef,
    private titleService: Title,
    private metaService: Meta,
    private sessionStorageService: SessionStorageService,
    private localStorage: LocalStorageService,
    private languageService: LanguageService,
    private getterSetterService: GetterSetterService
  ) {
    if((this.sessionStorageService.get('AttendeeId')!='' && this.sessionStorageService.get('AttendeeId')!=null && this.sessionStorageService.get('AttendeeId')!=undefined)
    ||
    (this.sessionStorageService.get('RepresentativeId')!='' && this.sessionStorageService.get('RepresentativeId')!=null && this.sessionStorageService.get('RepresentativeId')!=undefined))
    {
      this.isLoggedIn=true;
    }
    this.noImageEventLogoPath = AppUtils.noImageEventLogoPath;
    // console.log(router.url);
    // console.log(router.url.split('/'));

    this.clientName = router.url.split('/')[1];
    this.eventName = router.url.split('/')[2];
    if (router.url.split('/').length > 3) {
      this.registrationSet = router.url.split('/')[3];
    }

    this.getEventDetails();

  }

  getAvailableLanguages(getByIdViewModel: any) {
    this.languageService.getLanguagesByEventId(getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        res.languageViewModel.forEach(element => {
          this.languages.push(element.abbreviation);
        });
        this.translate.addLangs(this.languages);
        if (this.localStorage.get('language') != null && this.localStorage.get('language') !== '') {
          this.translate.use(this.localStorage.get('language'));
          this.selectedLan = this.localStorage.get('language');
        } else {
          if (this.languages.length > 0) {
            this.translate.setDefaultLang(this.languages[0]);

          } else {
            this.translate.setDefaultLang('en');

          }
        }
      } else {
        this.translate.setDefaultLang('en');
      }
    });
  }


  changeLanguage(lanValue) {
    this.translate.use(lanValue);
    this.localStorage.set('language', lanValue);
    this.selectedLan = lanValue;
  }


  ngOnInit(): void {

  }

  /**
   * function for get event details by event name and client name
   */
  getEventDetails() {
    const eventDetailsForFrontendModel: any = {};
    this.spinner.show();
    eventDetailsForFrontendModel.eventName = this.eventName;
    eventDetailsForFrontendModel.clientName = this.clientName;
    eventDetailsForFrontendModel.registrationSet = this.registrationSet === '' ? 'Default' : this.registrationSet;
    this.eventService.getEventDetailsByEventName(eventDetailsForFrontendModel).subscribe((res) => {
      if (res.isSuccess) {

        this.eventDetails = res.event;
        // console.log(this.eventDetails);
        this.eventRegistrationSets = res.eventRegistrationSets;
        this.manageRegistrationPage=res.manageRegistrationPage;
        this.eventId = this.eventDetails.eventId;
        this.getterSetterService.eventDetails.emit(res);
        this.getterSetterService.loginPageDetails.emit(res.loginPageRegistrationSet);
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
        const lang:any={};
        lang.id=this.eventId;
        this.getAvailableLanguages(lang);

        this.addTitle();
        this.addTag();
        if (this.eventRegistrationSets) {
          this.sessionStorageService.set('registrationSetId', this.eventRegistrationSets.registrationSetId);
          if (this.eventRegistrationSets.banner) {
            this.backgroundStyle = {
              ['background']: 'url(' + this.eventRegistrationSets.banner + ') center',
              ['background-repeat']: 'no-repeat'
            };
          } else {
            this.backgroundStyle = {
              ['background']: 'url(' + this.eventDetails.mainPageBannerImage + ') center',
              ['background-repeat']: 'no-repeat'
            };
          }
        } else {
          this.backgroundStyle = {
            ['background']: 'url(' + this.eventDetails.mainPageBannerImage + ') center',
            ['background-repeat']: 'no-repeat'
          };
        }
      } else {
        this.router.navigate(['/404Error']);
      }

    });
  }

  /**
   * Add Title of the page
   */
  addTitle() {
    this.titleService.setTitle(this.eventDetails.eventName);
  }

  /**
   * Add meta tags
   */
  addTag() {
    this.metaService.addTag({ name: 'title', content: this.eventDetails.eventName });
    this.metaService.addTag({ name: 'description', content: '' });
    this.metaService.addTag({ name: 'robots', content: '' });
    this.metaService.addTag({ property: 'og:url', content: this.eventDetails.eventUrl });
    this.metaService.addTag({ property: 'og:type', content: 'event' });
    this.metaService.addTag({ property: 'og:title', content: this.eventDetails.eventName });
    this.metaService.addTag({ property: 'og:description', content: this.eventDetails.eventDesc });
    this.metaService.addTag({ property: 'og:image', content: this.eventDetails.eventLogo });
    this.metaService.addTag({property:'keyword',content:this.eventDetails.metaTags});
  }


  /**
   * Start clock(timer)
   * @param endtime
   */
  initializeClock(endtime) {
    const timeinterval = setInterval(() => {
      const t = this.getTimeRemaining(endtime);
      this.timerData = t.days + ' ' + this.translate.instant('days') + ', ' +
        t.hours + ' ' + this.translate.instant('hours') + ', ' +
        t.minutes + ' ' + this.translate.instant('minutes');
      // + ',' + t.seconds + this.translate.instant('seconds');
      if (t.total <= 0) {
        clearInterval(timeinterval);
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

  // openRegisterPage() {
  //   // if (this.route.snapshot.paramMap.get('clientName') == null && this.route.snapshot.paramMap.get('eventName') == null
  //   //   && this.route.snapshot.paramMap.get('registrationset') == null) {

  //   // } else {
  //   //   this.clientName = this.clientName;
  //   //   this.eventName = this.eventName;
  //   //   this.registrationSet = this.registrationSet;
  //   // }
  //   const initialState = {
  //     clientName: this.clientName,
  //     eventName: this.eventName,
  //     registrationSetName: this.registrationSet
  //   };
  //   const modalConfig = {
  //     backdrop: true,
  //     ignoreBackdropClick: true,
  //   };

  //   const registerPopupModalParams = Object.assign({}, modalConfig, { initialState, class: 'modal-xl' });
  //   this.modalRef = this.modalService.show(RegisterPartialComponent, registerPopupModalParams);
  // }


  sendInvitationmail() {
    this.inviteToFriendModel.eventId = this.eventId;
    this.inviteToFriendModel.eventUrl=AppUtils.EventUrl+ this.router.url;
    this.inviteToFriendModel.eventName=this.eventName;
    if(this.isLoggedIn){
      if(this.sessionStorageService.get('IsRepresentative')!==null  && this.sessionStorageService.get('IsRepresentative')!==undefined && this.sessionStorageService.get('IsRepresentative')==='true')
      {
        this.inviteToFriendModel.representativeId=this.sessionStorageService.get('RepresentativeId');
      }
      else{
        this.inviteToFriendModel.attendeeId=this.sessionStorageService.get('AttendeeId');
      }
    } else{
      this.inviteToFriendModel.attendeeId=AppUtils.emptyGuid;
    }
    // console.log(this.inviteToFriendModel);
    this.spinner.show();
    this.eventService.sendInvitationEmailFromFrontendPage(this.inviteToFriendModel).subscribe((res) => {
      if(res.isSuccess){
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).invitationSentSuccessfully,
          icon: 'success'
        });
        this.bsModalRef.hide();
       
      } else {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: res.message,
          icon: 'error'
        });
      }
    });

  }

}
