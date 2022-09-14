import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { BoothRepresentativeService } from 'src/app/Services/booth-representative.service';
import Swal from 'sweetalert2';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { gunzip } from 'zlib';
import * as AppUtils from '../../../Utils/apputils';
@Component({
  selector: 'app-event-representative-and-staff',
  templateUrl: './event-representative-and-staff.component.html',
  styleUrls: ['./event-representative-and-staff.component.css']
})
export class EventRepresentativeAndStaffComponent implements OnInit {
  eventName: string;
  eventId: string;
  inputModel: any = {};
  inputRepresentativeViewModel: any = {};
  noRecordFound = false;
  totalPages: any = 0;
  pageNumber: any = 0;
  isLastPage = false;
  isFirstPage = true;
  getByIdViewModel: any = {};
  userEvents: any = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  searchModel: any = {};
  flag = false;
  searchedEventReps: any = [];
  constructor(
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private boothRepresentativeService: BoothRepresentativeService,
    private localStorage: LocalStorageService,
    private eventManagementService: EventsManagementService
  ) {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventName = this.localStorage.get('EventName');

    this.getRepresentatives();
  }

  ngOnInit(): void {
  }


  getRepresentatives() {
    this.spinner.show();
    const eventUserProperyRequestViewModel: any = {};
    eventUserProperyRequestViewModel.eventId = this.eventId;
    eventUserProperyRequestViewModel.userId = this.localStorage.get('UserId');

    this.boothRepresentativeService.getAllEventRepresentatives(eventUserProperyRequestViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.inputRepresentativeViewModel = res.eventRepresentatives;
        this.noRecordFound = false;
        this.dtTrigger.next();
      } else {
        this.noRecordFound = true;
      }
      this.spinner.hide();
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  }


  deleteRepresentative(repId) {
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

        this.userEvents.modifiedBy = this.localStorage.get('UserId');
        this.userEvents.eventRepresentativeId = repId;
        console.log(this.userEvents);
        this.boothRepresentativeService.deleteEventRepresntative(this.userEvents).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetalertDeletedHeader,
              text: new SweetAlertMessage(this.translate).sweetAlertDeletedSuccessMessage,
              icon: 'success'
            }).then(() => {
              // this.getByIdViewModel.id = this.eventId;
              // this.boothRepresentativeService.getEventRepresentatives(this.getByIdViewModel).subscribe((getRepresentativesres) => {
              //   if (getRepresentativesres.isSuccess) {
              //     this.inputRepresentativeViewModel = getRepresentativesres.eventRepresentatives;
              //     // this.noRecordFound = false;
              //   } else {
              //     // this.noRecordFound = true;
              //   }
              // });
              window.location.href = '/admin/events/eventrepresentative/' + this.eventId;
            });
          } else {
            Swal.fire(
              new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              res.message,
              'error'
            );
          }
          this.spinner.hide();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }

    });

  }

  addRepresentative() {
    this.inputModel.eventId = this.eventId;
    this.inputModel.createdBy = this.localStorage.get('UserId');
    this.inputModel.eventRepresentativeId = this.inputModel.eventRepresentativeId === null ?
      AppUtils.emptyGuid : this.inputModel.eventRepresentativeId;
    this.inputModel.modifiedBy = this.localStorage.get('UserId');
    this.inputModel.createdBy = this.localStorage.get('UserId');

    this.spinner.show();
    this.boothRepresentativeService.upsertEventRepresenetative(this.inputModel).subscribe((res) => {
      if (res.isSuccess) {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).success,
          text: new SweetAlertMessage(this.translate).savedSuccessfully,
          icon: 'success'
        }).then(() => {
          // this.getByIdViewModel.id = this.eventId;
          // this.boothRepresentativeService.getEventRepresentatives(this.getByIdViewModel).subscribe((getRepresentativesres) => {
          //   if (getRepresentativesres.isSuccess) {
          //     this.inputRepresentativeViewModel = getRepresentativesres.eventRepresentatives;
          //     // this.noRecordFound = false;
          //   } else {
          //     // this.noRecordFound = true;
          //   }
          // });
          window.location.href = '/admin/events/eventrepresentative/' + this.eventId;
        });
        this.spinner.hide();
      } else {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: res.message,
          icon: 'error'
        }).then(() => {
          // this.getByIdViewModel.id = this.eventId;
          // this.boothRepresentativeService.getEventRepresentatives(this.getByIdViewModel).subscribe((getRepresentativesres) => {
          //   if (getRepresentativesres.isSuccess) {
          //     this.inputRepresentativeViewModel = getRepresentativesres.eventRepresentatives;
          //     this.noRecordFound = false;
          //   } else {
          //     this.noRecordFound = true;
          //   }
          // });
          window.location.href = '/admin/events/eventrepresentative/' + this.eventId;
        });
      }
      this.inputModel = {};
    });
  }

  updateRepresentative(repId) {
    if (repId !== '') {
      this.getRepresentativeDetails(repId);
    } else {
      this.inputModel = {};
    }
  }
  getRepresentativeDetails(repId) {

    this.getByIdViewModel.id = repId;
    this.boothRepresentativeService.getEventRepresentativeDetails(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.inputModel = res.eventRepresentatives[0];
        this.inputModel.modifidBy = this.localStorage.get('UserId');

      }
    });

  }

  onselectsearchedEventAdmin(evRep) {
    console.log(evRep);
    this.inputModel.emailAddress = evRep.emailAddress;
    this.inputModel.firstName = evRep.firstName;
    this.inputModel.lastName = evRep.lastName;
    this.inputModel.isExistingEventAdmin = evRep.isExistingEventAdmin;
    this.inputModel.eventAdminId = evRep.eventAdminId;
    this.inputModel.isExistingAttendeee = evRep.isExistingAttendeee;
    this.inputModel.attendeeId = evRep.attendeeId === AppUtils.emptyGuid ? null : evRep.attendeeId;
    this.inputModel.isExistingEventRepresentative = evRep.isExistingEventRepresentative;
    this.inputModel.existingEventRepresentativeId = evRep.existingEventRepresentativeId;
    this.inputModel.eventRepresentativeId = AppUtils.emptyGuid;
    this.inputModel.profilePic = evRep.profilePic;
    this.flag = false;
    console.log(this.inputModel);
  }


  searchClient(searchTerm) {
    this.searchModel.searchString = searchTerm;
    this.searchModel.eventId = this.eventId;
    this.eventManagementService.searchForAddingEventRepresntativesUser(this.searchModel).subscribe((res) => {
      if (res.isSuccess) {
        this.searchedEventReps = res.eventRepresentatives;
        console.log(this.searchedEventReps);
        this.flag = true;
      } else {
        this.flag = false;
      }
    });
  }


}

