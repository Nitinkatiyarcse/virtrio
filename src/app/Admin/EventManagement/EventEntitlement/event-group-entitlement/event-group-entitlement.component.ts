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
import { factory } from 'typescript';
import { ElementRef } from '@angular/core';
import { Helper } from 'src/app/Utils/Helper';
import * as AppUtils from '../../../../Utils/apputils';
@Component({
  selector: 'app-event-group-entitlement',
  templateUrl: './event-group-entitlement.component.html',
  styleUrls: ['./event-group-entitlement.component.css']
})
export class EventGroupEntitlementComponent implements OnInit {
  inputEntitlementGroupModel: any = {};
  isWhitelistOrBlackList = 0;
  whitelistPrBlacklistItemId = '';
  isAdd = true;
  public ISwhitelistingselected = true;
  eventId: string;
  getByIdViewModel: any = {};
  eventName = '';
  whitelistEmailList: [];
  whitelistDomainList: [];
  blackListEmailList: [];
  blackListDomainList: [];

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  whitelistedEmailAndDomainItems: any = {};
  blacklistedEmailAndDomainItems: any = {};
  whitelistItemId = '';

  isWHitelistCheckedYes = false;
  isWHitelistCheckedNo = true;

  isBlacklistCheckedYes = false;
  isBlacklistCheckedNo = true;

  @ViewChild('popupCloseBtn') private popupCloseBtn: ElementRef;
  @ViewChild('popupCloseBtn1') private popupCloseBtn1: ElementRef;
  @ViewChild('popupCloseBtn2') private popupCloseBtn2: ElementRef;
  @ViewChild('popupCloseBtn3') private popupCloseBtn3: ElementRef;

  groupEntitlements = [];
  entitlementGroupUpsertViewModel: any = {};
  whitelistedEmailAddressLoadFileSample = '';
  constructor(private localStorage: LocalStorageService,
    public router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private sweetAlertMessage: SweetAlertMessage,
    private translate: TranslateService,
    private eventEntitlementService: EventEntitlementService,
    private helper: Helper) {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventName = this.localStorage.get('EventName');
    this.whitelistedEmailAndDomainItems.createdBy = this.localStorage.get('UserId');
    this.blacklistedEmailAndDomainItems.createdBy = this.localStorage.get('UserId');


    this.GetWhitelistAndBlackListItems('pageLoad');

    this.bindGroupEntitlements();
    this.whitelistedEmailAddressLoadFileSample = AppUtils.whitelistBlacklistEMailSamplePath;
  }

  ngOnInit(): void {
  }

