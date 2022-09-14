import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { from, BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { AccountService } from 'src/app/Services/account.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SignalRService } from 'src/app/Services/signal-r.service';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};
  isThereAnyError = false;
  private loggedIn = new BehaviorSubject<boolean>(this.localStorage.get('isLoggedIn') === 'true');
  isLoggedInUser = false;

  constructor(private http: HttpClient, public signalRService: SignalRService,
    private acountService: AccountService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private location: Location,
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    public router: Router) {
    const clientTimezoneOffset = new Date().getTimezoneOffset() / 60;
    console.log(clientTimezoneOffset);
    this.localStorage.removeAllKeys();
  }

  ngOnInit(): void {

    this.user.errors = {};
    // this.signalRService.startConnection();
    // this.signalRService.addTransferChartDataListener();
    // this.startHttpRequest();


  }



  // private startHttpRequest = () => {
  //   this.http.get('https://localhost:44374/api/chart')
  //     .subscribe(res => {
  //       console.log(res);
  //     })
  // }

  // sendData() {
  //   var data = { id: '2ad23bea-8499-48e3-8f11-08d9d43b720d' };
  //   this.http.post('https://localhost:44376/api/notification',data).subscribe((res) => {
  //     console.log(res);
  //   })
  // }


  loginUser() {
    this.spinner.show();
    this.user.errors = {};
    this.acountService.loginUser(this.user).subscribe((res) => {
      if (res.isSuccess) {
        this.user.userId = res.userId;
        this.user.email = res.email;
        this.isLoggedInUser = true;
        this.isThereAnyError = false;
      } else {
        this.isThereAnyError = true;
        this.user.errors = res.errors;
        this.isLoggedInUser = false;
      }
      this.spinner.hide();
    });
  }

  loginOTPUser() {
    this.spinner.show();
    this.user.errors = {};
    this.acountService.loginOTPUser(this.user).subscribe((res) => {
      if (res.isSuccess) {
        this.isThereAnyError = false;
        this.localStorage.saveAllKeys(res);
        this.loggedIn.next(true);
        // this.router.navigate(['users']);
        window.location.href = 'admin/events';

      } else {
        this.isThereAnyError = true;
        this.user.errors = res.errors;
        this.spinner.hide();
      }
    });
  }

  redirectToLogin() {
    location.href = '/login';
  }
}
