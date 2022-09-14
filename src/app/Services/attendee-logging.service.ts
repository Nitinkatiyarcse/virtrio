import * as AppUtils from 'src/app/Utils/apputils';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AttendeeLoggingService {

  constructor(private httpClient: HttpClient) { }

  logAttendeesClickEvents(logModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'LogAttendeeRepActions', logModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  getWebinarViewCount(getByIdViewModel:any){
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'GetWebinarViews', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  getBriefcaseItems(getByIdViewModel:any){
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'GetBriefcaseItems', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  getRoomWiseBriefcaseItems(getByIdViewModel:any){
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'GetRoomWiseBriefcaseItems', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }
}
