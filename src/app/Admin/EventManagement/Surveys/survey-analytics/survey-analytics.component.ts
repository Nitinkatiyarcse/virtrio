import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { timeStamp } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SurveysService } from 'src/app/Services/surveys.service';
import { Helper } from 'src/app/Utils/Helper';
import { NavigationService } from 'src/app/Utils/NavigationService';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';
import * as AppUtils from 'src/app/Utils/apputils';
@Component({
  selector: 'app-survey-analytics',
  templateUrl: './survey-analytics.component.html',
  styleUrls: ['./survey-analytics.component.css']
})
export class SurveyAnalyticsComponent implements OnInit {
  eventName = '';
  eventId = '';
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
  }

  ngOnInit(): void {
  }

}
