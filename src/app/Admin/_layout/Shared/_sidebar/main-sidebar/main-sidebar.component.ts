import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { AccountService } from 'src/app/Services/account.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';


@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit {

  userFeatures: any = [];
  routeUrl = '';
  roleDisplayName = '';
  headerClass = '';
  constructor(private http: HttpClient,
    private acountService: AccountService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private location: Location,
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    public router: Router) { }

  ngOnInit(): void {
    this.getFeaturesOfUser();
  }

  getFeaturesOfUser() {
   // console.warn(this.localStorage.get('UserFeatures'));
    this.userFeatures = JSON.parse(this.localStorage.get('UserFeatures'));
    // console.warn(this.userFeatures);
    // console.log(this.router.url);
    this.routeUrl = (this.router.url.toLowerCase().includes('users')
      || this.router.url.toLowerCase().includes('/users/'))
      || this.router.url.toLowerCase().includes('profile')
      ? 'users'
      : (this.router.url.toLowerCase().includes('events')
        || this.router.url.toLowerCase().includes('/admin/events/'))
        ? 'events' : '';
        this.roleDisplayName = this.localStorage.get('Role');
        this.headerClass = this.roleDisplayName === 'SuperAdmin' ? 'bg-primary' : this.roleDisplayName === 'EventAdmin' ? 'bg-purple' : 'bg-indigo';
  }
}
