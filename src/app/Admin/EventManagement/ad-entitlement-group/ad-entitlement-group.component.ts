import { Component, OnInit, ViewChild } from '@angular/core';
import { SweetAlertMessage } from '../../../Utils/SweetAlertMessages';
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
import * as AppUtils from '../../../Utils/apputils';

@Component({
  selector: 'app-ad-entitlement-group',
  templateUrl: './ad-entitlement-group.component.html',
  styleUrls: ['./ad-entitlement-group.component.css']
})
export class AdEntitlementGroupComponent implements OnInit {
  eventId: string;
  getByIdViewModel: any = {};
  eventName = '';
  registrationCretiria = [];
  courceCreteria = [];
  masterRegistrationCreteria = [];
  notSelectedREgistrationCreteria = [];
  grpName = '';
  isSelectRegistrationCreteriaChecked = false;
  isSelectCourseCreteriaChecked = false;
  entitlementGroupUpsertViewModel: any = {};
  groupId = AppUtils.emptyGuid;
  isAdd = true;
  constructor(private localStorage: LocalStorageService,
    public router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private sweetAlertMessage: SweetAlertMessage,
    private translate: TranslateService,
    private eventEntitlementService: EventEntitlementService) {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.route.snapshot.paramMap.get('grpId') != null) {
      this.groupId = this.route.snapshot.paramMap.get('grpId');
      this.isAdd = false;

    } else {
      this.groupId = AppUtils.emptyGuid;
      this.isAdd = true;
    }
    this.eventName = this.localStorage.get('EventName');
    this.getMasterRegistrationCreteria();
    if (!this.isAdd) {
      this.getEventGroupDtails();
    }
  }

  getEventGroupDtails() {
    this.getByIdViewModel.id = this.groupId;
    this.spinner.show();
    this.eventEntitlementService.getEventGroupDtails(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        // console.log(res);
        this.entitlementGroupUpsertViewModel = res.entitlementGroupUpsertViewModel;

        this.grpName = this.entitlementGroupUpsertViewModel.groupName;
        this.registrationCretiria = this.entitlementGroupUpsertViewModel.registrationCretiriaLists;
        this.registrationCretiria.forEach(element => {
          const elemt = this.masterRegistrationCreteria.filter(u => u.name === element.name);
          if (elemt !== null) {
            element.selectedValue = elemt[0].type + '^^^^^' + this.masterRegistrationCreteria.indexOf(elemt[0]) + '^^^^^' + elemt[0].name;
          }
        });
        // this.courceCreteria = this.entitlementGroupUpsertViewModel.courseCretiriaLists;
        if (this.registrationCretiria.length > 0) {
          this.isSelectRegistrationCreteriaChecked = true;
        }


        this.spinner.hide();
      } else {

      }
      this.spinner.hide();
    });
  }


  getMasterRegistrationCreteria() {
    this.spinner.show();
    this.getByIdViewModel.id = this.eventId;
    this.eventEntitlementService.getMasterRegistrationCreteria(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        // console.log(res);
        this.masterRegistrationCreteria = res.registrationCriterias;
        console.log(this.masterRegistrationCreteria);
        this.spinner.hide();
      } else {

      }
      this.spinner.hide();
    });
  }

  ngOnInit(): void {
  }

  selectRegistrationCreteria(event) {
    if (event.target.checked) {
      this.isSelectRegistrationCreteriaChecked = true;
    } else {
      this.isSelectRegistrationCreteriaChecked = false;
    }
  }

  selectCourseCreteria(event) {
    if (event.target.checked) {
      this.isSelectCourseCreteriaChecked = true;
    } else {
      this.isSelectCourseCreteriaChecked = false;
    }
  }

  addRegistrationCreteria() {
    this.registrationCretiria.push({ id: AppUtils.emptyGuid, name: '', type: '', options: [], value: '' });
    const selectedItems = [];
    this.masterRegistrationCreteria.forEach(element => {
      // if (selectedItems.indexOf(element) === -1 && this.notSelectedREgistrationCreteria.indexOf(element) === -1) {
      //   selectedItems.push(element);
      // }
    });
    // this.notSelectedREgistrationCreteria = selectedItems;

  }

  changeMasterCreteriaValue(event, index) {
    this.registrationCretiria[index].type = event.target.value.split('^^^^^')[0];
    this.registrationCretiria[index].options = this.masterRegistrationCreteria[event.target.value.split('^^^^^')[1]].options;
    this.registrationCretiria[index].name = event.target.value.split('^^^^^')[2];
    console.log(this.registrationCretiria[index].options);


  }
  selectMasterItemOption(event, index) {
    this.registrationCretiria[index].value = event.target.value;
  }

  addCourseCreteria() {

  }


  deleteRegistrationCreteria(item) {
    this.registrationCretiria.splice(item, 1);
  }
  saveData() {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertUpdateMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertWhitelistUpdateMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).no
    }).then((result) => {

      if (result.value) {
        console.log(this.grpName);
        console.log(this.registrationCretiria);
        console.log(this.courceCreteria);
        this.entitlementGroupUpsertViewModel.groupName = this.grpName;
        this.entitlementGroupUpsertViewModel.registrationCretiriaLists = this.registrationCretiria;
        this.entitlementGroupUpsertViewModel.courseCretiriaLists = this.courceCreteria;
        this.entitlementGroupUpsertViewModel.createdBy = this.localStorage.get('UserId');
        this.entitlementGroupUpsertViewModel.modifiedBy = this.localStorage.get('UserId');
        this.entitlementGroupUpsertViewModel.eventId = this.eventId;
        console.log(this.entitlementGroupUpsertViewModel);
        this.eventEntitlementService.saveEntitlementGroup(this.entitlementGroupUpsertViewModel).subscribe((res) => {
          if (res.isSuccess) {
            const roomUrl = '/admin/events/rooms/' + this.eventId;
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: new SweetAlertMessage(this.translate).savedSuccessfully,
              icon: 'success',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
            }).then(() => {
              this.router.navigate(['/admin/events/eventgroupentitlement/', this.eventId]);
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
      // this.spinner.hide();
    });
  }

}
