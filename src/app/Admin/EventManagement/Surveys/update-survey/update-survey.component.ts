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
  selector: 'app-update-survey',
  templateUrl: './update-survey.component.html',
  styleUrls: ['./update-survey.component.css']
})
export class UpdateSurveyComponent implements OnInit {
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
    this.inputCreateSurveyModel.surveys.eventId = this.eventId;
    this.inputCreateSurveyModel.surveys.surveyId = this.surveyId;
    this.inputCreateSurveyModel.surveys.createdBy = this.localStorageService.get('UserId');
    this.inputCreateSurveyModel.surveys.modifiedBy = this.localStorageService.get('UserId');
    this.inputCreateSurveyModel.surveys.isRequired = false;
    this.inputCreateSurveyModel.questions = this.inputCreateSurveyModel.questions;



    this.eventName = this.localStorageService.get('EventName');
    this.getSurveyEvents();
    this.getSurveysQuestionTypes();
    if (this.surveyId != null) {
      this.IsAdd = false;
      this.getSurveyDetails();
    } else {
      this.surveyId = AppUtils.emptyGuid;
      this.inputCreateSurveyModel.questions.push({
        order: this.count,
        question: '',
        questionType: '',
        isChoice: false,
        choices: [{ choice: '' }, { choice: '' }],
        answer: '',
        createdBy: this.localStorageService.get('UserId'),
        modifiedBy: this.localStorageService.get('UserId')
      });

    }
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

  getSurveyDetails() {
    this.spinner.show();
    this.getByIdViewModel.id = this.surveyId;
    this.surveysService.getSurveyDetails(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.inputCreateSurveyModel = res.createSurveyListViewModels[0];
        this.inputCreateSurveyModel.surveys.modifiedBy = this.localStorageService.get('UserId');
        this.dtTrigger.next();
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true
        };
      }
      this.spinner.hide();
    });
  }
  getSurveyEvents() {
    this.spinner.show();
    this.surveysService.getSurveyEvents().subscribe((res) => {
      if (res.isSuccess) {
        this.surveysEvents = res.surveyShowEvents;
        console.log(this.surveysEvents);
        if (this.IsAdd) {
          this.inputCreateSurveyModel.surveys.surveyShowEventId = this.surveysEvents[0].surveyShowEventId;
        }
      }
      this.spinner.hide();
    });
  }

  getSurveysQuestionTypes() {
    this.spinner.show();
    this.surveysService.getSurveysQuestionTypes().subscribe((res) => {
      if (res.isSuccess) {
        this.surveyQuestionTypes = res.surveysQuestionTypes;
      }
      this.spinner.hide();
    });
  }


  // addQuestion() {
  //   this.inputCreateSurveyModel.questions.push({
  //     questionId:AppUtils.emptyGuid,
  //     order: this.count,
  //     question: '',
  //     questionType: AppUtils.emptyGuid,
  //     isChoice: false,
  //     choices: [],
  //     answer: '',
  //     createdBy: this.localStorageService.get('UserId'),
  //     modifiedBy: this.localStorageService.get('UserId')
  //   });
  //   this.inputCreateSurveyModel.questions[this.inputCreateSurveyModel.questions.length - 1].questionType
  //     = this.surveyQuestionTypes[0].surveyQuestionTypeId;
  // }
  // deleteQuestion(index) {
  //   const outArr = [];
  //   for (let i = 0; i < this.inputCreateSurveyModel.questions.length; i++) {
  //     if (i !== index) {
  //       outArr.push(this.inputCreateSurveyModel.questions[i]);
  //     }
  //   }
  //   this.inputCreateSurveyModel.questions = outArr;
  // }

  // selectQuestionType(index, value, id) {
  //   if (value === 'Choice') {
  //     this.inputCreateSurveyModel.questions[index].isChoice = true;
  //   } else {
  //     this.inputCreateSurveyModel.questions[index].isChoice = false;
  //   }
  //   this.inputCreateSurveyModel.questions[index].questionType = id;

  // }

  // addChoice(index) {
  //   this.inputCreateSurveyModel.questions[index].choices.push({ choice: '' });
  // }

  // deleteChoice(index, questionChoiceIndex) {
  //   this.inputCreateSurveyModel.questions[index].choices
  //     .splice(this.inputCreateSurveyModel.questions[index].choices[questionChoiceIndex], 1);
  // }


  addQuestion() {
    this.addedChoice = 0;
    this.question = {
      questionId: AppUtils.emptyGuid,
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
      this.inputCreateSurveyModel.questions[this.updateIndex] = (this.question);
      this.updateIndex = '';
    } else {
      this.inputCreateSurveyModel.questions.push(this.question);
    }
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
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
    this.inputCreateSurveyModel.questions.splice(index, 1);
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
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
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertUpdateMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertWhitelistUpdateMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).no
    }).then((result) => {

      if (result.value) {
        this.spinner.show();
        this.inputCreateSurveyModel.responseCount = 0;
        this.surveysService.updateSurvey(this.inputCreateSurveyModel).subscribe((res) => {
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
      // this.spinner.hide();
    });
  }
}
