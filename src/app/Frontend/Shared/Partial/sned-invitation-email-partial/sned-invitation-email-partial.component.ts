
import { AccountService } from 'src/app/Services/account.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { LanguageService } from 'src/app/Services/language.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/Utils/common';
import { getuid } from 'process';
@Component({
  selector: 'app-sned-invitation-email-partial',
  templateUrl: './sned-invitation-email-partial.component.html',
  styleUrls: ['./sned-invitation-email-partial.component.css']
})
export class SnedInvitationEmailPartialComponent implements OnInit {
  inviteToFriendModel: any = {};
  isLoggedIn: any = false;
  eventId: any;
  eventName: any;
  eventDetails: any = {};
  constructor(private modalService: BsModalService,
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
    private getterSetterService: GetterSetterService,
    private CommonService: CommonService) { }

  ngOnInit(): void {
  }


  sendInvitationmail() {
    this.inviteToFriendModel.eventId = this.eventId;
    this.inviteToFriendModel.eventUrl = AppUtils.EventUrl + this.sessionStorageService.get('MainPageUrl');
    this.inviteToFriendModel.eventName = this.eventName;
    if (this.isLoggedIn) {
      // this.inviteToFriendModel.attendeeId=this.sessionStorageService.get('AttendeeId');
      if (this.sessionStorageService.get('IsRepresentative') !== null && this.sessionStorageService.get('IsRepresentative') !== undefined && this.sessionStorageService.get('IsRepresentative') === 'true') {
        this.inviteToFriendModel.representativeId = this.sessionStorageService.get('RepresentativeId');
      }
      else {
        this.inviteToFriendModel.attendeeId = this.sessionStorageService.get('AttendeeId');
      }
    } else {
      this.inviteToFriendModel.attendeeId = AppUtils.emptyGuid;
    }
    // console.log(this.inviteToFriendModel);
    this.spinner.show();
    this.eventService.sendInvitationEmailFromFrontendPage(this.inviteToFriendModel).subscribe((res) => {
      if (res.isSuccess) {
        var evnt: any;
        this.CommonService.logAttendeeClicks(evnt, 'Inviting a friend', this.inviteToFriendModel, this.eventDetails.eventId, this.sessionStorageService.get('IsRepresentative') === 'true', this.sessionStorageService.get('RepresentativeId'), this.sessionStorageService.get('AttendeeId'), AppUtils.emptyGuid);
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

  closeModal() {
    this.bsModalRef.hide();
  }
}
