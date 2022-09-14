import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import * as AppUtils from 'src/app/Utils/apputils';
import { GetByIdViewModel } from 'src/app/Admin/Models/GetByIdViewModel';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClient: HttpClient) { }

  getAllCountry() {
    return this.httpClient.get(AppUtils.Country_Base_Url + 'GetCountry').
    pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
    );
  }

}
