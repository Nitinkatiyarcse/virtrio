import { Component, OnInit } from '@angular/core';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LanguageService } from 'src/app/Services/language.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LoginpageRegistrationSetFiles } from '../../../Models/LoginPageRegistrationSetFiles';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventsRegistrationSetsService } from 'src/app/Services/events-registration-sets.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ActivatedRoute, Router } from '@angular/router';
import { importType } from '@angular/compiler/src/output/output_ast';
import { Helper } from 'src/app/Utils/Helper';
import { isModifier } from 'typescript';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { NavigationService } from 'src/app/Utils/NavigationService';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { AppComponent } from 'src/app/app.component';
import { AppConstant } from 'src/app/appConstant';
@Component({
  selector: 'app-manage-login-page',
  templateUrl: './manage-login-page.component.html',
  styleUrls: ['./manage-login-page.component.css']
})
export class ManageLoginPageComponent implements OnInit {


  inputLoginPageModel: any = {};
  splashScreenImages = [];
  footerGraphics = [];
  languageDropdownList = [];
  showLangSelector = false;
  landingPageDropdownList = [];
  getByIdViewModel: any = {};
  eventId: string = '';
  splashScreenItems: FormGroup;
  splashImageType = 'splashimage';
  eventName: string;
  config: any;
  isImagesOrVideo = true;
  constructor(
    private eventManagementService: EventsManagementService,
    private langugeService: LanguageService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private eventRegistrationSets: EventsRegistrationSetsService,
    private route: ActivatedRoute,
    private helper: Helper,
    private localStorageService: LocalStorageService,
    private navigation: NavigationService,
    private getterSetterService: GetterSetterService,
  ) {
    this.isImagesOrVideo = true;
    this.localStorageService.set('isEventSelected', 'true');
    this.eventName = this.localStorageService.get('EventName') + ' > ' + sessionStorage.getItem('regsetname');
    // console.log(sessionStorage.getItem('regsetname'));
    this.inputLoginPageModel.includeRegisterBox = false;
    this.inputLoginPageModel.landingPageRoomId = '';
    this.inputLoginPageModel.languageId = '';

  }

  ngOnInit(): void {
    this.config = {
      allowedContent: true,
      colorButton: true,
      extraPlugins: ['font', 'colorbutton', 'colordialog']
    };
    this.inputLoginPageModel.registrationSetId = this.route.snapshot.paramMap.get('regSetid');


    this.getLandingPageList();

    this.getEventRegistrationLoginPage();

  }


  getAvailableLanguages() {
    const evntLanguage: any = {};
    evntLanguage.id = this.eventId;
    this.langugeService.getLanguagesByEventId(evntLanguage).subscribe((res) => {
      if (res.isSuccess) {
        this.languageDropdownList = res.languageViewModel;
        this.inputLoginPageModel.languageId = this.languageDropdownList[0].languageId;
        if (this.languageDropdownList.length <= 1) {
          this.showLangSelector = false;
        } else {
          this.showLangSelector = true;
        }
      } else {
        // console.log('error in fetching languages');
      }
    });
  }

  getLandingPageList() {
    const lpGetByIdVM: any = {};
    lpGetByIdVM.id = this.route.snapshot.paramMap.get('id');
    this.eventRegistrationSets.getLandingPageList(lpGetByIdVM).subscribe((res) => {
      this.landingPageDropdownList = res;
      // if (this.inputLoginPageModel.landingPageRoomId != '') {
      //   this.inputLoginPageModel.landingPageRoomId = this.landingPageDropdownList[this.landingPageDropdownList.length - 1].roomId;
      // }
    });
  }

