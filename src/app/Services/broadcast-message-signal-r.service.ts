import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Observable, Subject } from 'rxjs';
import {Message} from 'src/app/Interface/message';
import * as AppUtils from 'src/app/Utils/apputils';

@Injectable({
  providedIn: 'root'
})
export class BroadcastMessageSignalRService {
  private message$: Subject<Message>;
  private connection: signalR.HubConnection;
   
  constructor() {
    // this.message$ = new Subject<Message>();
    // this.connection = new signalR.HubConnectionBuilder()
    // .withUrl(AppUtils.NotificationUrl)
    // .build();
    // this.connect();
  }
  private connect() {
    // this.connection.start().catch(err => console.log(err));
    // this.connection.on('SendMessage', (message) => {
    //   this.message$.next(message);
    // });
  }
  // public getMessage(): Observable<Message> {
  //   // return this.message$.asObservable();
  // }
  public disconnect() {
    // this.connection.stop();
  }
 }
