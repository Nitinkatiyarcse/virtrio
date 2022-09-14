import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { MessageToRepresentativePartialComponent } from '../message-to-representative-partial/message-to-representative-partial.component';
@Component({
  selector: 'app-booth-details-partial',
  templateUrl: './booth-details-partial.component.html',
  styleUrls: ['./booth-details-partial.component.css']
})
export class BoothDetailsPartialComponent implements OnInit {
  boothDetails: any = {};
  eventName = '';
  repDetalis: any[] = [];
  isLoggedIn = false;
  eventStartDate: any= '';
  eventEndDate: any ='';
  manageRegistrationPage:any={};
  eventDetails:any={};
  constructor(public bsModalRef: BsModalRef, private modalService: BsModalService, private sessionStorageService: SessionStorageService) {
    if (this.sessionStorageService.get('AttendeeId') != '' && this.sessionStorageService.get('AttendeeId') != null && this.sessionStorageService.get('AttendeeId') != undefined) {
      this.isLoggedIn = true;
    }
  }

  ngOnInit(): void {
    this.repDetalis = this.boothDetails.eventRepresentatives;
    //console.log(this.repDetalis)
    //const test=this.boothDetails.eventSponsors;
  }
  closeModal() {
    this.bsModalRef.hide();

  }
  
  messageToRepresentative(repItem, type) {
    this.bsModalRef.hide();
    // console.log(repItem);
    const initialState = {
      to: repItem.emailAddress,
      eventRepresentativeId: repItem.eventRepresentativeId,
      eventName: this.eventName,
      boothName: this.boothDetails.rooms.name,
      roomId: this.boothDetails.rooms.roomId,
      eventId: this.boothDetails.rooms.eventId,
      isMeetingRequest: type == 'Meeting' ? true : false,
      isMessage: type == 'Message' ? true : false,
      eventStartDate: this.eventStartDate,
      eventEndDate: this.eventEndDate,
      eventDetails:this.eventDetails
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard:false,
    };

    const boothDetailsPopupModalParams = Object.assign({}, modalConfig, { initialState, class: 'modal-lg',backdrop: 'static',keyboard:false });
    this.bsModalRef = this.modalService.show(MessageToRepresentativePartialComponent, boothDetailsPopupModalParams);
  }

}
