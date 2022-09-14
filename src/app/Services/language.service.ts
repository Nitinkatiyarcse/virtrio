import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as AppUtils from '../Utils/apputils';
import { GetByIdViewModel } from 'src/app/Admin/Models/GetByIdViewModel';



@Injectable({
  providedIn: 'root'
})
export class LanguageService {


  constructor(private httpClient: HttpClient, public translate: TranslateService) { }

  getAvailableLanguages() {
    return this.httpClient.get(AppUtils.Account_Base_Url + 'GetAvailableLanguages').
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getLanguagesByEventId(getByIdViewModel: GetByIdViewModel) {
    return this.httpClient.post(AppUtils.Account_Base_Url + 'GetLanguagesByEvent', getByIdViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

}
