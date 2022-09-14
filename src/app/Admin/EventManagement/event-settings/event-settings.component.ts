import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-settings',
  templateUrl: './event-settings.component.html',
  styleUrls: ['./event-settings.component.css']
})
export class EventSettingsComponent implements OnInit {
  isWCEnabled = false;
  isEnableEditRegistrationInfoAllowed = false;
  inputEventSettingModel: any = {};

  getByIdViewModel: any = {};
  constructor(
    public bsModalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private eventManagementService: EventsManagementService,
    private localStorageServices: LocalStorageService) {

  }
  eventId: any; // = '51513fdc-1781-4ec3-b256-ed294ea81856';
  ngOnInit(): void {
    console.log(this.eventId);
    this.getEventSettings();
  }

  getEventSettings() {
    this.spinner.show();
    this.getByIdViewModel.id = this.eventId;
    this.eventManagementService.getEventSettings(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.inputEventSettingModel = res;
        this.inputEventSettingModel.userId = this.localStorageServices.get('UserId');
        this.inputEventSettingModel.eventId = this.eventId;
        this.isWCEnabled = res.allowWebcast;
      } else {
        // console.log(res.errors);
      }
      this.spinner.hide();
    });
  }



  includeShoweventmenuCheckChanged() {
    this.inputEventSettingModel.showAttenteeCountInEventMenu = !this.inputEventSettingModel.showAttenteeCountInEventMenu;
  }
  includeShowboothmenuCheckChanged() {
    this.inputEventSettingModel.showAttenteeCountInAdminMenu = !this.inputEventSettingModel.showAttenteeCountInAdminMenu;
  }

  ifWebcastEnabled(e) {
    if (e.target.checked) {
      this.isWCEnabled = true;
      this.inputEventSettingModel.allowWebcast = true;

    } else {
      this.isWCEnabled = false;
      this.inputEventSettingModel.allowWebcast = false;
    }
  }

  ifEnableEditRegistrationInfoAllowed(e) {
    if (e.target.checked) {
      this.isEnableEditRegistrationInfoAllowed = true;
      this.inputEventSettingModel.enableEditRegistrationInfoAllowed = true;

    } else {
      this.isEnableEditRegistrationInfoAllowed = false;
      this.inputEventSettingModel.enableEditRegistrationInfoAllowed = false;
    }

  }

  submitForm() {
    console.log(this.inputEventSettingModel);
    this.spinner.show();
    this.eventManagementService.saveEventSettings(this.inputEventSettingModel).subscribe((res) => {
      if (res.isSuccess) {
        const redirectUrl = 'events/details/' + this.eventId;
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).savedSuccessfully,
          icon: 'success'
        }).then(function () {
          location.href = redirectUrl;
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
  closeModal() {
    this.bsModalRef.hide();
  }

}
