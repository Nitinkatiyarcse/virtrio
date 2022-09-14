import { Component, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-message-details-partial',
  templateUrl: './message-details-partial.component.html',
  styleUrls: ['./message-details-partial.component.css']
})
export class MessageDetailsPartialComponent implements OnInit {
  message: any = {};
  replymsg:any;
  eventDetails:any={};
  public event: EventEmitter<any> = new EventEmitter();
  constructor(private modalService: BsModalService, private translate: TranslateService, public bsModalRef: BsModalRef,  private spinner: NgxSpinnerService,private eventService:EventsManagementService) { }

  ngOnInit(): void {
  }
  closeModal() {
    // read message
    this.bsModalRef.hide();
    this.eventService.readRepMessage(this.message).subscribe((res)=>{
    
    });
    this.triggerEvent();
  }
  reply() {
    this.spinner.show();
    this.message.reply=this.replymsg;
    this.eventService.replyFromRepresentative(this.message).subscribe((res)=>{
      if(res.isSuccess){
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: 'mail sent successfully',
          icon: 'success'
        });
      } else {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text:  res.message,
          icon: 'error'
        });

      }
    })
    this.triggerEvent();
  }

  
  triggerEvent() {
    this.event.emit({ index: 0, data:'refreshPage' });
    this.bsModalRef.hide();
  }
}
