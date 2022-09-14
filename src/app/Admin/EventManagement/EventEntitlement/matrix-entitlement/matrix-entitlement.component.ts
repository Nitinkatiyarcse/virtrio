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
  selector: 'app-matrix-entitlement',
  templateUrl: './matrix-entitlement.component.html',
  styleUrls: ['./matrix-entitlement.component.css']
})
export class MatrixEntitlementComponent implements OnInit {

  eventId: string;
  getByIdViewModel: any = {};
  allGroups = [];
  eventEntitlements: any = {};
  eventEntitlementViewModelList: any = {};
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
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventName = this.localStorage.get('EventName');
    this.getEventEntitlementMatrix();

  }

  ngOnInit(): void {
  }

  getEventEntitlementMatrix() {
    this.spinner.show();
    this.getByIdViewModel.id = this.eventId;
    this.eventEntitlementService.getEventEntitlementMatrix(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.eventEntitlements = res.entitlementGroupMatrixViewModel;
        this.spinner.hide();
      } else {
        console.log(res);
        this.spinner.hide();
      }
    });

  }

  selectUnselectGroup(event, entitlementItem, groupItem) {
    if (event.target.checked) {
      this.eventEntitlements.filter(t => t.entitlementId === entitlementItem.entitlementId)[0]
        .groups.filter(x => x.groupId === groupItem.groupId)[0].isSelected = true;
    } else {
      this.eventEntitlements.filter(t => t.entitlementId === entitlementItem.entitlementId)[0]
        .groups.filter(x => x.groupId === groupItem.groupId)[0].isSelected = false;
    }
  }

  saveData() {
    this.spinner.show();
    const inputModel: any = {};
    inputModel.createdBy = this.localStorage.get('UserId');
    inputModel.modifiedBy = this.localStorage.get('UserId');
    inputModel.eventId = this.eventId;

    inputModel.entitlementGroupMatrixViewModel = this.eventEntitlements;
    console.log(this.eventEntitlements);
    this.eventEntitlementService.updateEventEntitlementMatrix(inputModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).savedSuccessfully,
          icon: 'success'
        }).then(() => {
          this.getEventEntitlementMatrix();
        });
      } else {
        console.log(res);
      }
    });
  }


}
