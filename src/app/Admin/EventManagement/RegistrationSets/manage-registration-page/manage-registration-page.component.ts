import { Component, TemplateRef, OnInit } from '@angular/core';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LanguageService } from 'src/app/Services/language.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LoginpageRegistrationSetFiles } from '../../../Models/LoginPageRegistrationSetFiles';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventsRegistrationSetsService } from 'src/app/Services/events-registration-sets.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { ActivatedRoute, Router } from '@angular/router';
import { importType } from '@angular/compiler/src/output/output_ast';
import { Helper } from 'src/app/Utils/Helper';
import { isModifier } from 'typescript';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { NavigationService } from 'src/app/Utils/NavigationService';
import { disableDebugTools } from '@angular/platform-browser';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { contains } from 'jquery';
import { CountryService } from 'src/app/Services/country.service';
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-manage-registration-page',
  templateUrl: './manage-registration-page.component.html',
  styleUrls: ['./manage-registration-page.component.css']
})
export class ManageRegistrationPageComponent implements OnInit {
  registrationPageForm: FormGroup;
  enableSSO = false;
  enableMarketo = false;
  enableSetupProfile = false;
  includeRegistrationWelcomeText = false;
  sharedFileUpload = false;
  modalRef: BsModalRef;
  selectedType = 'text';
  selecteName = '';
  selectedOptions = '';
  isRequired = false;
  dropdownSettings: IDropdownSettings = {};
  //countryDropdownList = [];
  includeonCreteriaRule = false;
  includeonprofilecard = false;
  thirdPartyRegistration = false;
  vE247Registation = true;
  urlRegx = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  getByIdViewModel: any = {};
  private regVm: any = {};
  eventName = '';
  countryList: any = [];
  constructor(
    private fb: FormBuilder,
    private eventManagementService: EventsManagementService,
    private langugeService: LanguageService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private eventRegistrationSets: EventsRegistrationSetsService,
    private route: ActivatedRoute,
    private sweetAlertMessage: SweetAlertMessage,
    private helper: Helper,
    private countryService: CountryService,
    private localStorageService: LocalStorageService,
    private modalService: BsModalService,
    private navigation: NavigationService) {
    this.registrationPageForm = this.fb.group({
      thirdPartyRegistration: false,
      vE247Registation: true,
      thirdPartyURL: ['', [Validators.required, Validators.pattern(this.urlRegx)]],
      enableFirstNameLastName: true,
      enableEmail: true,
      enableMobile: false,
      enableFacebook: false,
      enableGoogle: false,
      enableLinkedIn: false,
      enableSSO: this.enableSSO,

      enableMarketo: false,
      enableEloqua: false,
      enableAPI: false,
      enableSetupProfile: this.enableSetupProfile,
      viewotherattendeesboothrepresentativesbeforeregistration: false,
      viewotherattendeesboothrepresentativesafterregistration: false,
      requestforameetingsetupwithboothrepresentativesinterviewsscreeningetc: false,
      requiresEvenAdmintoapproveregistrations: false,
      profileMandatorytocompleteregistrations: false,
      leavemessageforboothreps: false,
      inviteothersbeforeregistration: false,
      inviteothersafterregistration: false,
      standardFields: this.fb.array([]),
      customFields: this.fb.array([]),
      manageRegistrationPageId: '00000000-0000-0000-0000-000000000000',
      userId: this.localStorageService.get('UserId'),
      registrationSetId: this.route.snapshot.paramMap.get('regSetid')
    });
    this.getRegistrationPage();
    this.localStorageService.set('isEventSelected', 'true');
    this.eventName = this.localStorageService.get('EventName') + ' > ' + sessionStorage.getItem('regsetname');
  }

  changeEnableSSO() {
    this.enableSSO = !this.enableSSO;
  }


  changeEnableUserAuthenticationToken() {
    this.enableMarketo = !this.enableMarketo;
  }

  ChangeEnableSetupProfile() {
    this.enableSetupProfile = !this.enableSetupProfile;
  }
  standardFields(): FormArray {
    return this.registrationPageForm.get('standardFields') as FormArray;
  }

