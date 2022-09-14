import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import * as AppUtils from 'src/app/Utils/apputils';

@Injectable({
  providedIn: 'root'
})
export class PollsService {

  constructor(private httpClient: HttpClient) { }



  getPollsQuestionTypes() {
    return this.httpClient.get(AppUtils.Polls_Base_Url + 'GetPollsQuestionTypes').
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  savePoll(inputCreatePollModel: any) {
    return this.httpClient.post(AppUtils.Polls_Base_Url + 'CreatePolls', inputCreatePollModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getPollslist(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Polls_Base_Url + 'GetPollsListByEvent', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getAllPollslist(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Polls_Base_Url + 'GetAllPollsListByEvent', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  deletePoll(inputPoll: any) {
    return this.httpClient.post(AppUtils.Polls_Base_Url + 'DeletePoll', inputPoll).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }



  getPollDetails(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Polls_Base_Url + 'GetPollDetails', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  updatePoll(inputCreatePollModel: any) {
    return this.httpClient.post(AppUtils.Polls_Base_Url + 'UpdatePoll', inputCreatePollModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

}