  isWHitelistYesNo(event, value) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertUpdateMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertWhitelistUpdateMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.isConfirmed) {

        event.target.checked = true;
        if (value === true) {
          this.isWHitelistCheckedNo = false;
          this.isWHitelistCheckedYes = true;
        }
        if (value === false) {
          this.isWHitelistCheckedNo = true;
          this.isWHitelistCheckedYes = false;
        }
        if (result.value) {
          this.spinner.show();
          if (value === true) {
            // disable blaklist item
            this.isWhitelistOrBlackList = 1;
          } else if (value === false) {
            this.isWhitelistOrBlackList = 0;
          }
          const whiteAndBlackList: any = {};
          whiteAndBlackList.modifiedBy = this.localStorage.get('UserId');
          whiteAndBlackList.id = this.whitelistItemId;
          whiteAndBlackList.isWhitelistOrBlackList = this.isWhitelistOrBlackList;
          this.eventEntitlementService.updateWhitelistOrBlacklistStatus(whiteAndBlackList).subscribe((res) => {
            if (res.isSuccess) {
              Swal.fire({
                title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
                text: new SweetAlertMessage(this.translate).updatedSuccessfullyMessage,
                icon: 'success',
                confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
              }).then(() => {
                // this.GetWhitelistAndBlackListItems('');
                window.location.href = '/admin/events/eventgroupentitlement/' + this.eventId;
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
      } else {
        event.target.checked = false;

      }

    });
  }



  isBlacklistYesNo(event, value) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertUpdateMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertWhitelistUpdateMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.isConfirmed) {
        event.target.checked = true;
        if (value === true) {
          this.isBlacklistCheckedNo = false;
          this.isBlacklistCheckedYes = true;
        }
        if (value === false) {
          this.isBlacklistCheckedNo = true;
          this.isBlacklistCheckedYes = false;
        }
        this.spinner.show();
        if (value === true) {
          // disable whitelist item
          this.isWhitelistOrBlackList = 2;
        } else if (value === false) {
          this.isWhitelistOrBlackList = 0;
        }
        const whiteAndBlackList: any = {};
        whiteAndBlackList.modifiedBy = this.localStorage.get('UserId');
        whiteAndBlackList.id = this.whitelistItemId;
        whiteAndBlackList.isWhitelistOrBlackList = this.isWhitelistOrBlackList;
        this.eventEntitlementService.updateWhitelistOrBlacklistStatus(whiteAndBlackList).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: new SweetAlertMessage(this.translate).updatedSuccessfullyMessage,
              icon: 'success',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
            }).then(() => {
              // this.GetWhitelistAndBlackListItems('');
              window.location.href = '/admin/events/eventgroupentitlement/' + this.eventId;
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
      } else {
        event.target.checked = false;

      }
    });
  }


  private GetWhitelistAndBlackListItems(type: string) {
    this.spinner.show();
    this.getByIdViewModel.id = this.eventId;
    this.eventEntitlementService.getWhitelistAndBlackList(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.isWhitelistOrBlackList = res.whiteAndBlackList.isWhitelistOrBlackList;
        this.whitelistItemId = res.whiteAndBlackList.id;
        if (this.isWhitelistOrBlackList === 1) {
          this.whitelistDomainList = res.whitelistedEmailAndDomainItems.filter(i => i.isEmailOrDomainType === 1);
          this.whitelistEmailList = res.whitelistedEmailAndDomainItems.filter(i => i.isEmailOrDomainType === 2);
          this.blackListDomainList = [];
          this.blackListEmailList = [];
          this.isWHitelistCheckedYes = true;
          this.isWHitelistCheckedNo = false;
        } else if (this.isWhitelistOrBlackList === 2) {
          this.isBlacklistCheckedYes = true;
          this.isBlacklistCheckedNo = false;
          this.blackListDomainList = res.blacklistedEmailAndDomainItems.filter(i => i.isEmailOrDomainType === 1);
          this.blackListEmailList = res.blacklistedEmailAndDomainItems.filter(i => i.isEmailOrDomainType === 2);
          this.whitelistEmailList = [];
          this.whitelistDomainList = [];
        } else {
          this.whitelistEmailList = [];
          this.whitelistDomainList = [];
          this.blackListDomainList = [];
          this.blackListEmailList = [];
        }
        this.closePopup();

        if (type === 'pageLoad') {
          this.dtTrigger.next();
          this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true
          };
        }

      } else {
      }
      this.spinner.hide();
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  closePopup() {
    this.popupCloseBtn.nativeElement.click();
    this.popupCloseBtn1.nativeElement.click();
    this.popupCloseBtn2.nativeElement.click();
    this.popupCloseBtn3.nativeElement.click();
  }

  showAddWhitelistDomainPopup() {
    this.whitelistedEmailAndDomainItems.isEmailOrDomainType = 1;
    this.whitelistedEmailAndDomainItems.createdBy = this.localStorage.get('UserId');
    this.whitelistedEmailAndDomainItems.whitelistItemId = this.whitelistItemId;
    this.whitelistedEmailAndDomainItems.addressValue = '';
  }

  showAddWhitelistEmailPopup() {
    this.whitelistedEmailAndDomainItems.isEmailOrDomainType = 2;
    this.whitelistedEmailAndDomainItems.createdBy = this.localStorage.get('UserId');
    this.whitelistedEmailAndDomainItems.whitelistItemId = this.whitelistItemId;
    this.whitelistedEmailAndDomainItems.addressValue = '';
  }

  saveWhitelistDomainOrEmailAddress() {
    console.log(this.whitelistedEmailAndDomainItems);
    this.spinner.show();
    this.eventEntitlementService.addWhitelistItem(this.whitelistedEmailAndDomainItems).subscribe((resp) => {
      if (resp.isSuccess) {
        // this.GetWhitelistAndBlackListItems('');
        window.location.href = '/admin/events/eventgroupentitlement/' + this.eventId;
      } else {

      }
      this.spinner.hide();
    });
  }

  showAddBlacklistDomainPopup() {
    this.blacklistedEmailAndDomainItems.isEmailOrDomainType = 1;
    this.blacklistedEmailAndDomainItems.createdBy = this.localStorage.get('UserId');
    this.blacklistedEmailAndDomainItems.whitelistItemId = this.whitelistItemId;
    this.blacklistedEmailAndDomainItems.addressValue = '';
  }

  showBlacklistEmailPopup() {
    this.blacklistedEmailAndDomainItems.isEmailOrDomainType = 2;
    this.blacklistedEmailAndDomainItems.createdBy = this.localStorage.get('UserId');
    this.blacklistedEmailAndDomainItems.whitelistItemId = this.whitelistItemId;
    this.blacklistedEmailAndDomainItems.addressValue = '';
  }

  saveBlacklistDomainOrEmailAddress() {
    console.log(this.blacklistedEmailAndDomainItems);
    this.spinner.show();
    this.eventEntitlementService.addBlacklistItem(this.blacklistedEmailAndDomainItems).subscribe((resp) => {
      if (resp.isSuccess) {
        // this.GetWhitelistAndBlackListItems('');
        window.location.href = '/admin/events/eventgroupentitlement/' + this.eventId;
      } else {

      }
      this.spinner.hide();
    });
  }

  deleteWhiteListedDomain(item) {
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
        const whitelistedEmailAndDomainItems: any = {};
        whitelistedEmailAndDomainItems.id = item.id;
        whitelistedEmailAndDomainItems.modifiedBy = this.localStorage.get('UserId');
        this.eventEntitlementService.deleteWhiteListItem(whitelistedEmailAndDomainItems).subscribe((resp) => {
          if (resp.isSuccess) {
            // this.GetWhitelistAndBlackListItems('');
            window.location.href = '/admin/events/eventgroupentitlement/' + this.eventId;
          } else {

          }
          this.spinner.hide();
        });
      }
    });



  }

  deleteBlackListedItem(item) {
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
        const blacklistedEmailAndDomainItems: any = {};
        blacklistedEmailAndDomainItems.id = item.id;
        blacklistedEmailAndDomainItems.modifiedBy = this.localStorage.get('UserId');
        this.eventEntitlementService.deleteBlackListedItem(blacklistedEmailAndDomainItems).subscribe((resp) => {
          if (resp.isSuccess) {
            // this.GetWhitelistAndBlackListItems('');
            window.location.href = '/admin/events/eventgroupentitlement/' + this.eventId;
          } else {

          }
          this.spinner.hide();
        });
      }
    });



  }


  bindGroupEntitlements() {
    this.getByIdViewModel.id = this.eventId;
    this.eventEntitlementService.getGroupEntitlemts(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.groupEntitlements = res.groupEntitlementViewModels;
        console.log(this.groupEntitlements);
      }
    });

  }

  deleteGroup(groupId) {
    this.entitlementGroupUpsertViewModel.groupId = groupId;
    this.entitlementGroupUpsertViewModel.modifiedBy = this.localStorage.get('UserId');

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
        this.eventEntitlementService.deleteGroup(this.entitlementGroupUpsertViewModel).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: new SweetAlertMessage(this.translate).sweetAlertDeletedSuccessMessage,
              icon: 'success',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
            }).then(() => {
              this.bindGroupEntitlements();
            });
          } else {

          }
          this.spinner.hide();
        });
      }
    });


  }


  uploadWhitelistedEmailAddresses(event) {
    if (event.target.files) {
      if (event.target.files.length > 0) {
        this.spinner.show();
        const whiteAndBlackList: any = {};
        whiteAndBlackList.eventId = this.eventId;
        whiteAndBlackList.createdBy = this.localStorage.get('UserId');
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
          const file: File = fileList[0];
          const formData: FormData = new FormData();
          if (this.helper.validateCSVFile(file.name)) {
            formData.append('uploadedFile', file, file.name);
            formData.append('eventId', this.eventId);
            formData.append('createdBy', this.localStorage.get('UserId'));
            this.eventEntitlementService.uploadWhitelistedEmailFile(formData).subscribe((res) => {
              if (res.isSuccess) {
                Swal.fire({
                  title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
                  text: new SweetAlertMessage(this.translate).savedSuccessfully,
                  icon: 'success',
                  confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
                }).then(() => {
                  window.location.href = '/admin/events/eventgroupentitlement/' + this.eventId;
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
            event.target.value = '';
          }
        }
      } else {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).invalidFileType,
          text: new SweetAlertMessage(this.translate).pleaseSelectValidFile,
          icon: 'error'
        });
        event.target.value = '';
      }
    } else {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).invalidFileType,
        text: new SweetAlertMessage(this.translate).pleaseSelectValidFile,
        icon: 'error'
      });
      event.target.value = '';
    }
  }


}
