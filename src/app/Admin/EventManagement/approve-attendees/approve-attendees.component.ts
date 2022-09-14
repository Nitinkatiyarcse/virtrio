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
import * as AppUtils from '../../../Utils/apputils';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EventSponsorDetailsComponent } from '../../_layout/Shared/event-sponsor-details/event-sponsor-details.component';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { AttendeeDetailsComponent } from '../../_layout/Shared/attendee-details/attendee-details.component';
import { CometChat } from '@cometchat-pro/chat';
import { COMETCHAT_CONSTANTS } from 'src/CONSTS';
import { Helper } from 'src/app/Utils/Helper';
import { ThankyouPageRegistrationSetViewModel } from '../../Models/ThankyouPageRegistrationSetViewModel';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'app-approve-attendees',
  templateUrl: './approve-attendees.component.html',
  styleUrls: ['./approve-attendees.component.css']
})
export class ApproveAttendeesComponent implements OnInit {
  includeStatus = false;
  modalRef: BsModalRef;
  eventName: string;
  eventId: string;
  attendeeData: any = [];
  checks = false;
  selectAllChecks = false;
  innerCheck = false;
  noRecordFound = false;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  ifChatUserExists = false;
  fileToUpload: File | null = null;
  attendeeUploadSampleFilePath = '';
  selectAllSelected = false;
  selectAll = false;
  isAllChecked: any;
  isChecked = false;
  tempAttendees: any = [];
  tempStatus = null;
  selectAllApprovedChecks = false;
  selectAllPendingChecks = false;
  constructor(
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private modalService: BsModalService,
    private attendeeService: AttendeesService,
    private helper: Helper
  ) {
    this.attendeeUploadSampleFilePath = AppUtils.AttendeeUploadSampleFilePath;
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventName = this.localStorage.get('EventName');
    this.getEventAttendees();



    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      select: {
        style: 'os',
        selector: 'td:first-child'
      }
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

  getEventAttendees() {
    this.tempStatus = null;
    this.tempAttendees = [];
    const getByIdViewModel: any = {};
    getByIdViewModel.id = this.eventId;
    this.spinner.show();
    this.attendeeService.getEventAttendees(getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {

        this.spinner.hide();
        this.noRecordFound = false;
        // console.log(res.attendees);
        this.selectAllPendingChecks = false;
        this.selectAllApprovedChecks = false;
        this.tempStatus = null;
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
        this.noRecordFound = true;
      }
    });
  }

