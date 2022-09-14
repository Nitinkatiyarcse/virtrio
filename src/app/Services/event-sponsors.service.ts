import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AllEventsResponseViewModel } from 'src/app/Admin/Models/AllEventsResponseViewModel';
import { events } from 'src/app/Admin/Models/Events';
import { formatDate } from '@angular/common';
import * as AppUtils from '../Utils/apputils';
import { GetByIdViewModel } from 'src/app/Admin/Models/GetByIdViewModel';

@Injectable({
  providedIn: 'root'
})
export class EventSponsorsService {


  constructor(private httpClient: HttpClient) { }


  addEventSponsors(sponsorInput: any) {
    return this.httpClient.post(AppUtils.FrontEndEvent_Sponsors_Base_Url + 'AddEventSponsor', sponsorInput).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  uploadSponsorProfileImage(formdata) {
    return this.httpClient.post(AppUtils.FrontEndEvent_Sponsors_Base_Url + 'UploadSponsorProfileImage', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getAllEventSponsors(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.FrontEndEvent_Sponsors_Base_Url + 'GetAllEventSponsors', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  getActiveEventSponsors(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.FrontEndEvent_Sponsors_Base_Url + 'GetActiveEventSponsors', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  changeSponsorsStatus(sponsorInput: any) {
    return this.httpClient.post(AppUtils.FrontEndEvent_Sponsors_Base_Url + 'ChangeSponsorsStatus', sponsorInput).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }



}
