import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { from, Subject } from 'rxjs';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { Helper } from 'src/app/Utils/Helper';
import { NavigationService } from 'src/app/Utils/NavigationService';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';
import { LeaderboardService } from 'src/app/Services/leaderboard.service';
import * as AppUtils from '../../../../Utils/apputils';
@Component({
  selector: 'app-leaderboard-management',
  templateUrl: './leaderboard-management.component.html',
  styleUrls: ['./leaderboard-management.component.css']
})
export class LeaderboardManagementComponent implements OnInit {
  eventName = '';
  eventId = '';
  inputLeaderBoardModel: any = {};
  adminLeaderboardSchedules: any = {};
  adminLeaderboardScheduleList: any = [];

  adminLeaderboardBadges: any = {};
  adminLeaderboardBadgesList: any = [];

  badgesQualificationRules: any = {};
  badgesQualificationRulesList: any = [];

  public saveAndUpdateBtn = true;
  getbyIdViewModel: any = {};
  adminLeaderboardRecordFound = false;
  allTimezones: any = [];
  invalidDate = false;
  endMinDate: any;
  invalidTime = false;
  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private leaderboardService: LeaderboardService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private navigation: NavigationService,
    private eventManagementService: EventsManagementService,
    private helper: Helper
  ) {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventName = this.localStorageService.get('EventName');
    this.getAllTimezones();
    this.getAdminLeaderboard();
  }

  ngOnInit(): void {
  }

  clearboard() {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        const leaderboard: any = {};
        leaderboard.leaderboardId = this.inputLeaderBoardModel.leaderboardId;
        this.inputLeaderBoardModel.leaderboardName = '';
        leaderboard.modifiedBy = this.localStorageService.get('UserId');
        this.leaderboardService.deleteLeaderBoard(leaderboard).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).success,
              text: new SweetAlertMessage(this.translate).savedSuccessfully,
              icon: 'success',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertOkButtonText
            }).then(() => {
              this.getAdminLeaderboard();
            });
          } else {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              text: res.message,
              icon: 'warning',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertOkButtonText
            }).then(() => {
              this.getAdminLeaderboard();
            });
          }
          this.spinner.hide();
        });
      }
    });
  }

  getAllTimezones() {
    this.eventManagementService.TimeZone().subscribe((res) => {
      this.allTimezones = res;
      this.adminLeaderboardSchedules.timeZoneId = '';
    });
  }



  validateDates() {
    if (this.adminLeaderboardSchedules.startDate != null && this.adminLeaderboardSchedules.startDate == null) {
      return false;
    } else if (this.adminLeaderboardSchedules.startDate == null && this.adminLeaderboardSchedules.startDate != null) {
      this.invalidDate = true;
    } else {
      if (this.adminLeaderboardSchedules.startDate == null) {
        this.invalidDate = true;
      } else {
        if (new Date(this.adminLeaderboardSchedules.startDate) > new Date(this.adminLeaderboardSchedules.endDate)) {
          this.invalidDate = true;
        } else {
          this.invalidDate = false;
        }
      }
    }
    const endMinDate = new Date(this.adminLeaderboardSchedules.startDate);
    this.endMinDate = {
      'year': endMinDate.getFullYear(),
      'month': endMinDate.getMonth() + 1,
      'day': endMinDate.getDate()
    };
  }


  validateTime() {

    if (this.adminLeaderboardSchedules.startTime != null && this.adminLeaderboardSchedules.endTime == null) {
      return false;
    } else if (this.adminLeaderboardSchedules.startTime == null && this.adminLeaderboardSchedules.endTime != null) {
      this.invalidTime = true;
    } else {
      if (this.adminLeaderboardSchedules.startTime == null) {
        this.invalidTime = true;
      } else {
        if (new Date(this.adminLeaderboardSchedules.startTime) > new Date(this.adminLeaderboardSchedules.endTime)) {
          if (this.adminLeaderboardSchedules.startDate < this.adminLeaderboardSchedules.endDate) {
            this.invalidTime = false;
          } else {
            this.invalidTime = true;
          }
        } else {
          this.invalidTime = false;
        }
      }
    }

  }


  getAdminLeaderboard() {
    this.spinner.show();
    this.getbyIdViewModel.id = this.eventId;
    this.leaderboardService.getAdminLeaderBoard(this.getbyIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.adminLeaderboardRecordFound = true;
        this.inputLeaderBoardModel = res.adminLeaderboard;
        res.adminLeaderboardSchedules.forEach(element => {
          element.startDate = this.helper.convertDateToLocalTimezone(element.startDate);
          element.startTime = this.helper.convertDateToLocalTimezone(element.startTime);
          element.endDate = this.helper.convertDateToLocalTimezone(element.endDate);
          element.endTime = this.helper.convertDateToLocalTimezone(element.endTime);
        });
        this.adminLeaderboardScheduleList = res.adminLeaderboardSchedules;
        this.adminLeaderboardBadgesList = res.adminLeaderboardBadges;
        this.badgesQualificationRulesList = res.badgesQualificationRules;

      } else {
        this.adminLeaderboardRecordFound = false;
      }
      this.spinner.hide();
    });
  }

  SaveLeaderboard() {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertUpdateMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertWhitelistUpdateMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).no
    }).then((result) => {

      if (result.value) {
        if (this.inputLeaderBoardModel.leaderboardName) {
          if (this.adminLeaderboardRecordFound) {
            // update record
            this.inputLeaderBoardModel.modifiedBy = this.localStorageService.get('UserId');
          } else {
            // insert record
            this.inputLeaderBoardModel.createdBy = this.localStorageService.get('UserId');
            this.inputLeaderBoardModel.leaderBoardId = AppUtils.emptyGuid;
          }
          this.inputLeaderBoardModel.eventId = this.eventId;
          this.leaderboardService.upsertLeaderBoard(this.inputLeaderBoardModel).subscribe((res) => {
            if (res.isSuccess) {
              Swal.fire({
                title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
                text: new SweetAlertMessage(this.translate).savedSuccessfully,
                icon: 'success',
                confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
              }).then(() => {
                this.getAdminLeaderboard();
              });
            } else {
              Swal.fire({
                title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
                text: res.message,
                icon: 'error',
                confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
              }).then(() => {
                this.getAdminLeaderboard();
              });
            }
          });
        }
        else {
          return;
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
      // this.spinner.hide();
    });
  }

  saveSchedule() {
    this.adminLeaderboardSchedules.createdBy = this.localStorageService.get('UserId');
    this.adminLeaderboardSchedules.adminLeaderboardId = this.inputLeaderBoardModel.leaderboardId;
    this.adminLeaderboardSchedules.leaderboardScheduleId = AppUtils.emptyGuid;
    console.log(this.adminLeaderboardSchedules);
    if (!this.invalidDate && !this.invalidTime) {
      this.spinner.show();
      this.leaderboardService.upsertLeaderboardSchedule(this.adminLeaderboardSchedules).subscribe((res) => {
        if (res.isSuccess) {
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
            text: new SweetAlertMessage(this.translate).savedSuccessfully,
            icon: 'success',
            confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
          }).then(() => {
            this.getAdminLeaderboard();
          });
        } else {
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
            text: res.message,
            icon: 'error',
            confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
          }).then(() => {
            this.getAdminLeaderboard();
          });
        }
        this.spinner.hide();
      });
    } else {
      return;
    }
  }

  deleteSchedule(item) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        const schedule: any = {};
        schedule.leaderboardScheduleId = item.leaderboardScheduleId;
        schedule.modifiedBy = this.localStorageService.get('UserId');


        this.leaderboardService.deleteLeaderboardSchedule(schedule).subscribe((res) => {
          if (res.isSuccess) {
            this.getAdminLeaderboard();
          } else {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              text: res.message,
              icon: 'warning',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertOkButtonText
            }).then(() => {
              this.getAdminLeaderboard();
            });
          }
          this.spinner.hide();
        });
      }
    });
  }

  updateBadge(badgeId) {
    location.href = '/admin/events/updateBadge/' + badgeId + '/' + this.eventId;
  }


  deleteBadge(badgeId,status) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertApproveMessage,
      text: status === 1
         ? new SweetAlertMessage(this.translate).sweetAlertLeaderBoardBadgeActiveSubMessage
         : new SweetAlertMessage(this.translate).sweetAlertLeaderBoardBadgeDeactiveMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).no
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        const badge: any = {};
        badge.adminLeaderboardBadgeId = badgeId;
        badge.isActive = status === 0 ? false : true;
        badge.modifiedBy = this.localStorageService.get('UserId');
        this.leaderboardService.deleteLeaderBoardBadges(badge).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
               text: status === 0
                 ? new SweetAlertMessage(this.translate).deactiveSuccessfully
                 : new SweetAlertMessage(this.translate).activeSuccessfully,
               icon: 'success',
               confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertOkButtonText,
            }).then(() => {
              this.getAdminLeaderboard();
            });
          } else {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
               text: res.message,
               icon: 'error',
               confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertOkButtonText,
            }).then(() => {
              this.getAdminLeaderboard();
            });
          }
          this.spinner.hide();
        });
      }
    });
  }

  enable() {
    this.saveAndUpdateBtn = false;
    //this.isEmailUpdate = true;
  }

  disable() {
    this.saveAndUpdateBtn = true;
    //this.isEmailUpdate = false;
  }

  
}
