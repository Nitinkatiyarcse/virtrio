import { Component, OnInit, ViewChild } from '@angular/core';
import { SweetAlertMessage } from '../../../../Utils/SweetAlertMessages';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { EventEntitlementService } from 'src/app/Services/event-entitlement.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-group-entitlement',
  templateUrl: './group-entitlement.component.html',
  styleUrls: ['./group-entitlement.component.css']
})
export class GroupEntitlementComponent implements OnInit {
  eventId: string;
  getByIdViewModel: any = {};
  groupTableData = [];
  inputEntitlementGroupModel: any = {};
  sweetAlertSuccessHeader = '';
  sweetAlertSuccessMessage = '';
  sweetAlertEventUpdatedSuccessfullyMessage = '';
  sweetAlertErrorHeader = '';
  sweetAlertErrorMessage = '';
  sweetAlertConfirmButtonText = '';
  NoRecordFoundMessage = false;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isAdd = true;
  eventName = '';
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private sweetAlertMessage: SweetAlertMessage,
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    private eventEntitlementService: EventEntitlementService
  ) {
    this.sweetAlertSuccessHeader = new SweetAlertMessage(this.translate).sweetAlertSuccessHeader;
    this.sweetAlertEventUpdatedSuccessfullyMessage = this.isAdd
      ? new SweetAlertMessage(this.translate).sweetAlertEventUpdatedSuccessfullyMessage
      : new SweetAlertMessage(this.translate).updatedSuccessfullyMessage;
    this.sweetAlertErrorHeader = this.translate.instant('Error');
    this.sweetAlertConfirmButtonText = this.translate.instant('OK');
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventName = this.localStorage.get('EventName');
    this.getEventEntitlementGroups();
  }

  getEventEntitlementGroups() {
    this.getByIdViewModel.id = this.eventId;
    this.eventEntitlementService.getEventEntitlementGroups(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.NoRecordFoundMessage = false;
        this.groupTableData = res.entitlementGroups;
        this.dtTrigger.next();
      } else {
        this.NoRecordFoundMessage = true;
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


  upsertEventEntitlementGroup() {
    console.log(this.inputEntitlementGroupModel);
    this.inputEntitlementGroupModel.isActive = true;
    this.inputEntitlementGroupModel.eventId = this.eventId;
    this.spinner.show();
    this.eventEntitlementService.upsertEventEntitlementGroup(this.inputEntitlementGroupModel).subscribe((res) => {
      if (res.isSuccess) {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).savedSuccessfully,
          icon: 'success',
          confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
        }).then(() => {
          this.getByIdViewModel.id = this.eventId;
          this.eventEntitlementService.getEventEntitlementGroups(this.getByIdViewModel).subscribe((resp) => {
            if (resp.isSuccess) {
              this.NoRecordFoundMessage = false;
              this.groupTableData = resp.entitlementGroups;
            } else {
              this.NoRecordFoundMessage = true;
            }
          });
        });
      } else {
        Swal.fire(
          new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          res.errors[0],
          'error'
        );
      }
      this.spinner.hide();
    });

  }

  addGroup() {
    this.isAdd = true;
    this.inputEntitlementGroupModel.groupId = '00000000-0000-0000-0000-000000000000';
    this.inputEntitlementGroupModel.createdBy = this.localStorage.get('UserId');
  }

  updateGroup(groupItem) {
    this.isAdd = false;
    this.inputEntitlementGroupModel.groupId = groupItem.groupId;
    this.inputEntitlementGroupModel.modifiedBy = this.localStorage.get('UserId');
    this.inputEntitlementGroupModel.groupName = groupItem.groupName;
  }

  deleteGroup(groupItem) {
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
        const evGroup: any = {};
        evGroup.groupId = groupItem.groupId;
        evGroup.modifiedBy = this.localStorage.get('UserId');
        this.eventEntitlementService.deleteEventEntitlementGroup(evGroup).subscribe((res) => {
          if (res.isSuccess) {
            const eventEntitlementUrl = '/admin/events/entitlementgroup/' + this.inputEntitlementGroupModel.eventId;
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: new SweetAlertMessage(this.translate).sweetAlertDeletedSuccessMessage,
              icon: 'success',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
            }).then(() => {
              this.getByIdViewModel.id = this.eventId;
              this.eventEntitlementService.getEventEntitlementGroups(this.getByIdViewModel).subscribe((resp) => {
                if (resp.isSuccess) {
                  this.NoRecordFoundMessage = false;
                  this.groupTableData = resp.entitlementGroups;
                } else {
                  this.NoRecordFoundMessage = true;
                }
              });
            });
          } else {
            Swal.fire(
              new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              res.errors[0],
              'error'
            );
          }
          this.spinner.hide();
        });
      }
    });

  }

}
