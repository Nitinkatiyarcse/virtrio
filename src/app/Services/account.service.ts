import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


import { AccountManagerResponse } from 'src/app/Admin/Models/AccountManagerResponse';
import { UserProfileResponseViewModel } from 'src/app/Admin/Models/UserProfileResponseViewModel';
import { LoginUserViewModel } from 'src/app/Admin/Models/LoginUserViewModel';
import { EmailVerificationViewModel } from 'src/app/Admin/Models/EmailVerificationViewModel';
import { formatDate } from '@angular/common';
import * as AppUtils from 'src/app/Utils/apputils';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  registerUser(user: AccountManagerResponse) {
    return this.httpClient.post(AppUtils.Account_Base_Url + 'Register', user).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  resendEmail(user: AccountManagerResponse) {
    return this.httpClient.post(AppUtils.Account_Base_Url + 'ResendEmail', user).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  verifyEmail(emailVerificationLink: EmailVerificationViewModel) {
    return this.httpClient.post(AppUtils.Account_Base_Url + 'VerifyEmail', emailVerificationLink).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  loginUser(loginUserViewModel: LoginUserViewModel) {
    return this.httpClient.post(AppUtils.Account_Base_Url + 'Login', loginUserViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  loginOTPUser(loginUserViewModel: LoginUserViewModel) {
    return this.httpClient.post(AppUtils.Account_Base_Url + 'LoginOTPUser', loginUserViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getUserProfile(userProfileResponseViewModel: UserProfileResponseViewModel) {
    return this.httpClient.post(AppUtils.Account_Base_Url + 'GetUserProfile', userProfileResponseViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {

          return throwError('something went wrong');
        })
      );
  }

  updateUserProfile(userProfileResponseViewModel: UserProfileResponseViewModel) {
    return this.httpClient.post(AppUtils.Account_Base_Url + 'UpdateUserProfile', userProfileResponseViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  uploadUserProfileImage(formdata) {
    return this.httpClient.post(AppUtils.Account_Base_Url + 'UploadUserProfileImage', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  
}
