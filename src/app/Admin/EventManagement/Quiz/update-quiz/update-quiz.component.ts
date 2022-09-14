import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import * as AppUtils from 'src/app/Utils/apputils';
import { QuizService } from 'src/app/Services/quiz.service';
import { DataTableDirective } from 'angular-datatables';
import { ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Helper } from 'src/app/Utils/Helper';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  eventName = '';
  eventId = '';
  quizId = '';
  isCertifcateEnabled = false;
  certificateTemp: any = [];
  inputCreateQuizModel: any = {};
  quizQuestionTypes = [];
  updateIndex = '';
  getByIdViewModel: any = {};

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  question: any = {};
  tempQuestion: any = {};
  addedChoice = 0;
  allQuestions = [];
  roleDisplayName = '';
  isBoothAdmin = false;
  config: any;
  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    public router: Router,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private localStorageService: LocalStorageService,
    private changeDetectorRefs: ChangeDetectorRef, private helper: Helper
  ) {
    this.roleDisplayName = this.localStorageService.get('Role');
    this.isBoothAdmin = this.roleDisplayName === 'SuperAdmin' ? true : this.roleDisplayName === 'EventAdmin' ? true : false;

    this.eventId = this.route.snapshot.paramMap.get('id');
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    this.eventName = this.localStorageService.get('EventName');
    this.inputCreateQuizModel.quiz = {};
    this.inputCreateQuizModel.quizQuestions = [
      {
        quesstionId: '', question: '', choices: [{ choice: '', isAnswer: false }]
      }];
    this.inputCreateQuizModel.quiz.showUsersScore = false;
    this.inputCreateQuizModel.quiz.showPassingScore = false;
    this.inputCreateQuizModel.quiz.retestAvailable = false;
    this.inputCreateQuizModel.quiz.allowReviewAfterTest = false;
    this.inputCreateQuizModel.quiz.showAnswersOnReview = false;
    this.inputCreateQuizModel.quiz.eventId = this.eventId;
    this.inputCreateQuizModel.quiz.quizId = this.quizId;
    this.inputCreateQuizModel.quiz.createdBy = this.localStorageService.get('UserId');
    this.inputCreateQuizModel.quiz.modifiedBy = this.localStorageService.get('UserId');
    this.eventName = this.localStorageService.get('EventName');
    this.getQuizDetails();
    this.getCertificateTemplates();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  ngOnInit(): void {
    this.config = {
      allowedContent: true,
      colorButton: true,
      extraPlugins: ['font', 'colorbutton', 'colordialog']
    };
  }

  getQuizDetails() {
    this.getByIdViewModel.id = this.quizId;
    this.spinner.show();
    this.quizService.getQuizDetails(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.inputCreateQuizModel = res.quizQuestionsViewModels[0];
        this.allQuestions = this.inputCreateQuizModel.quizQuestions;
        console.log(this.inputCreateQuizModel);
        if (res.quizQuestionsViewModels[0].quiz.quizStartDate) {
          this.inputCreateQuizModel.quiz.quizStartDate = this.helper.convertDateToLocalTimezone(res.quizQuestionsViewModels[0].quiz.quizStartDate);
        }
        if(res.quizQuestionsViewModels[0].quiz.quizStartTime){
          this.inputCreateQuizModel.quiz.quizStartTime = this.helper.convertDateToLocalTimezone(res.quizQuestionsViewModels[0].quiz.quizStartTime);
        }
        if (res.quizQuestionsViewModels[0].quiz.quizEndDate) {
          this.inputCreateQuizModel.quiz.quizEndDate = this.helper.convertDateToLocalTimezone(res.quizQuestionsViewModels[0].quiz.quizEndDate);
        }
        if(res.quizQuestionsViewModels[0].quiz.quizEndTime){
          this.inputCreateQuizModel.quiz.quizEndTime = this.helper.convertDateToLocalTimezone(res.quizQuestionsViewModels[0].quiz.quizEndTime);
        }
        this.dtTrigger.next();
      }
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true
      };
      this.spinner.hide();
    });
  }

  addQuestion() {
    this.addedChoice = 0;
    this.question = { questionId: AppUtils.emptyGuid, question: '', choices: [{ choice: '', isAnswer: true }], order: this.inputCreateQuizModel.quizQuestions.length + 1 };
  }

  addChoice() {
    this.question.choices.push({ choice: '', isAnswer: false });
    this.addedChoice = this.addedChoice + 1;
  }

  deleteChoice(choiceIndex) {
    this.question.choices.splice(choiceIndex, 1);
    this.addedChoice = this.addedChoice - 1;
  }

  selectIsAnswer(event, choiseIndex) {
    if (event.target.checked) {
      this.question.choices.forEach(element => {
        element.isAnswer = false;
      });
      this.question.choices[choiseIndex].isAnswer = true;
    }
  }

  saveQuestion() {
    if (this.updateIndex !== '') {
      this.allQuestions[this.updateIndex] = (this.tempQuestion);
      this.updateIndex = '';
      this.tempQuestion = {};

    } else {
      this.allQuestions.push(this.question);
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }
  }


  deleteQuestion(index) {
    this.inputCreateQuizModel.quizQuestions.splice(index, 1);
  }

  updateQuestion(index, ques) {
    this.localStorageService.set('quest', JSON.stringify(ques));
    this.question = this.inputCreateQuizModel.quizQuestions[index];
    this.tempQuestion = { questionId: ques.questionId, question: ques.question, choices: ques.choices, order: ques.order };
    this.updateIndex = index;
  }

  setCheckBoxesValues(event, val) {
    if (event.target.checked) {
      switch (val) {
        case 'showUsersScore':
          this.inputCreateQuizModel.quiz.showUsersScore = true;
          break;
        case 'showPassingScore':
          this.inputCreateQuizModel.quiz.showPassingScore = true;
          break;
        case 'retestAvailable':
          this.inputCreateQuizModel.quiz.retestAvailable = true;
          break;
        case 'allowReviewAfterTest':
          this.inputCreateQuizModel.quiz.allowReviewAfterTest = true;
          break;
        case 'showAnswersOnReview':
          this.inputCreateQuizModel.quiz.showAnswersOnReview = true;
          break;
        default:
          break;
      }
    } else {
      switch (val) {
        case 'showUsersScore':
          this.inputCreateQuizModel.quiz.showUsersScore = false;
          break;
        case 'showPassingScore':
          this.inputCreateQuizModel.quiz.showPassingScore = false;
          break;
        case 'retestAvailable':
          this.inputCreateQuizModel.quiz.retestAvailable = false;
          break;
        case 'allowReviewAfterTest':
          this.inputCreateQuizModel.quiz.allowReviewAfterTest = false;
          break;
        case 'showAnswersOnReview':
          this.inputCreateQuizModel.quiz.showAnswersOnReview = false;
          break;
        default:
          break;
      }
    }

  }

  saveQuiz() {
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
        this.inputCreateQuizModel.quiz.modifiedBy = this.localStorageService.get('UserId');
        this.quizService.updateQuiz(this.inputCreateQuizModel).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: new SweetAlertMessage(this.translate).updatedSuccessfullyMessage,
              icon: 'success',
              confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertConfirmButtonText
            }).then(() => {
              this.router.navigate(['/admin/events/Quiz/', this.eventId]);
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
    console.log(this.inputCreateQuizModel);
  }

  closeModal() {
    if (this.updateIndex !== '') {
      this.inputCreateQuizModel.quizQuestions[this.updateIndex] = JSON.parse(this.localStorageService.get('quest'));
      this.updateIndex = '';
      this.tempQuestion = {};
      this.localStorageService.set('quest', '');
    }
  }

  ifCertifcateEnabled(e) {

    if (e.target.checked) {
      // this.isCertifcateEnabled = true;
      this.inputCreateQuizModel.quiz.isCertificateOnPassingAllowd = true;
      this.inputCreateQuizModel.quiz.quizTemplateId = this.certificateTemp[0].templateId;

    } else {
      // this.isCertifcateEnabled = false;
      this.inputCreateQuizModel.quiz.isCertificateOnPassingAllowd = false;
      this.inputCreateQuizModel.quiz.quizTemplateId = AppUtils.emptyGuid;

    }
  }

  getCertificateTemplates() {
    this.quizService.getCertificateTemplates().subscribe(result => {
      this.certificateTemp = result;

    });
  }

  selectCertificateTemplate(event, item) {
    if (event.target.checked) {
      this.inputCreateQuizModel.quiz.quizTemplateId = item.templateId;
    }
  }


  isQuizRequired(val) {
    this.inputCreateQuizModel.quiz.isRequired = val;

  }


  onDrop(event: CdkDragDrop<string[]>) {

    var tmp = this.inputCreateQuizModel.quizQuestions[event.previousIndex];
    this.inputCreateQuizModel.quizQuestions[event.previousIndex] = this.inputCreateQuizModel.quizQuestions[event.currentIndex];
    this.inputCreateQuizModel.quizQuestions[event.currentIndex] = tmp;
    this.inputCreateQuizModel.quizQuestions[event.currentIndex].order = event.currentIndex + 1;
    this.inputCreateQuizModel.quizQuestions[event.previousIndex].order = event.previousIndex + 1;
  }
}
