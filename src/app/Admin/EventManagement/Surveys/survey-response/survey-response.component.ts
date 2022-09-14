import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { timeStamp } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SurveysService } from 'src/app/Services/surveys.service';
import { Helper } from 'src/app/Utils/Helper';
import { NavigationService } from 'src/app/Utils/NavigationService';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';
import * as AppUtils from 'src/app/Utils/apputils';
@Component({
  selector: 'app-survey-response',
  templateUrl: './survey-response.component.html',
  styleUrls: ['./survey-response.component.css']
})
export class SurveyResponseComponent implements OnInit {
  eventName = '';
  eventId = '';
  surveyId = '';
  getByIdViewModel: any = {};
  surveyResponses = [];
  attendee = [];
  modalQuestions = [];
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
    this.eventName = this.localStorageService.get('EventName');
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.surveyId = this.route.snapshot.paramMap.get('surveyId');
    this.getSurveyResponse();
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
  getSurveyResponse() {
    console.log(this.surveyId);
    console.log(this.eventId);
    this.spinner.show();
    this.getByIdViewModel.id = this.surveyId;
    this.surveysService.getSurveyResponse(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.surveyResponses = res.surveyResponsesViewModels;
        console.log(this.surveyResponses);
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

  openModalOfResponse(questions) {
    this.modalQuestions = questions;
  }

}
