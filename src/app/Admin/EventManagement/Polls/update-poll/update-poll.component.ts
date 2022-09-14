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
import * as AppUtils from 'src/app/Utils/apputils';

@Component({
  selector: 'app-update-poll',
  templateUrl: './update-poll.component.html',
  styleUrls: ['./update-poll.component.css']
})
export class UpdatePollComponent implements OnInit {

  eventName = '';
  pollId = '';
  question: any = {};
  count = 1;
  defaultQuestionType = '';
  inputCreatePollModel: any = {};
  eventId = '';
  IsAdd = true;


  surveyQuestionTypes = [];
  allQuestions: any;
  getByIdViewModel: any = {};
  addedChoice = 0;
  updateIndex = '';
  questLength = 0;
  roleDisplayName = '';
  isBoothAdmin = false;
  constructor(private spinner: NgxSpinnerService,
    private localStorageService: LocalStorageService,
    private surveysService: SurveysService,
    private pollsService: PollsService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    public router: Router) {
    this.roleDisplayName = this.localStorageService.get('Role');
    this.isBoothAdmin = this.roleDisplayName === 'SuperAdmin' ? true : this.roleDisplayName === 'EventAdmin' ? true : false;
    this.pollId = this.route.snapshot.paramMap.get('pollId');
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventName = this.localStorageService.get('EventName');
    this.getSurveysQuestionTypes();
    this.inputCreatePollModel.polls = {};
    this.inputCreatePollModel.polls.Questions = {};
    this.inputCreatePollModel.polls.createdBy = this.localStorageService.get('UserId');
    this.inputCreatePollModel.polls.modifiedBy = this.localStorageService.get('UserId');
    this.inputCreatePollModel.polls.pollId = AppUtils.emptyGuid;
    this.inputCreatePollModel.polls.eventId = this.eventId;
    this.getPollDetails();


  }


  ngOnInit(): void {
  }

  getPollDetails() {
    this.spinner.show();
    this.getByIdViewModel.id = this.pollId;
    this.pollsService.getPollDetails(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.inputCreatePollModel.polls = res.pollsList[0].polls;
        this.inputCreatePollModel.pollsQuestions = res.pollsList[0].pollsQuestions;
        this.inputCreatePollModel.polls.modifiedBy = this.localStorageService.get('UserId');
        this.allQuestions = res.pollsList[0].pollsQuestions;
        console.log(this.allQuestions);
        this.question = res.pollsList[0].pollsQuestions;
        this.spinner.hide();
      }

    });
  }



  isPollRequired(val) {
    this.inputCreatePollModel.polls.isRequired = val;

  }


  selectQuestionType(ques, value, id) {
    this.question = ques;
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

  deleteQuestion() {
    this.allQuestions = [];
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
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertUpdateMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertWhitelistUpdateMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).yes,
      cancelButtonText: new SweetAlertMessage(this.translate).no
    }).then((result) => {

      if (result.value) {
        this.inputCreatePollModel.pollsQuestions = this.allQuestions;
        console.log(this.inputCreatePollModel);
        this.pollsService.updatePoll(this.inputCreatePollModel).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: new SweetAlertMessage(this.translate).updatedSuccessfullyMessage,
              icon: 'success',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
            }).then(() => {
              this.router.navigate(['admin/events/Polllist/', this.eventId]);
            });
          } else {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              text: res.message,
              icon: 'error',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
            }).then(() => {
              this.router.navigate(['admin/events/Polllist/', this.eventId]);
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
      // this.spinner.hide();
    });
  }


}
