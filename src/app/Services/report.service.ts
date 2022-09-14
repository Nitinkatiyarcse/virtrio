import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import * as AppUtils from 'src/app/Utils/apputils';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient: HttpClient) { }

  getMessagingAnnouncement(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetMessagingAnnouncementReport', getByIdViewModel).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(_error => {
        return throwError('something went wrong');
      })
    );
  }
  getpoll(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetPollReport', getByIdViewModel).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(_error => {
        return throwError('something went wrong');
      })
    );
  }
  getBroadcastmessage(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetBroadcastMessageReport', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(_error => {
          return throwError('something went wrong');
        })
      );
  }
  

  getQuiz(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetQuizReport', getByIdViewModel).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(_error => {
        return throwError('something went wrong');
      })
    );
  }
  getVideowatched(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetVideoWatchedReport', getByIdViewModel).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(_error => {
        return throwError('something went wrong');
      })
    );
  }
  getSocialSharing(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetSocialSharingReport', getByIdViewModel).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(_error => {
        return throwError('something went wrong');
      })
    );
  }
  getOverallattended(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetOverallattendedReport', getByIdViewModel).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(_error => {
        return throwError('something went wrong');
      })
    );
  }
  getClickactions(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetClickactionsReport', getByIdViewModel).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(_error => {
        return throwError('something went wrong');
      })
    );
  }
  getAttendedlive(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetAttendedLiveReport', getByIdViewModel).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(_error => {
        return throwError('something went wrong');
      })
    );
  }
  getInvitation(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetInvitationReport', getByIdViewModel).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(_error => {
        return throwError('something went wrong');
      })
    );
  }

  getInvitefriend(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetInvitefriendReport', getByIdViewModel).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(_error => {
        return throwError('something went wrong');
      })
    );
  }
  
  getWallmessage(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetWallMessageReport', getByIdViewModel).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(_error => {
        return throwError('something went wrong');
      })
    );
  }

  getBannerclicked(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetBannerclicked', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(_error => {
          return throwError('something went wrong');
        })
      );
  }

  getContentConsumption(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetContentConsumptionReportByAttendee', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(_error => {
          return throwError('something went wrong');
        })
      );
  }

  getWebinarAccess(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetWebinarAccess', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(_error => {
          return throwError('something went wrong');
        })
      );
  }

  getTopSpacesReport(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetTopSpacesReport', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(_error => {
          return throwError('something went wrong');
        })
      );
  }

  getTopBoothReport(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetTopBoothReport', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(_error => {
          return throwError('something went wrong');
        })
      );
  }

  getTopDocumentReport(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetTopDocumentReport', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(_error => {
          return throwError('something went wrong');
        })
      );
  }

  getTopWebinarReport(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetTopWebinarReport', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(_error => {
          return throwError('something went wrong');
        })
      );
  }

  getTotalDrationOfRoomReport(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetTotalDrationOfRoomReport', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(_error => {
          return throwError('something went wrong');
        })
      );
  }

  getAttendedOnDemand(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetAttendedOnDemandReport', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(_error => {
          return throwError('something went wrong');
        })
      );
  }

  getMarqueeClickActionsReport(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetMarqueeClickActionsReport', getByIdViewModel).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(_error => {
        return throwError('something went wrong');
      })
    );
  }

  getWebinarAccessReport(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetWebinarAcessReport', getByIdViewModel).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(_error => {
        return throwError('something went wrong');
      })
    );
  }
  
  getRoomEntry(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetRoomEntry', getByIdViewModel).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(_error => {
        return throwError('something went wrong');
      })
    );
  }
  
  getRoomBoothEntryDetails(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Report_Base_Url + 'GetRoomOrBoothEntryDetails', getByIdViewModel).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(_error => {
        return throwError('something went wrong');
      })
    );
  }
  
  
}
