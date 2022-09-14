import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import * as AppUtils from 'src/app/Utils/apputils';


@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(private httpClient: HttpClient) { }

  getSurveyEvents() {
    return this.httpClient.get(AppUtils.Surveys_Base_Url + 'GetSurveyEvents').
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getSurveysQuestionTypes() {
    return this.httpClient.get(AppUtils.Surveys_Base_Url + 'GetSurveyQuestionTypes').
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  saveSurvey(inputCreateSurveyModel: any) {
    return this.httpClient.post(AppUtils.Surveys_Base_Url + 'CreateSurvey', inputCreateSurveyModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getSurveylist(surveyListRequest: any) {
    return this.httpClient.post(AppUtils.Surveys_Base_Url + 'GetSurveyListByEvent', surveyListRequest).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }
  getAllEventLevelSurveyslist(surveyListRequest: any) {
    return this.httpClient.post(AppUtils.Surveys_Base_Url + 'GetEventLevelSurveys', surveyListRequest).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }
  getAllBoothLevelSurveyslist(surveyListRequest: any) {
    return this.httpClient.post(AppUtils.Surveys_Base_Url + 'GetBoothLevelSurveys', surveyListRequest).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  deleteSurvey(inputSurvey: any) {
    return this.httpClient.post(AppUtils.Surveys_Base_Url + 'DeleteSurvey', inputSurvey).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getSurveyDetails(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Surveys_Base_Url + 'GetSurveyDetails', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  updateSurvey(inputCreateSurveyModel: any) {
    return this.httpClient.post(AppUtils.Surveys_Base_Url + 'UpdateSurvey', inputCreateSurveyModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getSurveyResponse(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Surveys_Base_Url + 'GetSurveyResponse', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }


}
