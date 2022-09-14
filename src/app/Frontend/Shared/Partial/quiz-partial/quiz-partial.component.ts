import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import Swal from 'sweetalert2';
import { Helper } from 'src/app/Utils/Helper';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuizService } from 'src/app/Services/quiz.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { TranslateService } from '@ngx-translate/core';
import * as AppUtils from 'src/app/Utils/apputils';
import { CommonService } from 'src/app/Utils/common';

@Component({
  selector: 'app-quiz-partial',
  templateUrl: './quiz-partial.component.html',
  styleUrls: ['./quiz-partial.component.css']
})
export class QuizPartialComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  quiz: any[] = [];
  answeredQuiz: any = [];
  showInstruction = true;
  presentQuestion: any;
  showNextButton = false;
  showPreviousButton = false;
  showSubmitButton = false;
  answerCount = 0;
  isPassed = false;
  isFailed = false;
  showClose = true;
  inputAttendeeQuizModel: any = {};
  eventDetails: any = {};
  timerData = '';
  eventId = '';
  allQuiz = [];
  shouldProcess = true;
  quizStartDate: any;
  quizEndDate: any;
  constructor(public bsModalRef: BsModalRef,
    private sessionStorageService: SessionStorageService,
    private attendeeService: AttendeesService,
    private translate: TranslateService,
    private helper: Helper,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService, private commonService: CommonService,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    //console.log(this.quiz);
    if (this.quiz[0].quiz.quizStartDate) {
      this.quiz[0].quiz.quizStartDate = this.helper.convertDateToLocalTimezone(this.quiz[0].quiz.quizStartDate);
    }
    if (this.quiz[0].quiz.quizStartTime) {
      this.quiz[0].quiz.quizStartTime = this.helper.convertDateToLocalTimezone(this.quiz[0].quiz.quizStartTime);
    }
    if (this.quiz[0].quiz.quizEndDate) {
      this.quiz[0].quiz.quizEndDate = this.helper.convertDateToLocalTimezone(this.quiz[0].quiz.quizEndDate);
    }
    if (this.quiz[0].quiz.quizEndTime) {
      this.quiz[0].quiz.quizEndTime = this.helper.convertDateToLocalTimezone(this.quiz[0].quiz.quizEndTime);
    }

    this.quizStartDate = this.helper.combineDateAndTime(this.quiz[0].quiz.quizStartDate, this.quiz[0].quiz.quizStartTime);
    this.quizEndDate = this.helper.combineDateAndTime(this.quiz[0].quiz.quizEndDate, this.quiz[0].quiz.quizEndTime);


  }

  closeModal() {
    this.bsModalRef.hide();
  }
  acceptAndContinue() {
    console.log(this.quiz);
    if (this.helper.dateCheck(this.quizStartDate, this.quizEndDate, new Date())) {
      console.log('valid');
      // update question data and start
      if (this.sessionStorageService.get('AttendeeId')) {
        this.inputAttendeeQuizModel.attendeeId = this.sessionStorageService.get('AttendeeId');
        this.inputAttendeeQuizModel.quizId = this.quiz[0].quiz.quizId;
        this.inputAttendeeQuizModel.isPassed = false;
        this.inputAttendeeQuizModel.totalMarks = 0;
        this.inputAttendeeQuizModel.isCompleted = false;
        this.spinner.show();
        this.attendeeService.startAttendeeQuiz(this.inputAttendeeQuizModel).subscribe((res) => {
          if (res.isSuccess) {
            this.spinner.hide();
            this.inputAttendeeQuizModel.attendQuizId = res.attendQuizId;
            this.hideInstructionsAndShowQuestions();

            const currentDate = new Date();
            var endDateForTimer = new Date(currentDate.getTime() + this.quiz[0].quiz.quizTime * 60000);
            const endDateTimeForTimer = new Date(endDateForTimer.getFullYear(),
              endDateForTimer.getMonth(),
              endDateForTimer.getDate(),
              endDateForTimer.getHours(),
              endDateForTimer.getMinutes(),
              endDateForTimer.getSeconds()
            );
            if (endDateTimeForTimer > new Date()) {
              this.initializeClock(endDateTimeForTimer);
            }

          } else {
            this.spinner.hide();
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              text: res.message,
              icon: 'error'
            });
          }

        });
      } else {
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: new SweetAlertMessage(this.translate).loginFirstToOperate,
          icon: 'error'
        });
      }
    } else {
      console.log('invalid');
      var msg = new SweetAlertMessage(this.translate).quizNotStarted + " " + new SweetAlertMessage(this.translate).quizWillBeStartedBetween + " " + this.helper.fotmatCombinedDateTime(this.quizStartDate) + " " + new SweetAlertMessage(this.translate).and + " " + this.helper.fotmatCombinedDateTime(this.quizEndDate);
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: msg,
        icon: 'error'
      });
    }

  }


  hideInstructionsAndShowQuestions() {
    this.showClose = false;
    this.showInstruction = false;
    this.showNextButton = true;
    this.presentQuestion = this.quiz[0].quizQuestions[0];

  }
  openNextQuestion() {
    this.answeredQuiz.push(this.presentQuestion);
    this.answerCount = this.answerCount + 1;
    this.presentQuestion = [];
    this.presentQuestion = this.quiz[0].quizQuestions.filter(u => !this.answeredQuiz.includes(u))[0];

    this.showPreviousButton = true;
    if (this.answerCount + 1 === (this.quiz[0].quizQuestions.length === 1 ? this.quiz[0].quizQuestions.length + 1 : this.quiz[0].quizQuestions.length)) {
      this.showNextButton = false;
      this.showSubmitButton = true;
    }
  }

  submitChoice(event, index) {
    this.presentQuestion.choices[index].answer = true;
  }

  openPreviousQuestion() {
    this.answerCount = this.answerCount - 1;
    this.presentQuestion = this.answeredQuiz[this.answerCount];
    if (this.answerCount === 0) {
      this.showPreviousButton = false;
    }
    if (this.answerCount + 1 !== this.quiz[0].quizQuestions.length) {
      this.showNextButton = true;
      this.showSubmitButton = false;
    }
  }

  submitQuiz() {
    if (this.sessionStorageService.get('AttendeeId')) {
      this.inputAttendeeQuizModel.attendeeId = this.sessionStorageService.get('AttendeeId');
      this.inputAttendeeQuizModel.quizId = this.quiz[0].quiz.quizId;
      this.inputAttendeeQuizModel.QuizQuestionsViewModel = this.quiz[0];
      // console.log(this.inputAttendeeQuizModel);
      this.presentQuestion = false;
      this.spinner.show();
      this.attendeeService.saveAttendeeQuizResponse(this.inputAttendeeQuizModel).subscribe((res) => {
        if (res.isSuccess) {
          var evnt: any;

          this.commonService.logAttendeeClicks(evnt, 'Completing the QUIZ', this.quiz[0], this.eventDetails.eventId, false, AppUtils.emptyGuid, this.sessionStorageService.get('AttendeeId'), null);
          this.spinner.hide();
          this.showInstruction = false;
          this.showNextButton = false;
          this.showPreviousButton = false;
          this.showSubmitButton = false;
          this.inputAttendeeQuizModel.passMessage = res.message;

          if (res.isPassed) {
            this.isPassed = true;
            this.isFailed = false;
          } else {
            this.isFailed = true;
            this.isPassed = false;
          }
          this.showClose = true;



        } else {
          this.spinner.hide();
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
            text: new SweetAlertMessage(this.translate).sweetAlertSomeErrorOccuredErrorMessage,
            icon: 'error'
          });
        }

      });
    } else {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: new SweetAlertMessage(this.translate).loginFirstToOperate,
        icon: 'error'
      });
    }
  //   ngOnDestroy() {
  //     clearInterval(this.timerData);
  // }
  }

  downloadCertificate() {
    this.inputAttendeeQuizModel.attendeeId = this.sessionStorageService.get('AttendeeId');
    this.inputAttendeeQuizModel.quizId = this.quiz[0].quiz.quizId;
    this.spinner.show();
    this.attendeeService.sendEmailOnDownlCertificate(this.inputAttendeeQuizModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).certificateSentSuccessfully,
          icon: 'success'
        });
      } else {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: new SweetAlertMessage(this.translate).errorInSendingEmail,
          icon: 'error'
        });
      }
    });
  }







  /**
  * Start clock(timer)
  * @param endtime
  */
  initializeClock(endtime) {
    const timeinterval = setInterval(() => {
      const t = this.getTimeRemaining(endtime);
      console.log(t)
      this.timerData = //t.days + ' ' + this.translate.instant('days') + ', ' +
        t.hours + ':' +
        t.minutes + ':'
        + t.seconds;
      if (t.total <= 0) {
        clearInterval(timeinterval);
        //Your time is over
        Swal.fire({
          title: new SweetAlertMessage(this.translate).alert,
          text: new SweetAlertMessage(this.translate).quizTimeCompleted,
          icon: 'error'
        }).then((result) => {
          this.submitQuiz();
        });
      }

    }, 1000);
    
  }


  

  // get time remaining
  getTimeRemaining(endtime) {
    const currentDate: any = new Date();
    const total = Date.parse(endtime) - Date.parse(currentDate);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }
}
