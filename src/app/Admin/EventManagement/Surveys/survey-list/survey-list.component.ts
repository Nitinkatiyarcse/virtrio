import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SurveysService } from 'src/app/Services/surveys.service';
import { Helper } from 'src/app/Utils/Helper';
import { NavigationService } from 'src/app/Utils/NavigationService';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {

  eventId = '';
  eventName = '';
  allSurveys = [];
  getByIdViewModel: any = {};
  inputSurvey: any = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute,
    public getterSetterService: GetterSetterService,
    private surveysService: SurveysService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private navigation: NavigationService,
    public router: Router,
    private helper: Helper) {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventName = this.localStorageService.get('EventName');
    this.getSurveylists();
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

  getSurveylists() {
    this.spinner.show();
    // this.getByIdViewModel.id = this.eventId;
    const surveyListRequest: any = {};
    surveyListRequest.eventId = this.eventId;
    surveyListRequest.userId = this.localStorageService.get('UserId');
    this.surveysService.getSurveylist(surveyListRequest).subscribe((res) => {
      if (res.isSuccess) {
        this.allSurveys = res.createSurveyListViewModels;
        this.dtTrigger.next();
      }
      this.spinner.hide();
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  }

  deleteSurvey(surveyId) {
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
        this.inputSurvey.surveyId = surveyId;
        this.inputSurvey.modifiedBy = this.localStorageService.get('UserId');
        this.surveysService.deleteSurvey(this.inputSurvey).subscribe((res) => {
          if (res.isSuccess) {
            this.getByIdViewModel.id = this.eventId;
            this.surveysService.getSurveylist(this.getByIdViewModel).subscribe((listResp) => {
              if (listResp.isSuccess) {
                this.allSurveys = listResp.createSurveyListViewModels;
              }
            });
          }
          this.spinner.hide();
        });
      }
    });
  }
}
