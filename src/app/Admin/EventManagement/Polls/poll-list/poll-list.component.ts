import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { PollsService } from 'src/app/Services/polls.service';
import { SurveysService } from 'src/app/Services/surveys.service';
import { Helper } from 'src/app/Utils/Helper';
import { NavigationService } from 'src/app/Utils/NavigationService';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css']
})
export class PollListComponent implements OnInit {

  eventId = '';
  eventName = '';
  allPolls = [];
  getByIdViewModel: any = {};
  inputSurvey: any = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  pollsViewModel: any = [];

  constructor(private route: ActivatedRoute,
    public getterSetterService: GetterSetterService,
    private pollsService: PollsService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private navigation: NavigationService,
    public router: Router,
    private helper: Helper) {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventName = this.localStorageService.get('EventName');
    this.getPollsList();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  }

  ngOnInit(): void {
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }


  getPollsList() {
    this.spinner.show();
    const pollRequestModel: any = {};
    pollRequestModel.eventId = this.eventId;
    pollRequestModel.userId = this.localStorageService.get('UserId');
    this.pollsService.getAllPollslist(pollRequestModel).subscribe((res) => {
      if (res.isSuccess) {
        this.pollsViewModel = res.pollsList;
        console.log(this.pollsViewModel);
        this.dtTrigger.next();
      } else {

      }
      this.spinner.hide();
    });
  }

  deletePoll(pollId) {
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
        const poll: any = {};
        poll.pollId = pollId;
        poll.modifiedBy = this.localStorageService.get('UserId');
        this.pollsService.deletePoll(poll).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetalertDeletedHeader,
              text: new SweetAlertMessage(this.translate).sweetAlertDeletedSuccessMessage,
              icon: 'success',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
            }).then(() => {
              this.spinner.show();
              this.getByIdViewModel.id = this.eventId;
              this.pollsService.getPollslist(this.getByIdViewModel).subscribe((resp) => {
                if (resp.isSuccess) {
                  this.pollsViewModel = resp.pollsList;
                  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    // Destroy the table first
                    dtInstance.destroy();
                    // Call the dtTrigger to rerender again
                    this.dtTrigger.next();
                  });
                } else {

                }
                this.spinner.hide();
              });
            });
          } else {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              text: res.message,
              icon: 'error',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
            }).then(() => {
              this.getByIdViewModel.id = this.eventId;
              this.pollsService.getPollslist(this.getByIdViewModel).subscribe((resp) => {
                if (resp.isSuccess) {
                  this.pollsViewModel = resp.pollsList;
                } else {

                }
              });
            });
          }
          this.spinner.hide();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
}
