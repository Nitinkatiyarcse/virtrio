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
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private http: HttpClient,
    private acountService: AccountService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private location: Location,
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    public router: Router) { }

  ngOnInit(): void {
    this.spinner.show();
    if (this.localStorage.get('token') == null) {
      this.router.navigate(['login']);

    } else {
      if (!this.localStorage.get('IsProfileUpdated')) {
        this.router.navigate(['admin/profile']);
      } else {
        this.getUserList();
      }
    }
    this.spinner.hide();
  }

  getUserList() {
    console.warn('this is user list page');
  }
}
