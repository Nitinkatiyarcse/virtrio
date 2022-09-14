import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

import { EventsManagementService } from 'src/app/Services/events-management.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { isPostfixUnaryExpression } from 'typescript';
import { LanguageService } from 'src/app/Services/language.service';
import { SweetAlertMessage } from '../../../../Utils/SweetAlertMessages';
import * as AppUtils from '../../../../Utils/apputils';
import { Helper } from 'src/app/Utils/Helper';
import { ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/internal/Subject';
import { EventEntitlementService } from 'src/app/Services/event-entitlement.service';

@Component({
  selector: 'app-event-entitlement',
  templateUrl: './event-entitlement.component.html',
  styleUrls: ['./event-entitlement.component.css']
})
export class EventEntitlementComponent implements OnInit {
  eventId: string;
  getByIdViewModel: any = {};
  groupTableData = [];
  NoRecordFoundMessage = false;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  eventName = '';
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private location: Location,
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    public router: Router,
    private langugeService: LanguageService,
    private eventEntitlementService: EventEntitlementService
  ) {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventName = this.localStorage.get('EventName');
    this.getEventEntitlements();
  }

  ngOnInit(): void { }

  getEventEntitlements() {
    this.getByIdViewModel.id = this.eventId;
    this.eventEntitlementService.getEventEntitlements(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.NoRecordFoundMessage = false;
        this.groupTableData = res.eventEntitlementViewModelsList;
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

  deleteEventEntitlement(entitlementItem) {
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
        const eventEntitlementViewModel: any = {};
        eventEntitlementViewModel.entitlementId = entitlementItem.entitlementId;
        eventEntitlementViewModel.modifiedBy = this.localStorage.get('UserId');
        this.eventEntitlementService.deleteEventEntitlement(eventEntitlementViewModel).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: new SweetAlertMessage(this.translate).sweetAlertDeletedSuccessMessage,
              icon: 'success',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
            }).then(() => {
              this.getByIdViewModel.id = this.eventId;
              this.eventEntitlementService.getEventEntitlements(this.getByIdViewModel).subscribe((resp) => {
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
              res.message,
              'error'
            );
          }
          this.spinner.hide();
        });
      }
    });
  }



}
