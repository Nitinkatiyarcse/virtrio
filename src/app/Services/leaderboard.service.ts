import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import * as AppUtils from '../Utils/apputils';
import { GetByIdViewModel } from 'src/app/Admin/Models/GetByIdViewModel';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private httpClient: HttpClient) { }

  getAdminLeaderBoard(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.AdminLeaderboard_Base_Url + 'GetAdminLeaderBoard', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  upsertLeaderBoard(adminLeaderboardViewModel: any) {
    return this.httpClient.post(AppUtils.AdminLeaderboard_Base_Url + 'UpsertLeaderBoard', adminLeaderboardViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  deleteLeaderBoard(adminLeaderboard: any) {
    return this.httpClient.post(AppUtils.AdminLeaderboard_Base_Url + 'DeleteLeaderBoard', adminLeaderboard).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  getLeaderboardSchedule(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.AdminLeaderboard_Base_Url + 'GetLeaderboardSchedule', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  upsertLeaderboardSchedule(adminLeaderboardSchedule: any) {
    return this.httpClient.post(AppUtils.AdminLeaderboard_Base_Url + 'UpsertLeaderboardSchedule', adminLeaderboardSchedule).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  deleteLeaderboardSchedule(adminLeaderboardSchedule: any) {
    return this.httpClient.post(AppUtils.AdminLeaderboard_Base_Url + 'DeleteLeaderboardSchedule', adminLeaderboardSchedule).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  getLeaderBoardBadges(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.AdminLeaderboard_Base_Url + 'GetLeaderBoardBadges', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  upsertLeaderBoardBadges(adminLeaderboardBadges: any) {
    return this.httpClient.post(AppUtils.AdminLeaderboard_Base_Url + 'UpsertLeaderBoardBadges', adminLeaderboardBadges).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  deleteLeaderBoardBadges(badges: any) {
    return this.httpClient.post(AppUtils.AdminLeaderboard_Base_Url + 'DeleteLeaderBoardBadges', badges).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  getLeaderboardBadgeRules(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.AdminLeaderboard_Base_Url + 'GetLeaderboardBadgeRules', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  upsertBadgesRules(badgesQualificationRules: any) {
    return this.httpClient.post(AppUtils.AdminLeaderboard_Base_Url + 'UpsertBadgesRules', badgesQualificationRules).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  deleteBadgesRule(rule: any) {
    return this.httpClient.post(AppUtils.AdminLeaderboard_Base_Url + 'DeleteBadgesRule', rule).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  uploadBadgeImage(formdata) {
    return this.httpClient.post(AppUtils.AdminLeaderboard_Base_Url + 'UploadBadgeIcons', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getLeaderboardActivity()
  {
    return this.httpClient.get(AppUtils.AdminLeaderboard_Base_Url+ 'GetLeaderboardActivy').
    pipe(
      map((data:any)=>{
        return data;
      }),catchError(error=>{
        return throwError('something went wrong');
      })
    );
  }


  
}
