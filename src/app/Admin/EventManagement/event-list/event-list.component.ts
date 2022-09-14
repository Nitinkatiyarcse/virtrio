import { Component, OnInit } from '@angular/core';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { TranslateService } from '@ngx-translate/core';
import { AllEventsResponseViewModel } from '../../Models/AllEventsResponseViewModel';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as AppUtils from '../../../Utils/apputils';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SweetAlertMessage } from '../../../Utils/SweetAlertMessages';
import { StateManagementService } from 'src/app/Services/state-management.service';
import { Helper } from 'src/app/Utils/Helper';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  getByIdVM: any = {};
  inputEvents: any = {};
  userEvents: any = {};
  outputEvents: any[] = [];
  totalPages: any = 0;
  pageNumber: any = 0;
  isLastPage = false;
  isFirstPage = true;
  NoRecordFoundMessage = false;
  previousUrl: any = '';
  eventStatus = [];
  defaultSelectedStatus = '';
  isSuperAdmin = true;
  usersClient = [];
  constructor(
    private eventService: EventsManagementService,
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    public router: Router,
    private spinner: NgxSpinnerService,
    private sweetAlertMessage: SweetAlertMessage,
    private helper: Helper,
    private stateManagementService: StateManagementService
  ) {
    this.localStorage.set('isEventSelected', 'false');
    const previousNavigation = this.router.getCurrentNavigation().previousNavigation;
    if (previousNavigation != null) {
      this.previousUrl = previousNavigation.finalUrl;
      console.log('previousUrl' + this.previousUrl);
    }
    this.getEventStatus();
    this.getClientList();
    this.isSuperAdmin = this.localStorage.get('Role') === 'SuperAdmin' ? true : false;
  }


  private getByEventIdVm: any = {};
  private eventVm: any = {};

  ngOnInit(): void {
    // console.log(this.stateManagementService.state);
    if (this.previousUrl.toString().indexOf('events/details/') !== -1) {
      if (this.stateManagementService.state != null) {
        this.userEvents.RoleName = this.stateManagementService.state.data.RoleName;
        this.userEvents.searchString = this.stateManagementService.state.data.searchString;
        this.userEvents.filterString = this.stateManagementService.state.data.filterString;
        this.userEvents.sortString = this.stateManagementService.state.data.sortString;
        this.userEvents.pageSize = this.stateManagementService.state.data.pageSize;
        this.userEvents.PageNo = this.stateManagementService.state.data.PageNo;
        this.userEvents.userId = this.stateManagementService.state.data.userId;
        this.pageNumber = this.stateManagementService.state.data.pageNumber;
        this.userEvents.clientId = this.stateManagementService.state.data.clientId;

      } else {
        this.userEvents.RoleName = this.localStorage.get('Role');
        this.userEvents.searchString = '';
        this.userEvents.filterString = '';
        this.userEvents.sortString = '';
        this.userEvents.pageSize = AppUtils.pageSize;
        this.userEvents.PageNo = 1;
        this.userEvents.userId = this.localStorage.get('UserId');
        this.pageNumber = 1;
        this.userEvents.clientId = '00000000-0000-0000-0000-000000000000';
      }

    } else {
      this.userEvents.RoleName = this.localStorage.get('Role');
      this.userEvents.searchString = '';
      this.userEvents.filterString = '';
      this.userEvents.sortString = '';
      this.userEvents.pageSize = AppUtils.pageSize;
      this.userEvents.PageNo = 1;
      this.userEvents.userId = this.localStorage.get('UserId');
      this.pageNumber = 1;
      this.userEvents.clientId = '00000000-0000-0000-0000-000000000000';
    }
    this.getUsersEvents();

  }

  getEventStatus() {
    this.eventService.getEventStatus().subscribe((res) => {
      if (res.isSuccess) {
        this.eventStatus = res.eventStatusTypes;
        console.log(this.eventStatus);
      } else {
        // console.log(res.errors);
      }
    });
  }


  getUsersEvents() {
    this.spinner.show();
    this.stateManagementService.state = { data: this.userEvents };
    this.eventService.getUsersEvents(this.userEvents).subscribe((res) => {
      if (res.isSuccess) {

        // console.log(res.events);
        if (res.message !== 'NoRecordFound') {
          this.NoRecordFoundMessage = false;
          this.outputEvents = res.events;
          for (let i = 0; i < this.outputEvents.length; i++) {

            this.outputEvents[i].afterEventAccessEndDate = (this.outputEvents[i].afterEventAccessEndDate.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].afterEventAccessEndDate) : ' - ';

            this.outputEvents[i].afterEventAccessEndTime = (this.outputEvents[i].afterEventAccessEndTime.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].afterEventAccessEndTime) : ' - ';

            this.outputEvents[i].afterEventAccessStartDate = (this.outputEvents[i].afterEventAccessStartDate.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].afterEventAccessStartDate) : ' - ';

            this.outputEvents[i].afterEventAccessStartTime = (this.outputEvents[i].afterEventAccessStartTime.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].afterEventAccessStartTime) : ' - ';

            this.outputEvents[i].eventEndDate = (this.outputEvents[i].eventEndDate.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].eventEndDate) : ' - ';

            this.outputEvents[i].eventEndTime = (this.outputEvents[i].eventEndTime.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].eventEndTime) : ' - ';

            this.outputEvents[i].eventStartDate = (this.outputEvents[i].eventStartDate.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].eventStartDate) : ' - ';

            this.outputEvents[i].eventStartTime = (this.outputEvents[i].eventStartTime.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].eventStartTime) : ' - ';

            this.outputEvents[i].previewEndDate = (this.outputEvents[i].previewEndDate.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].previewEndDate) : ' - ';

            this.outputEvents[i].previewEndTime = (this.outputEvents[i].previewEndTime.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].previewEndTime) : ' - ';

            this.outputEvents[i].previewStartDate = (this.outputEvents[i].previewStartDate.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].previewStartDate) : ' - ';

            this.outputEvents[i].previewStartTime = (this.outputEvents[i].previewStartTime.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].previewStartTime) : ' - ';

            this.outputEvents[i].registrationEndDate = (this.outputEvents[i].registrationEndDate.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].registrationEndDate) : ' - ';

            this.outputEvents[i].registrationEndTime = (this.outputEvents[i].registrationEndTime.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].registrationEndTime) : ' - ';

            this.outputEvents[i].registrationStartDate = (this.outputEvents[i].registrationStartDate.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].registrationStartDate) : ' - ';

            this.outputEvents[i].registrationStartTime = (this.outputEvents[i].registrationStartTime.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].registrationStartTime) : ' - ';

            this.outputEvents[i].reportAccessEndDate = (this.outputEvents[i].reportAccessEndDate.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].reportAccessEndDate) : ' - ';

            this.outputEvents[i].reportAccessEndTime = (this.outputEvents[i].reportAccessEndTime.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].reportAccessEndTime) : ' - ';

            this.outputEvents[i].reportAccessStartDate = (this.outputEvents[i].reportAccessStartDate.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].reportAccessStartDate) : ' - ';

            this.outputEvents[i].reportAccessStartTime = (this.outputEvents[i].reportAccessStartTime.indexOf('01-01-01T') === -1)
              ? this.helper.convertDateToLocalTimezone(this.outputEvents[i].reportAccessStartTime) : ' - ';
          }

          this.totalPages = res.totalPages;
          if (this.pageNumber === this.totalPages && (this.totalPages === 1 && this.pageNumber === 1)) {
            this.isLastPage = true;
            this.isFirstPage = true;
          } else if (this.pageNumber !== 1 && this.pageNumber !== this.totalPages) {
            this.isLastPage = false;
            this.isFirstPage = false;
          } else if (this.pageNumber === this.totalPages) {
            this.isLastPage = true;
            this.isFirstPage = false;
          } else {
            this.isLastPage = false;
            this.isFirstPage = true;
          }
        } else {
          this.NoRecordFoundMessage = true;
        }

      } else {

      }
      this.spinner.hide();
    });

  }


  getPrevPage() {
    this.pageNumber = this.pageNumber - 1;
    this.userEvents.PageNo = this.pageNumber;
    this.getUsersEvents();
  }

  getNextPage() {
    this.pageNumber = this.pageNumber + 1;
    this.userEvents.PageNo = this.pageNumber;
    this.getUsersEvents();
  }

  getSearchedList() {
    this.pageNumber = 1;
    this.userEvents.PageNo = this.pageNumber;
    this.getUsersEvents();
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

        this.eventService.DeleteEvent(this.eventVm).subscribe((res) => {
          if (res.isSuccess) {
            this.getUsersEvents();
            Swal.fire(
              new SweetAlertMessage(this.translate).sweetalertDeletedHeader,
              new SweetAlertMessage(this.translate).sweetAlertDeletedSuccessMessage,
              'success'
            );
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

  openEventDetails(eventId) {
    this.localStorage.set('EventId',eventId);
    location.href = '../admin/events/details/' + eventId;

  }

  getClientList() {
    this.getByIdVM.id = this.localStorage.get('UserId');
    this.eventService.getUsersClient(this.getByIdVM).subscribe((res) => {
      if (res.isSuccess) {
        console.log(res);
        this.usersClient = res.clients;
      }
    });
  }
}