  newStandardField(i): FormGroup {
    switch (i) {
      // case 0:
      //   return this.fb.group({
      //     selected: true,
      //     type: 'text',
      //     key: '',
      //     label: 'First Name',
      //     required: true,
      //     includeonprofilecard: true,
      //     includeonCreteriaRule: false,
      //     showRequired: true,
      //     disabled: 'disabled',
      //   });
      //   break;
      // case 1:
      //   return this.fb.group({
      //     selected: true,
      //     type: 'text',
      //     key: '',
      //     label: 'Last Name',
      //     required: true,
      //     includeonprofilecard: true,
      //     includeonCreteriaRule: false,
      //     showRequired: true,
      //     disabled: 'disabled',
      //   });
      //   break;
      // case 2:
      //   return this.fb.group({
      //     selected: true,
      //     type: 'text',
      //     key: '',
      //     label: 'Email Address',
      //     required: true,
      //     includeonprofilecard: true,
      //     includeonCreteriaRule: false,
      //     showRequired: true,
      //     disabled: 'disabled',
      //   });

      //   break;
      // case 3:
      //   return this.fb.group({
      //     selected: false,
      //     type: 'text',
      //     key: '',
      //     label: 'Phone Number',
      //     required: false,
      //     includeonprofilecard: false,
      //     includeonCreteriaRule: false,
      //     showRequired: true,
      //     disabled: 'disabled',
      //   });
      //   break;

      case 0:
        return this.fb.group({
          selected: false,
          type: 'text',
          key: '',
          label: 'Company Name',
          value: '',
          required: false,
          includeonprofilecard: false,
          includeonCreteriaRule: false,
          showRequired: false,
          disabled: 'disabled',
          order: 1,
        });
        break;
      case 1:
        return this.fb.group({
          selected: false,
          type: 'text',
          key: '',
          label: 'Designation',
          value: '',
          required: false,
          includeonprofilecard: false,
          includeonCreteriaRule: false,
          showRequired: false,
          disabled: 'disabled',
          options: [],
          order: 2,
        });


        break;
      case 2:

        return this.fb.group({
          selected: false,
          type: 'text',
          key: '',
          label: 'Address',

          required: false,
          includeonprofilecard: false,
          includeonCreteriaRule: false,
          showRequired: true,
          disabled: 'disabled',
          order: 3,
        });

        break;
      case 3:
        return this.fb.group({
          selected: false,
          type: 'text',
          key: '',
          label: 'City',
          required: false,
          includeonprofilecard: false,
          includeonCreteriaRule: false,
          showRequired: true,
          disabled: 'disabled',
          order: 4,
        });
        break;
      case 4:
        return this.fb.group({
          selected: false,
          type: 'text',
          key: '',
          label: 'State/Province',
          required: false,
          includeonprofilecard: false,
          includeonCreteriaRule: false,
          showRequired: true,
          disabled: 'disabled',
          order: 5,
        });
        break;
      case 5:
        return this.fb.group({
          selected: false,
          type: 'text',
          key: '',
          label: 'Country',
          required: false,
          includeonprofilecard: false,
          includeonCreteriaRule: false,
          showRequired: true,
          disabled: 'disabled',
          order: 6,

        });
        break;
      case 6:
        return this.fb.group({
          selected: false,
          type: 'text',
          key: '',
          label: 'Zip/Postal Code',
          required: false,
          includeonprofilecard: false,
          includeonCreteriaRule: false,
          showRequired: true,
          disabled: 'disabled',
          order: 7,

        });
        break;
      // case 7:
      //   return this.fb.group({
      //     selected: false,
      //     type: 'text',
      //     key: '',
      //     label: 'Phone',
      //     required: false,
      //     includeonprofilecard: false,
      //     includeonCreteriaRule: false,
      //     showRequired: true,
      //     disabled: 'disabled',
      //   });
      //   break;
      case 7:
        return this.fb.group({
          selected: false,
          type: 'text',
          key: '',
          label: 'Date of Birth',
          required: false,
          includeonprofilecard: false,
          includeonCreteriaRule: false,
          showRequired: true,
          disabled: 'disabled',
          order: 8,

        });
        break;
      case 8:
        return this.fb.group({
          selected: false,
          type: 'text',
          key: '',
          label: 'Upload Resume',
          required: false,
          includeonprofilecard: false,
          includeonCreteriaRule: false,
          showRequired: true,
          disabled: 'disabled',
          order: 9,
        });
        break;
      case 9:
        return this.fb.group({
          selected: false,
          type: 'text',
          key: '',
          label: 'Upload Profile Pic',
          required: false,
          includeonprofilecard: false,
          includeonCreteriaRule: false,
          showRequired: true,
          disabled: 'disabled',
          order: 10,
        });
        break;
    }
    return this.fb.group({
      selected: true,
      type: 'file',
      key: '',
      label: '',
      required: false,
      includeonprofilecard: false,
      includeonCreteriaRule: false,
      showRequired: false,
      disabled: 'disabled',
      order: 10,

    });
  }

  addStandardField(i) {
    this.standardFields().push(this.newStandardField(i));
  }

  customFields(): FormArray {
    return this.registrationPageForm.get('customFields') as FormArray;
  }

