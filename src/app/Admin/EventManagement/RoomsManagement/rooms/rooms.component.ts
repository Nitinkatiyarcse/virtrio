import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { RoomsService } from 'src/app/Services/rooms.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  eventName: string;
  eventId: string;
  inputRoomsViewModel: any = {};
  totalPages: any = 0;
  pageNumber: any = 0;
  isLastPage = false;
  isFirstPage = true;
  getByIdViewModel: any = {};


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private eventManagementService: EventsManagementService,
    private localStorage: LocalStorageService,
    public getterSetterService: GetterSetterService,
    private route: ActivatedRoute,
    private roomService: RoomsService,
    private translate: TranslateService

  ) {
    this.localStorage.set('isEventSelected', 'true');
    this.eventName = this.localStorage.get('EventName');
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getRooms();

  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getRooms() {
    // this.getByIdViewModel.id = this.eventId;
    const roomRequestVM: any = {};
    roomRequestVM.eventId = this.eventId;
    roomRequestVM.roleId = this.localStorage.get('RoleId');
    roomRequestVM.boothAdminid = this.localStorage.get('UserId');
    this.roomService.getRooms(roomRequestVM).subscribe((res) => {
      if (res.isSuccess) {
        this.inputRoomsViewModel = res.rooms;
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
      }
    });
  }


  ngOnInit(): void {
  }

  lockUnlockRoom(roomId: string) {
    this.spinner.show();
    const roomInfo: any = {};
    roomInfo.modifiedBy = this.localStorage.get('UserId');
    roomInfo.roomId = roomId;
    roomInfo.eventId = this.eventId;
    this.roomService.lockUnlockRoom(roomInfo).subscribe((res) => {
      if (res.isSuccess) {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).updatedSuccessfullyMessage,
          icon: 'success',
          confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
        }).then(() => {
          this.getRooms();
        });


      } else {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: res.message,
          icon: 'error',
          confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
        });
      }
      this.spinner.hide();
    });
  }


  activateDeactivateRoom(roomId: string) {
    this.spinner.show();
    const roomInfo: any = {};
    roomInfo.modifiedBy = this.localStorage.get('UserId');
    roomInfo.roomId = roomId;
    roomInfo.eventId = this.eventId;
    this.roomService.activateDeactivateRoom(roomInfo).subscribe((res) => {
      if (res.isSuccess) {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).updatedSuccessfullyMessage,
          icon: 'success',
          confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
        }).then(() => {
          this.getRooms();
        });
      } else {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: res.message,
          icon: 'error',
          confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
        });
      }
      this.spinner.hide();
    });
  }
}
