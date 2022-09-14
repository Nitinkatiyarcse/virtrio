import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {
  _state;

  get state() {
    return this._state;
  }

  set state(data) {
    this._state = data;
  }

}
