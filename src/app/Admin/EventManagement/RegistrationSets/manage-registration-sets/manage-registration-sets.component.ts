import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { EventsRegistrationSetsService } from 'src/app/Services/events-registration-sets.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { GetByIdViewModel } from '../../../Models/GetByIdViewModel';
import { StateManagementService } from 'src/app/Services/state-management.service';
import { skipUntil, take } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { AppComponent } from 'src/app/app.component';
import { AppConstant } from 'src/app/appConstant';
import { Helper } from 'src/app/Utils/Helper';
import * as AppUtils from 'src/app/Utils/apputils';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-manage-registration-sets',
  templateUrl: './manage-registration-sets.component.html',
  styleUrls: ['./manage-registration-sets.component.css'],

})
export class ManageRegistrationSetsComponent implements OnInit {

  eventName: string;
  urlSlugEventName: any = '';
  urlSlugClientName: any = '';
  getbyIdViewModel: any = {};
  allRegistrationSetsByEvent: any[] = [];
  deleteRegistration: any = {};
  NoRecordFoundMessage = false;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  appUrl: any = '';
  eventDetails: any = {};
  isEventDatesExpired = false;
  constructor(
    private translate: TranslateService,
    public router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private sweetAlertMessage: SweetAlertMessage,
    private eventsRegistrationSetsService: EventsRegistrationSetsService,
    private localStorage: LocalStorageService,
    private stateManagementService: StateManagementService,
    public getterSetterService: GetterSetterService,
    private helper: Helper,
    public appComponent: AppComponent,
    private eventService: EventsManagementService
  ) {
    this.getbyIdViewModel.id = this.route.snapshot.paramMap.get('id');
    this.localStorage.set('isEventSelected', 'true');
    this.eventName = this.localStorage.get('EventName');
    this.appUrl = AppUtils.applicationUrl;
    // this.getRegistrationSets();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getEventDetails() {
    const event: any = {};
    event.id = this.route.snapshot.paramMap.get('id');
    this.eventService.GetEventDetails(event).subscribe((res) => {
      {
        if (res.isSuccess) {
          this.eventDetails = res.usersEvent;
          this.eventDetails.projectStartDate = (this.eventDetails.projectStartDate.indexOf('01-01-01T') === -1)
            ? this.helper.convertDateToLocalTimezone(this.eventDetails.projectStartDate) : '';

          this.eventDetails.projectEndDate = (this.eventDetails.projectEndDate.indexOf('01-01-01T') === -1)
            ? this.helper.convertDateToLocalTimezone(this.eventDetails.projectEndDate) : '';
          this.isEventDatesExpired = (new Date() < this.eventDetails.projectEndDate);
        } else {
          // console.log(res.errors);
        }
      }
    });
  }

  getRegistrationSets() {
    this.eventsRegistrationSetsService.getRegistrationSets(this.getbyIdViewModel).subscribe((res) => {
      if (res.eventRegistrationSets.length > 0) {
        this.allRegistrationSetsByEvent = res.eventRegistrationSets;
        this.allRegistrationSetsByEvent.forEach(element => {
          element.endDate = this.helper.convertDateToLocalTimezone(element.endDate);
          element.endTime = this.helper.convertDateToLocalTimezone(element.endTime);
          element.startDate = this.helper.convertDateToLocalTimezone(element.startDate);
          element.startTime = this.helper.convertDateToLocalTimezone(element.startTime);
        });

        this.dtTrigger.next();
      }
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  }

  ngOnInit(): void {
    this.allRegistrationSetsByEvent = [];
    this.getEventDetails();
    this.getRegistrationSets();
  }

  deleteRegistrationSet(id) {
    if (new Date() > this.eventDetails.projectEndDate) {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: new SweetAlertMessage(this.translate).eventDatesEnded,
        icon: 'error'
      });
    } else {
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
          this.deleteRegistration.registrationSetId = id;
          this.deleteRegistration.modifiedBy = this.localStorage.get('UserId');
          this.eventsRegistrationSetsService.deleteEventRegistrationSet(this.deleteRegistration).subscribe((res) => {
            if (res.isSuccess) {
              Swal.fire(
                'Deleted successfully',
                res.message,
                'success'
              );
              // this.getRegistrationSets();
              this.eventsRegistrationSetsService.getRegistrationSets(this.getbyIdViewModel).subscribe((resp) => {
                this.allRegistrationSetsByEvent = resp.eventRegistrationSets;
                // this.dtTrigger.next();
              });
              // this.dtOptions = {
              //   pagingType: 'full_numbers',
              //   pageLength: 10,
              //   processing: true
              // };
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
        this.spinner.hide();
      });
    }
  }

  setRegistrationSetName(val) {
    this.getterSetterService.setTempData = val;
    sessionStorage.setItem('regsetname', val);
    AppConstant.settingUsername = val;
  }

}
