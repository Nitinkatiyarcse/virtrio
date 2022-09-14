import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { eventRegistrationSets } from 'src/app/Admin/Models/EventRegistrationSets';
import { events } from 'src/app/Admin/Models/Events';
import { formatDate } from '@angular/common';
import * as AppUtils from '../Utils/apputils';
import { GetByIdViewModel } from 'src/app/Admin/Models/GetByIdViewModel';
import { ManageLoginPageViewModel } from 'src/app/Admin/Models/ManageLoginPageViewModel';
@Injectable({
  providedIn: 'root'
})
export class EventsRegistrationSetsService {

  constructor(private httpClient: HttpClient) { }

  getLandingPageList(lpGetByIdVM: any) {
    return this.httpClient.post(AppUtils.EventRegistrationSet_Base_Url + 'GetLandingPageList', lpGetByIdVM).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }
  getEventRegistrationLoginPage(getByIdViewModel: GetByIdViewModel) {
    return this.httpClient.post(AppUtils.EventRegistrationSet_Base_Url + 'GetEventRegistrationLoginPage', getByIdViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  UpsertEventRegistration(registrationSets: eventRegistrationSets) {
    return this.httpClient.post(AppUtils.EventRegistrationSet_Base_Url + 'UpsertEventRegistration', registrationSets).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  getRegistrationSets(getByIdViewModel: GetByIdViewModel) {
    return this.httpClient.post(AppUtils.EventRegistrationSet_Base_Url + 'GetEventRegistrationSets', getByIdViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  getEventRegistrationSetDetails(getByIdViewModel: GetByIdViewModel) {
    return this.httpClient.post(AppUtils.EventRegistrationSet_Base_Url + 'GetEventRegistrationSetDetails', getByIdViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  deleteEventRegistrationSet(registrationSets: eventRegistrationSets) {
    return this.httpClient.post(AppUtils.EventRegistrationSet_Base_Url + 'DeleteEventRegistration', registrationSets).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  uploadAgendaDocument(formdata) {
    return this.httpClient.post(AppUtils.EventRegistrationSet_Base_Url + 'UploadAgendaDocument', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  uploadloginPageHeaderGraphics(formdata) {
    return this.httpClient.post(AppUtils.EventRegistrationSet_Base_Url + 'UploadloginPageHeaderGraphics', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  uploadLoginSplashimagesFileChange(formdata) {
    return this.httpClient.post(AppUtils.EventRegistrationSet_Base_Url + 'uploadLoginSplashImages', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  uploadIncludeFooterGraphic(formdata) {
    return this.httpClient.post(AppUtils.EventRegistrationSet_Base_Url + 'UploadIncludeFooterGraphic', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  UpsertEventRegistrationLoginPage(formdata: ManageLoginPageViewModel) {
    return this.httpClient.post(AppUtils.EventRegistrationSet_Base_Url + 'UpsertEventRegistrationLoginPage', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getEventRegistrationThankyouPage(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventRegistrationSet_Base_Url + 'GetEventRegistrationThankyouPage', getByIdViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  upsertEventRegistrationThankyouPage(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventRegistrationSet_Base_Url + 'UpsertEventRegistrationThankyouPage', getByIdViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  uploadThankyoupageSplashImages(formData: FormData) {
    return this.httpClient.post(AppUtils.EventRegistrationSet_Base_Url + 'UploadThankyoupageSplashImages', formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  uploadThankyouPageHeaderGraphics(formData: FormData) {
    return this.httpClient.post(AppUtils.EventRegistrationSet_Base_Url + 'UploadThankyouPageHeaderGraphics', formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  upsertEventRegistrationPage(formData: FormData) {
    return this.httpClient.post(AppUtils.EventRegistrationSet_Base_Url + 'UpsertEventRegistrationPage', formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getRegistrationPage(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventRegistrationSet_Base_Url + 'GetRegistrationPage', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  uploadBanner(formdata) {
    return this.httpClient.post(AppUtils.EventRegistrationSet_Base_Url + 'UploadBanner', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getCustomAndStandardFieldsAndValue(getByIdViewModel:any){
    return this.httpClient.post(AppUtils.EventRegistrationSet_Base_Url + 'GetCustomAndStandardFieldsAndValue', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }
}
