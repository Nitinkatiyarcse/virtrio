import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import * as AppUtils from 'src/app/Utils/apputils';
import { QuizService } from 'src/app/Services/quiz.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Helper } from 'src/app/Utils/Helper';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})

export class CreateQuizComponent implements OnInit {
  eventName = '';
  eventId = '';
  quizId = '';

  isCertifcateEnabled = false;
  inputCreateQuizModel: any = {};
  quizQuestionTypes = [];
  certificateTemp: any = [];
  getByIdViewModel: any = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  addedChoice = 0;
  question: any = {};
  tempQuestion: any = {};
  invalidDate = false;
  invalidTime = false;
  endMinDate: any;
  updateIndex = '';
  roleDisplayName = '';
  isBoothAdmin = false;
  config: any;
  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    public router: Router,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private localStorageService: LocalStorageService) {
    this.roleDisplayName = this.localStorageService.get('Role');
    this.isBoothAdmin = this.roleDisplayName === 'SuperAdmin' ? true : this.roleDisplayName === 'EventAdmin' ? true : false;

    this.eventId = this.route.snapshot.paramMap.get('id');
    this.quizId = AppUtils.emptyGuid;
    this.eventName = this.localStorageService.get('EventName');
    this.inputCreateQuizModel.quiz = {};
    this.inputCreateQuizModel.quizQuestions = [];
    this.inputCreateQuizModel.quiz.showUsersScore = false;
    this.inputCreateQuizModel.quiz.showPassingScore = false;
    this.inputCreateQuizModel.quiz.retestAvailable = false;
    this.inputCreateQuizModel.quiz.allowReviewAfterTest = false;
    this.inputCreateQuizModel.quiz.showAnswersOnReview = false;
    this.inputCreateQuizModel.quiz.eventId = this.eventId;
    this.inputCreateQuizModel.quiz.quizId = this.quizId;
    this.inputCreateQuizModel.quiz.createdBy = this.localStorageService.get('UserId');
    this.inputCreateQuizModel.quiz.modifiedBy = this.localStorageService.get('UserId');
    this.inputCreateQuizModel.quiz.isRequired = true;
    this.inputCreateQuizModel.quiz.quizLevel = '';
    this.eventName = this.localStorageService.get('EventName');
    this.getCertificateTemplates();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
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
  // addQuestion() {
  //   this.inputCreateQuizModel.quizQuestions.push({
  //     question: '', choices: [{ choice: '', isAnswer: false }]
  //   });
  // }

  // addChoice(index, choiceIndex) {
  //   this.inputCreateQuizModel.quizQuestions[index].choices.push({ choice: '', isAnswer: false });
  // }


  // deleteQuestion(index) {
  //   const outArr = [];
  //   for (let i = 0; i < this.inputCreateQuizModel.quizQuestions.length; i++) {
  //     if (i !== index) {
  //       outArr.push(this.inputCreateQuizModel.quizQuestions[i]);
  //     }
  //   }
  //   this.inputCreateQuizModel.quizQuestions = outArr;
  // }

  // deleteChoice(index, choiceIndex) {
  //   this.inputCreateQuizModel.quizQuestions[index].choices.splice(choiceIndex, 1);
  // }

  // selectIsAnswer(event, index, choiseIndex) {
  //   if (event.target.checked) {
  //     this.inputCreateQuizModel.quizQuestions[index].choices.forEach(element => {
  //       element.isAnswer = false;
  //     });
  //     this.inputCreateQuizModel.quizQuestions[index].choices[choiseIndex].isAnswer = true;
  //   }
  // }

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
      this.inputCreateQuizModel.quizQuestions[this.updateIndex] = (this.question);
      this.updateIndex = '';
    } else {
      this.inputCreateQuizModel.quizQuestions.push(this.question);
      if (this.dtElement.dtInstance) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.dtTrigger.next();
      }
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
    let process = true;
    console.log(this.inputCreateQuizModel);
    if (this.inputCreateQuizModel.quizQuestions.length == 0) {
      alert(new SweetAlertMessage(this.translate).sweetAlertQuizQuestionMessage);
      process = false;
    }
    if (process) {
      this.spinner.show();
      this.quizService.saveQuiz(this.inputCreateQuizModel).subscribe((res) => {
        if (res.isSuccess) {
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
            text: new SweetAlertMessage(this.translate).savedSuccessfully,
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
    }
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
      this.isCertifcateEnabled = true;
      this.inputCreateQuizModel.quiz.isCertificateOnPassingAllowd = true;
      this.inputCreateQuizModel.quiz.quizTemplateId = this.certificateTemp[0].templateId;

    } else {
      this.isCertifcateEnabled = false;
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

  validatePassingMarks() {
    if (Number(this.inputCreateQuizModel.quiz.percentneededtopass) > 100) {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: 'Passing marks should not be more than 100',
        icon: 'error'
      }).then(() => {
        this.inputCreateQuizModel.quiz.percentneededtopass = '';
      });
    }
  }

  onDrop(event: CdkDragDrop<string[]>) {

    var tmp = this.inputCreateQuizModel.quizQuestions[event.previousIndex];
    this.inputCreateQuizModel.quizQuestions[event.previousIndex] = this.inputCreateQuizModel.quizQuestions[event.currentIndex];
    this.inputCreateQuizModel.quizQuestions[event.currentIndex] = tmp;
    this.inputCreateQuizModel.quizQuestions[event.currentIndex].order = event.currentIndex + 1;
    this.inputCreateQuizModel.quizQuestions[event.previousIndex].order = event.previousIndex + 1;
  }


  validateDates() {
    if (this.inputCreateQuizModel.quiz.quizStartDate != null && this.inputCreateQuizModel.quiz.quizStartDate == null) {
      return false;
    } else if (this.inputCreateQuizModel.quiz.quizStartDate == null && this.inputCreateQuizModel.quiz.quizStartDate != null) {
      this.invalidDate = true;
    } else {
      if (this.inputCreateQuizModel.quiz.quizStartDate == null) {
        this.invalidDate = true;
      } else {
        if (new Date(this.inputCreateQuizModel.quiz.quizStartDate) > new Date(this.inputCreateQuizModel.quiz.quizEndDate)) {
          this.invalidDate = true;
        } else {
          this.invalidDate = false;
        }
      }
    }
    const endMinDate = new Date(this.inputCreateQuizModel.quiz.quizStartDate);
    this.endMinDate = {
      'year': endMinDate.getFullYear(),
      'month': endMinDate.getMonth() + 1,
      'day': endMinDate.getDate()
    };
  }


  validateTime() {

    if (this.inputCreateQuizModel.quiz.quizStartTime != null && this.inputCreateQuizModel.quiz.quizEndTime == null) {
      return false;
    } else if (this.inputCreateQuizModel.quiz.quizStartTime == null && this.inputCreateQuizModel.quiz.quizEndTime != null) {
      this.invalidTime = true;
    } else {
      if (this.inputCreateQuizModel.quiz.quizStartTime == null) {
        this.invalidTime = true;
      } else {
        if (new Date(this.inputCreateQuizModel.quiz.quizStartTime) > new Date(this.inputCreateQuizModel.quiz.quizEndTime)) {
          if (this.inputCreateQuizModel.quiz.quizStartDate < this.inputCreateQuizModel.quiz.quizEndDate) {
            this.invalidTime = false;
          } else {
            this.invalidTime = true;
          }
        } else {
          this.invalidTime = false;
        }
      }
    }

  }
}
