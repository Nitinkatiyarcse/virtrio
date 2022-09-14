import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetterSetterService {
  public eventName: string;
  public tempData: string;
  eventDetails = new EventEmitter<any>();
  loginPageDetails= new EventEmitter<any>();
  constructor() { }

  set setEventName(val: string) {
    this.eventName = val;
  }

  get getEventName(): string {
    return this.eventName;
  }


  set setTempData(val: string) {
    this.tempData = val;
  }

  get getTempData(): string {
    return this.tempData;
  }


}
