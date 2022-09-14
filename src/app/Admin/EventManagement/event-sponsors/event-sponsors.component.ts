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
import { EventSponsorsService } from 'src/app/Services/event-sponsors.service';
import { gunzip } from 'zlib';
import * as AppUtils from '../../../Utils/apputils';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EventSponsorDetailsComponent } from '../../_layout/Shared/event-sponsor-details/event-sponsor-details.component';

@Component({
  selector: 'app-event-sponsors',
  templateUrl: './event-sponsors.component.html',
  styleUrls: ['./event-sponsors.component.css']
})
export class EventSponsorsComponent implements OnInit {

  modalRef: BsModalRef;
  eventName: string;
  eventId: string;
  sponsorsData: any = [];
  noRecordFound = false;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private eventSponsorsService: EventSponsorsService,
    private modalService: BsModalService
  ) {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventName = this.localStorage.get('EventName');

    this.getEventSponsors();



    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  }

  ngOnInit(): void {
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getEventSponsors() {
    const getByIdViewModel: any = {};
    getByIdViewModel.id = this.eventId;
    this.spinner.show();
    this.eventSponsorsService.getAllEventSponsors(getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        this.noRecordFound = false;
        console.log(res.eventSponsorsVM);
        this.sponsorsData = res.eventSponsorsVM;
        if (this.dtElement.dtInstance) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
          });
        } else {
          this.spinner.hide();
          this.dtTrigger.next();
        }
      } else {
        this.spinner.hide();
        this.noRecordFound = true;
      }
    });
  }

  rejectSponsorRequest(sponsorItem) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertApproveMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertSponsorRejectMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).no
    }).then((result) => {

      if (result.value) {
        const sponsor: any = {};
        sponsor.sponsorId = sponsorItem.sponsorId;
        sponsor.eventId = this.eventId;
        sponsor.emailAddress = sponsorItem.emailAddress;
        sponsor.approvedBy = this.localStorage.get('UserId');
        sponsor.modifiedBy = this.localStorage.get('UserId');
        this.spinner.show();
        this.eventSponsorsService.changeSponsorsStatus(sponsor).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: new SweetAlertMessage(this.translate).rejectedSuccessfully,
              icon: 'success',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertOkButtonText,
            }).then((result) => {

              this.getEventSponsors();

            });

          } else {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              text: res.message,
              icon: 'error',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertOkButtonText,
            });

          }
          this.spinner.hide();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
      // this.spinner.hide();
    });
  }

  approveSponsorRequest(sponsorItem) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertApproveMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertSponsorApproveMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).no
    }).then((result) => {

      if (result.value) {
        const sponsor: any = {};
        sponsor.sponsorId = sponsorItem.sponsorId;
        sponsor.eventId = this.eventId;
        sponsor.emailAddress = sponsorItem.emailAddress;
        sponsor.approvedBy = this.localStorage.get('UserId');
        sponsor.modifiedBy = this.localStorage.get('UserId');
        this.spinner.show();
        this.eventSponsorsService.changeSponsorsStatus(sponsor).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: new SweetAlertMessage(this.translate).approvedSuccessfully,
              icon: 'success',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertOkButtonText,
            }).then((result) => {
              this.getEventSponsors();
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                // Destroy the table first
                dtInstance.destroy();
                // Call the dtTrigger to rerender again
                this.dtTrigger.next();
              });
            });

          } else {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              text: res.message,
              icon: 'error',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertOkButtonText,
            });

          }
          this.spinner.hide();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
      // this.spinner.hide();
    });
  }
  getDetailsOfSposors(item) {

    const initialState = {
      list: [
        item
      ]
    };

    console.log(initialState);
    this.modalRef = this.modalService.show(EventSponsorDetailsComponent, { initialState,backdrop: 'static',keyboard:false });
    this.modalRef.content.closeBtnName = 'Close';
  }
}
