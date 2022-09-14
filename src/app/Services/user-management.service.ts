import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { RolesResponseViewModel } from 'src/app/Admin/Models/RolesResponseViewModel';
import { UserRolesViewModel } from 'src/app/Admin/Models/UserRolesViewModel';
import { UserProfileResponseViewModel } from 'src/app/Admin/Models/UserProfileResponseViewModel';
import { GetByIdViewModel } from 'src/app/Admin/Models/GetByIdViewModel';
import { formatDate } from '@angular/common';
import * as AppUtils from '../Utils/apputils';



@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private httpClient: HttpClient) { }

  GetAllRoles() {
    return this.httpClient.post(AppUtils.UserManagement_Base_Url + 'GetAllRoles', {}).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  GetUserList(userRolesViewModel: UserRolesViewModel) {
    return this.httpClient.post(AppUtils.UserManagement_Base_Url + 'GetUserList', userRolesViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  GetUserDetails(getByIdViewModel: GetByIdViewModel) {
    return this.httpClient.post(AppUtils.UserManagement_Base_Url + 'GetUserDetails', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  UpsertUser(userRolesViewModel: any) {
    return this.httpClient.post(AppUtils.UserManagement_Base_Url + 'UpsertUser', userRolesViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }


  DeleteUser(getByIdViewModel: GetByIdViewModel) {
    return this.httpClient.post(AppUtils.UserManagement_Base_Url + 'DeleteUser', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }
  getUserEventAndRoles(getByIdViewModel: GetByIdViewModel) {
    return this.httpClient.post(AppUtils.UserManagement_Base_Url + 'GetUserEventAndRoles', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  downloadCSV(getByIdViewModel: GetByIdViewModel) {
    return this.httpClient.post(AppUtils.UserManagement_Base_Url + 'downloadCSV',getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

}
