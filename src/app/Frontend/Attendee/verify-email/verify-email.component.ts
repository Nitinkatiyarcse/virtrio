import { EventsRegistrationSetsService } from 'src/app/Services/events-registration-sets.service';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { from, BehaviorSubject } from 'rxjs';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';

import { ActivatedRoute, Router, CanActivate, NavigationEnd, Event } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';
import { AttendeesService } from 'src/app/Services/attendees.service';
import * as AppUtils from '../../../Utils/apputils';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  inputModel: any = {};
  class: any;
  message: any;
  constructor(private eventRegistrationSetService: EventsRegistrationSetsService,
    private sessionStorageService: SessionStorageService,
    private getterSetterService: GetterSetterService,
    public router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private attendeeService: AttendeesService) {
    this.inputModel.clientName = this.route.snapshot.paramMap.get('clientName');
    this.inputModel.eventName = this.route.snapshot.paramMap.get('eventName');
    this.inputModel.registrationSetName = this.route.snapshot.paramMap.get('registrationset') ? this.route.snapshot.paramMap.get('registrationset') : 'Default';
    this.inputModel.emailVerificationLink = this.route.snapshot.paramMap.get('verificationCode');
    // console.log(this.inputModel);
    this.verifyEmail();


  }


  ngOnInit(): void {
  }

  verifyEmail() {
    this.attendeeService.verifyEmail(this.inputModel).subscribe((res) => {
      if (res.isSuccess) {
        this.class = 'text-success';
        this.message = res.message;
      } else {
        this.class = 'text-danger';
        this.message = res.message;
      }
    });
  }

  goToEventDetailPage() {
    location.href = AppUtils.EventUrl + "/" + this.inputModel.clientName + "/" + this.inputModel.eventName + "/" + this.inputModel.registrationSetName;
  }
}
