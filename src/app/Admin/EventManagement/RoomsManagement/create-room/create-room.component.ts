import { Component, OnInit } from '@angular/core';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { RoomsService } from 'src/app/Services/rooms.service';
import { LanguageService } from 'src/app/Services/language.service';
import { importType } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { Local } from 'protractor/built/driverProviders';
import { EventEntitlementService } from 'src/app/Services/event-entitlement.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from 'src/app/Utils/NavigationService';
import { Helper } from 'src/app/Utils/Helper';
import * as AppUtils from 'src/app/Utils/apputils';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  eventId = '';
  roomId = '';
  eventName = '';
  IsAdd = true;
  inputRoomModel: any = {};
  createroomEndMinDate: any;
  selectedTimeZone = '';
  entitlementDropdownList = [];
  dropdownSettings: IDropdownSettings = {};
  EntitlementDropdownSettings: IDropdownSettings = {};
  selectedEntitlementsArr: Array<string> = [];
  entitlementRequiredField = false;
  allTimezones = [];
  allRoomTypes = [];
  allLanguages = [];
  selectedRoom = '';
  selectedEntitlementsForInsert: any = [];
  enableTimeWindow = false;
  InvalidDate = false;
  InvalidTime = false;
  hasTimeWindow = false;
  roomVisibleToAttendees = false;
  timeBracketEnabled = false;
  enableAttendeeToAttendeeVideoChat = false;
  languageNotSelected = false;
  getByIdViewModel: any = {};
  isDefaultSet = false;
  isPlatinum = false;
  isGold = false;
  isSilver = false;
  isPress = false;
  isVIP = false;

  isWallEnabled = false;
  isChatEnabled = false;
  isKnockingEnabled = false;
  isVideoChatEnabled = false;
  isBooth = false;
  eventDetails: any = {};
  typeOfScreenType = '';
  roomStartMinDate: any;
  roomEndMaxDate: any;
  constructor(
    private route: ActivatedRoute,
    public getterSetterService: GetterSetterService,
    private eventManagementService: EventsManagementService,
    private roomService: RoomsService,
    private languageService: LanguageService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private navigation: NavigationService,
    private eventEntitlementService: EventEntitlementService,
    public router: Router,
    private helper: Helper
  ) {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    if (this.roomId != null) {
      this.IsAdd = false;
    }
    this.eventName = this.getterSetterService.eventName;
    this.selectedRoom = '';
    this.inputRoomModel.selectedTimeZone = '';
    this.inputRoomModel.roomTypeId = '';
    this.inputRoomModel.selectedtimewindow = 1;
    this.languageNotSelected = false;
    this.inputRoomModel.languages = '';
    this.inputRoomModel.entitlements = '';
    this.inputRoomModel.roomName = '';
    this.inputRoomModel.createdBy = this.localStorageService.get('UserId');
    this.inputRoomModel.modifiedBy = this.localStorageService.get('UserId');
    this.inputRoomModel.eventId = this.eventId;
    this.inputRoomModel.roomVisibleToAttendees = false;
    this.inputRoomModel.enableAttendeeToAttendeeVideoChat = false;
    this.getEventDetails();
    this.bindGroupEntitlements();

    this.getRoomTypes();
    this.GetAllTimezones();

  }

  getEventDetails() {
    this.spinner.show();
    const reqModel: any = {};
    reqModel.id = this.eventId;
    this.eventManagementService.GetEventDetails(reqModel).subscribe((res) => {
      if (res.isSuccess) {
        console.log(res.usersEvent);
        this.eventDetails = res.usersEvent;
        this.typeOfScreenType = this.eventDetails.eventRoomsScreenType;
        const roomStartMinDate = new Date(this.eventDetails.eventStartDate);
        this.roomStartMinDate = {
          'year': roomStartMinDate.getFullYear(),
          'month': roomStartMinDate.getMonth() + 1,
          'day': roomStartMinDate.getDate()
        };

        const roomEndMaxDate = new Date(this.eventDetails.eventEndDate);
        this.roomEndMaxDate = {
          'year': roomEndMaxDate.getFullYear(),
          'month': roomEndMaxDate.getMonth() + 1,
          'day': roomEndMaxDate.getDate()
        };


      } else {
        // console.log(res.errors);
      }
      this.spinner.hide();
    });
  }

  getRoomDetails() {
    this.spinner.show();
    this.getByIdViewModel.id = this.roomId;
    this.roomService.getRoomDetails(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.inputRoomModel = res.rooms[0];
        console.log(this.inputRoomModel);
        this.inputRoomModel.endDate = this.helper.convertDateToLocalTimezone(this.inputRoomModel.endDate) == '' ? null : this.helper.convertDateToLocalTimezone(this.inputRoomModel.endDate);
        this.inputRoomModel.endTime = this.helper.convertDateToLocalTimezone(this.inputRoomModel.endTime) == '' ? null : this.helper.convertDateToLocalTimezone(this.inputRoomModel.endTime);
        this.inputRoomModel.startDate = this.helper.convertDateToLocalTimezone(this.inputRoomModel.startDate) == '' ? null : this.helper.convertDateToLocalTimezone(this.inputRoomModel.startDate);
        this.inputRoomModel.startTime = this.helper.convertDateToLocalTimezone(this.inputRoomModel.startTime) == '' ? null : this.helper.convertDateToLocalTimezone(this.inputRoomModel.startTime);
        this.timeBracketEnabled = this.inputRoomModel.enableTimeBracket;
        this.roomVisibleToAttendees = this.inputRoomModel.roomVisibleToAttendees;
        this.enableAttendeeToAttendeeVideoChat = this.inputRoomModel.enableAttendeeToAttendeeVideoChat;
        this.getLanguagesByEventId();
        // const d = [];
        // if (this.inputRoomModel.entitlements) {
        //   if (this.inputRoomModel.entitlements) {
        //     JSON.parse(this.inputRoomModel.entitlements.split(',')).forEach(element => {
        //       const grpItem = this.entitlementDropdownList.filter(u => u.item_id === element);

        //       if (grpItem.length > 0) {
        //         d.push(grpItem[0]);
        //         this.selectedEntitlementsForInsert.push(grpItem[0].item_id);
        //       }
        //     });
        //   }
        // }
        this.selectedEntitlementsArr = JSON.parse(this.inputRoomModel.entitlements);
        if (this.inputRoomModel.roomTypeId === '6426fb62-e428-43fe-bb58-3f1252fba304') {
          this.isBooth = true;
        } else {
          this.isBooth = false;
        }
      }
      this.eventName = this.localStorageService.get('EventName') + ' > ' + this.inputRoomModel.name;
      this.spinner.hide();
    });
  }

  getLanguagesByEventId() {
    const x = [];
    this.getByIdViewModel.id = this.eventId;
    this.languageService.getLanguagesByEventId(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {

        if (this.IsAdd) {
          this.allLanguages = res.languageViewModel;
          for (let i = 0; i < res.languageViewModel.length; i++) {
            const l: any = {};
            l.languageId = res.languageViewModel[i].languageId;
            l.language = res.languageViewModel[i].language;
            l.isSelected = false;
            x.push(l);
          }
        } else {




          for (let i = 0; i < res.languageViewModel.length; i++) {
            const l: any = {};
            l.languageId = res.languageViewModel[i].languageId;
            l.language = res.languageViewModel[i].language;
            let isSelected = false;
            if (this.inputRoomModel.languages) {
              const selectedLangs = this.inputRoomModel.languages.split(',');
              for (let j = 0; j < selectedLangs.length; j++) {
                if (res.languageViewModel[i].languageId === selectedLangs[j]) {
                  isSelected = true;
                  break;
                }
              }
            }
            l.isSelected = isSelected;
            x.push(l);

          }
        }
      }
      this.allLanguages = x;
    });
  }

  getRoomTypes() {
    const roomTypeReques: any = {};
    roomTypeReques.id = this.localStorageService.get('UserId');
    this.roomService.getRoomTypes(roomTypeReques).subscribe((res) => {
      if (res.isSuccess) {
        this.allRoomTypes = res.roomTypes;
      }
    });
  }

  ngOnInit(): void {
    this.selectedTimeZone = ' ';

    this.EntitlementDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }

  // changeTimeWindow() {
  //   this.enableTimeWindow = !this.enableTimeWindow;
  // }
  timeWindowCheckChanged() {
    this.hasTimeWindow = !this.hasTimeWindow;

  }

  selectTimeZone(value) {
    this.selectedTimeZone = value;
  }

  GetAllTimezones() {
    this.eventManagementService.TimeZone().subscribe((res) => {
      this.allTimezones = res;
    });
  }

  getLanguageValues(event, val) {
    if (event.target.checked) {
      if (this.inputRoomModel.language === null || this.inputRoomModel.language === undefined) {
        this.inputRoomModel.languages = [];
      }
      if (this.inputRoomModel.languages.length > 0) {
        if (this.inputRoomModel.languages[this.inputRoomModel.languages.length - 1] !== ',') {
          this.inputRoomModel.languages += ',';
        }
      }
      this.inputRoomModel.languages += val + ',';
    } else {
      if (this.inputRoomModel.languages.indexOf(val) !== -1) {
        if (this.inputRoomModel.languages.indexOf(val + ',') !== -1) {
          this.inputRoomModel.languages = this.inputRoomModel.languages.replace(val + ',', '');
        } else {
          this.inputRoomModel.languages = this.inputRoomModel.languages.replace(val, '');
        }
        // this.inputRoomModel.languages = this.inputRoomModel.languages.replace(',,', '');
      }
    }
    console.log(this.inputRoomModel.languages);

    if (this.inputRoomModel.languages === '') {
      this.languageNotSelected = true;
    } else {
      this.languageNotSelected = false;

    }
  }

  // getEntitlementValues(event, val) {
  //   if (event.target.checked) {
  //     this.inputRoomModel.entitlements += val + ',';
  //   } else {
  //     if (this.inputRoomModel.entitlements.indexOf(val) !== -1) {
  //       this.inputRoomModel.entitlements = this.inputRoomModel.entitlements.replace(val, '');
  //       this.inputRoomModel.entitlements = this.inputRoomModel.entitlements.replace(',,', '');

  //     }

  //   }
  // }


  validateRoomDates() {
    if (this.inputRoomModel.startDate != null && this.inputRoomModel.startDate == null) {
      return false;
    } else if (this.inputRoomModel.startDate == null && this.inputRoomModel.startDate != null) {
      this.InvalidDate = true;
    } else {
      if (this.inputRoomModel.startDate == null) {
        this.InvalidDate = true;
      } else {
        if (new Date(this.inputRoomModel.startDate) > new Date(this.inputRoomModel.endDate)) {
          this.InvalidDate = true;
        } else {
          this.InvalidDate = false;
        }
      }
    }
    const createroomEndMinDate = new Date(this.inputRoomModel.startDate);
    this.createroomEndMinDate = {
      'year': createroomEndMinDate.getFullYear(),
      'month': createroomEndMinDate.getMonth() + 1,
      'day': createroomEndMinDate.getDate()
    };
  }

  validateRoomTime() {

    if (this.inputRoomModel.startTime != null && this.inputRoomModel.endTime == null) {
      return false;
    } else if (this.inputRoomModel.startTime == null && this.inputRoomModel.endTime != null) {
      this.InvalidTime = true;
    } else {
      if (this.inputRoomModel.startTime == null) {
        this.InvalidTime = true;
      } else {
        if (new Date(this.inputRoomModel.startTime).getTime() > new Date(this.inputRoomModel.endTime).getTime()) {
          if (this.inputRoomModel.startDate === this.inputRoomModel.endDate) {
            this.InvalidTime = true;
          } else {
            this.InvalidTime = false;
          }
        } else {
          this.InvalidTime = false;
        }


      }
    }

  }


  roomVisibleToAttendeesChanged() {
    this.roomVisibleToAttendees = !this.roomVisibleToAttendees;
    this.inputRoomModel.roomVisibleToAttendees = this.roomVisibleToAttendees;

  }

  timeBracketChangedChanged() {
    this.timeBracketEnabled = !this.timeBracketEnabled;
    this.inputRoomModel.enableTimeBracket = this.timeBracketEnabled;
    if (this.timeBracketEnabled) {
      this.inputRoomModel.startDate = null;
      this.inputRoomModel.startTime = null;
      this.inputRoomModel.endDate = null;
      this.inputRoomModel.endTime = null;
    }
  }
  enableAttendeeToAttendeeVideoChatChanged() {
    this.enableAttendeeToAttendeeVideoChat = !this.enableAttendeeToAttendeeVideoChat;
    this.inputRoomModel.enableAttendeeToAttendeeVideoChat = this.enableAttendeeToAttendeeVideoChat;
  }

  enableIsWallEnabledChanged() {
    this.isWallEnabled = !this.isWallEnabled;
    this.inputRoomModel.isWallEnabled = this.isWallEnabled;
  }

  enableisChatEnabledChanged() {
    this.isChatEnabled = !this.isChatEnabled;
    this.inputRoomModel.isChatEnabled = this.isChatEnabled;
  }

  enableisKnockingEnabledChanged() {
    this.isKnockingEnabled = !this.isKnockingEnabled;
    this.inputRoomModel.isKnockingEnabled = this.isKnockingEnabled;
  }

  enableIsVideoChatEnabledChanged() {
    this.isVideoChatEnabled = !this.isVideoChatEnabled;
    this.inputRoomModel.isVideoChatEnabled = this.isVideoChatEnabled;
  }


  upsertRoom() {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertUpdateMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertWhitelistUpdateMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).no
    }).then((result) => {

      if (result.value) {
        console.log(this.inputRoomModel);
        if (this.inputRoomModel.languages === '') {
          this.languageNotSelected = true;
          alert('Please select a language');
          return
          return;
        } else {
          if (this.inputRoomModel.languages[0] === ',') {
            this.inputRoomModel.languages = this.inputRoomModel.languages.slice(1);
            if (this.inputRoomModel.languages === '') {
              this.languageNotSelected = true;
              alert('Please select a language');
              return
            }
          }
          if (this.inputRoomModel.languages[this.inputRoomModel.languages.length - 1] === ',') {
            this.inputRoomModel.languages = this.inputRoomModel.languages.slice(0, -1);
            if (this.inputRoomModel.languages === '') {
              this.languageNotSelected = true;
              alert('Please select a language');
              return
            }
          }

          this.inputRoomModel.entitlements = JSON.stringify(this.selectedEntitlementsArr);
          console.log(this.inputRoomModel);
          if (this.isBooth) {
            if (this.inputRoomModel.boothLogo === '' || this.inputRoomModel.boothLogo === undefined) {
              alert('Please upload booth logo');
              return
            }
          }
          this.spinner.show();
          this.inputRoomModel.timezoneId = (this.inputRoomModel.timezoneId == null || this.inputRoomModel.timezoneId == '' || this.inputRoomModel.timezoneId == undefined || this.inputRoomModel.timezoneId == AppUtils.emptyGuid ) ? this.eventDetails.timeZoneId : this.inputRoomModel.timezoneId;
          this.roomService.upsertRoom(this.inputRoomModel).subscribe((res) => {
            if (res.isSuccess) {

              Swal.fire({
                title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
                text: new SweetAlertMessage(this.translate).savedSuccessfully,
                icon: 'success',
                confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
              }).then(() => {
                this.router.navigate(['admin/events/rooms/', this.eventId]);
              });
            } else {
              Swal.fire(
                new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
                res.message,
                'error'
              );
            }
            this.spinner.hide();
          });
          console.log(this.inputRoomModel);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
      // this.spinner.hide();
    });
  }

  bindGroupEntitlements() {
    this.getByIdViewModel.id = this.route.snapshot.paramMap.get('id');
    this.eventEntitlementService.getGroupEntitlemts(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.inputRoomModel.eventEntitlements = res.groupEntitlementViewModels;
        const temp = [];
        for (let k = 0; k < this.inputRoomModel.eventEntitlements.length; k++) {
          temp.push({
            item_id: this.inputRoomModel.eventEntitlements[k].groupId,
            item_text: this.inputRoomModel.eventEntitlements[k].groupName
          });
          console.log(this.inputRoomModel.eventEntitlements);
          this.entitlementDropdownList = temp;
        }
        if (!this.IsAdd) {
          this.getRoomDetails();
        } else {
          this.eventName = this.localStorageService.get('EventName');
          this.getLanguagesByEventId();
        }
      }
    });
  }

  setEntitlementClass() {
    this.entitlementRequiredField = true;
    if (this.selectedEntitlementsArr.length > 0) {
      return 'validField';
    } else {
      return 'invalidField';
    }
  }

  // onEntitlementSelect(item: any) {
  //   this.selectedEntitlementsArr.push(item.item_id);
  //   this.selectedEntitlementsForInsert.push(item.item_id);

  // }

  // onEntitlementSelectAll(items: any) {
  //   for (let i = 0; i < items.length; i++) {
  //     if (this.selectedEntitlementsArr.indexOf(items[i].item_id) === -1) {
  //       this.selectedEntitlementsArr.push(items[i].item_id);
  //       this.selectedEntitlementsForInsert.push(items[i].item_id);
  //     }
  //   }
  // }

  // onEntitlementDeSelect(item: any) {
  //   const index = this.selectedEntitlementsArr.indexOf(item.item_id, 0);
  //   this.selectedEntitlementsArr.splice(index, 1);
  //   const i = this.selectedEntitlementsForInsert.indexOf(item.item_id, 0);
  //   this.selectedEntitlementsForInsert.splice(i, 1);
  //   if (this.selectedEntitlementsArr.length === 0) {
  //     this.entitlementRequiredField = true;
  //   }
  // }

  // onEntitlementDeSelectAll(items: any) {
  //   this.selectedEntitlementsArr = [];
  //   this.selectedEntitlementsForInsert = [];
  //   if (this.selectedEntitlementsArr.length === 0) {
  //     this.entitlementRequiredField = true;
  //   }
  // }

  checkRoomType(event) {
    if (event.target.value === '6426fb62-e428-43fe-bb58-3f1252fba304') {
      this.isBooth = true;
    } else {
      this.isBooth = false;
    }
  }

  getBoothShowOption(e, type) {
    if (e.target.checked) {
      this.inputRoomModel.boothTypeTwoDOrThreeD = type;
    }
  }

  onFileChange(event) {
    this.spinner.show();
    if (event.target.files.length > 0) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        if (this.helper.validateImageFile(file.name)) {
          const img = new Image();
          img.src = window.URL.createObjectURL(file);
          var x = true;
          img.addEventListener('load', () => {
            if (img.width > 200 || img.height > 200) {
              this.spinner.hide();
              Swal.fire({
                title: new SweetAlertMessage(this.translate).invalidFileType,
                text: new SweetAlertMessage(this.translate).imageSizeShouldNotMoreThan200,
                icon: 'error'
              });
            } else {
          formData.append('uploadFile', file, file.name);
          this.roomService.uploadBoothIcon(formData).subscribe((res) => {
            if (res.isSuccess) {
              this.inputRoomModel.boothLogo = res.message;
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
          event.target.value = '';

        }
      }
    } else {
      this.spinner.hide();
    }
  }

  removeBoothIcon() {
    this.inputRoomModel.boothLogo = '';
  }
}
