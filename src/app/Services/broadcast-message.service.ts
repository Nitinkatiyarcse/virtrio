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
export class BroadcastMessageService {

  constructor(private httpClient: HttpClient) { }

  getBroadcastMessages(getByIdViewModel:any) {
    return this.httpClient.post(AppUtils.BroadcastMessage_Base_Url + 'GetBroadcastMessages', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  
  getBroadcastMessageDetails(getByIdViewModel:any) {
    return this.httpClient.post(AppUtils.BroadcastMessage_Base_Url + 'GetBroadcastMessageDetails', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  
  upsertBroadcastMessage(broadcastMessage:any) {
    return this.httpClient.post(AppUtils.BroadcastMessage_Base_Url + 'UpsertBroadcastMessage', broadcastMessage).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  deleteBroadcastMessage(broadcastMessage:any) {
    return this.httpClient.post(AppUtils.BroadcastMessage_Base_Url + 'DeleteBroadcastMessage', broadcastMessage).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  stopSendingBroadcastMessage(broadcastMessage:any) {
    return this.httpClient.post(AppUtils.BroadcastMessage_Base_Url + 'StopSendingBroadcastMessage', broadcastMessage).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }
  
  startSendingBroadcastMessage(broadcastMessage:any) {
    return this.httpClient.post(AppUtils.BroadcastMessage_Base_Url + 'StartSendingBroadcastMessage', broadcastMessage).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }
  
}
