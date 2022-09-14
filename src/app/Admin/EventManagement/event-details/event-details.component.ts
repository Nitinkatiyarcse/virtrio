import { Component, OnInit, EventEmitter, OnDestroy, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { from, BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

import { EventsManagementService } from 'src/app/Services/events-management.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { isPostfixUnaryExpression } from 'typescript';
import { LanguageService } from 'src/app/Services/language.service';
import { SweetAlertMessage } from '../../../Utils/SweetAlertMessages';
import { GetByIdViewModel } from '../../Models/GetByIdViewModel';
import { EventSettingsComponent } from '../event-settings/event-settings.component';

import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { ThrowStmt } from '@angular/compiler';
import { event } from 'jquery';
import { Helper } from 'src/app/Utils/Helper';
import * as AppUtils from 'src/app/Utils/apputils';
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  getByIdViewModel: any = {};
  event: any = {};
  eventStatus = [];
  defaultSelectedStatus = '';
  private eventVm: any = {};
  isSuperOrEventAdmin = false;
  isSuperAdmin = false;
  modalRef: BsModalRef;
  domainUrl = '';
  isEventDatesExpired: any;
  noImageEventLogoPath = '';
  constructor(private http: HttpClient,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: BsModalService,
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    public router: Router,
    private eventManagementService: EventsManagementService,
    private langugeService: LanguageService,
    private sweetAlertMessage: SweetAlertMessage,
    private helper: Helper,
    public getterSetterService: GetterSetterService) {
    this.noImageEventLogoPath = AppUtils.noImageEventLogoPath;
    this.domainUrl = AppUtils.EventUrl;
    this.localStorage.set('isEventSelected', 'true');
    this.isSuperOrEventAdmin = ((this.localStorage.get('Role') === 'SuperAdmin'
      || this.localStorage.get('Role') === 'EventAdmin')
      ? true : false);
    this.isSuperAdmin = (this.localStorage.get('Role') === 'SuperAdmin' ? true : false);
  }

  ngOnInit(): void {

    this.getByIdViewModel.id = this.route.snapshot.paramMap.get('id');
    this.getEventDetails();

  }



  getEventDetails() {
    this.spinner.show();
    this.eventManagementService.GetEventDetails(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.event = res.usersEvent;

        this.event.afterEventAccessEndDate = (this.event.afterEventAccessEndDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.afterEventAccessEndDate) : '';

        this.event.afterEventAccessEndTime = (this.event.afterEventAccessEndTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.afterEventAccessEndTime) : '';

        this.event.afterEventAccessStartDate = (this.event.afterEventAccessStartDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.afterEventAccessStartDate) : '';

        this.event.afterEventAccessStartTime = (this.event.afterEventAccessStartTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.afterEventAccessStartTime) : '';

        this.event.eventEndDate = (this.event.eventEndDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.eventEndDate) : '';

        this.event.eventEndTime = (this.event.eventEndTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.eventEndTime) : '';

        this.event.eventStartDate = (this.event.eventStartDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.eventStartDate) : '';

        this.event.eventStartTime = (this.event.eventStartTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.eventStartTime) : '';

        this.event.previewEndDate = (this.event.previewEndDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.previewEndDate) : '';

        this.event.previewEndTime = (this.event.previewEndTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.previewEndTime) : '';

        this.event.previewStartDate = (this.event.previewStartDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.previewStartDate) : '';

        this.event.previewStartTime = (this.event.previewStartTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.previewStartTime) : '';


        this.event.projectStartDate = (this.event.projectStartDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.projectStartDate) : '';

        this.event.projectEndDate = (this.event.projectEndDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.projectEndDate) : '';


        this.event.registrationEndDate = (this.event.registrationEndDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.registrationEndDate) : '';

        this.event.registrationEndTime = (this.event.registrationEndTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.registrationEndTime) : '';

        this.event.registrationStartDate = (this.event.registrationStartDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.registrationStartDate) : '';

        this.event.registrationStartTime = (this.event.registrationStartTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.registrationStartTime) : '';

        this.event.reportAccessEndDate = (this.event.reportAccessEndDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.reportAccessEndDate) : '';

        this.event.reportAccessEndTime = (this.event.reportAccessEndTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.reportAccessEndTime) : '';

        this.event.reportAccessStartDate = (this.event.reportAccessStartDate.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.reportAccessStartDate) : '';

        this.event.reportAccessStartTime = (this.event.reportAccessStartTime.indexOf('01-01-01T') === -1)
          ? this.helper.convertDateToLocalTimezone(this.event.reportAccessStartTime) : '';

        localStorage.setItem('ProjectStartDate', (this.event.projectStartDate).toString());
        localStorage.setItem('ProjectEndDate', (this.event.projectEndDate).toString());
        // this.event.afterEventAccessEndDate = this.helper.convertDateToLocalTimezone(this.event.afterEventAccessEndDate);
        // this.event.afterEventAccessEndTime = this.helper.convertDateToLocalTimezone(this.event.afterEventAccessEndTime);
        // this.event.afterEventAccessStartDate =
        //   this.helper.convertDateToLocalTimezone(this.event.afterEventAccessStartDate);
        // this.event.afterEventAccessStartTime =
        //   this.helper.convertDateToLocalTimezone(this.event.afterEventAccessStartTime);
        // this.event.eventEndDate = this.helper.convertDateToLocalTimezone(this.event.eventEndDate);
        // this.event.eventEndTime = this.helper.convertDateToLocalTimezone(this.event.eventEndTime);
        // this.event.eventStartDate = this.helper.convertDateToLocalTimezone(this.event.eventStartDate);
        // this.event.eventStartTime = this.helper.convertDateToLocalTimezone(this.event.eventStartTime);
        // this.event.previewEndDate = this.helper.convertDateToLocalTimezone(this.event.previewEndDate);
        // this.event.previewEndTime = this.helper.convertDateToLocalTimezone(this.event.previewEndTime);
        // this.event.previewStartDate = this.helper.convertDateToLocalTimezone(this.event.previewStartDate);
        // this.event.previewStartTime = this.helper.convertDateToLocalTimezone(this.event.previewStartTime);

        // this.event.registrationEndDate = this.helper.convertDateToLocalTimezone(this.event.registrationEndDate);
        // this.event.registrationEndTime = this.helper.convertDateToLocalTimezone(this.event.registrationEndTime);
        // this.event.registrationStartDate = this.helper.convertDateToLocalTimezone(this.event.registrationStartDate);
        // this.event.registrationStartTime = this.helper.convertDateToLocalTimezone(this.event.registrationStartTime);
        // this.event.reportAccessEndDate = this.helper.convertDateToLocalTimezone(this.event.reportAccessEndDate);

        // this.event.reportAccessEndTime = this.helper.convertDateToLocalTimezone(this.event.reportAccessEndTime);
        // this.event.reportAccessStartDate = this.helper.convertDateToLocalTimezone(this.event.reportAccessStartDate);
        // this.event.reportAccessStartTime = this.helper.convertDateToLocalTimezone(this.event.reportAccessStartTime);
        // this.event.reportAccessEndDate = this.helper.convertDateToLocalTimezone(this.event.reportAccessEndDate);
        // this.event.reportAccessEndDate = this.helper.convertDateToLocalTimezone(this.event.reportAccessEndDate);



        // console.log(this.event);
        this.defaultSelectedStatus = this.event.eventStatus;
        this.getterSetterService.setEventName = this.event.eventName;
        this.localStorage.set('EventName', this.event.eventName);
        this.localStorage.set('EventId', this.event.eventId);
        console.log(this.getterSetterService.getEventName);
        this.isEventDatesExpired = (new Date() > new Date(this.event.projectEndDate));
        this.getEventStatus();
      } else {
        // console.log(res.errors);
      }
      this.spinner.hide();
    });
  }
  getEventStatus() {
    this.eventManagementService.getEventStatus().subscribe((res) => {
      if (res.isSuccess) {
        this.eventStatus = res.eventStatusTypes;
        console.log(this.eventStatus);
      } else {
        // console.log(res.errors);
      }
    });
  }

  changeEventStatus(eventId) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).changeStatus,
      text: new SweetAlertMessage(this.translate).changeEventStatusMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).no
    }).then((result) => {

      if (result.value) {
        this.spinner.show();
        this.eventVm.eventId = eventId;
        this.eventVm.userId = this.localStorage.get('UserId');
        this.eventVm.eventStatus = this.event.eventStatus;
        console.log(this.eventVm);
        this.eventManagementService.changeEventStatus(this.eventVm).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).success,
              text: new SweetAlertMessage(this.translate).statusChangedSuccessfully,
              icon: 'success'
            }).then(function () {
              this.spinner.hide();
            });
          } else {
            Swal.fire(
              new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              res.message,
              'error'
            );
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.event.eventStatus = this.defaultSelectedStatus;
      }
      this.spinner.hide();
    });
  }

  DeleteEvent(eventId) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {

      if (result.value) {
        this.spinner.show();
        this.eventVm.eventId = eventId;
        this.eventVm.modifiedBy = this.localStorage.get('UserId');

        this.eventManagementService.DeleteEvent(this.eventVm).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetalertDeletedHeader,
              text: new SweetAlertMessage(this.translate).sweetAlertDeletedSuccessMessage,
              icon: 'success'
            }).then(function () {
              location.href = '../admin/events';
              this.spinner.hide();
            });

          } else {
            Swal.fire(
              new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              res.message,
              'error'
            );
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
      this.spinner.hide();
    });

  }

  openEventSettingsPopup(eventId) {
    const initialState = {
      eventId: eventId
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard:false,
      
    };
    const modalParams = Object.assign({}, modalConfig, { initialState, class: 'modal-lg' });
    this.modalRef = this.modalService.show(EventSettingsComponent, modalParams);
  }
  closeModal() {
    // this.bsModalRef.hide();
    this.modalRef.hide();
  }

}
