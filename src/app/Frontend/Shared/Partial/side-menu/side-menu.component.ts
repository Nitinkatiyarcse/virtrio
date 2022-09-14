import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Location} from '@angular/common';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Helper } from 'src/app/Utils/Helper';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginPartialComponent } from 'src/app/Frontend/Shared/Partial/login-partial/login-partial.component';
import { RegisterPartialComponent } from 'src/app/Frontend/Shared/Partial/register-partial/register-partial.component';
import { SurveyPartialComponent } from 'src/app/Frontend/Shared/Partial/survey-partial/survey-partial.component';
import { QuizPartialComponent } from 'src/app/Frontend/Shared/Partial/quiz-partial/quiz-partial.component';
import { PollPartialComponent } from 'src/app/Frontend/Shared/Partial/poll-partial/poll-partial.component';
import { Session } from 'protractor';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import * as AppUtils from 'src/app/Utils/apputils';
import { SignalRService } from 'src/app/Services/signal-r.service';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  IsOpen = false;
  modalRef: BsModalRef;
  clientName = '';
  eventName = '';
  registrationset = '';
  eventDetails: any;
  isUserLoggedIn=false;
  loginPageDetails: any={};
  constructor(
    private modalService: BsModalService,
    private sessionStorageService: SessionStorageService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private helper: Helper,private signalRService:SignalRService,
    public router: Router,
    private getterSetterService: GetterSetterService,private _location: Location) {

      this.loginPageDetails = {};
      this.loginPageDetails.includeRegisterBox = false;
  }

  ngOnInit(): void {
    if (this.sessionStorageService.get('UserLoggedIn') === '1') {
      this.isUserLoggedIn = true;
    }

    this.getterSetterService.loginPageDetails.subscribe(res => {
      this.loginPageDetails = res;
      // console.log(this.loginPageDetails);
    });
    this.getterSetterService.eventDetails.subscribe(res => {
      this.eventDetails = res.event;
      this.clientName = this.eventDetails.clients.urlSlug;
      this.eventName = this.eventDetails.urlSlug;

      if (res.eventRegistrationSets) {
        this.registrationset = res.eventRegistrationSets.urlSlug;
      } else {
        this.registrationset = '';
      }
      // if (this.router.url.indexOf('/register') > -1) {
      //   this.openRegisterPopup();
      // }
    });

  }

  openNav() {
    this.IsOpen = true;
  }

  closeNav() {
    this.IsOpen = false;
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

    this.router.navigate(['/' + this.clientName + '/' +
      this.eventName + '/' + this.registrationset + '/login']);
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
      this.registrationset = (this.route.snapshot.paramMap.get('registrationset') == null || this.route.snapshot.paramMap.get('registrationset') == '') ? 'Defaults' : this.route.snapshot.paramMap.get('registrationset');
    }
    const initialState = {
      clientName: this.clientName,
      eventName: this.eventName,
      registrationSetName: this.registrationset== ''? 'Defaults' : this.registrationset
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard:false,
    };

    const registerPopupModalParams = Object.assign({}, modalConfig, { initialState, class: 'modal-lg' });
    this.modalRef = this.modalService.show(RegisterPartialComponent, registerPopupModalParams);
    // this.modalRef.content.event.subscribe(res => {

    // });
    // this.modalService.show(RegisterPartialComponent, {initialState});
    // }
  }

  openSurveyPopup() {
    this.IsOpen = false;
    const initialState = {
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard:false,
    };
    const modalParams = Object.assign({}, modalConfig, { initialState });
    this.modalRef = this.modalService.show(SurveyPartialComponent, modalParams);
    // this.modalRef.content.event.subscribe(res => {

    // });
  }


  openQuizPopup() {
    this.IsOpen = false;
    const initialState = {
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard:false,
    };
    const modalParams = Object.assign({}, modalConfig, { initialState });
    this.modalRef = this.modalService.show(QuizPartialComponent, modalParams);
  }


  openPollPopup() {
    this.IsOpen = false;
    const initialState = {
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard:false,
    };
    const modalParams = Object.assign({}, modalConfig, { initialState });
    this.modalRef = this.modalService.show(PollPartialComponent, modalParams);
  }

  openRooms(){
    this._location.back();
  }
  logoutUser() {
    
    const redirectUrl = this.sessionStorageService.get('MainPageUrl');
    this.sessionStorageService.removeAllKeys();
    this.signalRService.sendData();
    location.href = AppUtils.EventUrl + redirectUrl;
  }
}
