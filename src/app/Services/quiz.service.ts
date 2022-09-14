import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import * as AppUtils from 'src/app/Utils/apputils';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private httpClient: HttpClient) { }

  saveQuiz(inputCreateQuizModel: any) {
    return this.httpClient.post(AppUtils.Quiz_Base_Url + 'CreateQuiz', inputCreateQuizModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getQuizlist(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Quiz_Base_Url + 'GetQuizByEvent', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getQuizDetails(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Quiz_Base_Url + 'GetQuizDetails', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  updateQuiz(inputCreateQuizModel: any) {
    return this.httpClient.post(AppUtils.Quiz_Base_Url + 'UpdateQuiz', inputCreateQuizModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  deleteQuiz(inputQuiz: any) {
    return this.httpClient.post(AppUtils.Quiz_Base_Url + 'DeleteQuiz', inputQuiz).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getCertificateTemplates() {
    return this.httpClient.get(AppUtils.Quiz_Base_Url + 'GetCertificateTemplates').
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

}
