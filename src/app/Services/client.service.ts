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
export class ClientService {

  constructor(private httpClient: HttpClient) { }


  getAllClients() {
    return this.httpClient.post(AppUtils.Clients_Base_Url + 'GetAllClients', {}).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  getClientDetails(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.Clients_Base_Url + 'GetClientDetails', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  deleteClient(clients: any) {
    return this.httpClient.post(AppUtils.Clients_Base_Url + 'DeleteClient', clients).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  upsertClient(clients: any) {
    return this.httpClient.post(AppUtils.Clients_Base_Url + 'UpsertClient', clients).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  uploadOrganizationLogo(formdata) {
    return this.httpClient.post(AppUtils.Clients_Base_Url + 'UploadOrganizationLogo', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getAllClientsByLastModifieddate() {
    return this.httpClient.post(AppUtils.Clients_Base_Url + 'GetAllClientsByLastModifieddate', {}).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

}
