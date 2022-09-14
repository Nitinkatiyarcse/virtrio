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
import { DataService } from 'src/app/Services/data-service.service';


@Component({
  selector: 'app-chat-queue-atendees-partial',
  templateUrl: './chat-queue-atendees-partial.component.html',
  styleUrls: ['./chat-queue-atendees-partial.component.css']
})
export class ChatQueueAtendeesPartialComponent implements OnInit {
  eventId: string;
  attendeeData: any = [];
  roomId: any = '';
  representativeId: any = '';

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  eventDetails: any = {};


  constructor(
    private translate: TranslateService,private dataservice: DataService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private modalService: BsModalService,
    private boothRepresentativeService: BoothRepresentativeService,
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
    this.getAttendeesListForChatQueue();

  }


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getAttendeesListForChatQueue() {
    const req: any = {};
    req.roomId = this.roomId;
    req.eventId = this.eventId;
    req.representativeId = this.representativeId;
    this.boothRepresentativeService.GetRepresentativeChatqueue(req).subscribe((res) => {
      if (res.isSuccess) {
        this.attendeeData = res.chatQueue;
        this.dtTrigger.next();
      } else {

      }
    });
  }

  startChatting(queueItem) {
    const req: any = {};
    req.chatQueueId =queueItem.chatQueueId;
    req.eventRepresentativeId = this.representativeId;
    this.boothRepresentativeService.startChatting(req).subscribe((res) => {
      if (res.isSuccess) {
        this.triggerEvent();
      } else {

      }
    });
  }

  triggerEvent() {
    this.dataservice.openChatPopup.emit();
    this.bsModalRef.hide();
  }

  closeModal(){
    this.bsModalRef.hide();
  }

}
