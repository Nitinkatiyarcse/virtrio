import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { RoomsService } from 'src/app/Services/rooms.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-templates',
  templateUrl: './event-templates.component.html',
  styleUrls: ['./event-templates.component.css']
})
export class EventTemplatesComponent implements OnInit {

  eventId: any;
  eventName: string;
  roomTemplates: any = [];
  roomTemplateId: any = '';

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {
    order: [0, 'desc'],
    // columnDefs: [{
    //   targets: [0, 2],
    //   orderable: false
    // }]
  };
  dtTrigger: Subject<any> = new Subject();


  constructor(
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
    private roomService: RoomsService,
    private translate: TranslateService
  ) {
    this.eventId = this.route.snapshot.paramMap.get('id');

    this.eventName = this.localStorage.get('EventName');
    this.getRoomTemplates();
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

  getRoomTemplates() {
    const getByIdViewModel: any = {};
    getByIdViewModel.id = this.eventId;
    this.roomService.getRoomTemplates(getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.roomTemplates = res.roomTemplates;
        console.log(this.roomTemplates);
        this.dtTrigger.next();

      } else {

      }
    })
  }

  getTemplateDetails(item) {
    location.href = 'admin/events/updateroomtemplate/' + item.roomTemplateId + '/' + item.eventId;
  }

  deleteTemplate(item) {
    const getByIdViewModel: any = {};
    getByIdViewModel.id = item.roomTemplateId;
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.value) {
        this.roomService.deleteRoomTemplate(getByIdViewModel).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: new SweetAlertMessage(this.translate).sweetAlertDeletedSuccessMessage,
              icon: 'success'
            }).then(() => {
              
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                // Destroy the table first
                dtInstance.destroy();
                // // Call the dtTrigger to rerender again
                // this.dtTrigger.next();
          
              });
              this.getRoomTemplates();
            });
          } else {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              text: res.message,
              icon: 'error'
            });
          }
        })
      }
    });
  }
}
