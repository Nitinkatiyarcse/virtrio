import { Component, OnInit, EventEmitter } from '@angular/core';
import { AbstractFormGroupDirective, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { from, BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { LocalStorageService } from 'src/app/Services/local-storage.service';

import { UserManagementService } from 'src/app/Services/user-management.service';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { SweetAlertMessage } from '../../../../../Utils/SweetAlertMessages';
import * as AppUtils from '../../../../../Utils/apputils';
import { AppModule } from 'src/app/app.module';
@Component({
  selector: 'app-user-upsert-partial',
  templateUrl: './user-upsert-partial.component.html',
  styleUrls: ['./user-upsert-partial.component.css']
})
export class UserUpsertPartialComponent implements OnInit {
  userRoles: any[] = [];
  selectedRole = '';
  userData: any[] = [];
  user: any = {};
  AllEvents: any = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  requiredField = false;
  selectedEventsArr: Array<string> = [];
  sweetAlertMessage: any = new SweetAlertMessage(this.translate);
  isUserSuperAdmin = false;
  partialHeader = '';
  SubmitButtonText = '';
  isThereAnyError = false;
  isLoggedInUserSuperAdmin = true;
  usersClient = [];
  getByIdVM: any = {};
  selectedClient = AppUtils.emptyGuid;
  public event: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient,
    private userManagementService: UserManagementService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private location: Location,
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    public router: Router,
    private eventManagementService: EventsManagementService,
    public bsModalRef: BsModalRef,
  ) {
    this.isUserSuperAdmin = false;
    this.sweetAlertMessage = new SweetAlertMessage(translate);
    this.partialHeader = new SweetAlertMessage(this.translate).addUser;
    this.SubmitButtonText = new SweetAlertMessage(this.translate).submitButtonText;
  }


  ngOnInit(): void {
    console.log(this.userData);
    this.getClientList();
    this.GetUsersEvents();
    if (this.userData.length > 0) {
      this.user = this.userData[0];
      this.selectedRole = this.user.userRoleId;
    } else {
      this.user = {};
      this.selectedRole = 'dc23833c-6d29-4015-af97-5f619681da78';
      this.selectedEventsArr = [];
    }
    if (this.user.userId != null) {
      this.partialHeader = new SweetAlertMessage(this.translate).updateUser;
      this.SubmitButtonText = new SweetAlertMessage(this.translate).updateButtonText;
    } else {
      this.partialHeader = new SweetAlertMessage(this.translate).addUser;
      this.SubmitButtonText = new SweetAlertMessage(this.translate).submitButtonText;
    }
    this.dropdownList = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: new SweetAlertMessage(this.translate).selectAllText,
      unSelectAllText: new SweetAlertMessage(this.translate).unSelectAllText,
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: new SweetAlertMessage(this.translate).selectEventText
    };

    this.selectedItems = [
    ];

    this.getAllRoles();
  }


  setClass() {
    if (this.user.userRoleId !== 'dc23833c-6d29-4015-af97-5f619681da78') {
      this.requiredField = true;
      if (this.selectedEventsArr.length > 0) {
        return 'validField';
      } else {
        return 'invalidField';
      }
    } else {
      this.requiredField = false;
      return 'validField';
    }

  }

  getAllRoles() {
    this.userManagementService.GetAllRoles().subscribe((res) => {
      if (res.isSuccess === true) {
        this.userRoles = res.roles;
        // if (this.localStorage.get('Role') === 'EventAdmin') {
        //   this.changeUser('3c52d36d-be03-4c07-a25b-f2e3934563e1');
        // }
        // if (this.localStorage.get('Role') === 'BoothAdmin') {
        //   this.changeUser('24b599b5-0de6-4dfa-9a5b-e589c3d62e4b');
        // }
      }
    });
  }


  changeUser(roleType) {
    if (roleType === 'dc23833c-6d29-4015-af97-5f619681da78') {
      this.isUserSuperAdmin = false;

    } else {
      this.isUserSuperAdmin = true;
    }
    this.user.userRoleId = roleType;
    this.selectedRole = roleType;
  }

  GetUsersEvents() {
    this.spinner.show();
    const currentUser: any = {};
    currentUser.roleName = this.localStorage.get('Role');
    currentUser.userId = this.localStorage.get('UserId');
    this.eventManagementService.getUsersEvents(currentUser).subscribe((res) => {
      if (res.isSuccess === true) {
        const events = res.events;
        this.AllEvents = res.events;
        for (let i = 0; i < this.AllEvents.length; i++) {
          this.dropdownList.push({ item_id: this.AllEvents[i].eventId, item_text: this.AllEvents[i].eventName });
          if (Object.keys(this.user).length !== 0) {
            for (let j = 0; j < this.user.eventIds.length; j++) {
              if (this.user.eventIds[j] === this.AllEvents[i].eventId) {
                this.selectedItems.push({ item_id: this.AllEvents[i].eventId, item_text: this.AllEvents[i].eventName });
                this.selectedEventsArr.push(this.AllEvents[i].eventId);
              }
            }

          }
        }
        if (this.localStorage.get('Role') !== 'SuperAdmin') {
          this.isUserSuperAdmin = true;
          this.selectedRole = this.localStorage.get('RoleId');
          this.isLoggedInUserSuperAdmin = false;
        }
      }
      this.spinner.hide();
    });
  }

  onItemSelect(item: any) {
    this.selectedEventsArr.push(item.item_id);
    if (this.selectedEventsArr.length === 0) {
      this.requiredField = true;
    }
  }

  onSelectAll(items: any) {
    for (let i = 0; i < items.length; i++) {
      if (this.selectedEventsArr.indexOf(items[i].item_id) === -1) {
        this.selectedEventsArr.push(items[i].item_id);
      }
    }
    if (this.selectedEventsArr.length === 0) {
      this.requiredField = true;
    }
  }

  onItemDeSelect(item: any) {
    const index = this.selectedEventsArr.indexOf(item.item_id, 0);
    this.selectedEventsArr.splice(index, 1);
    if (this.selectedEventsArr.length === 0) {
      this.requiredField = true;
    }
  }
  onDeSelectAll(items: any) {
    this.selectedEventsArr = [];
    if (this.selectedEventsArr.length === 0) {
      this.requiredField = true;
    }
  }

  upsertUser() {
    this.isThereAnyError = false;
    this.user.eventIds = this.selectedEventsArr;
    this.user.userRoleId = this.selectedRole;

    const x = this.user;
    if (this.localStorage.get('Role') !== 'SuperAdmin') {
      this.user.createdBy = this.localStorage.get('UserId');
      this.user.modifiedBy = this.localStorage.get('UserId');
      if (this.selectedEventsArr.length <= 0) {
        return;
      }
    }
    // }
    this.spinner.show();
    this.userManagementService.UpsertUser(this.user).subscribe((res) => {
      if (res.isSuccess === true) {

        Swal.fire({
          icon: 'success',
          title: new SweetAlertMessage(this.translate).sweetAlertUserAddedSuccessfullyMessage,
          showConfirmButton: false,
          timer: 1500
        });
        this.bsModalRef.hide();
        this.triggerEvent(res);
      } else {
        this.isThereAnyError = true;
        this.user.errors = res.errors;
      }
      this.spinner.hide();
    });
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  triggerEvent(item: string) {
    this.event.emit({ data: item, res: 200 });
  }

  getClientList() {
    this.getByIdVM.id = this.localStorage.get('UserId');
    this.eventManagementService.getUsersClient(this.getByIdVM).subscribe((res) => {
      if (res.isSuccess) {
        console.log(res);
        this.usersClient = res.clients;
        if (this.user.userId != null) {
          this.selectedClient = AppUtils.emptyGuid;
        }
      }
    });
  }

  getSearEventList(event) {
    const clientId = event.target.value;
    console.log(clientId);
  }

}
