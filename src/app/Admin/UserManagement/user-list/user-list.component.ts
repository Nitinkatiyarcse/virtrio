import { Component, OnInit, Input, EventEmitter, Output, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { from } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { UserManagementService } from 'src/app/Services/user-management.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { UserDetailsPartialComponent } from 'src/app/Admin/_layout/Shared/_user/user-details-partial/user-details-partial.component';
import { UserUpsertPartialComponent } from 'src/app/Admin/_layout/Shared/_user/user-upsert-partial/user-upsert-partial.component';
import { GetByIdViewModel } from 'src/app/Admin/Models/GetByIdViewModel';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import * as AppUtils from 'src/app/Utils/apputils';
import { AccountService } from 'src/app/Services/account.service';
import { datepickerAnimation } from 'ngx-bootstrap/datepicker/datepicker-animations';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  csvData: any[];
  Columns: any[];
  inputUserRolesViewModel: any = {};
  outputUserRolesViewModel: [];
  @Input() dataToPassChildComponent: any;

  modalRef: BsModalRef;
  copiedItem: any;
  totalPages: any = 0;
  pageNumber: any = 0;
  isLastPage = false;
  isFirstPage = true;
  NoRecordFoundMessage = false;

  constructor(private http: HttpClient,
    private userManagementService: UserManagementService,
    private accountService: AccountService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private location: Location,
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    public router: Router,
    private modalService: BsModalService,
    private sweetAlertMessage: SweetAlertMessage) {
    this.localStorage.set('isEventSelected', 'false');
  }
  private getByIdVm: any = {};

  ngOnInit(): void {
    this.csvData = [
      { FirstName: 'abc', LastName: 'abc', Email: 'abc@gmail.com', Role: 'gmail.com', Events: 'Events' }
    ]
    this.Columns = [
      { feild: 'FirstName', Header: 'FirstName' },
      { feild: 'LastName', Header: 'LastName' },
      { feild: 'Email', Header: 'Email' },
      { feild: 'Role', Header: 'Role' },
      { feild: 'Events', Header: 'Events' },
    ]
    this.inputUserRolesViewModel.searchString = '';
    this.inputUserRolesViewModel.sortString = '';
    this.inputUserRolesViewModel.filterString = '';
    this.inputUserRolesViewModel.pageSize = AppUtils.pageSize;
    this.inputUserRolesViewModel.pageNo = 1;
    this.pageNumber = 1;
    this.getUserList();
  }

  getUserList() {
    this.spinner.show();
    this.inputUserRolesViewModel.UserRoleName = this.localStorage.get('Role');
    this.inputUserRolesViewModel.UserId = this.localStorage.get('UserId');
    this.inputUserRolesViewModel.pageNo = this.pageNumber;
    this.userManagementService.GetUserList(this.inputUserRolesViewModel).subscribe((res) => {
      if (res.isSuccess) {
        if (res.message !== 'NoRecordFound') {
          this.NoRecordFoundMessage = false;
          this.totalPages = res.totalPages;


          if (this.pageNumber === this.totalPages && (this.totalPages === 1 && this.pageNumber === 1)) {
            this.isLastPage = true;
            this.isFirstPage = true;
          } else if (this.pageNumber !== 1 && this.pageNumber !== this.totalPages) {
            this.isLastPage = false;
            this.isFirstPage = false;
          } else if (this.pageNumber === this.totalPages) {
            this.isLastPage = true;
            this.isFirstPage = false;
          } else {
            this.isLastPage = false;
            this.isFirstPage = true;
          }

          this.outputUserRolesViewModel = res.userRolesViewModelList;
          console.log(this.outputUserRolesViewModel);
        } else {
          this.NoRecordFoundMessage = true;
        }
        this.spinner.hide();
      }

    });
  }

  openUserDetailsPopup(template: TemplateRef<any>, user) {
    // get user details and his event details
    this.spinner.show();
    const getByIdViewModel: any = {};
    getByIdViewModel.id = user.userId;
    console.log(getByIdViewModel);
    this.userManagementService.getUserEventAndRoles(getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        user.eventData = res.eventUserRoleMap;
      } else {
        user.eventData = [];
      }
      console.log(user);
      const initialState = {
        list: [
          user
        ]
      };
      this.dataToPassChildComponent = user;
      console.log(this.dataToPassChildComponent);
      this.spinner.hide();
      this.modalRef = this.modalService.show(UserDetailsPartialComponent, { initialState });
      this.modalRef.content.closeBtnName = 'Close';
    });

  }

  openUpdateUserPopup(template: TemplateRef<any>, userData) {
    const copiedItem = Object.assign({}, this.copiedItem, userData);

    const initialState = {
      userData: [
        copiedItem
      ]
    };

    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
    };

    const modalParams = Object.assign({}, modalConfig, { initialState, class: 'modal-lg' });


    this.dataToPassChildComponent = userData;
    console.log(this.dataToPassChildComponent);
    this.modalRef = this.modalService.show(UserUpsertPartialComponent, modalParams);
    this.modalRef.content.event.subscribe(res => {
      this.getUserList();
    });
  }

  openAddUserPopup() {
    const initialState = {
    };
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard:false,
    };
    const modalParams = Object.assign({}, modalConfig, { initialState, class: 'modal-lg', backdrop: 'static',keyboard:false });
    this.modalRef = this.modalService.show(UserUpsertPartialComponent, modalParams);
    this.modalRef.content.event.subscribe(res => {
      this.getUserList();
    });
  }

  DeleteUser(userId) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.value) {
        this.getByIdVm.id = userId;
        this.userManagementService.DeleteUser(this.getByIdVm).subscribe((res) => {
          if (res.isSuccess) {
            this.getUserList();
            Swal.fire(
              new SweetAlertMessage(this.translate).sweetalertDeletedHeader,
              new SweetAlertMessage(this.translate).sweetAlertDeletedSuccessMessage,
              'success'
            );
          } else {
            Swal.fire(
              new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              new SweetAlertMessage(this.translate).sweetAlertSomeErrorOccuredErrorMessage,
              'error'
            );
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }


  getPrevPage() {
    this.pageNumber = this.pageNumber - 1;
    this.getUserList();
  }

  getNextPage() {
    this.pageNumber = this.pageNumber + 1;
    this.getUserList();
  }

  getSearchedList() {
    this.pageNumber = 1;
    this.getUserList();
  }

  resendVerificataionEmail(user: any) {
    this.spinner.show();
    const accountViewModel: any = {};
    accountViewModel.email = user.email;
    accountViewModel.userId = user.userId;
    this.accountService.resendEmail(accountViewModel).subscribe((res) => {
      if (res.isSuccess) {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).emailSentSuccessfully,
          icon: 'success'
        });
      } else {
        Swal.fire(
          new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          new SweetAlertMessage(this.translate).errorInSendingEmail,
          'error'
        );
      }
      this.spinner.hide();
    });
  }


  exportCSV() {
    const header = []
    this.Columns.forEach(SelectedColumn => {
      header.push(SelectedColumn.feild);
    })
    this.downloadFile(this.csvData, 'CSVFILE', header);
    const getByIdViewModel: any = {};
    this.userManagementService.downloadCSV(getByIdViewModel).subscribe((res) => {
      this.csvData = res.UserCSVDataModel
      console.log(this.csvData);
    });
  }
  downloadFile(result, filename, header) {
    const today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + '_' + time;
    const csvData = this.convertToCSV(result, header);
    const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    const dwldLink = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const isSafariBrowser = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Crome') === -1;
    if (isSafariBrowser) {
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename + '-' + dateTime + '.csv');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }
  convertToCSV(objArray, headerlist) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';
    for (const index in headerlist) {
      row += headerlist[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + i) + '';
      for (const index in headerlist) {
        const head = headerlist[index];
        line += ',' + array[i][head];
      }
      str += line + '\r\n'
    }

    return str;
  }
}



