import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { MessageToRepresentativePartialComponent } from '../message-to-representative-partial/message-to-representative-partial.component';

@Component({
  selector: 'app-room-representatives',
  templateUrl: './room-representatives.component.html',
  styleUrls: ['./room-representatives.component.css']
})
export class RoomRepresentativesComponent implements OnInit {
  boothRepresentatives: any = [];
  boothRepresentativesTblData: any = [];
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  eventDetails:any={};
  constructor(private sessionStorageService:SessionStorageService,public bsModalRef: BsModalRef, private modalService: BsModalService) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.dtTrigger.next();

   }

  ngOnInit(): void {
    this.boothRepresentativesTblData=this.boothRepresentatives;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.dtTrigger.next();

  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  
  messageToRepresentative(repItem, type) {
    this.bsModalRef.hide();
    // console.log(repItem);
    const initialState = {
      to: repItem.eventRepresentatives.emailAddress,
      eventRepresentativeId: repItem.eventRepresntativeId,
      eventName: this.sessionStorageService.get('EventName'),
      boothName: '',
      roomId: repItem.roomId,
      eventId: repItem.eventRepresentatives.eventId,
      isMeetingRequest: type == 'Meeting' ? true : false,
      isMessage: type == 'Message' ? true : false,
      eventDetails:this.eventDetails
      // eventStartDate: this.eventStartDate,
      // eventEndDate: this.eventEndDate
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard:false,
    };

    const boothDetailsPopupModalParams = Object.assign({}, modalConfig, { initialState, class: 'modal-lg' });
    this.bsModalRef = this.modalService.show(MessageToRepresentativePartialComponent, boothDetailsPopupModalParams);
  }

  closeModal(){
    this.bsModalRef.hide();
  }
}
