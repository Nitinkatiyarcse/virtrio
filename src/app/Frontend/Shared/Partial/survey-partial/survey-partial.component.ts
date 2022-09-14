import { EventEmitter, IterableDiffers } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/Utils/common';
import * as AppUtils from 'src/app/Utils/apputils';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey-partial',
  templateUrl: './survey-partial.component.html',
  styleUrls: ['./survey-partial.component.css']
})
export class SurveyPartialComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  surveys: any[] = [];
  inputSurveyModal: any[] = [];
  shouldProcess = true;
  eventDetails: any = {};
  roomId = '';
  attendeeId = '';
  representativeId = '';
  isRepresentative = '';
  constructor(public bsModalRef: BsModalRef,
    public route: ActivatedRoute,
    private sessionStorageService: SessionStorageService,
    private attendeeService: AttendeesService,
    private translate: TranslateService, private commonService: CommonService,
    private spinner: NgxSpinnerService) {
    this.roomId = this.route.snapshot.paramMap.get('roomId');
  }

  ngOnInit(): void {
    // console.log(this.surveys);
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  submitChoice(event, questIndex, answer) {
    this.surveys[0].questions[questIndex].answer = answer;
  }

  submitSurvey() {
    if (this.sessionStorageService.get('AttendeeId')) {

      // check if survey is required
      // check if all answers are given

      this.surveys[0].questions.forEach(element => {
        if (element.answer === '') {
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
            text: new SweetAlertMessage(this.translate).pleaseProvideAnswerOfAllQuestions,
            icon: 'error'
          });
          this.shouldProcess = false;
          return;
        } else {
          const d: any = {};
          d.answer = element.answer;
          d.attendeeId = this.sessionStorageService.get('AttendeeId');
          d.questionId = element.questionId;
          d.surveyId = this.surveys[0].surveys.surveyId;
          this.inputSurveyModal.push(d);
        }
      });
      if (this.shouldProcess) {
        console.log(this.inputSurveyModal)
        this.attendeeService.saveSurveyResponse(this.inputSurveyModal).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: 'Submitted successfully',
              icon: 'success'
            }).then(() => {
              var evnt: any;
              this.commonService.logAttendeeClicks(evnt, this.surveys[0].surveys.surveyLevel == 'EventLevel' ? 'Completing the event survey' : 'Completing Booth Survey', this.surveys[0], this.eventDetails.eventId, false, AppUtils.emptyGuid, this.sessionStorageService.get('AttendeeId'), this.roomId);
              this.bsModalRef.hide();
            });
          } else {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              text: res.message === 'AlreadyResponsedForThisPoll' ? 'You have already given response for this survey' : res.message,
              icon: 'error'
            }).then(() => {
              var evnt: any;
              this.bsModalRef.hide();
            });
          }

        });
      }
    } else {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: new SweetAlertMessage(this.translate).loginFirstToOperate,
        icon: 'error'
      }).then(() => {
        this.bsModalRef.hide();
      });
    }
  }

}
