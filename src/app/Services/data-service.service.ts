import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  cartData = new EventEmitter<any>();
  eventId = new EventEmitter<any>();
  thisLocationAttendeeCountData = new EventEmitter<any>();
  openChatPopup = new EventEmitter<any>();
  linkToOneToOneChatPopup = new EventEmitter<any>();
  allowFullScreen = new EventEmitter<any>();
  openWelcomeVideo = new EventEmitter<any>();
}