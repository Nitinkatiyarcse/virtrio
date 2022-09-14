import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

import { LanguageService } from 'src/app/Services/language.service';
import { EntitlementAddcriteriaComponent } from 'src/app/Admin/_layout/Shared/entitlement-addcriteria/entitlement-addcriteria.component';
import { EventEntitlementService } from 'src/app/Services/event-entitlement.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';

@Component({
  selector: 'app-create-event-entitlement',
  templateUrl: './create-event-entitlement.component.html',
  styleUrls: ['./create-event-entitlement.component.css']
})
export class CreateEventEntitlementComponent implements OnInit {

  eventId = '';
  isAdd = true;
  entitlementId = '';
  inputEventEntitlementModel: any = {};
  getByIdViewModel: any = {};
  allGroups = [];
  modalRef: BsModalRef;
  eventName = '';
  constructor(
    private modalService: BsModalService,
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
    this.entitlementId = this.route.snapshot.paramMap.get('entitlementId');
    this.getEventEntitlementGroups();
    if (this.entitlementId) {
      this.isAdd = false;
    }
    if (!this.isAdd) {
      // get current entitlement details
      this.getEntitlementDetails();
    }
  }

  ngOnInit(): void { }

  getEventEntitlementGroups() {
    this.spinner.show();
    this.getByIdViewModel.id = this.eventId;
    this.eventEntitlementService.getEventEntitlementGroups(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.allGroups = res.entitlementGroups;
        this.spinner.hide();

      } else {
        this.spinner.hide();
      }
    });
  }

  getEntitlementDetails() {
    this.getByIdViewModel.id = this.entitlementId;
    this.eventEntitlementService.getEventEntitlementDetails(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.inputEventEntitlementModel = res.eventEntitlementViewModelsList[0];
        this.allGroups.forEach(el => {
          el.isSelected = false;
          this.inputEventEntitlementModel.groups.forEach(elmt => {
            if (el.groupId === elmt.groupId) {
              el.isSelected = true;
            }
          });
        });
        console.log(this.inputEventEntitlementModel);
        console.log(this.allGroups);
      }
    });
  }

  openAddCriteriamodel() {
    const initialState = {
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard:false,
    };
    const modalParams = Object.assign({}, modalConfig, { initialState, class: 'modal-lg' });
    this.modalRef = this.modalService.show(EntitlementAddcriteriaComponent, modalParams);

  }

  selectUnselectGroup(event, item) {
    if (event.target.checked) {
      item.isSelected = true;
    } else {
      item.isSelected = false;
    }
  }

  saveEventEntitlement() {
    this.spinner.show();
    this.inputEventEntitlementModel.groups = [];
    this.allGroups.forEach(el => {
      if (el.isSelected) {
        this.inputEventEntitlementModel.groups.push(el);
      }
    });


    this.inputEventEntitlementModel.entitlementId = this.isAdd ? '00000000-0000-0000-0000-000000000000' : this.entitlementId;
    this.inputEventEntitlementModel.eventId = this.eventId;
    this.inputEventEntitlementModel.createdBy = this.localStorage.get('UserId');
    this.inputEventEntitlementModel.modifiedBy = this.localStorage.get('UserId');
    console.log(this.inputEventEntitlementModel);
    this.eventEntitlementService.upsertEventEntitlement(this.inputEventEntitlementModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).success,
          text: new SweetAlertMessage(this.translate).savedSuccessfully,
          icon: 'success'
        }).then(() => {
          location.href = '/admin/events/entitlementlist/' + this.eventId;
        });
      } else {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: res.message,
          icon: 'error'
        });

      }

    });
  }




}
