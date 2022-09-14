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
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {
  eventId = '';
  surveyId = '';
  eventName = '';
  IsAdd = true;
  inputCreateSurveyModel: any = {};
  surveysEvents = [];
  surveyQuestionTypes = [];
  allQuestions = [];
  count = 1;
  getByIdViewModel: any = {};
  question: any = {};
  defaultQuestionType = '';
  addedChoice = 0;
  updateIndex = '';
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  roleDisplayName = '';
  isBoothAdmin = false;
  constructor(private route: ActivatedRoute,
    public getterSetterService: GetterSetterService,
    private surveysService: SurveysService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private navigation: NavigationService,
    public router: Router,
    private helper: Helper) {
      this.roleDisplayName = this.localStorageService.get('Role');
    this.isBoothAdmin = this.roleDisplayName === 'SuperAdmin' ? true : this.roleDisplayName === 'EventAdmin' ? true : false;
    
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.surveyId = this.route.snapshot.paramMap.get('surveyId');
    this.inputCreateSurveyModel.surveys = {};
    this.inputCreateSurveyModel.questions = {};
    this.surveyId = AppUtils.emptyGuid;
    this.inputCreateSurveyModel.surveys.eventId = this.eventId;
    this.inputCreateSurveyModel.surveys.surveyId = this.surveyId;
    this.inputCreateSurveyModel.surveys.createdBy = this.localStorageService.get('UserId');
    this.inputCreateSurveyModel.surveys.modifiedBy = this.localStorageService.get('UserId');
    this.inputCreateSurveyModel.surveys.isRequired = false;
    this.inputCreateSurveyModel.questions = this.allQuestions;
    this.eventName = this.localStorageService.get('EventName');
    this.inputCreateSurveyModel.surveys.surveyLevel='';
    this.getSurveyEvents();
    this.getSurveysQuestionTypes();
    this.dtTrigger.next();
  }


  ngOnInit(): void {
  }

  getSurveyEvents() {
    this.spinner.show();
    this.surveysService.getSurveyEvents().subscribe((res) => {
      if (res.isSuccess) {
        this.surveysEvents = res.surveyShowEvents;
        console.log(this.surveysEvents);
        this.inputCreateSurveyModel.surveys.surveyShowEventId = this.surveysEvents[0].surveyShowEventId;
      }
      this.spinner.hide();
    });
  }

  getSurveysQuestionTypes() {
    this.spinner.show();
    this.surveysService.getSurveysQuestionTypes().subscribe((res) => {
      if (res.isSuccess) {
        this.surveyQuestionTypes = res.surveysQuestionTypes;
        console.log(this.surveyQuestionTypes);
        this.defaultQuestionType = this.surveyQuestionTypes[0].surveyQuestionTypeId;
      }
      this.spinner.hide();
    });
  }

  addQuestion() {
    this.addedChoice = 0;
    this.question = {
      order: this.count,
      question: '',
      questionType: this.defaultQuestionType,
      isChoice: false,
      choices: [{ choice: '' }],
      answer: '',
      createdBy: this.localStorageService.get('UserId'),
      modifiedBy: this.localStorageService.get('UserId')
    };
  }

  selectQuestionType(value, id) {
    if (value === 'Choice') {
      this.question.isChoice = true;
    } else {
      this.question.isChoice = false;
    }
    this.question.questionType = id;

  }

  addChoice() {
    this.addedChoice = this.addedChoice + 1;
    this.question.choices.push({ choice: '' });

  }

  deleteChoice(questionChoiceIndex) {
    this.question.choices.splice(questionChoiceIndex, 1);
    this.addedChoice = this.addedChoice - 1;
  }

  saveQuestion() {
    if (this.updateIndex !== '') {
      this.allQuestions[this.updateIndex] = (this.question);
      this.updateIndex = '';
    } else {
      this.allQuestions.push(this.question);
    }
  }

  updateQuestion(index, ques) {
    this.localStorageService.set('surve', JSON.stringify(ques));
    this.question = this.inputCreateSurveyModel.questions[index];
    this.updateIndex = index;
  }

  closeModal() {
    if (this.updateIndex !== '') {
      this.inputCreateSurveyModel.questions[this.updateIndex] = JSON.parse(this.localStorageService.get('surve'));
      this.updateIndex = '';
      this.localStorageService.set('surve', '');
    }
  }

  deleteQuestion(index) {
    this.allQuestions.splice(index, 1);
  }

  selectSurveyShowEvent(event, surveyShowEventId) {
    if (event.target.checked) {
      this.inputCreateSurveyModel.surveys.surveyShowEventId = event.target.value;

    }
  }

  isSurveyRequired(val) {
    this.inputCreateSurveyModel.surveys.isRequired = val;
  }

  saveSurvey() {
    this.spinner.show();
    this.inputCreateSurveyModel.responseCount = 0;
    console.log(this.inputCreateSurveyModel);
    this.surveysService.saveSurvey(this.inputCreateSurveyModel).subscribe((res) => {
      if (res.isSuccess) {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).savedSuccessfully,
          icon: 'success',
          confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
        }).then(() => {
          this.router.navigate(['/admin/events/Surveylist/', this.eventId]);
        });

      } else {
        Swal.fire(
          new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          res.errors[0],
          'error'
        );
      }
      this.spinner.hide();
    });
  }
}
