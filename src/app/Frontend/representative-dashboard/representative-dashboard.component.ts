import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as THREE from 'three';
// import * as $ from 'jQuery';
import { CdkDragEnd, CdkDragStart, DragDropModule } from '@angular/cdk/drag-drop';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Helper } from 'src/app/Utils/Helper';
import { RoomsService } from 'src/app/Services/rooms.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddToChatQueueModalComponent } from 'src/app/Admin/_layout/Shared/add-to-chat-queue-modal/add-to-chat-queue-modal.component';
import { LinkLocationComponent } from 'src/app/Admin/_layout/Shared/link-location/link-location.component';
import { ActivatedRoute, Event } from '@angular/router';
import { LinkWebsiteComponent } from 'src/app/Admin/_layout/Shared/link-website/link-website.component';
import { OpenBriefcaseModalComponent } from 'src/app/Admin/_layout/Shared/open-briefcase-modal/open-briefcase-modal.component';
import { OpenLinktoLeaderBoardwithinBoothModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-leader-boardwithin-booth-modal/open-linkto-leader-boardwithin-booth-modal.component';
import { OpenLinktoQuizModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-quiz-modal/open-linkto-quiz-modal.component';
import { OpenLinktoSurveyModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-survey-modal/open-linkto-survey-modal.component';
import { OpenLinktoPollModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-poll-modal/open-linkto-poll-modal.component';
import { OpenLinktoInfoCardModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-info-card-modal/open-linkto-info-card-modal.component';
import { OpenLinktoChatScreenModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-chat-screen-modal/open-linkto-chat-screen-modal.component';
import { OpenLinktoCalendarForBoothRepModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-calendar-for-booth-rep-modal/open-linkto-calendar-for-booth-rep-modal.component';
import { OpenLinktoWallForWriteCommentsModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-wall-for-write-comments-modal/open-linkto-wall-for-write-comments-modal.component';
import { OpenLinktoSocialMediaModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-social-media-modal/open-linkto-social-media-modal.component';
// tslint:disable-next-line:max-line-length
import { OpenLinktoWebinarModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-webinar-modal/open-linkto-webinar-modal.component';
import { OpenLinktoPrivateOneToOneMeetingModalComponent } from 'src/app/Admin/_layout/Shared/open-linkto-private-one-to-one-meeting-modal/open-linkto-private-one-to-one-meeting-modal.component';
import { LinkContentModalComponent } from 'src/app/Admin/_layout/Shared/link-content-modal/link-content-modal.component';
import { OpenLinkContentModalComponent } from 'src/app/Admin/_layout/Shared/open-link-content-modal/open-link-content-modal.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { element } from 'protractor';
import { runInThisContext } from 'vm';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EventEntitlementService } from 'src/app/Services/event-entitlement.service';
import { LanguageService } from 'src/app/Services/language.service';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { NgStyle } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as AppUtils from 'src/app/Utils/apputils';
import { QuizService } from 'src/app/Services/quiz.service';
import { QuizPartialComponent } from 'src/app/Frontend/Shared/Partial/quiz-partial/quiz-partial.component';
import { PollPartialComponent } from 'src/app/Frontend/Shared/Partial/poll-partial/poll-partial.component';
import { SurveyPartialComponent } from 'src/app/Frontend/Shared/Partial/survey-partial/survey-partial.component';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { CometChat } from '@cometchat-pro/chat';
import { COMETCHAT_CONSTANTS } from 'src/CONSTS';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subject, Subscription } from 'rxjs';
import { DataService } from 'src/app/Services/data-service.service';
import { count } from 'console';
import { AllAttendeePartialComponent } from '../Shared/Partial/all-attendee-partial/all-attendee-partial.component';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { MessageDetailsPartialComponent } from '../Shared/Partial/message-details-partial/message-details-partial.component';
import { DataTableDirective } from 'angular-datatables';
import { AttendeeLoggingService } from 'src/app/Services/attendee-logging.service';
import { WebinarIframePartialComponent } from '../Shared/Partial/webinar-iframe-partial/webinar-iframe-partial.component';
import { IframePartialComponent } from '../Shared/Partial/iframe-partial/iframe-partial.component';
import { SignalRService } from 'src/app/Services/signal-r.service';
import * as signalR from '@aspnet/signalr';
import { AddChecklistItemComponent } from '../Shared/Partial/add-checklist-item/add-checklist-item.component';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
@Component({
  selector: 'app-representative-dashboard',
  templateUrl: './representative-dashboard.component.html',
  styleUrls: ['./representative-dashboard.component.css']
})
export class RepresentativeDashboardComponent implements OnInit {

  totalAttendeesCount = 0;
  eventId = '';
  eventDetails: any = {};
  subscription: Subscription;
  totalUnreadMessages = 0;
  repMessages: any = [];
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();

  // dtElementwebinars: DataTableDirective;
  // dtOptionswebinars: {};
  // dtTriggerwebinars: Subject<any> = new Subject();

  webinarViewCount = 0;
  allWebinars: any = [];
  briefcaseItemCount = 0;
  allBriefcaseItems: any = [];

  repChecklistCount = 0;
  repChecklist: any = [];
  private hubNotificationConnection: signalR.HubConnection;
  constructor(private data: DataService,
    private modalService: BsModalService, private spinner: NgxSpinnerService, public translate: TranslateService,
    public modalRef: BsModalRef,
    private eventService: EventsManagementService,
    private sessionStorageService: SessionStorageService, private attendeeLoggingService: AttendeeLoggingService,
    private getterSetterService: GetterSetterService,
    public route: ActivatedRoute,
    private helper: Helper) {
    this.data.cartData.subscribe(
      (data: any) => {
        this.totalAttendeesCount = data;
      });
    this.data.eventId.subscribe((data: any) => {
      this.eventId = data;
      this.getEventDetails();
      this.getWebinarViewsCount();
      this.getBriefcaseItems();
      this.getRepChecklist();
    })
  }
  getEventDetails() {
    const model: any = {};
    model.id = this.eventId;
    this.eventService.GetEventDetails(model).subscribe((res) => {
      if (res.isSuccess) {
        this.eventDetails = res.usersEvent;
        console.log(this.eventDetails);
      }
      this.spinner.hide();
    });
  }


  ngOnInit() {


    this.startNotificationRequest();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      // dom: 'Bfrtip',
      // buttons: [
      //     'copy', 'csv', 'excel', 'print'
      // ]
    };
    // this.dtOptionswebinars = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   processing: true,
    //   // dom: 'Bfrtip',
    //   // buttons: [
    //   //     'copy', 'csv', 'excel', 'print'
    //   // ]
    // };
    this.getAllMessages();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openAttendees() {
    this.modalRef.hide();
    const initialState = {
      eventId: this.eventId,
      locationWise: false,
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard: false,
      roomId: AppUtils.emptyGuid, loggedInAttendees: true, eventDetails: this.eventDetails

    };
    // console.log(initialState);
    this.modalRef = this.modalService.show(AllAttendeePartialComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });

  }

  getAllMessages() {
    const getByIdViewModel: any = {};
    getByIdViewModel.id = this.sessionStorageService.get('RepresentativeId');
    this.eventService.getRepMessage(getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.repMessages = res.representativeMessageViewModels;
        this.repMessages.forEach(element => {
          element.messageDate = this.helper.convertDateToLocalTimezone(element.messageDate);
          if (element.replyDate != null) {
            element.replyDate = this.helper.convertDateToLocalTimezone(element.replyDate);
          }
          if (element.prefferedDate != null) {
            element.prefferedDate = this.helper.convertDateToLocalTimezone(element.prefferedDate);
          }
          if (element.prefferedTime != null) {
            element.prefferedTime = this.helper.convertDateToLocalTimezone(element.prefferedTime);
          }
        });
        this.totalUnreadMessages = this.repMessages.filter(u => u.isMessageReadByAdmin === false).length;
        if (this.dtElement.dtInstance) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
          });
        } else {

          this.dtTrigger.next();
        }
      }
    })
  }

  getMessageDetails(message) {

    const initialState = {
      message: message,
      eventDetails:this.eventDetails
    };
    this.modalRef = this.modalService.show(MessageDetailsPartialComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
    this.modalRef.content.event.subscribe(res => {
      this.getAllMessages();
    });

  }
  getWebinarViewsCount() {
    const getByIdViewModel: any = {};
    getByIdViewModel.id = this.eventId;
    this.attendeeLoggingService.getWebinarViewCount(getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.allWebinars = res.attendeeReprestativeLogsViewModels;
        this.webinarViewCount = this.allWebinars.length;
        // if (this.dtElementwebinars.dtInstance) {
        //   this.dtElementwebinars.dtInstance.then((dtInstance: DataTables.Api) => {
        //     // Destroy the table first
        //     dtInstance.destroy();
        //     // Call the dtTrigger to rerender again
        //     this.dtTriggerwebinars.next();
        //   });
        // } else {

        //   this.dtTriggerwebinars.next();
        // }
      } else {
        this.webinarViewCount = 0;
      }
    })
  }

  getBriefcaseItems() {
    const getByIdViewModel: any = {};
    getByIdViewModel.id = this.eventId;
    this.attendeeLoggingService.getBriefcaseItems(getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        // console.log(res);
        this.allBriefcaseItems = res.linkContents;
        this.briefcaseItemCount = res.linkContents.length;
      } else {
        this.allBriefcaseItems = [];
        this.briefcaseItemCount = 0
      }
    })
  }

  openBriefcaseLink(item) {
    if (this.helper.validateDocFile(item.linkUrl)) {
      const initialState = {
        title: item.name,
        documentUrl: item.linkUrl
      };
      this.modalRef = this.modalService.show(IframePartialComponent, { initialState, class: 'modal-xl', backdrop: 'static', keyboard: false });
      this.modalRef.content.closeBtnName = 'Close';
    } else {
      window.open(item.linkUrl, '_blank');
    }
  }


  startNotificationRequest() {
    // this.hubNotificationConnection = new signalR.HubConnectionBuilder()
    //   .withUrl(AppUtils.NotificationUrl)
    //   .build();
    // this.hubNotificationConnection.start().then(() => 
    //  console.log('connection started')
    // ).catch(err => {
    //    console.log('error in connection started')
    // });

    // this.hubNotificationConnection.on('BroadCastMessage', (data) => {
    //   this.getAllMessages();
    //   this.getBriefcaseItems();
    //   this.getWebinarViewsCount();

    // });
  }

  getRepChecklist() {
    const representativeChecklist: any = {};
    representativeChecklist.eventId = this.eventId;
    representativeChecklist.representativeId = this.sessionStorageService.get('RepresentativeId');
    this.eventService.getRepChecklist(representativeChecklist).subscribe((res) => {
      if (res.isSuccess) {
        this.repChecklist = res.checklists;
        this.repChecklistCount = this.repChecklist.filter(u => u.isCompleted === false).length;
      }
      else {
        this.repChecklist = [];
        this.repChecklistCount = 0;
      }
    });
  }
  addChecklist() {
    const checklsitItem: any = {
      EventId: this.eventId,
      RepresentativeId: this.sessionStorageService.get('RepresentativeId'),
      ChecklistItem: '',
      IsCompleted: false,
      IsActive: true,
      ChecklistId: AppUtils.emptyGuid,
      eventDetails: this.eventDetails
    };
    const initialState = {
      checklistItem: checklsitItem

    };
    this.modalRef = this.modalService.show(AddChecklistItemComponent, { initialState, class: 'modal-xl', backdrop: 'static', keyboard: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalRef.content.event.subscribe(resp => {
      this.getRepChecklist();
    });
  }

  markAsComplete(checklistItem) {
    checklistItem.IsCompleted = true;
    this.spinner.show();
    this.eventService.upsertRepChecklist(checklistItem).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).savedSuccessfully,
          icon: 'success'
        });
        this.getRepChecklist();
      }
      else {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: new SweetAlertMessage(this.translate).sweetAlertSomeErrorOccuredErrorMessage,
          icon: 'error'
        });
        this.getRepChecklist();

      }
    });


  }

  deleteRepChecklist(checklistItem) {
    checklistItem.isActive = false;
    this.spinner.show();
    this.eventService.upsertRepChecklist(checklistItem).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).sweetAlertDeletedSuccessMessage,
          icon: 'success'
        });
        this.getRepChecklist();
      }
      else {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: new SweetAlertMessage(this.translate).sweetAlertSomeErrorOccuredErrorMessage,
          icon: 'error'
        });
        this.getRepChecklist();

      }
    });
  }
}
