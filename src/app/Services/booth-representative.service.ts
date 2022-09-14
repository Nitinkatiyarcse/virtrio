import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AppUtils from '../Utils/apputils';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoothRepresentativeService {


  constructor(private httpClient: HttpClient) { }

  getRepresentatives(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.BoothRepresentatives_Base_Url + 'GetRepresentatives', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })

      );
  }

  saveBoothRepresentative(inputBoothRepresentativeViewModel: any) {
    return this.httpClient.post(AppUtils.BoothRepresentatives_Base_Url + 'SaveBoothRepresentative', inputBoothRepresentativeViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getRepresentativeDetails(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.BoothRepresentatives_Base_Url + 'GetRepresentativeDetails', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  deleteRepresentative(inputBoothRepresentativeViewModel: any) {
    return this.httpClient.post(AppUtils.BoothRepresentatives_Base_Url + 'DeleteRepresentative', inputBoothRepresentativeViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  uploadBoothRepImage(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.BoothRepresentatives_Base_Url + 'UploadBoothRepImage', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }


  //#region  Event representative

  getEventRepresentatives(getEventRepViewModel: any) {
    return this.httpClient.post(AppUtils.BoothRepresentatives_Base_Url + 'GetEventRepresentatives', getEventRepViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })

      );
  }


  getAllEventRepresentatives(eventUserProperyRequestViewModel: any) {
    return this.httpClient.post(AppUtils.BoothRepresentatives_Base_Url + 'GetAllEventRepresentatives', eventUserProperyRequestViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })

      );
  }



  getEventRepresentativeDetails(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.BoothRepresentatives_Base_Url + 'GetEventRepresentativeDetails', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })

      );
  }

  upsertEventRepresenetative(eventRepresentatives: any) {
    return this.httpClient.post(AppUtils.BoothRepresentatives_Base_Url + 'UpsertEventRepresenetative', eventRepresentatives).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })

      );
  }


  deleteEventRepresntative(eventRepresentatives: any) {
    return this.httpClient.post(AppUtils.BoothRepresentatives_Base_Url + 'DeleteEventRepresntative', eventRepresentatives).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })

      );
  }

  getBoothsByEvents(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.FrontEndBooth_Base_Url + 'GetBoothsByEvents', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })

      );
  }

  updateEventRepresenetativeProfile(profileData:any){
    return this.httpClient.post(AppUtils.BoothRepresentatives_Base_Url + 'UpdateEventRepresenetativeProfile', profileData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })

      );
  }


  uploadRepProfileImage(formdata) {
    return this.httpClient.post(AppUtils.BoothRepresentatives_Base_Url + 'UploadBoothRepImage', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  GetRepresentativeChatqueue(reqData:any){
    return this.httpClient.post(AppUtils.FrontEndRep_Base_Url + 'GetRepresentativeChatqueue', reqData).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
    );
    
  }

  startChatting(reqData:any){
    return this.httpClient.post(AppUtils.FrontEndRep_Base_Url + 'StartChattingWithAttendee', reqData).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
    );
    
  }
  //#endregion
}