  newCustomField(order): FormGroup {
    return this.fb.group({
      type: this.selectedType,
      name: this.selecteName,
      required: this.isRequired,
      includeonprofilecard: this.includeonprofilecard,
      options: Array(this.selectedOptions.split('\n')),
      order: order
    });
  }


  addCustomField(template: TemplateRef<any>) {
    const user = {
      selectedType: this.selectedType,
      id: 10
    };
    this.selecteName = '';
    this.selectedType = 'text';
    this.isRequired = false;
    this.selectedOptions = '';
    this.includeonprofilecard = false;
    this.modalRef = this.modalService.show(template, {
      initialState: user
    });

  }


  removecustomFields(i: number) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {

      if (result.value) {

        this.customFields().removeAt(i);
      }
    });
  }


  submitExternalField() {
    if (this.selecteName !== '') {
      var order = (this.standardFields().length + 1) + (this.customFields().length + 1) + 1;
      this.customFields().push(
        this.newCustomField(order));

      // console.log(this.customFields().value);
    }
  }

  checkStandardControl(event, index) {
    // console.log(index, event.target.checked);

    if (event.target.checked) {
      const x = this.registrationPageForm.get('standardFields') as FormArray;
      // console.log(x.controls[index].value);
      x.controls[index].disable();

      x.controls[index].setValue({
        selected: x.controls[index].value.selected,
        type: x.controls[index].value.type,
        key: x.controls[index].value.key,
        label: x.controls[index].value.label,
        required: x.controls[index].value.required,
        includeonprofilecard: x.controls[index].value.includeonprofilecard,
        includeonCreteriaRule: x.controls[index].value.includeonCreteriaRule,
        showRequired: x.controls[index].value.showRequired,
        disabled: false,
      });
      // console.log(x.controls[index].value);
    }

  }
  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      this.addStandardField(i);
      //this.getCountry();
    }
    // console.log(this.registrationPageForm.get("standardFields"));
  }

  getCountry() {
    this.spinner.show();
    this.countryService.getAllCountry().subscribe((res) => {
      this.countryList = res;
      this.spinner.hide();
    });

  }

  showCustomFieldType() {

  }

  // getAvailableLanguages() {
  //   this.langugeService.getAvailableLanguages().subscribe((res) => {
  //     if (res.isSuccess) {
  //       this.languageDropdownList = res.languageViewModel;
  //       this.defaultLanguageId = this.languageDropdownList[0].languageId;
  //     } else {
  //       // console.log('error in fetching languages');
  //     }
  //   });
  // }
  includeRegistrationWelcomeTextCheckChanged() {
    this.includeRegistrationWelcomeText = !this.includeRegistrationWelcomeText;
  }

  changeSharedFileType(event, val) {

    this.sharedFileUpload = val;
    this.registrationPageForm.patchValue({
      sharedFileUpload: val,
      sharedFileUploadRequired: false,
      sharedFileUploadName: '',
      sharedFileUploadDescription: ''
    });
  }

  changeRegistrationMode(event, item) {
    if (event.target.checked) {
      if (item === 'thirdParty') {
        this.thirdPartyRegistration = true;
        this.vE247Registation = false;
      } else {
        this.vE247Registation = true;
        this.thirdPartyRegistration = false;
      }
      this.registrationPageForm.patchValue({
        vE247Registation: this.vE247Registation
      });
      this.registrationPageForm.patchValue({
        thirdPartyRegistration: this.thirdPartyRegistration
      });

    }
  }

  goBack() {
    this.navigation.back();
  }

  onSubmit() {

    console.log(this.registrationPageForm);
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertUpdateMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertWhitelistUpdateMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).no
    }).then((result) => {

      if (result.value) {
        this.registrationPageForm.setControl('standardFields', this.standardFields());
        this.registrationPageForm.setControl('customFields', this.customFields());

        console.log(this.registrationPageForm.value);
        this.spinner.show();
        this.eventRegistrationSets.upsertEventRegistrationPage(this.registrationPageForm.value).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire(
              'Success',
              'saved successfully',
              'success'
              ).then((result)=>{
                this.goBack();
              });;
            // this.getRegistrationPage();
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
    });
  }

  getRegistrationPage() {
    this.spinner.show();
    this.getByIdViewModel.id = this.route.snapshot.paramMap.get('regSetid');
    this.eventRegistrationSets.getRegistrationPage(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        // console.log(res);
        this.assignValues(res);
        this.spinner.hide();
      } else {

      }
      this.spinner.hide();
    });
  }
  assignValues(res: any) {

    this.thirdPartyRegistration = res.thirdPartyRegistration;
    this.vE247Registation = res.vE247Registation;
    this.enableSSO = res.enableSSO;
    this.enableSetupProfile = res.enableSetupProfile;

    if (res.standardFields.length > 0) {
      this.standardFields().clear();
      for (let i = 0; i < res.standardFields.length; i++) {
        if (res.standardFields[i].label === 'Country' || res.standardFields[i].label === 'Designation') {

          this.standardFields().push(this.fb.group({
            selected: res.standardFields[i].selected,
            type: res.standardFields[i].type,
            key: res.standardFields[i].key,
            label: res.standardFields[i].label,

            required: res.standardFields[i].required,
            includeonprofilecard: res.standardFields[i].includeonprofilecard ? true : false,
            includeonCreteriaRule: res.standardFields[i].includeonCreteriaRule,


            showRequired: res.standardFields[i].showRequired,
            disabled: res.standardFields[i].disabled,
            options: Array(res.standardFields[i].options),
            order: res.standardFields[i].order === null || res.standardFields[i].order === undefined ? i : res.standardFields[i].order
          }));
        } else {

          this.standardFields().push(this.fb.group({
            selected: res.standardFields[i].selected,
            type: res.standardFields[i].type,
            key: res.standardFields[i].key,
            label: res.standardFields[i].label,

            required: res.standardFields[i].required,
            includeonprofilecard: res.standardFields[i].includeonprofilecard,
            includeonCreteriaRule: res.standardFields[i].includeonCreteriaRule,
            showRequired: res.standardFields[i].showRequired,
            disabled: res.standardFields[i].disabled,
            order: res.standardFields[i].order === null || res.standardFields[i].order === undefined ? i : res.standardFields[i].order


          }));
        }
      }
    }

    if (res.customFields.length > 0) {
      this.customFields().clear();
      for (let i = 0; i < res.customFields.length; i++) {
        this.customFields().push(
          this.fb.group({
            type: res.customFields[i].type,
            name: res.customFields[i].name,
            required: res.customFields[i].required,
            options: Array(res.customFields[i].options)
          })
        );
      }
    }
    this.registrationPageForm = this.fb.group({
      thirdPartyRegistration: this.thirdPartyRegistration,
      vE247Registation: this.vE247Registation,
      thirdPartyURL: [res.thirdPartyURL, [Validators.required, Validators.pattern(this.urlRegx)]],
      enableFirstNameLastName: res.enableFirstNameLastName,
      enableEmail: res.enableEmail,
      enableMobile: res.enableMobile,
      enableFacebook: res.enableFacebook,
      enableGoogle: res.enableGoogle,
      enableLinkedIn: res.enableLinkedIn,
      enableSSO: this.enableSSO,
      enableMarketo: res.enableMarketo,
      enableEloqua: res.enableEloqua,
      enableAPI: res.enableAPI,
      enableSetupProfile: this.enableSetupProfile,
      viewotherattendeesboothrepresentativesbeforeregistration: res.viewotherattendeesboothrepresentativesbeforeregistration,
      viewotherattendeesboothrepresentativesafterregistration: res.viewotherattendeesboothrepresentativesafterregistration,
      requestforameetingsetupwithboothrepresentativesinterviewsscreeningetc:
        res.requestforameetingsetupwithboothrepresentativesinterviewsscreeningetc,
      requiresEvenAdmintoapproveregistrations: res.requiresEvenAdmintoapproveregistrations,
      profileMandatorytocompleteregistrations: res.profileMandatorytocompleteregistrations,
      leavemessageforboothreps: res.leavemessageforboothreps,
      inviteothersbeforeregistration: res.inviteothersbeforeregistration,
      inviteothersafterregistration: res.inviteothersafterregistration,
      // standardFields: this.fb.array([]),
      // customFields: this.fb.array([]),
      standardFields: this.standardFields(),
      customFields: this.customFields(),
      // thankyouPageRegistrationSetId: res.thankyouPageRegistrationSetId,
      userId: this.localStorageService.get('UserId'),
      registrationSetId: this.route.snapshot.paramMap.get('regSetid'),
      manageRegistrationPageId: res.manageRegistrationPageId
    });
  }

  onDrop(event: CdkDragDrop<string[]>) {
    var tmp = this.standardFields().controls[event.previousIndex];
    this.standardFields().controls[event.previousIndex] = this.standardFields().controls[event.currentIndex];
    this.standardFields().controls[event.currentIndex] = tmp;

  }

  onDropCustomFields(event: CdkDragDrop<string[]>) {
    var tmp = this.customFields().controls[event.previousIndex];
    this.customFields().controls[event.previousIndex] = this.customFields().controls[event.currentIndex];
    this.customFields().controls[event.currentIndex] = tmp;
  }
}
