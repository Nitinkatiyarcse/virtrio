import { EventsRegistrationSetsService } from 'src/app/Services/events-registration-sets.service';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { from, BehaviorSubject } from 'rxjs';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { Modal } from 'bootstrap';
import { Helper } from 'src/app/Utils/Helper';

import { ActivatedRoute, Router, CanActivate, NavigationEnd, Event } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';
import { AttendeesService } from 'src/app/Services/attendees.service';
@Component({
  selector: 'app-thankyou-page',
  templateUrl: './thankyou-page.component.html',
  styleUrls: ['./thankyou-page.component.css']
})
export class ThankyouPageComponent implements OnInit {
  clientName: any;
  eventName: any;
  futuredateModal: any;
  registrationSetName: any;
  inputThankyouModel: any = {};
  outputThankyouModel: any = {};
  constructor(private eventRegistrationSetService: EventsRegistrationSetsService,
    private sessionStorageService: SessionStorageService,
    private getterSetterService: GetterSetterService,
    public router: Router,
    private helper: Helper,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private attendeeService: AttendeesService) {
    this.clientName = this.route.snapshot.paramMap.get('clientName');
    this.eventName = this.route.snapshot.paramMap.get('eventName');
    this.registrationSetName = this.route.snapshot.paramMap.get('registrationset') ? this.route.snapshot.paramMap.get('registrationset') : 'Default';
    // console.log(this.clientName);
    // console.log(this.eventName);
    // console.log(this.registrationSetName);
    this.inputThankyouModel.clientName = this.clientName;
    this.inputThankyouModel.eventName = this.eventName;
    this.inputThankyouModel.registrationSetName = this.registrationSetName;
    this.inputThankyouModel.emailAddress = this.sessionStorageService.get('attendeeEmail');
    this.getThankyouPageDetails();
  }

  ngOnInit(): void {
    const videoelement = document.getElementById('futureDateModal') as HTMLElement;
    this.futuredateModal = new Modal(videoelement, { backdrop: 'static', keyboard: false });

  }

  getThankyouPageDetails() {
    this.spinner.show();
    this.attendeeService.getThankyouPageDetails(this.inputThankyouModel).subscribe((res) => {
      if (res.isSuccess) {
        this.outputThankyouModel = res;
        var d: any = {};
        d.event = res.events;
        d.eventRegistrationSets = res.eventRegistrationSets;
        // var regStartDate=d.eventRegistrationSets.startDate;
        // var regEndDate=d.eventRegistrationSets.endDate;
        
        var regStartDate = this.helper.combineDateAndTime(this.helper.convertDateToLocalTimezone(new Date(this.outputThankyouModel.eventRegistrationSets.startDate)), this.helper.convertDateToLocalTimezone(new Date(this.outputThankyouModel.eventRegistrationSets.startTime)));

        var regEndDate = this.helper.combineDateAndTime(this.helper.convertDateToLocalTimezone(new Date(this.outputThankyouModel.eventRegistrationSets.endDate)), this.helper.convertDateToLocalTimezone(new Date(this.outputThankyouModel.eventRegistrationSets.endTime)));

        if (new Date() > regStartDate && new Date() < regEndDate) {
          this.futuredateModal.hide();
        } else {
          this.futuredateModal.show();
        }

        this.getterSetterService.eventDetails.emit(d);
      } else {
        this.router.navigate(['/404Error']);
      }
      this.sessionStorageService.removeAllKeys();
      this.spinner.hide();
    });
  }
}
