import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: any = {};
  isUserRegisterd = false;
  isEmailSentSuccess = false;
  isVerifyEmailPage = false;
  emailVerificationLink: any = {};
  constructor(private http: HttpClient,
    private acountService: AccountService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private location: Location,
    private translate: TranslateService) { }
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') != null) {
      this.isUserRegisterd = false;
      this.isEmailSentSuccess = false;
      this.isVerifyEmailPage = true;
      this.emailVerificationLink.id = this.route.snapshot.paramMap.get('id');
      this.verifyEmail();
    } else {
      this.isUserRegisterd = false;
      this.isEmailSentSuccess = false;
      this.isVerifyEmailPage = false;
    }
  }

  registerUser() {
    // posting data to apis
    this.spinner.show();
    this.user.errors = {};
    this.acountService.registerUser(this.user).subscribe((res) => {
      if (res.isSuccess) {
        this.user.userId = res.userId;
        this.user.email = res.email;
        this.isUserRegisterd = true;
        this.isVerifyEmailPage = false;
      } else {
        this.user.errors = res.errors;
        this.isUserRegisterd = false;
        this.isVerifyEmailPage = false;

      }
      this.spinner.hide();
    });
  }

  resendEmailForSignup() {
    this.spinner.show();
    this.acountService.resendEmail(this.user).subscribe((res) => {
      if (res.isSuccess) {
        this.isEmailSentSuccess = true;
        this.isVerifyEmailPage = false;
      } else {
        this.user.errors = res.errors;
        this.isEmailSentSuccess = false;
        this.isVerifyEmailPage = false;
      }
      this.spinner.hide();
    });
  }

  verifyEmail() {
    this.spinner.show();
    this.acountService.verifyEmail(this.emailVerificationLink).subscribe((res) => {
      this.isUserRegisterd = false;
      this.isEmailSentSuccess = false;
      this.isVerifyEmailPage = true;
      this.spinner.hide();
      this.user = res;
    });
  }
}
