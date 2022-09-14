import { ElementRef, Input, ViewChild } from '@angular/core';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { EventsRegistrationSetsService } from 'src/app/Services/events-registration-sets.service';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Modal } from 'bootstrap';
import { HttpClient } from '@angular/common/http';
import { from, BehaviorSubject } from 'rxjs';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';

import { ActivatedRoute, Router, CanActivate, NavigationEnd, Event } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { SocialAuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider } from 'angularx-social-login';
import { CountryService } from 'src/app/Services/country.service';
import { Helper } from 'src/app/Utils/Helper';
import { CometChat } from '@cometchat-pro/chat';
import { COMETCHAT_CONSTANTS } from 'src/CONSTS';
import { isTemplateMiddle } from 'typescript';
@Component({
  selector: 'app-register-partial',
  templateUrl: './register-partial.component.html',
  styleUrls: ['./register-partial.component.css']
})
export class RegisterPartialComponent implements OnInit {

  @ViewChild('FileUploadControl', { static: false })
  myInputVariable: ElementRef;

  eventId: string;
  clientName: string;
  eventName: string;
  registrationSetName: string;
  registrationSetId: string;
  customFields: any;
  standardFields: any;
  registrationPageId: any;
  eventOriginalName: any;
  eventDetails: any;
  eventRegistrationSet: any;
  registrationModel: any = {};
  socialUser: SocialUser;
  isLoggedin: boolean;
  countryList: any = [];
  selectedCountry = '';
  todayDate: any;
  isfuturedateModal:boolean=false;
  IsCheckAgreeTermsConditions = false;
  constructor(public bsModalRef: BsModalRef,
    private eventRegistrationSetService: EventsRegistrationSetsService,
    private socialAuthService: SocialAuthService,
    private sessionStorageService: SessionStorageService,
    private getterSetterService: GetterSetterService,
    public router: Router, public helper: Helper,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private attendeeService: AttendeesService,
    private countryService: CountryService) {
    this.registrationModel.registeredFrom = 'local';
    const maxDate = new Date();
    this.todayDate = {
      'year': maxDate.getFullYear(),
      'month': maxDate.getMonth() + 1,
      'day': maxDate.getDate()
    };
    this.registrationModel.resumeLink = '';

  }