  getEventRegistrationLoginPage() {
    this.spinner.show();
    this.getByIdViewModel.id = this.inputLoginPageModel.registrationSetId;
    this.eventRegistrationSets.getEventRegistrationLoginPage(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        // console.log(res);
        this.assignValues(res);
        this.eventId = res.eventId;
        this.getAvailableLanguages();

        this.spinner.hide();
      } else {
        this.inputLoginPageModel.displayHeadingAndIcons = 'true';
        this.inputLoginPageModel.createdBy = this.localStorageService.get('UserId');
        this.inputLoginPageModel.modifiedBy = this.localStorageService.get('UserId');
      }
      this.spinner.hide();
    });
  }
  assignValues(res: any) {
    console.log(res);
    this.inputLoginPageModel.loginPageRegistrationSetId = res.loginPageRegistrationSetId;
    this.inputLoginPageModel.registrationSetId = res.registrationSetId;
    this.inputLoginPageModel.languageId = res.languageId;
    this.inputLoginPageModel.includeLanguageSelector = res.includeLanguageSelector;
    this.inputLoginPageModel.videoSpokesPerson = res.videoSpokesPerson;
    this.inputLoginPageModel.hasAgendaDocuments = res.hasAgendaDocuments;
    this.inputLoginPageModel.agendaDocumentUrl = res.agendaDocumentUrl;
    this.inputLoginPageModel.agendaDocumentText = res.agendaDocumentText;
    this.inputLoginPageModel.loginPageHeaderGraphics = res.loginPageHeaderGraphics;
    this.inputLoginPageModel.includeSplashImage = res.includeSplashImage;
    this.inputLoginPageModel.includeRegisterBox = res.includeRegisterBox;
    this.inputLoginPageModel.includeLoginBox = res.includeLoginBox;
    this.inputLoginPageModel.IncludeLanguageSelector = res.IncludeLanguageSelector;
    this.inputLoginPageModel.includeWelcomeText = res.includeWelcomeText;
    this.inputLoginPageModel.welcomeText = res.welcomeText;
    this.inputLoginPageModel.includeFooterGraphics = res.includeFooterGraphics;
    this.inputLoginPageModel.backgroundColor = res.backgroundColor;
    this.inputLoginPageModel.sectionHeaderColor = res.sectionHeaderColor;
    this.inputLoginPageModel.displayHeadingAndIcons = res.displayHeadingAndIcons;
    this.inputLoginPageModel.registerHeadingText = res.registerHeadingText;
    this.inputLoginPageModel.loginHeadingText = res.loginHeadingText;
    this.inputLoginPageModel.welcomeHeadingText = res.welcomeHeadingText;
    this.inputLoginPageModel.agendaDocumentHeadingText = res.agendaDocumentHeadingText;
    this.inputLoginPageModel.calendarReminderHeadingText = res.calendarReminderHeadingText;
    this.inputLoginPageModel.customFooterText = res.customFooterText;
    this.inputLoginPageModel.privacyPolicyName = res.privacyPolicyName;
    this.inputLoginPageModel.privacyPolicyUrl = res.privacyPolicyUrl;
    this.inputLoginPageModel.customSupportLinkName = res.customSupportLinkName;
    this.inputLoginPageModel.customSupportLinkUrl = res.customSupportLinkUrl;
    this.inputLoginPageModel.logoutUrl = res.logoutUrl;
    //this.inputLoginPageModel.landingPageId = res.landingPageId;
    this.inputLoginPageModel.landingPageRoomId = res.landingPageRoomId;
    this.inputLoginPageModel.createdDate = res.createdDate;
    this.inputLoginPageModel.modifiedDate = res.modifiedDate;
    this.inputLoginPageModel.createdBy = res.createdBy;
    this.inputLoginPageModel.modifiedBy = res.modifiedBy;
    this.inputLoginPageModel.landingPageId = res.landingPageRoomId;
    this.inputLoginPageModel.aboutTheEventText = res.aboutTheEventText;

    if (res.includeSplashImage) {
      this.splashScreenImages = [
        { fileType: '', filePath: '' },
        { fileType: '', filePath: '' },
        { fileType: '', filePath: '' },
        { fileType: '', filePath: '' },
        { fileType: '', filePath: '' }];
      this.isImagesOrVideo = true;
      for (let i = 0; i < res.splashImagesList.length; i++) {
        if (res.splashImagesList[i].fileType == 'splashmovie') {
          this.isImagesOrVideo = false;
        }
        this.splashScreenImages[i] = { fileType: res.splashImagesList[i].fileType, filePath: res.splashImagesList[i].filePath };
        this.splashImageType = res.splashImagesList[i].fileType;
        this.inputLoginPageModel.splashImagesList = res.splashImagesList;
      }
    }
    if (res.includeFooterGraphics) {
      this.footerGraphics = [
        { fileType: '', filePath: '' },
        { fileType: '', filePath: '' },
        { fileType: '', filePath: '' },
        { fileType: '', filePath: '' },
        { fileType: '', filePath: '' }];
      for (let i = 0; i < res.footerGraphicsList.length; i++) {
        this.footerGraphics[i] = { fileType: res.footerGraphicsList[i].fileType, filePath: res.footerGraphicsList[i].filePath };

      }
      this.inputLoginPageModel.footerGraphicsList = res.footerGraphicsList;
    }
  }

  includeLanguageSelectorCheckChanged() {
    this.inputLoginPageModel.includeLanguageSelector = !this.inputLoginPageModel.includeLanguageSelector;
  }

  agendaDocumentCheckChanged() {
    this.inputLoginPageModel.hasAgendaDocuments = !this.inputLoginPageModel.hasAgendaDocuments;
  }

  includeSplashImagesCheckChanged() {
    this.inputLoginPageModel.includeSplashImage = !this.inputLoginPageModel.includeSplashImage;
    if (this.inputLoginPageModel.includeSplashImage) {
      this.splashScreenImages = [
        { fileType: '', filePath: '' },
        { fileType: '', filePath: '' },
        { fileType: '', filePath: '' },
        { fileType: '', filePath: '' },
        { fileType: '', filePath: '' }];
    } else {
      this.splashScreenImages = [];
    }
  }

  includeRegisterBoxCheckChanged() {
    this.inputLoginPageModel.includeRegisterBox = !this.inputLoginPageModel.includeRegisterBox;
  }

  includeLoginBoxCheckChanged() {
    this.inputLoginPageModel.includeLoginBox = !this.inputLoginPageModel.includeLoginBox;
  }

  includeWelcomeTextCheckChanged() {
    this.inputLoginPageModel.includeWelcomeText = !this.inputLoginPageModel.includeWelcomeText;
  }

  includeFooterGraphicsCheckChanged() {
    this.inputLoginPageModel.includeFooterGraphics = !this.inputLoginPageModel.includeFooterGraphics;
    if (this.inputLoginPageModel.includeFooterGraphics) {
      this.footerGraphics = [
        { fileType: '', filePath: '' },
        { fileType: '', filePath: '' },
        { fileType: '', filePath: '' },
        { fileType: '', filePath: '' },
        { fileType: '', filePath: '' }];
    } else {
      this.footerGraphics = [];
    }
  }

  agendaDocumentFileChange(event) {
    this.spinner.show();
    if (event.target.files.length === 1) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        if (this.helper.validateDocFile(file.name)) {
          formData.append('uploadFile', file, file.name);
          this.eventRegistrationSets.uploadAgendaDocument(formData).subscribe((res) => {
            if (res.isSuccess) {
              this.inputLoginPageModel.agendaDocumentUrl = res.message;
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
        }
      }
    } else {
      this.spinner.hide();
    }
  }

  deleteAgendaDocument() {
    this.inputLoginPageModel.agendaDocumentUrl = '';
  }

  loginPageHeaderGraphicsFileChange(event) {
    this.spinner.show();
    if (event.target.files.length === 1) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        if (this.helper.validateImageFile(file.name)) {
          if (this.helper.validateProfileImageSize(file)) {
            formData.append('uploadFile', file, file.name);
            this.eventRegistrationSets.uploadloginPageHeaderGraphics(formData).subscribe((res) => {
              if (res.isSuccess) {
                this.inputLoginPageModel.loginPageHeaderGraphics = res.message;
              }
              this.spinner.hide();
            });
          } else {

            this.spinner.hide();
            Swal.fire({
              title: new SweetAlertMessage(this.translate).invalidFileType,
              text: new SweetAlertMessage(this.translate).imageSizeShouldNotMoreThan200,
              icon: 'error'
            });
          }
        } else {
          this.spinner.hide();
          Swal.fire({
            title: new SweetAlertMessage(this.translate).invalidFileType,
            text: new SweetAlertMessage(this.translate).onlypngjpgandjpegareallowed,
            icon: 'error'
          });
        }
      }
    } else {
      this.spinner.hide();
    }
  }

  changeSplashType(e, type) {
    this.splashScreenImages = [
      { fileType: '', filePath: '' },
      { fileType: '', filePath: '' },
      { fileType: '', filePath: '' },
      { fileType: '', filePath: '' },
      { fileType: '', filePath: '' }];
    if (e.target.checked) {
      if (type === 'splashImange') {
        this.splashImageType = 'splashimage';
        this.isImagesOrVideo = true;

      } else {
        this.splashImageType = 'splashmovie';
        this.isImagesOrVideo = false;
      }
    }
  }

  deleteSplashImage(index) {
    this.splashScreenImages[index] = { fileType: '', filePath: '' };
  }

  deleteloginPageHeaderImage() {
    this.inputLoginPageModel.loginPageHeaderGraphics = '';
  }

  loginSplashimagesFileChange(event, index) {
    this.spinner.show();
    if (event.target.files.length === 1) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        const isValidFile = (this.splashImageType === 'splashmovie'
          ? this.helper.validateMovieFile(file.name)
          : this.helper.validateImageFile(file.name));
        // const isValidDimensionFile = (this.splashImageType === 'splashmovie'
        //   ? this.helper.validateBannerAndProfilePicImageSize(file, 'banner')
        //   : this.helper.validateVideoSize(file.name));
        if (isValidFile) {
          if (this.splashImageType === 'splashmovie') {
            formData.append('uploadFile', file, file.name);
            this.eventRegistrationSets.uploadLoginSplashimagesFileChange(formData).subscribe((res) => {
              if (res.isSuccess) {
                this.splashScreenImages[index] = { fileType: this.splashImageType, filePath: res.message };
                if (this.inputLoginPageModel.splashImagesList === undefined) {
                  this.inputLoginPageModel.splashImagesList = [];
                }
                this.inputLoginPageModel.splashImagesList.push({ fileType: this.splashImageType, filePath: res.message });
              }
              this.spinner.hide();
            });
          } else {
            const img = new Image();
            img.src = window.URL.createObjectURL(file);
            var x = true;
            img.addEventListener('load', () => {
              if (img.width > 1280 || img.height > 720) {
                this.spinner.hide();
                Swal.fire({
                  title: new SweetAlertMessage(this.translate).invalidFileType,
                  text: new SweetAlertMessage(this.translate).imageSizeShouldNotMoreThan1920,
                  icon: 'error'
                });
              } else {

                formData.append('uploadFile', file, file.name);
                this.eventRegistrationSets.uploadLoginSplashimagesFileChange(formData).subscribe((res) => {
                  if (res.isSuccess) {
                    this.splashScreenImages[index] = { fileType: this.splashImageType, filePath: res.message };
                    if (this.inputLoginPageModel.splashImagesList === undefined) {
                      this.inputLoginPageModel.splashImagesList = [];
                    }
                    this.inputLoginPageModel.splashImagesList.push({ fileType: this.splashImageType, filePath: res.message });
                  }
                  this.spinner.hide();
                });
              }
            }, false);
          }

        } else {
          this.spinner.hide();
          Swal.fire({
            title: new SweetAlertMessage(this.translate).invalidFileType,
            text: this.splashImageType === 'splashmovie'
              ? new SweetAlertMessage(this.translate).onlyMp4AndWavAreAllowed
              : new SweetAlertMessage(this.translate).onlypngjpgandjpegareallowed,
            icon: 'error'
          });
        }
      }

    } else {
      this.spinner.hide();
    }
  }


  IncludeFooterGraphicFileChange(event, index) {

    this.spinner.show();

    if (event.target.files.length === 1) {

      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        // console.log(file.size);
        if (this.helper.validateImageFile(file.name)) {
          const img = new Image();
          img.src = window.URL.createObjectURL(file);
          var x = true;
          img.addEventListener('load', () => {
            if (img.width > 1280 || img.height > 720) {
              this.spinner.hide();
              Swal.fire({
                title: new SweetAlertMessage(this.translate).invalidFileType,
                text: new SweetAlertMessage(this.translate).imageSizeShouldNotMoreThan1920,
                icon: 'error'
              });
            } else {
              formData.append('uploadFile', file, file.name);
              this.eventRegistrationSets.uploadIncludeFooterGraphic(formData).subscribe((res) => {
                if (res.isSuccess) {
                  this.footerGraphics[index] = { fileType: 'footerimage', filePath: res.message };
                  if (this.inputLoginPageModel.footerGraphicsList === undefined) {
                    this.inputLoginPageModel.footerGraphicsList = [];
                  }
                  this.inputLoginPageModel.footerGraphicsList.push({ fileType: 'footerimage', filePath: res.message });
                }
                this.spinner.hide();
              });
            }
          }, false);



        } else {
          this.spinner.hide();
          Swal.fire({
            title: new SweetAlertMessage(this.translate).invalidFileType,
            text: new SweetAlertMessage(this.translate).onlypngjpgandjpegareallowed,
            icon: 'error'
          });
        }
      }
    } else {
      this.spinner.hide();
    }
  }

  deleteFooterImage(index) {
    this.footerGraphics[index] = { fileType: '', filePath: '' };
  }

  submitForm() {
    let process = true;
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertUpdateMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertWhitelistUpdateMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).no
    }).then((result) => {
      if (result.value) {
        //title: 'Please upload atleast one image as splash image',
        if (this.inputLoginPageModel.includeSplashImage) {
          if (this.inputLoginPageModel.splashImagesList === undefined || this.inputLoginPageModel.splashImagesList.length === 0) {
            // Swal.fire({
            //   title: new SweetAlertMessage(this.translate).sweetalertWarningHeader,
            //   text: new SweetAlertMessage(this.translate).sweetAlertSplaceImageMessage,
            //   icon: 'warning'
            // }).then(() => {
            //   process = false;
            // });
            // return;
            alert(new SweetAlertMessage(this.translate).sweetAlertSplaceImageMessage);
            process = false;
          }
          else {
            if (this.inputLoginPageModel.splashImagesList[0].fileType == '' &&
              this.inputLoginPageModel.splashImagesList[0].filePath == '' &&
              this.inputLoginPageModel.splashImagesList[1].fileType == '' &&
              this.inputLoginPageModel.splashImagesList[1].filePath == '' &&
              this.inputLoginPageModel.splashImagesList[2].fileType == '' &&
              this.inputLoginPageModel.splashImagesList[2].filePath == '' &&
              this.inputLoginPageModel.splashImagesList[3].fileType == '' &&
              this.inputLoginPageModel.splashImagesList[3].filePath == '' &&
              this.inputLoginPageModel.splashImagesList[4].fileType == '' &&
              this.inputLoginPageModel.splashImagesList[4].filePath == '') {
              // Swal.fire({
              //   title: new SweetAlertMessage(this.translate).sweetalertWarningHeader,
              //   text: new SweetAlertMessage(this.translate).sweetAlertSplaceImageMessage,
              //   icon: 'warning'
              // }).then(() => {
              //   process = false;
              // });
              alert(new SweetAlertMessage(this.translate).sweetAlertSplaceImageMessage);
              process = false;
              // return;
            }
          }
        }

        if (this.inputLoginPageModel.includeFooterGraphics) {
          if (this.inputLoginPageModel.footerGraphicsList === undefined || this.inputLoginPageModel.footerGraphicsList.length === 0) {
            // Swal.fire({
            //   title: new SweetAlertMessage(this.translate).sweetalertWarningHeader,
            //   text: new SweetAlertMessage(this.translate).sweetAlertFooterGraphicsMessage,
            //   icon: 'warning'
            // }).then(() => {
            //   process = false;
            // });
            alert(new SweetAlertMessage(this.translate).sweetAlertFooterGraphicsMessage);
            process = false;
            // return;
          }
          else {
            if (this.inputLoginPageModel.footerGraphicsList[0].fileType == '' &&
              this.inputLoginPageModel.footerGraphicsList[0].filePath == '' &&
              this.inputLoginPageModel.footerGraphicsList[1].fileType == '' &&
              this.inputLoginPageModel.footerGraphicsList[1].filePath == '' &&
              this.inputLoginPageModel.footerGraphicsList[2].fileType == '' &&
              this.inputLoginPageModel.footerGraphicsList[2].filePath == '' &&
              this.inputLoginPageModel.footerGraphicsList[3].fileType == '' &&
              this.inputLoginPageModel.footerGraphicsList[3].filePath == '' &&
              this.inputLoginPageModel.footerGraphicsList[4].fileType == '' &&
              this.inputLoginPageModel.footerGraphicsList[4].filePath == '') {
              // Swal.fire({
              //   title: new SweetAlertMessage(this.translate).sweetalertWarningHeader,
              //   text: new SweetAlertMessage(this.translate).sweetAlertFooterGraphicsMessage,
              //   icon: 'warning'
              // }).then(() => {
              //   process = false;
              // });
              alert(new SweetAlertMessage(this.translate).sweetAlertFooterGraphicsMessage);
              process = false;
              // return;
            }
          }
        }

        this.inputLoginPageModel.footerGraphicsList = this.footerGraphics;
        this.inputLoginPageModel.splashImagesList = this.splashScreenImages;
        if (this.inputLoginPageModel.displayHeadingAndIcons === 'true') {
          this.inputLoginPageModel.displayHeadingAndIcons = true;
        } else {
          this.inputLoginPageModel.displayHeadingAndIcons = false;
        }

        if (this.inputLoginPageModel.hasAgendaDocuments) {
          if (this.inputLoginPageModel.agendaDocumentUrl === '' || this.inputLoginPageModel.agendaDocumentUrl === undefined) {
            alert('Please upload agenda document');
            // return;

            process = false;

          }
        }

        if (process) {
          console.log(this.inputLoginPageModel);
          this.spinner.show();
          this.eventRegistrationSets.UpsertEventRegistrationLoginPage(this.inputLoginPageModel).subscribe((res) => {
            if (res.isSuccess) {
              Swal.fire(
                new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
                new SweetAlertMessage(this.translate).updatedSuccessfullyMessage,
                'success'
              ).then((result) => {
                this.goBack();
              });;

              // this.getEventRegistrationLoginPage();
            } else {
              Swal.fire(
                'Error',
                res.message,
                'error'
              );
            }
            this.spinner.hide();
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {

        }
        // this.spinner.hide();
      }
    });

  }


  goBack() {
    this.navigation.back();
  }

}