  approveDisapproveAttendee(attendeeItem, status) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertApproveMessage,
      text: status === 1
        ? new SweetAlertMessage(this.translate).sweetAlertApproveSubMessage
        : new SweetAlertMessage(this.translate).sweetAlertRejectMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).no
    }).then((result) => {
      if (result.value) {
        this.ifChatUserExists = false;
        const attendee: any = {};
        attendee.attendeeId = attendeeItem.attendeeId;
        attendee.isActive = status === 0 ? false : true;
        attendee.approvedBy = this.localStorage.get('UserId');
        this.spinner.show();
        this.attendeeService.approveDisapproveAttendees(attendee).subscribe((res) => {
          if (res.isSuccess) {
            if (status === 1) {
              // // register a new chat user
              // const evntId: any = this.eventId;
              // const uid = attendeeItem.attendeeId;//evntId.replaceAll('-', '') + '_' + attendeeItem.attendeeId.replaceAll('-', '');
              // // console.log(uid);
              // const user = new CometChat.User(uid);
              // user.setName(attendeeItem.firstName + ' ' + attendeeItem.lastName);
              // user.setRole('attendee');
              // if (!this.ifChatUserExists) {
              //   CometChat.createUser(user, COMETCHAT_CONSTANTS.AUTH_KEY).then(createdUser => {
              //     // console.log('user created', createdUser);
              //   }, error => {
              //     // console.log('error', error);
              //   });
              // }
            }
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: status === 0
                ? new SweetAlertMessage(this.translate).rejectedSuccessfully
                : new SweetAlertMessage(this.translate).approvedSuccessfully,
              icon: 'success',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertOkButtonText,
            }).then((reslt) => {
              this.getEventAttendees();
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

  getDetailsOfAttendee(item) {

    const initialState = {
      list: [
        item
      ]
    };

    console.log(initialState);
    this.modalRef = this.modalService.show(AttendeeDetailsComponent, { initialState, class: 'modal-lg',backdrop: 'static',keyboard:false });
    this.modalRef.content.closeBtnName = 'Close';
  }

  changeUplaodEventAttendeeFile(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uplaodEventAttendee() {
    if (this.fileToUpload != null) {
      this.spinner.show();
      const whiteAndBlackList: any = {};
      whiteAndBlackList.eventId = this.eventId;
      whiteAndBlackList.createdBy = this.localStorage.get('UserId');

      const file: File = this.fileToUpload;
      const formData: FormData = new FormData();
      if (this.helper.validateCSVFile(file.name)) {
        formData.append('uploadedFile', file, file.name);
        formData.append('eventId', this.eventId);
        formData.append('createdBy', this.localStorage.get('UserId'));
        this.attendeeService.uploadEventAttendeeFile(formData).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: new SweetAlertMessage(this.translate).savedSuccessfully,
              icon: 'success',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
            }).then(() => {
              this.fileToUpload = null;
              window.location.href = '/admin/events/attendees/' + this.eventId;

            });
          }
          this.spinner.hide();
        });
      } else {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).invalidFileType,
          text: new SweetAlertMessage(this.translate).onlyCsvXlsFilesAreAllowed,
          icon: 'error'
        });
        this.fileToUpload = null;
      }
    } else {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).invalidFileType,
        text: new SweetAlertMessage(this.translate).pleaseSelectValidFile,
        icon: 'error'
      });
      this.fileToUpload = null;
    }
  }

  resendEmail(attendeeItem) {
    this.spinner.show();
    const getByIdViewModel: any = {};
    getByIdViewModel.id = attendeeItem.attendeeId;
    this.attendeeService.resendEmailToAttendees(getByIdViewModel).subscribe((res) => {
      this.spinner.hide();
      if (res.isSuccess) {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).mailSentSuccessfully,
          icon: 'success'
        });
      } else {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: new SweetAlertMessage(this.translate).errorInSendingEmail,
          icon: 'error'
        });
      }
    });
  }

  getLeaderboard(attendeeItem) {

  }



  selectUnslectRecord(event, attedeesItem) {
    this.tempStatus = null;
    if (event.target.checked) {
      this.attendeeData.forEach(element => {
        if (this.tempAttendees.length > 0) {
          if (this.tempAttendees.filter(u => u.attendeeId == attedeesItem.attendeeId).length == 0) {
            this.tempAttendees.push(attedeesItem);
          }
        } else {
          this.tempAttendees.push(attedeesItem);
        }
      });
    } else {

      this.tempAttendees = this.tempAttendees.filter(item => item != attedeesItem);


    }
    if (this.tempAttendees.length > 0) {

      this.tempStatus = this.tempAttendees.filter(u => u.isActive == false).length == this.tempAttendees.length ? false : this.tempAttendees.filter(u => u.isActive == true).length == this.tempAttendees.length ? true : null;
      if (this.tempStatus == null) {
        this.selectAllApprovedChecks = false;
        this.selectAllPendingChecks = false;
      }
    }
  }

  bulkReject() {
    let count = 0;
    this.tempStatus = null;
    this.tempAttendees.forEach(element => {
      const attendee: any = {};
      attendee.attendeeId = element.attendeeId;
      attendee.isActive = false;
      attendee.approvedBy = this.localStorage.get('UserId');
      // console.log(attendee);
      this.spinner.show();
      this.attendeeService.approveDisapproveAttendees(attendee).subscribe((res) => {
        if (res.isSuccess) {

          count++;
          if (this.tempAttendees.length == count) {
            this.spinner.hide();
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: new SweetAlertMessage(this.translate).rejectedSuccessfully,
              icon: 'success',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertOkButtonText,
            }).then((reslt) => {
              this.getEventAttendees();
            });
          }
        }
      });
    });
  }
  bulkApprove() {
    let count = 0;
    this.tempStatus = null;
    this.tempAttendees.forEach(element => {
      const attendee: any = {};
      attendee.attendeeId = element.attendeeId;
      attendee.isActive = true;
      attendee.approvedBy = this.localStorage.get('UserId');
      this.spinner.show();

      this.attendeeService.approveDisapproveAttendees(attendee).subscribe((res) => {
        if (res.isSuccess) {
          count++;
          if (this.tempAttendees.length == count) {
            this.spinner.hide();
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: new SweetAlertMessage(this.translate).approvedSuccessfully,
              icon: 'success',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertOkButtonText,
            }).then((reslt) => {
              this.getEventAttendees();
            });
          }
        }
      });
      // console.log(attendee);
    });
  }

  selectAllApprovedAttendees(event) {
    if (event.target.checked) {
      this.selectAllApprovedChecks = true;
      this.selectAllPendingChecks = false;
      this.attendeeData.filter(u => u.isActive).forEach(element => {
        element.isChecked = true;
      });
      this.attendeeData.filter(u => !u.isActive).forEach(element => {
        element.isChecked = false;
      });
      var x = this.attendeeData.filter(u => u.isActive);
      this.tempAttendees = [];
      if (x.length > 0) {
        x.forEach(element => {
          this.tempAttendees.push(element);
        });
      }
    } else {
      this.selectAllApprovedChecks = false;
      this.selectAllPendingChecks = false;
      this.attendeeData.forEach(element => {
        element.isChecked = false;
      });
      this.tempAttendees = [];
      this.tempStatus = null;

    }
    if (this.tempAttendees.length > 0) {
      this.tempStatus = true;
    }
    // console.log(this.tempAttendees);
    // console.log(this.tempStatus);
  }

  selectAllPendingAttendees(event) {
    this.tempAttendees = [];
    if (event.target.checked) {
      this.selectAllApprovedChecks = false;
      this.selectAllPendingChecks = true;
      this.attendeeData.filter(u => !u.isActive).forEach(element => {
        element.isChecked = true;
      });
      this.attendeeData.filter(u => u.isActive).forEach(element => {
        element.isChecked = false;
      });
      var x = this.attendeeData.filter(u => !u.isActive);
      this.tempAttendees = [];
      if (x.length > 0) {
        x.forEach(element => {
          this.tempAttendees.push(element);
        });
      }
    } else {
      this.selectAllApprovedChecks = false;
      this.selectAllPendingChecks = false;
      this.attendeeData.forEach(element => {
        element.isChecked = false;
      });

      this.tempAttendees = [];
      this.tempStatus = null;

    }
    if (this.tempAttendees.length > 0) {
      this.tempStatus = false;
    }
    // console.log(this.tempAttendees);
    // console.log(this.tempStatus);
  }
}
