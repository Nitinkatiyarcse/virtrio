import { Component, IterableDiffers, OnInit, ViewChild } from '@angular/core';
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
import * as AppUtils from '../../../../Utils/apputils';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EventSponsorDetailsComponent } from '../../../_layout/Shared/event-sponsor-details/event-sponsor-details.component';
import { BroadcastMessageService } from 'src/app/Services/broadcast-message.service';
import { textChangeRangeIsUnchanged } from 'typescript';
import { SignalRService } from 'src/app/Services/signal-r.service';

@Component({
  selector: 'app-broadcast-message-list',
  templateUrl: './broadcast-message-list.component.html',
  styleUrls: ['./broadcast-message-list.component.css']
})
export class BroadcastMessageListComponent implements OnInit {

  modalRef: BsModalRef;
  eventName: string;
  eventId: string;
  messageData: any = [];
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
    private broadcastMessageServive: BroadcastMessageService, private signalRService: SignalRService,
    private modalService: BsModalService
  ) {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventName = this.localStorage.get('EventName');

    this.getAllMessages();


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

  getAllMessages() {
    this.spinner.show();
    var getByIdViewModel: any = {};
    getByIdViewModel.id = this.eventId;
    this.broadcastMessageServive.getBroadcastMessages(getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        this.noRecordFound = false;
        this.messageData = res.broadcastMessages;
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
        this.noRecordFound = true;
        this.messageData = [];
        this.spinner.hide();

      }
    })
  }

  getMessageDetails(message) {
    location.href = AppUtils.EventUrl + '/admin/events/broadcast/' + message.messageId + '/' + this.eventId;
  }
  duplicateMessage(message) {
    location.href = AppUtils.EventUrl + '/admin/events/broadcast/' + message.messageId + '/1/' + this.eventId;
  }

  resendMessage(message) {
    this.spinner.show();
    message.isActive = true;
    message.modifiedBy = this.localStorage.get('UserId');
    this.broadcastMessageServive.startSendingBroadcastMessage(message).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        this.signalRService.sendData();

        Swal.fire({
          title: new SweetAlertMessage(this.translate).success,
          text: new SweetAlertMessage(this.translate).messageSentSuccessfully,
          icon: 'success'
        }).then(() => {
          this.getAllMessages();
        });
      }
    })
  }


  startMessage(message) {
    this.spinner.show();
    message.isActive = true;
    message.modifiedBy = this.localStorage.get('UserId');
    this.broadcastMessageServive.startSendingBroadcastMessage(message).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).success,
          text: new SweetAlertMessage(this.translate).startedSuccessfully,
          icon: 'success'
        }).then(() => {
          this.getAllMessages();
        });
      }
    })
  }

  stopMessage(message) {
    this.spinner.show();
    message.isActive = true;
    message.modifiedBy = this.localStorage.get('UserId');
    this.broadcastMessageServive.stopSendingBroadcastMessage(message).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).success,
          text: new SweetAlertMessage(this.translate).stoppedSuccessfully,
          icon: 'success'
        }).then(() => {
          this.getAllMessages();
        });
      }
    })
  }

  deleteMessage(message) {
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
        message.isActive = false;
        message.modifiedBy = this.localStorage.get('UserId');
        message.EventRegistrationSets={};
        message.EventRegistrationSets.TimeZone=AppUtils.emptyGuid;
        message.EventRegistrationSets.Name=this.eventName;
        message.EventRegistrationSets.StartDate=new Date();
        message.EventRegistrationSets.EndDate=new Date();
        message.EventRegistrationSets.StartTime=new Date();
        message.EventRegistrationSets.EndTime=new Date();
        message.EventRegistrationSets.UrlSlug=this.eventName;
        this.broadcastMessageServive.deleteBroadcastMessage(message).subscribe((res) => {
          if (res.isSuccess) {
            this.spinner.hide();
            Swal.fire({
              title: new SweetAlertMessage(this.translate).success,
              text: new SweetAlertMessage(this.translate).sweetAlertDeletedSuccessMessage,
              icon: 'success'
            }).then(() => {
              this.getAllMessages();
            });
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

}
