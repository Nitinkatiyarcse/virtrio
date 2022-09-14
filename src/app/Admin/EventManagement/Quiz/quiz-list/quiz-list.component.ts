import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { QuizService } from 'src/app/Services/quiz.service';
import { Helper } from 'src/app/Utils/Helper';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  eventName = '';
  eventId = '';
  quizId = '';
  inputCreateQuizModel: any = {};
  quizQuestionTypes = [];

  getByIdViewModel: any = {};
  allQuiz = [];
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    public router: Router,private helper: Helper,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private localStorageService: LocalStorageService) {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventName = this.localStorageService.get('EventName');
    this.getQuizlist();
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
  }

  getQuizlist() {
    this.spinner.show();
    const quizReqModel: any = {};
    quizReqModel.eventId = this.eventId;
    quizReqModel.UserId = this.localStorageService.get('UserId');
    this.quizService.getQuizlist(quizReqModel).subscribe((res) => {
      if (res.isSuccess) {
        this.allQuiz = res.quizQuestionsViewModels;
        this.allQuiz.forEach(element => {
          element.quiz.quizStartDate=this.helper.convertDateToLocalTimezone(element.quiz.quizStartDate);
          element.quiz.quizStartTime=this.helper.convertDateToLocalTimezone(element.quiz.quizStartTime);
          element.quiz.quizEndDate=this.helper.convertDateToLocalTimezone(element.quiz.quizEndDate);
          element.quiz.quizEndTime=this.helper.convertDateToLocalTimezone(element.quiz.quizEndTime);

        });
        console.log(this.allQuiz);
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

  deleteQuiz(quiz) {
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
        quiz.modifiedBy = this.localStorageService.get('UserId');
        this.quizService.deleteQuiz(quiz).subscribe((res) => {
          if (res.isSuccess) {
            this.getByIdViewModel.id = this.eventId;
            this.quizService.getQuizlist(this.getByIdViewModel).subscribe((listResp) => {
              if (listResp.isSuccess) {
                this.allQuiz = listResp.quizQuestionsViewModels;
                this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                  dtInstance.destroy();
                  this.dtTrigger.next();
                });
              }
            });
          }
          this.spinner.hide();
        });
      }
    });
  }

}
