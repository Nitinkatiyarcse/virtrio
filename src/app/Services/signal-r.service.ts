import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";  // or from "@microsoft/signalr" if you are using a new library
// import { ChartModel } from '../Interface/ChartModel';
import * as AppUtils from 'src/app/Utils/apputils';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  // public data: ChartModel[];
  private hubConnection: signalR.HubConnection;
  private hubNotificationConnection: signalR.HubConnection;

  /**
   *
   */
  constructor(private http: HttpClient) {

  }

  // public startConnection = () => {
  //   this.hubConnection = new signalR.HubConnectionBuilder()
  //     .withUrl('https://localhost:44374/chart')
  //     .build();
  //   this.hubConnection
  //     .start()
  //     .then(() => console.log('Connection started'))
  //     .catch(err => console.log('Error while starting connection: ' + err))
  // }


  // public addTransferChartDataListener = () => {
  //   this.hubConnection.on('TransferChartData', (data) => {
  //     // this.data = data;
  //     console.log(data);
  //   });
  // }

  public startNotificationConnection = () => {
    this.hubNotificationConnection = new signalR.HubConnectionBuilder()
      .withUrl(AppUtils.NotificationUrl)
      .build();
    this.hubNotificationConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addNotificationDataListener = () => {

    // this.hubNotificationConnection = new signalR.HubConnectionBuilder()
    // .withUrl(AppUtils.NotificationUrl)
    // .build();
    // // this.hubNotificationConnection.on("GetRepMessage", function (data) {
    // //   console.log(data);
    // // });

    // this.hubNotificationConnection.start().then(function () {
    //   this.hubNotificationConnection.invoke("SendMessage", '2ad23bea-8499-48e3-8f11-08d9d43b720d').catch(function (err) {
    //     return console.error(err.toString());
    //   });
    // }).catch(function (err) {
    //   return console.error(err.toString());
    // });
  }

  sendData() {
    // var data = { id: '2ad23bea-8499-48e3-8f11-08d9d43b720d' };
    // this.http.post(AppUtils.NotificationAPIUrl,data).subscribe((res) => {
    //   console.log(res);
    // })
  }

}