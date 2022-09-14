import { Component, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import * as AppUtils from 'src/app/Utils/apputils';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-checklist-item',
  templateUrl: './add-checklist-item.component.html',
  styleUrls: ['./add-checklist-item.component.css']
})
export class AddChecklistItemComponent implements OnInit {
  checklistItem: any = {};
  checkListItemAddOrUpdate = '';
  eventDetails:any={};
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    private eventService: EventsManagementService, public translate: TranslateService, private spinner: NgxSpinnerService,
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
    this.checkListItemAddOrUpdate = 'Add Checklist Item';
    // if (this.checklistItem.ChecklistId != AppUtils.emptyGuid) {
    //   this.checkListItemAddOrUpdate = 'Add Checklist Item';
    // } else {
    //   this.checkListItemAddOrUpdate = 'Update Checklist Item';
    // }
  }

  saveChecklistItem() {
    this.spinner.show();
    this.eventService.upsertRepChecklist(this.checklistItem).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).savedSuccessfully,
          icon: 'success'
        });
        this.triggerEvent();
        this.bsModalRef.hide();
      }
      else {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: new SweetAlertMessage(this.translate).sweetAlertSomeErrorOccuredErrorMessage,
          icon: 'error'
        });
        this.bsModalRef.hide();

      }
    });
    
  }
  triggerEvent() {
    this.event.emit({ data: this.checklistItem, res: 200 });
  }

  closeModal(){
    this.bsModalRef.hide();
  }
}
