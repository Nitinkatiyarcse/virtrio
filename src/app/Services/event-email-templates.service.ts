import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import * as AppUtils from 'src/app/Utils/apputils';

@Injectable({
  providedIn: 'root'
})
export class EventEmailTemplatesService {

  constructor(private httpClient: HttpClient) { }


  getEmailTemplatesTypes() {
    return this.httpClient.get(AppUtils.EventEmailTemplates_Base_Url + 'GetEmailTemplatesTypes').
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }


  getEmailTemplate(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventEmailTemplates_Base_Url + 'GetEventEmailTemplates', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })

      );
  }


  upsertEventEmailTemplate(inputEmailTemplateModel: any) {
    return this.httpClient.post(AppUtils.EventEmailTemplates_Base_Url + 'UpsertEventEmailTemplate', inputEmailTemplateModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  // GetEventEmailTemplateDetails

  getEventEmailTemplateDetails(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventEmailTemplates_Base_Url + 'GetEventEmailTemplateDetails', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }



  // changeEventEmailTemplateStatus( ) {
  //   return this.httpClient.post(AppUtils.EventEmailTemplates_Base_Url + 'ChangeEventEmailTemplateStatus').
  //     pipe(
  //       map((data: any) => {
  //         return data;
  //       }), catchError(error => {
  //         return throwError('something went wrong');
  //       })
  //     );
  // }

  getEventEmailTemplates(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventEmailTemplates_Base_Url + 'GetEventEmailTemplates', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })

      );
  }

  activeInactiveEmailTemplate(inputEmailTemplateModel: any) {
    return this.httpClient.post(AppUtils.EventEmailTemplates_Base_Url + 'ActiveInactiveEmailTemplate', inputEmailTemplateModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getAllUnverifiedEmailAdmins(reqModel: any) {
    return this.httpClient.post(AppUtils.EventEmailTemplates_Base_Url + 'GetAllUnverifiedEmailAdmins', reqModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');

        })
      );
  }

  getAllUnverifiedEmailAttendees(reqModel: any) {
    return this.httpClient.post(AppUtils.EventEmailTemplates_Base_Url + 'GetAllUnverifiedEmailAttendees', reqModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');

        })
      );
  }

  getAllAdminsCompletedProfile(reqModel: any) {
    return this.httpClient.post(AppUtils.EventEmailTemplates_Base_Url + 'GetAllAdminsCompletedProfile', reqModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');

        })
      );
  }


  getAllBoothRepresentatives(reqModel: any) {
    return this.httpClient.post(AppUtils.EventEmailTemplates_Base_Url + 'GetAllBoothRepresentatives', reqModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');

        })
      );
  }

  getAllAttendeesToSendReminder(reqModel: any) {
    return this.httpClient.post(AppUtils.EventEmailTemplates_Base_Url + 'GetAllAttendeesToSendReminder', reqModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');

        })
      );
  }

  getAllEmails(reqModel: any) {
    return this.httpClient.post(AppUtils.EventEmailTemplates_Base_Url + 'GetAllEmails', reqModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');

        })
      );
  }

  sendCustomEmails(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventEmailTemplates_Base_Url + 'SendCustomEmails', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');

        })
      );
  }
}
