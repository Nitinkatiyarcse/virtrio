import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { AccountService } from 'src/app/Services/account.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { LanguageService } from 'src/app/Services/language.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { Helper } from 'src/app/Utils/Helper';
import { CountryService } from 'src/app/Services/country.service';
import * as AppUtils from 'src/app/Utils/apputils';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any = {};
  isProfileImageExists = false;
  isProfileUpdated = false;
  sweetAlertSuccessHeader = '';
  sweetAlertSuccessMessage = '';
  sweetAlertErrorHeader = '';
  sweetAlertErrorMessage = '';
  sweetAlertConfirmButtonText = '';
  isEmailUpdate = false;
  existingEmailAddress = '';
  public toggleButton = true;
  isProfileImageAvailable = false;
  countryList: any = [];

  constructor(private http: HttpClient,
    private acountService: AccountService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private location: Location,
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    public router: Router,
    private language: LanguageService,
    private countryService: CountryService,
    private helper: Helper) {
    this.localStorage.set('isEventSelected', 'false');
    this.sweetAlertSuccessHeader = new SweetAlertMessage(this.translate).success;

    this.sweetAlertSuccessMessage = new SweetAlertMessage(this.translate).sweetAlertSuccessMessage;
    this.sweetAlertErrorHeader = new SweetAlertMessage(this.translate).sweetAlertErrorHeader;
    this.sweetAlertConfirmButtonText = new SweetAlertMessage(this.translate).sweetAlertOkButtonText;

  }

  ngOnInit(): void {
    this.isProfileUpdated = false;
    this.getCountry();
    this.getUserProfile();
    // this.toggleButton= false;
  }

  getCountry() {
    this.spinner.show();
    this.countryService.getAllCountry().subscribe((res) => {
      this.countryList = res;
    });
  }

  getUserProfile() {
    this.spinner.show();
    this.user.UserId = this.localStorage.get('UserId');
    this.acountService.getUserProfile(this.user).subscribe((res) => {
      this.user = res;
      this.existingEmailAddress = this.user.email;
      const d = this.user.mobileNo;
      this.user.mobileNo = d.substr(d.length - 10);
      this.user.countryCode = d.slice(0, (d.length - 10));
      this.localStorage.set('IsProfileUpdated', this.user.isProfileUpdated);
      if (this.user.userImage != null) {
        if ((this.user.userImage) !== '') {
          this.isProfileImageExists = true;
          this.isProfileImageAvailable = true;
        } else {
          this.isProfileImageAvailable = false;
        }
      }
      if (this.user.isProfileUpdated) {
        this.isProfileUpdated = true;
      } else {
        this.isProfileUpdated = false;
        this.user.countryCode = '';
      }
      this.spinner.hide();

    });
  }

  updateUserProfile() {
    // console.log(this.user);
    this.spinner.show();
    if (this.user.email !== this.existingEmailAddress) {
      this.user.isEmailUpdated = true;
    }
    this.user.eventId = AppUtils.emptyGuid; //this.localStorage.get('EventId');
    this.user.mobileNo = this.user.countryCode + this.user.mobileNo;
    this.acountService.updateUserProfile(this.user).subscribe((res) => {
      if (res.isSuccess) {
        if (this.user.isEmailUpdated) {
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
            text: new SweetAlertMessage(this.translate).pleaseVerifYourEmail,
            icon: 'success',
            confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
          }).then(function () {
            location.href = '/login';
          });
        } else {
          this.localStorage.set('ProfileImage', this.user.userImage);
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
            text: new SweetAlertMessage(this.translate).sweetAlertSuccessMessage,
            icon: 'success',
            confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
          });
          this.user = res;
        }
      } else {
        Swal.fire(
          new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          res.message,
          'error'
        );
      }
      this.spinner.hide();
      this.getUserProfile();
    });
  }

  onFileChange(event) {
    this.spinner.show();
    if (event.target.files.length > 0) {
      // upload file to server
      const fileList: FileList = event.target.files;
      const file: File = fileList[0];
      if (fileList.length > 0) {
        if (this.helper.validateImageFile(file.name)) {
          // if (this.helper.validateBannerAndProfilePicImageSize(file, 'logo')) {
          const formData: FormData = new FormData();
          formData.append('uploadFile', file, file.name);
          this.acountService.uploadUserProfileImage(formData).subscribe((res) => {
            if (res.isSuccess) {
              this.isProfileImageAvailable = true;
              this.user.userImage = res.message;
            }
            this.isProfileImageExists = true;
            this.spinner.hide();
          });
          // } else {
          //   this.spinner.hide();
          //   Swal.fire({
          //     title: new SweetAlertMessage(this.translate).invalidFileType,
          //     text: new SweetAlertMessage(this.translate).imageSizeShouldNotMoreThan200,
          //     icon: 'error'
          //   });
          //   event.target.value = '';
          // }
        } else {
          this.spinner.hide();
          Swal.fire({
            title: new SweetAlertMessage(this.translate).invalidFileType,
            text: new SweetAlertMessage(this.translate).onlypngjpgandjpegareallowed,
            icon: 'error'
          });
        }
      } else {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).invalidFileType,
          text: new SweetAlertMessage(this.translate).pleaseSelectValidFile,
          icon: 'error'
        });
      }
    } else {
      this.spinner.hide();
    }
  }



  enable() {
    this.toggleButton = false;
    this.isEmailUpdate = true;
  }

  disable() {
    this.toggleButton = true;
    this.isEmailUpdate = false;
  }
  deleteImage() {
    this.isProfileImageAvailable = false;
    this.user.userImage = '';
  }

}
