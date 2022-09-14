import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  saveAllKeys(res: any) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('token', res.message);
    localStorage.setItem('UserId', res.userId);
    localStorage.setItem('Email', res.email);
    localStorage.setItem('Role', res.role);
    localStorage.setItem('RoleId', res.roleId);
    localStorage.setItem('ProfileImage', res.profileImage);
    localStorage.setItem('Name', res.name);
    localStorage.setItem('RoleDisplayName', res.roleDisplayName);
    localStorage.setItem('IsProfileUpdated', res.isProfileUpdated);
    localStorage.setItem('UserFeatures', res.userFeatures);
    localStorage.setItem('TokenExpiryDate', res.expireDate);

  }

  removeAllKeys() {
    localStorage.removeItem('token');
    localStorage.removeItem('UserId');
    localStorage.removeItem('Email');
    localStorage.removeItem('Role');
    localStorage.removeItem('RoleId');
    localStorage.removeItem('ProfileImage');
    localStorage.removeItem('Name');
    localStorage.removeItem('RoleDisplayName');
    localStorage.removeItem('IsProfileUpdated');
    localStorage.removeItem('UserFeatures');
    localStorage.removeItem('TokenExpiryDate');
    localStorage.removeItem('isLoggedIn');
    localStorage.clear();
  }
}
