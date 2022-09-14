import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { EventEmailTemplatesService } from 'src/app/Services/event-email-templates.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';
import { LocalStorageService } from 'src/app/Services/local-storage.service';


@Component({
  selector: 'app-event-emailtemplatespage',
  templateUrl: './event-emailtemplatespage.component.html',
  styleUrls: ['./event-emailtemplatespage.component.css']
})
export class EventEmailtemplatespageComponent implements OnInit {
  eventName: string;
  eventId: string;

  getByIdViewModel: any = {};


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  emailTemplatesModel: any;



  constructor
    (
      private spinner: NgxSpinnerService,
      private eventEmailTemplatesService: EventEmailTemplatesService,
      private localStorage: LocalStorageService,
      private route: ActivatedRoute,
      private translate: TranslateService
    ) {
    this.localStorage.set('isEventSelected', 'true');
    this.eventName = this.localStorage.get('EventName');
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getEmailTemplates();

  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getEmailTemplates() {
    this.getByIdViewModel.id = this.eventId;
    this.eventEmailTemplatesService.getEventEmailTemplates(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        console.log(res);
        this.emailTemplatesModel = res.eventEmailTemplates;
        this.dtTrigger.next();
      }
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  }


  ngOnInit(): void {
  }

  //   activateDeactivateRoom(roomId: string) {
  //     this.spinner.show();
  //     const roomInfo: any = {};
  //     roomInfo.modifiedBy = this.localStorage.get('UserId');
  //     roomInfo.roomId = roomId;
  //     this.roomService.activateDeactivateRoom(roomInfo).subscribe((res) => {
  //       if (res.isSuccess) {
  //         this.getByIdViewModel.id = this.eventId;
  //         this.roomService.getRooms(this.getByIdViewModel).subscribe((response) => {
  //           if (res.isSuccess) {
  //             this.inputRoomsViewModel = response.rooms;
  //           }
  //         });
  //         Swal.fire({
  //           title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
  //           text: new SweetAlertMessage(this.translate).updatedSuccessfullyMessage,
  //           icon: 'success',
  //           confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
  //         });
  //       }
  //       this.spinner.hide();
  //     });
  //   }
}



