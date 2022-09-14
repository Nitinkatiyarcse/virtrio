import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { from, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { BoothRepresentativeService } from 'src/app/Services/booth-representative.service';
import Swal from 'sweetalert2';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import * as AppUtils from '../../../../Utils/apputils';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { CometChat } from '@cometchat-pro/chat';
import { COMETCHAT_CONSTANTS } from 'src/CONSTS';
import { Helper } from 'src/app/Utils/Helper';
import { AllAttendeeProfilePartialComponent } from '../../Partial/all-attendee-profile-partial/all-attendee-profile-partial.component';

@Component({
  selector: 'app-all-attendee-partial',
  templateUrl: './all-attendee-partial.component.html',
  styleUrls: ['./all-attendee-partial.component.css']
})
export class AllAttendeePartialComponent implements OnInit {
  eventId: string;
  attendeeData: any = [];
  locationWise:boolean=false;
  roomId:any='';
  loggedInAttendees:boolean=false;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  eventDetails:any={};

  
  constructor(
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private modalService: BsModalService,
    private attendeeService: AttendeesService,
    public bsModalRef: BsModalRef,
    private helper: Helper
  ) {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
   
  }


  ngOnInit(): void {
    if(this.locationWise){
      this.getLocationwiseEventAttendees();

    } else if(this.loggedInAttendees){
      this.getLoggedInAttendees();
    } else{
    this.getEventAttendees();
    }

  }


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getEventAttendees() {
    const getByIdViewModel: any = {};
    getByIdViewModel.id = this.eventId;
    this.spinner.show();
    this.attendeeService.getEventAttendees(getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        // console.log(res.attendees);
        this.attendeeData = res.attendees;
        this.attendeeData.forEach(element => {
          element.isChecked = false;
        });
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
      }
    });
  }

  getLoggedInAttendees() {
    const getByIdViewModel: any = {};
    getByIdViewModel.id = this.eventId;
    this.spinner.show();
    this.attendeeService.getLoggedInAttendees(getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        // console.log(res.attendees);
        this.attendeeData = res.attendees;
        this.attendeeData.forEach(element => {
          element.isChecked = false;
        });
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
      }
    });
  }


  getLocationwiseEventAttendees()
  {
    const getByIdViewModel: any = {};
    getByIdViewModel.id = this.roomId;
    this.spinner.show();
    this.attendeeService.getLocationwiseEventAttendees(getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        // console.log(res.attendees);
        this.attendeeData = res.attendees;
        this.attendeeData.forEach(element => {
          element.isChecked = false;
        });
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
      }
    });
  }


  




  closeModal() {
    this.bsModalRef.hide();
  }

  getAttendeeProfile(attendeeItem) {
    this.bsModalRef.hide();
    const initialState = {
      attendeesProfileData: attendeeItem,
      eventId: this.eventId,
      eventDetails:this.eventDetails
    };
    this.bsModalRef = this.modalService.show(AllAttendeeProfilePartialComponent, { initialState, class: 'modal-lg',backdrop: 'static',keyboard:false });
  }


 
}

