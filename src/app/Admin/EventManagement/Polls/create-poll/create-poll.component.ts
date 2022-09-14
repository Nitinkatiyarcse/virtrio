import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { timeStamp } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SurveysService } from 'src/app/Services/surveys.service';
import { PollsService } from 'src/app/Services/polls.service';
import { Helper } from 'src/app/Utils/Helper';
import { NavigationService } from 'src/app/Utils/NavigationService';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';
import * as AppUtils from '../../../../Utils/apputils';
@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {

  eventName = '';
  question: any = {};
  count = 1;
  defaultQuestionType = '';
  inputCreatePollModel: any = {};
  eventId = '';
  IsAdd = true;


  surveyQuestionTypes = [];
  allQuestions = [];
  getByIdViewModel: any = {};
  addedChoice = 0;
  updateIndex = '';
  roleDisplayName = '';
  isBoothAdmin = false;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private spinner: NgxSpinnerService,
    private localStorageService: LocalStorageService,
    private surveysService: SurveysService,
    private pollsService: PollsService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    public router: Router
  ) {
    this.roleDisplayName = this.localStorageService.get('Role');
    this.isBoothAdmin = this.roleDisplayName === 'SuperAdmin' ? true : this.roleDisplayName === 'EventAdmin' ? true : false;
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventName = this.localStorageService.get('EventName');
    this.getSurveysQuestionTypes();
    this.inputCreatePollModel.polls = {};
    this.inputCreatePollModel.pollsQuestions = {};
    this.inputCreatePollModel.polls.createdBy = this.localStorageService.get('UserId');
    this.inputCreatePollModel.polls.modifiedBy = this.localStorageService.get('UserId');
    this.inputCreatePollModel.polls.pollId = AppUtils.emptyGuid;
    this.inputCreatePollModel.polls.eventId = this.eventId;
    this.inputCreatePollModel.polls.pollLevel = '';
  }

  ngOnInit(): void {
  }


  isPollRequired(val) {
    this.inputCreatePollModel.polls.isRequired = val;

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
    this.localStorageService.set('poll', JSON.stringify(ques));
    this.question = this.allQuestions[index];
    this.updateIndex = index;
  }

  closeModal() {
    if (this.updateIndex !== '') {
      this.allQuestions[this.updateIndex] = JSON.parse(this.localStorageService.get('poll'));
      this.updateIndex = '';
      this.localStorageService.set('poll', '');
    }
  }

  deleteQuestion(index) {
    this.allQuestions.splice(index, 1);
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

  savePoll() {
    this.inputCreatePollModel.pollsQuestions = this.allQuestions[0];
    if (this.inputCreatePollModel.pollsQuestions != null) {
      console.log(this.inputCreatePollModel);

      this.pollsService.savePoll(this.inputCreatePollModel).subscribe((res) => {
        if (res.isSuccess) {
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
            text: new SweetAlertMessage(this.translate).savedSuccessfully,
            icon: 'success',
            confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
          }).then(() => {
            this.router.navigate(['/admin/events/Polllist/', this.eventId]);
          });
        } else {
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
            text: res.message,
            icon: 'error',
            confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
          }).then(() => {
            this.router.navigate(['/admin/events/Polllist/', this.eventId]);
          });
        }
      });
    } else {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: new SweetAlertMessage(this.translate).pleaseAddQuestion,
        icon: 'error',
        confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
      }).then(() => {

      });
    }
  }

}