  ngOnInit(): void {
    // const videoelement = document.getElementById('futureDateModal') as HTMLElement;
    // this.futuredateModal = new Modal(videoelement, { backdrop: 'static', keyboard: false });
    // console.log(this.clientName);
    // console.log(this.eventName);
    // console.log(this.registrationSetName);
    this.getCountry();
    this.bindRegistrationForm();


    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      // console.log(this.socialUser);
      this.registrationModel.registeredFrom = this.socialUser.provider;
      this.registrationModel.firstName = this.socialUser.firstName;
      this.registrationModel.LastName = this.socialUser.lastName;
      this.registrationModel.EmailAddress = this.socialUser.email;
      this.registrationModel.ProfileImage = this.socialUser.photoUrl;
      this.submitRegisterForm();
    });
  }

  getCountry() {

    this.countryService.getAllCountry().subscribe((res) => {
      this.countryList = res;

    });

  }

  closeModal() {
    this.bsModalRef.hide();
  }

  bindRegistrationForm() {
    // this.spinner.show();
    const getAttendeeRegistrationPageModel: any = {};
    getAttendeeRegistrationPageModel.clientName = this.clientName;
    getAttendeeRegistrationPageModel.eventName = this.eventName;
    getAttendeeRegistrationPageModel.registrationSetName = this.registrationSetName;
    this.attendeeService.getRegistrationPage(getAttendeeRegistrationPageModel).subscribe((res) => {
      if (res.isSuccess) {
         console.log(res);
        this.registrationModel = res;
        var regStartDate = this.helper.combineDateAndTime(this.helper.convertDateToLocalTimezone(new Date(this.registrationModel.registrationStartDate)), this.helper.convertDateToLocalTimezone(new Date(this.registrationModel.registrationStartTime)));

        var regEndDate = this.helper.combineDateAndTime(this.helper.convertDateToLocalTimezone(new Date(this.registrationModel.registrationEndDate)), this.helper.convertDateToLocalTimezone(new Date(this.registrationModel.registrationEndTime)));

        if (new Date() > regStartDate && new Date() < regEndDate) {
          //alert("Testing Message");
          this.getNotFuturedateModel();
        } else {
          //alert("Testing Messagezzzzzzzzzzzzzzz")
          this.getFuturedateModel();

        }
        this.registrationModel.clientUrlSlug = this.clientName;
        this.registrationModel.eventUrlSlug = this.eventName;
        this.registrationModel.registrationSetUrlSlug = this.registrationSetName;
        this.eventId = res.eventId;
        // this.spinner.hide();
      } else {
        this.router.navigate(['/404Error']);
      }
    });
  }

  submitRegisterForm() {
    // console.log(this.registrationModel);
    this.spinner.show();
    if (this.IsCheckAgreeTermsConditions) {
      if (this.registrationModel.registeredFrom === undefined) {
        this.registrationModel.registeredFrom = 'local';
      }
      this.attendeeService.registerEventAttendee(this.registrationModel).subscribe((res) => {
        if (res.isSuccess) {
          Swal.fire({
            title: new SweetAlertMessage(this.translate).success,
            text: this.registrationModel.registeredFrom
              ? new SweetAlertMessage(this.translate).pleaseVerifYourEmail
              : new SweetAlertMessage(this.translate).registrationSuccessfullAndWeAreReviewing,
            icon: 'success'
          }).then(() => {
            // setting up user as attendee in chat
            // register a new chat user
            const evntId: any = this.eventId;
            const uid = res.attendeeId;//evntId.replaceAll('-', '') + '_' + attendeeItem.attendeeId.replaceAll('-', '');
            // console.log(uid);
            const user = new CometChat.User(uid);
            user.setName(res.firstName + ' ' + res.lastName);
            user.setRole('attendee');

            CometChat.createUser(user, COMETCHAT_CONSTANTS.AUTH_KEY).then(createdUser => {
              // console.log('user created', createdUser);
              // redirect to thankyou page

              this.eventDetails = res.event;
              this.eventRegistrationSet = res.eventRegistrationSets;
              this.sessionStorageService.set('attendeeEmail', this.registrationModel.emailAddress);
              location.href = this.clientName + '/' + this.eventName + '/' + this.registrationSetName + '/thankyou';
            }, error => {
              // console.log('error', error);
              // redirect to thankyou page

              this.eventDetails = res.event;
              this.eventRegistrationSet = res.eventRegistrationSets;
              this.sessionStorageService.set('attendeeEmail', this.registrationModel.emailAddress);
              location.href = this.clientName + '/' + this.eventName + '/' + this.registrationSetName + '/thankyou';
            });




          });
        } else {
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
            text: res.message,
            icon: 'error'
          }).then(() => {
            // location.href = '/admin/clients';
          });
        }
        this.spinner.hide();
      });
    } else {
      this.spinner.hide();
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: new SweetAlertMessage(this.translate).pleaseAcceptTermsAndConditions,
        icon: 'error'
      }).then(() => {
        // location.href = '/admin/clients';
      });
    }

  }

  bindItemValue(ketItem, event) {
    ketItem.value = event.target.value;
  }

  bindRadioButtonItemValue(keyItem, event) {
    if (event.target.checked) {
      keyItem.value = event.target.value;
    }
  }

  bindCheckboxItemValue(keyItem, event) {
    if (event.target.checked) {
      if (keyItem.arrayValue != null) {
        keyItem.arrayValue.push(event.target.value);
      } else {
        keyItem.arrayValue = [];
        keyItem.arrayValue.push(event.target.value);
      }
    } else {
      keyItem.arrayValue.splice(event.target.value, 1);
    }
  }

  submitLogin() {
    // console.log('submit login to facebook');
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

  }
  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);

  }
  // signInWithLinkedIn(): void {
  //   this.socialAuthService.signIn(this.signInWithLinkedIn..PROVIDER_ID);

  // }
  logOut(): void {
    this.socialAuthService.signOut();
  }

  goBackToMainPage() {
    location.href = '/' + this.clientName + '/' + this.eventName + '/' + this.registrationSetName;
  }
  checkAgreeTermsConditions(event) {
    if (event.target.checked) {
      this.IsCheckAgreeTermsConditions = true;
    } else {
      this.IsCheckAgreeTermsConditions = false;
    }
  }

  onFileChange(event, item: any) {
    if (this.registrationModel.firstName === '' || this.registrationModel.firstName === undefined || this.registrationModel.firstName === null) {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: 'Please provide first name', // new SweetAlertMessage(this.translate).pleaseProvideFirstName,
        icon: 'error'
      });
      this.myInputVariable.nativeElement.value = '';
    } else if (this.registrationModel.lastName === '' || this.registrationModel.lastName === undefined || this.registrationModel.lastName === null) {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: 'Please provide last name',// new SweetAlertMessage(this.translate).pleaseProvideLastName,
        icon: 'error'
      });
      this.myInputVariable.nativeElement.value = '';

    }
    else {
      this.spinner.show();
      if (event.target.files.length > 0) {
        // upload file to server
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
          const file: File = fileList[0];
          const formData: FormData = new FormData();
          if (this.helper.validateDocFile(file.name)) {
            // formData.append('uploadFile', file, file.name);
            const ext = file.name.substring(file.name.lastIndexOf('.') + 1);
            formData.append('uploadFile', file, this.registrationModel.firstName + '_' + this.registrationModel.lastName + '_.' + ext.toLowerCase());
            this.attendeeService.uploadResume(formData).subscribe((res) => {
              if (res.isSuccess) {
                this.registrationModel.resumeLink = res.message;
                item.value = res.message;
              }
              this.spinner.hide();
            });
          } else {
            this.spinner.hide();
            Swal.fire({
              title: new SweetAlertMessage(this.translate).invalidFileType,
              text: new SweetAlertMessage(this.translate).onlyPdfAreAllowed,
              icon: 'error'
            });
            this.myInputVariable.nativeElement.value = '';
            item.value = "";

          }
        }

      } else {
        this.myInputVariable.nativeElement.value = '';
        item.value = "";
        this.spinner.hide();
      }
    }


  }

  deleteResume(item: any) {
    this.registrationModel.resumeLink = '';
    item.value = "";


  }




  onProfilePicFileChange(event, item: any) {
    if (this.registrationModel.firstName === '' || this.registrationModel.firstName === undefined || this.registrationModel.firstName === null) {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: 'Please provide first name', // new SweetAlertMessage(this.translate).pleaseProvideFirstName,
        icon: 'error'
      });
      this.myInputVariable.nativeElement.value = '';
    } else if (this.registrationModel.lastName === '' || this.registrationModel.lastName === undefined || this.registrationModel.lastName === null) {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: 'Please provide last name',// new SweetAlertMessage(this.translate).pleaseProvideLastName,
        icon: 'error'
      });
      this.myInputVariable.nativeElement.value = '';

    }
    else {
      this.spinner.show();
      if (event.target.files.length > 0) {
        // upload file to server
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
          const file: File = fileList[0];
          const formData: FormData = new FormData();
          if (this.helper.validateImageFile(file.name)) {
            // formData.append('uploadFile', file, file.name);
            const ext = file.name.substring(file.name.lastIndexOf('.') + 1);
            formData.append('uploadFile', file, this.registrationModel.firstName + '_' + this.registrationModel.lastName + '_.' + ext.toLowerCase());
            this.attendeeService.uploadAttendeeProfileImage(formData).subscribe((res) => {
              if (res.isSuccess) {
                item.value = res.message;
              }
              this.spinner.hide();
            });
          } else {
            this.spinner.hide();
            Swal.fire({
              title: new SweetAlertMessage(this.translate).invalidFileType,
              text: new SweetAlertMessage(this.translate).onlyPdfAreAllowed,
              icon: 'error'
            });
            item.value = "";

          }
        }

      } else {
        item.value = "";
        this.spinner.hide();
      }
    }


  }

  deleteProfilePic(item: any) {
    item.value = "";
  }


  getFuturedateModel()
  {
    this.isfuturedateModal=true;
  }
  getNotFuturedateModel()
  {
    this.isfuturedateModal=false;
  }
}
