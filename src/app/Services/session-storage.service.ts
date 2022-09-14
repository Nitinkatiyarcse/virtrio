import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  set(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  get(key: string) {
    return sessionStorage.getItem(key);
  }

  remove(key: string) {
    sessionStorage.removeItem(key);
  }

  saveAllKeys(res: any) {
    // sessionStorage.setItem('isLoggedIn', 'true');
    // sessionStorage.setItem('token', res.message);
    // sessionStorage.setItem('UserId', res.userId);
    // sessionStorage.setItem('Email', res.email);
    // sessionStorage.setItem('Role', res.role);
    // sessionStorage.setItem('RoleId', res.roleId);
    // sessionStorage.setItem('ProfileImage', res.profileImage);
    // sessionStorage.setItem('Name', res.name);
    // sessionStorage.setItem('RoleDisplayName', res.roleDisplayName);
    // sessionStorage.setItem('IsProfileUpdated', res.isProfileUpdated);
    // sessionStorage.setItem('UserFeatures', res.userFeatures);
    // sessionStorage.setItem('TokenExpiryDate', res.expireDate);

  }

  removeAllKeys() {
    // sessionStorage.removeItem('IsRepresentative');
    // sessionStorage.removeItem('AttendeeId');
    // sessionStorage.removeItem('RepresentativeId');
    // sessionStorage.removeItem('sessionId');
    // sessionStorage.removeItem('MainPageUrl');
    sessionStorage.clear();
  }
}
