import 'jquery';
declare var $: any;
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/Services/account.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  constructor(private http: HttpClient,
    private acountService: AccountService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private location: Location,
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    public router: Router) { }

  roleDisplayName = '';
  roleHeaderName = '';
  name = '';
  profileImage = '';
  headerClass = '';

  ngOnInit(): void {
    this.roleDisplayName = this.localStorage.get('Role');
    if (this.roleDisplayName !== '') {
      this.name = this.localStorage.get('Name');
      this.profileImage =
        this.localStorage.get('ProfileImage') === 'null'
          ? '../../../../../assets/Images/NoImage.png'
          : this.localStorage.get('ProfileImage');
      this.headerClass = this.roleDisplayName === 'SuperAdmin' ? 'bg-primary' : this.roleDisplayName === 'EventAdmin' ? 'bg-purple' : 'bg-indigo';
      this.roleHeaderName = this.roleDisplayName === 'SuperAdmin' ? 'SuperAdminConsole' : this.roleDisplayName === 'EventAdmin' ? 'EventAdminConsole' : this.roleDisplayName === 'BoothAdmin' ? 'BoothAdminConsole' : '';
      if (this.roleHeaderName == '') {
        location.href = '/login';
      }
    } else {
      location.href = '/login';
    }

  }

  logoutUser() {
    // this.localStorage.removeAllKeys();
    window.location.href = '/admin/login';
  }

  clickSidebar() {
    const targetElm = '#app';
    const targetClass = 'app-sidebar-minified';

    if ($(targetElm).hasClass(targetClass)) {
      $(targetElm).removeClass(targetClass);
      localStorage.removeItem('appSidebarMinified');
    } else {
      $(targetElm).addClass(targetClass);
      localStorage.setItem('appSidebarMinified', 'true');
    }
  }



}
