import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RoomsService } from 'src/app/Services/rooms.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
@Component({
  selector: 'app-open-linkto-webinar-modal',
  templateUrl: './open-linkto-webinar-modal.component.html',
  styleUrls: ['./open-linkto-webinar-modal.component.css']
})
export class OpenLinktoWebinarModalComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();

  dropdownSettings: IDropdownSettings = {};
  selectedWebinarsArr: Array<string>;
  requiredField = true;
  constructor(public bsModalRef: BsModalRef, private roomService: RoomsService,private translate: TranslateService) {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }
  index: any;
  eventId: any;
  linkToWebinar: any;
  roomId: any;
  webinarDropdownList: any;

  ngOnInit(): void {
    console.log(this.webinarDropdownList);
    console.log(this.webinarDropdownList);
    console.log(this.eventId);
    console.log(this.roomId);
  }
  closeModal() {
    this.bsModalRef.hide();
  }
  triggerEvent(item: any) {
    this.event.emit({ data: item, res: 200 });
  }
  submitDataAndCloseModal() {
   
    if(this.selectedWebinarsArr.length!==0){
      console.log(this.selectedWebinarsArr);
      this.triggerEvent(this.selectedWebinarsArr);
      this.bsModalRef.hide();
    } else{
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: new SweetAlertMessage(this.translate).pleaseSelectAtleastOnneItem,
        icon: 'error'
      });
    }
  }


  setClass() {
    if (this.selectedWebinarsArr.length === 0) {
      this.requiredField = true;
      return 'invalidField';

    } else {
      this.requiredField = false;
      return 'validField';
    }

  }

}
