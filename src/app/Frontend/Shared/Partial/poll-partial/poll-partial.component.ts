import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { TranslateService } from '@ngx-translate/core';
import * as AppUtils from 'src/app/Utils/apputils';
import { CommonService } from 'src/app/Utils/common';
@Component({
  selector: 'app-poll-partial',
  templateUrl: './poll-partial.component.html',
  styleUrls: ['./poll-partial.component.css']
})
export class PollPartialComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  polls: any[] = [];
  isRequired = false;
  shouldProceed = false;
  attendeePollRequestViewModel: any = {};
  eventDetails:any={};

  constructor(public bsModalRef: BsModalRef,
    private sessionStorageService: SessionStorageService,
    private attendeeService: AttendeesService,
    private translate: TranslateService,private commonService: CommonService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    // console.log(this.polls[0]);
    console.log(this.eventDetails);
    if (this.polls[0].polls.isRequired) {
      this.isRequired = true;
    } else {
      this.isRequired = false;
    }
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  submitChoice(event, index) {
    this.polls[0].pollsQuestions.choices[index].answer = true;
  }

  submitPolls() {
    if (this.sessionStorageService.get('AttendeeId')) {
      if (this.polls[0].pollsQuestions.isChoice) {
        this.polls[0].pollsQuestions.choices.forEach(element => {
          if (element.answer === true) {
            this.shouldProceed = true;
          }
        });
      } else if (!this.polls[0].pollsQuestions.isChoice) {
        if (this.polls[0].pollsQuestions.answer !== '') {
          this.shouldProceed = true;
        }
      } else {
        this.shouldProceed = false;
      }

      if (this.shouldProceed) {
        this.attendeePollRequestViewModel.attendeeId = this.sessionStorageService.get('AttendeeId');
        this.attendeePollRequestViewModel.pollId = this.polls[0].polls.pollId;
        this.attendeePollRequestViewModel.questionId = this.polls[0].pollsQuestions.questionId;
        this.attendeePollRequestViewModel.pollsQuestions = this.polls[0];
        this.attendeeService.saveAttendeePollResponse(this.attendeePollRequestViewModel).subscribe((res) => {
          if (res.isSuccess) {
          var evnt: any;
            this.commonService.logAttendeeClicks(evnt, 'Completing the Poll', this.polls[0], this.eventDetails.eventId, false, AppUtils.emptyGuid, this.sessionStorageService.get('AttendeeId'), null);
          
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
              text: 'Submitted successfully',
              icon: 'success'
            }).then(()=>{
              this.closeModal();
            });
          } else {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              text: res.message === 'AlreadyResponsedForThisPoll' ? 'You have already given response for this poll' : res.message,
              icon: 'error'
            });
          }
        });
      } else {
        return false;
      }
    } else {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: new SweetAlertMessage(this.translate).loginFirstToOperate,
        icon: 'error'
      });
    }
  }

 
}
