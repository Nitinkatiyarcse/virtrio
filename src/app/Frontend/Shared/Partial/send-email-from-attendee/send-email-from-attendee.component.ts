import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-email-from-attendee',
  templateUrl: './send-email-from-attendee.component.html',
  styleUrls: ['./send-email-from-attendee.component.css']
})
export class SendEmailFromAttendeeComponent implements OnInit {
  attendee: any = {};
  from: any = '';
  messageFromAttendeeModel: any = {};
  constructor(private attendeeService: AttendeesService,
    private spinner: NgxSpinnerService,
    public translate: TranslateService,
    public bsModalRef: BsModalRef, private sessionStorageService: SessionStorageService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.bsModalRef.hide();
  }
  sendMessageFromAttendee() {

    this.messageFromAttendeeModel.toAttendeeEmailAddress = this.attendee.emailAddress;
    this.messageFromAttendeeModel.toAttendeeId = this.attendee.attendeeId;
    this.messageFromAttendeeModel.fromAttendeeId = this.from;
    // console.log(this.messageFromAttendeeModel);
    this.spinner.show();
    this.attendeeService.sendEmailMessageFromAttendee(this.messageFromAttendeeModel).subscribe((res) => {
      if (res.isSuccess) {
        this.closeModal();
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).mailSentSuccessfully,
          icon: 'success'
        });
      } else {
        this.closeModal();
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: res.message,
          icon: 'error'
        });
      }

    })
  }

  onFileChange(event) {
    this.spinner.show();
    if (event.target.files.length > 0) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        this.attendeeService.uploadMailAttachement(formData).subscribe((res) => {
          if (res.isSuccess) {
            this.messageFromAttendeeModel.attachment = res.message;
          }
          this.spinner.hide();
        });
      }
    } else {
      this.spinner.hide();
    }
  }
}
