import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { RoomsService } from 'src/app/Services/rooms.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { UserManagementService } from 'src/app/Services/user-management.service';
import { Helper } from 'src/app/Utils/Helper';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import * as AppUtils from 'src/app/Utils/apputils';
@Component({
  selector: 'app-event-adminusers',
  templateUrl: './event-adminusers.component.html',
  styleUrls: ['./event-adminusers.component.css']
})

export class EventAdminusersComponent implements OnInit {
  eventName: string;
  eventId: string;
  inputModel: any = {};
  inputEventAdminViewModel: any = {};
  noRecordFound = false;
  totalPages: any = 0;
  pageNumber: any = 0;
  isLastPage = false;
  isFirstPage = true;
  getByIdViewModel: any = {};
  userEvents: any = {};
  userRoles: any = [];
  fileToUpload: File | null = null;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  allRooms: any[] = [];
  selectedRooms: Array<string> = [];
  isBoothAdmin = false;
  requiredField = false;
  dropdownSettings: IDropdownSettings = {};
  eventAdminUploadSampleFilePath = '';
  constructor(
    private spinner: NgxSpinnerService,
    private eventManagementService: EventsManagementService,
    private localStorage: LocalStorageService,
    public getterSetterService: GetterSetterService,
    private route: ActivatedRoute,
    private roomService: RoomsService,
    private translate: TranslateService,
    public bsModal: BsModalRef,
    private userManagementService: UserManagementService,
    private helper: Helper
  ) {
    this.eventAdminUploadSampleFilePath = AppUtils.EventAdminUploadSampleFilePath;
    this.localStorage.set('isEventSelected', 'true');
    this.eventName = this.localStorage.get('EventName');
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getAllRoles();
    this.getEventAdmin();
    this.getAllBoothsOfEvent();
  }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'roomId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  getAllRoles() {
    this.spinner.show();
    this.userManagementService.GetAllRoles().subscribe((res) => {
      if (res.isSuccess === true) {
        this.userRoles = res.roles.filter(u => u.roleName !== 'SuperAdmin');
        this.inputModel.roleId = '';
        this.spinner.hide();
      }
    });
  }

  getAllBoothsOfEvent() {
    this.spinner.show();
    this.getByIdViewModel.id = this.eventId;
    this.roomService.getBooths(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.allRooms = res.rooms;
      }
    });
  }

  checkForBoothAdmin(event) {
    this.isBoothAdmin = this.userRoles.filter(u => u.roleId === event.target.value)[0].roleName === 'BoothAdmin' ? true : false;
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getEventAdmin() {
    this.getByIdViewModel.id = this.eventId;
    this.eventManagementService.getEventAdmin(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.inputEventAdminViewModel = res.users;
        this.noRecordFound = false;
        this.dtTrigger.next();
      } else {
        this.noRecordFound = true;
      }
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  }

  deleteEventAdmin(userId) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {

      if (result.value) {
        this.spinner.show();
        this.userEvents.eventId = this.eventId;
        this.userEvents.userId = userId;
        this.eventManagementService.deleteEventAdmin(this.userEvents).subscribe((res) => {
          if (res.isSuccess) {
            this.eventManagementService.getEventAdmin(this.getByIdViewModel).subscribe((getEventAdminres) => {
              if (getEventAdminres.isSuccess) {
                this.inputEventAdminViewModel = getEventAdminres.users;
                this.noRecordFound = false;
              } else {
                this.noRecordFound = true;
              }
            });
            Swal.fire(
              new SweetAlertMessage(this.translate).sweetalertDeletedHeader,
              new SweetAlertMessage(this.translate).sweetAlertDeletedSuccessMessage,
              'success'
            );
          } else {
            Swal.fire(
              new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              res.message,
              'error'
            );
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
      this.spinner.hide();
    });

  }

  addEventAdmin() {
    this.inputModel.eventId = this.eventId;
    this.inputModel.createdBy = this.localStorage.get('UserId');
    this.inputModel.rooms = this.selectedRooms;
    // this.bsModal.hide();
    const eventadminUrl = '/admin/events/eventadmin/' + this.eventId;
    this.spinner.show();
    console.log(this.inputModel);
    this.eventManagementService.saveEventAdmin(this.inputModel).subscribe((res) => {
      if (res.isSuccess) {
        this.getByIdViewModel.id = this.eventId;
        this.eventManagementService.getEventAdmin(this.getByIdViewModel).subscribe((getEventAdminres) => {
          if (getEventAdminres.isSuccess) {

            this.inputEventAdminViewModel = getEventAdminres.users;
            this.noRecordFound = false;
          } else {
            this.noRecordFound = true;
          }

          Swal.fire({
            title: new SweetAlertMessage(this.translate).success,
            text: new SweetAlertMessage(this.translate).savedSuccessfully,
            icon: 'success'
          }).then(function () {

            location.href = eventadminUrl;
          });
          // eventadmin
        });
        this.spinner.hide();
      } else {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: res.message,
          icon: 'error'
        }).then(function () {

          location.href = eventadminUrl;
        });
      }
    });
  }

  resetFields() {
    this.inputModel.firstName = '';
    this.inputModel.lastName = '';
    this.inputModel.emailAddress = '';
  }

  sendMessage(toUser) {
    this.spinner.show();
    const getEventRepViewModel: any = {};
    getEventRepViewModel.userId = toUser;
    getEventRepViewModel.eventId = this.eventId;
    this.eventManagementService.resendEmailToEventAdmin(getEventRepViewModel).subscribe((res) => {
      this.spinner.hide();
      if (res.isSuccess) {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).mailSentSuccessfully,
          icon: 'success'
        });
      } else {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: new SweetAlertMessage(this.translate).errorInSendingEmail,
          icon: 'error'
        });
      }
    });
  }


  changeUplaodEventAdminFile(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uplaodEventAdmins() {
    if (this.fileToUpload != null) {
      this.spinner.show();
      //var roleId=AppUtils.emptyGuid;
      const whiteAndBlackList: any = {};
      whiteAndBlackList.eventId = this.eventId;
      whiteAndBlackList.createdBy = this.localStorage.get('UserId');
      

      const file: File = this.fileToUpload;
      const formData: FormData = new FormData();
      if (this.helper.validateCSVFile(file.name)) {
        formData.append('uploadedFile', file, file.name);
        formData.append('eventId', this.eventId);
        formData.append('createdBy', this.localStorage.get('UserId'));
        formData.append('roleId', this.localStorage.get('RoleId'));

        this.eventManagementService.uploadEventAdminsFile(formData).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: new SweetAlertMessage(this.translate).savedSuccessfully,
              icon: 'success',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
            }).then(() => {
              this.fileToUpload = null;
              window.location.href = '/admin/events/eventadmin/' + this.eventId;

            });
          }
          this.spinner.hide();
        });
      } else {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).invalidFileType,
          text: new SweetAlertMessage(this.translate).onlyCsvXlsFilesAreAllowed,
          icon: 'error'
        });
        this.fileToUpload = null;
      }
    } else {
      this.spinner.hide();

      Swal.fire({
        title: new SweetAlertMessage(this.translate).invalidFileType,
        text: new SweetAlertMessage(this.translate).pleaseSelectValidFile,
        icon: 'error'
      });
      this.fileToUpload = null;
    }
  }

  setClass() {
    this.requiredField = true;
    if (this.selectedRooms.length > 0) {
      return 'validField';
    } else {
      return 'invalidField';
    }
  }


}
