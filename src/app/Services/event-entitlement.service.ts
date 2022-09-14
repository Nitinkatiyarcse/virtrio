import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import * as AppUtils from 'src/app/Utils/apputils';

@Injectable({
  providedIn: 'root'
})
export class EventEntitlementService {



  constructor(private httpClient: HttpClient) { }

  getEventEntitlementGroups(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'GetEventEntitlementGroups', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getEventEntitlmentGroupDetails(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'GetEventEntitlmentGroupDetails', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );

  }

  upsertEventEntitlementGroup(inputEntitlementGroupModel: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'UpsertEventEntitlementGroup', inputEntitlementGroupModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  deleteEventEntitlementGroup(groupId: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'DeleteEventEntitlementGroup', groupId).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }


  getEventEntitlements(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'GetEventEntitlements', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getEventEntitlementDetails(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'GetEventEntitlementDetails', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  deleteEventEntitlement(eventEntitlementViewModel: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'DeleteEventEntitlement', eventEntitlementViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  upsertEventEntitlement(eventEntitlementViewModel: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'UpsertEventEntitlement', eventEntitlementViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getEventEntitlementMatrix(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'GetEventEntitlementMatrix', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  updateEventEntitlementMatrix(eventEntitlements: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'UpdateEventEntitlementMatrix', eventEntitlements).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }



  // new entitlement section
  updateWhitelistOrBlacklistStatus(whiteAndBlackList: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'UpdateWhitelistOrBlacklistStatus', whiteAndBlackList).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getWhitelistAndBlackList(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'GetWhitelistAndBlackList', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  addWhitelistItem(whitelistedEmailAndDomainItems: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'AddWhitelistItem', whitelistedEmailAndDomainItems).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  addBlacklistItem(blacklistedEmailAndDomainItems: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'AddBlacklistItem', blacklistedEmailAndDomainItems).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  deleteWhiteListItem(whitelistedEmailAndDomainItems: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'DeleteWhiteListItem', whitelistedEmailAndDomainItems).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  deleteBlackListedItem(blacklistedEmailAndDomainItems: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'DeleteBlackListItem', blacklistedEmailAndDomainItems).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getMasterRegistrationCreteria(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'GetMasterRegistrationCreteria', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }


  saveEntitlementGroup(entitlementGroupUpsertViewModel: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'SaveEntitlementGroup', entitlementGroupUpsertViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getGroupEntitlemts(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'GetGroupEntitlemts', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  deleteGroup(entitlementGroupUpsertViewModel: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'DeleteGroup', entitlementGroupUpsertViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getEventGroupDtails(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url + 'GetEventGroupDtails', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }


  uploadWhitelistedEmailFile(formdata) {
    return this.httpClient.post(AppUtils.EventEntitlement_Base_Url +
      'UploadWhitelistedOrBlacklistedEmailFile', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

}
