import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import * as AppUtils from 'src/app/Utils/apputils';
import { Helper } from 'src/app/Utils/Helper';
import { ClientService } from 'src/app/Services/client.service';

@Component({
  selector: 'app-superadmin-eventcreate',
  templateUrl: './superadmin-eventcreate.component.html',
  styleUrls: ['./superadmin-eventcreate.component.css']
})
export class SuperadminEventcreateComponent implements OnInit {
  inputSuperAdminEventModel: any = {};
  InvalidDate = false;
  isWCEnabled = false;
  allClients: any;
  searchModel: any = {};
  noOfBooths:any;
  flag = false;
  searchedEventAdmin: any = [];
  isValidEventUrl = false;
  domainUrl = '';
  clientUrlSlug = '';
  projectStartMinDate: any;
  constructor(private http: HttpClient,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private location: Location,
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    public router: Router,
    private eventManagementService: EventsManagementService,
    private langugeService: LanguageService,
    private sweetAlertMessage: SweetAlertMessage,
    private helper: Helper,
    private clientService: ClientService) {
    const dt = new Date();
    this.projectStartMinDate = {
      'year': dt.getFullYear(),
      'month': dt.getMonth() + 1,
      'day': dt.getDate()
    };
    this.domainUrl = AppUtils.EventUrl;
    this.inputSuperAdminEventModel.eventRoomsScreenType = 'Both';
    
    this.getAllClients();
  }
  getAllClients() {
    this.inputSuperAdminEventModel.clientId = '';
    this.clientService.getAllClients().subscribe((res) => {
      if (res.isSuccess) {
        this.allClients = res.clients;
      }
    });
  }



  ngOnInit(): void {
  }


  getSlugUrl(event) {
    this.clientUrlSlug = this.allClients.filter(x => x.clientId === event.target.value)[0].urlSlug;
  }
  searchClient(searchTerm) {
    this.searchModel.searchString = searchTerm;
    this.eventManagementService.searchClient(this.searchModel).subscribe((res) => {
      if (res.isSuccess) {
        this.searchedEventAdmin = res.users;
        console.log(this.searchedEventAdmin);
        this.flag = true;
      } else {
        this.flag = false;
      }
    });
  }



  onselectsearchedEventAdmin(eventAdmin) {
    console.log(eventAdmin);
    this.inputSuperAdminEventModel.eventAdmin = eventAdmin.email;
    this.inputSuperAdminEventModel.eventAdminId = eventAdmin.userId;

    this.flag = false;
    console.log(this.inputSuperAdminEventModel.eventAdminId);
  }

  lookForEventAdmin() {
    if (!this.inputSuperAdminEventModel.eventAdminId) {
      console.log(false);
    } else {
      console.log(true);
    }
    this.flag = false;
  }

  ifWebcastEnabled(e) {
    if (e.target.checked) {
      this.isWCEnabled = true;
      this.inputSuperAdminEventModel.noOfWebcast = 0;
      this.inputSuperAdminEventModel.webcastMaxDuration = 0;

    } else {
      this.isWCEnabled = false;
      this.inputSuperAdminEventModel.noOfWebcast = 0;
      this.inputSuperAdminEventModel.webcastMaxDuration = 0;
    }
  }


  getRoomShowOption(e, type) {
    if (e.target.checked) {
      this.inputSuperAdminEventModel.eventRoomsScreenType = type;
    }
  }

  validateProjectDates() {
    if (this.inputSuperAdminEventModel.projectStartDate != null && this.inputSuperAdminEventModel.projectStartDate == null) {
      return false;
    } else if (this.inputSuperAdminEventModel.projectStartDate == null && this.inputSuperAdminEventModel.projectStartDate != null) {
      this.InvalidDate = true;
    } else {
      if (this.inputSuperAdminEventModel.projectStartDate == null) {
        this.InvalidDate = true;
      } else {
        if (new Date(this.inputSuperAdminEventModel.projectStartDate) > new Date(this.inputSuperAdminEventModel.projectEndDate)) {
          this.InvalidDate = true;
        } else {
          this.InvalidDate = false;
        }
      }
    }
  }

  getEventUrl(e) {
    this.inputSuperAdminEventModel.urlSlug = this.helper.removeSpecialCharacters(e.target.value).substring(0, 15);
    // if (this.inputSuperAdminEventModel.clientId !== '') {
    //   const eventName = e.target.value;
    //   this.inputSuperAdminEventModel.urlSlug = this.helper.removeSpecialCharacters(eventName);
    //   this.inputSuperAdminEventModel.eventUrl = AppUtils.EventUrl + '/' +
    //     this.allClients.filter(x => x.clientId === this.inputSuperAdminEventModel.clientId)[0].urlSlug + '/' +
    //     this.inputSuperAdminEventModel.urlSlug;
    // }
  }

  saveEvent() {
    this.inputSuperAdminEventModel.noOfBooths=0;
    this.inputSuperAdminEventModel.noOfBooths=this.inputSuperAdminEventModel.noOfRooms;
    if (this.clientUrlSlug !== '' && this.inputSuperAdminEventModel.urlSlug !== '') {
      this.inputSuperAdminEventModel.eventUrl = '/' + this.clientUrlSlug + '/' + this.inputSuperAdminEventModel.urlSlug;
      if (this.inputSuperAdminEventModel.eventUrl !== '') {
        this.spinner.show();
        this.eventManagementService.checkValidEventUrl(this.inputSuperAdminEventModel).subscribe((res) => {
          if (res.isSuccess === false) {
            this.inputSuperAdminEventModel.errors = res.errors;
            this.spinner.hide();
            return false;
          } else {
            this.inputSuperAdminEventModel.errors = [];
            this.createEvent();
            this.spinner.hide();
          }
          this.spinner.hide();
        });
      }
    } else {
      this.spinner.show();
      return false;
    }
  }

  // CompareRoomAndBoothValues() {
  //   if (this.inputSuperAdminEventModel.noOfBooths !== '') {
  //     // tslint:disable-next-line:radix
  //     if (parseInt(this.inputSuperAdminEventModel.noOfBooths)
  //       // tslint:disable-next-line:radix
  //       > parseInt(this.inputSuperAdminEventModel.noOfRooms)) {
  //       Swal.fire(
  //         'Invalid no of booth value',
  //         'No of booth can not be greater than no of rooms',
  //         'error'
  //       );
  //       this.inputSuperAdminEventModel.noOfBooths = 0;
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   }
  // }

  createEvent() {
    this.spinner.show();
    console.log(this.inputSuperAdminEventModel);
    //if (this.CompareRoomAndBoothValues()) {
      // save event
      if (this.isWCEnabled &&
        (this.inputSuperAdminEventModel.noOfWebcast === 0 || this.inputSuperAdminEventModel.webcastMaxDuration === 0)) {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: new SweetAlertMessage(this.translate).valuesMustBeGreaterThanZero,
          icon: 'error'
        });
      } else {
        this.inputSuperAdminEventModel.allowWebcast = this.isWCEnabled;
        this.inputSuperAdminEventModel.userId = this.localStorage.get('UserId');
        this.eventManagementService.CreateSuperAdminEvent(this.inputSuperAdminEventModel).subscribe((innerRes) => {
          if (innerRes.isSuccess) {
            this.spinner.hide();
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: new SweetAlertMessage(this.translate).sweetAlertEventAddedSuccessfullyMessage,
              icon: 'success',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
            });
          } else {
            this.spinner.hide();
            Swal.fire(
              new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              innerRes.errors[0],
              'error'
            );
          }
          this.spinner.hide();
          this.router.navigate(['admin/events']);
        });
      }

    }
  //}

  askForExitMessage() {
    if (this.inputSuperAdminEventModel) {

      Swal.fire({
        title: new SweetAlertMessage(this.translate).alert,
        text: new SweetAlertMessage(this.translate).LostyourprogressMessage,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: new SweetAlertMessage(this.translate).yes,
        cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
      }).then((result) => {
        if (result.value) {
          location.href = '/admin/events';
        } else if (result.dismiss === Swal.DismissReason.cancel) {

        }
      });
    }
  }
}
