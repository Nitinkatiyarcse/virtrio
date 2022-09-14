import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from 'src/app/Services/data-service.service';
import { CommonService } from 'src/app/Utils/common';
import * as AppUtils from 'src/app/Utils/apputils';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-webinar-iframe-partial',
  templateUrl: './webinar-iframe-partial.component.html',
  styleUrls: ['./webinar-iframe-partial.component.css']
})
export class WebinarIframePartialComponent implements OnInit {
  title: string = '';
  documentUrl: string = '';
  webinarId:string='';
  modalClass = 'modal-dialog modal-fullscreen';
  @Output() onHide = new EventEmitter<boolean>();
  @ViewChild('myModal') myModal;
  isFullScreen = false;
  eventDetails: any = {};
  webinarTimerData = 0;
  isRepresentative = false;
  representativeId = AppUtils.emptyGuid;
  attendeeId = AppUtils.emptyGuid;
  roomId = AppUtils.emptyGuid;
  constructor(public bsModalRef: BsModalRef,
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService, private dataService: DataService, private commonService: CommonService, private sessionStorage: SessionStorageService) { }

  ngOnInit(): void {
    // console.log(this.title);
    // console.log(this.documentUrl);
    this.isRepresentative = this.sessionStorage.get('IsRepresentative') === 'true' ? true : false;
    if (this.isRepresentative) {
      this.representativeId = this.sessionStorage.get('RepresentativeId');
    }
    this.attendeeId = !this.isRepresentative ? this.sessionStorage.get('AttendeeId') : '';
    this.roomId = this.route.snapshot.paramMap.get('roomId');

    // start timer for webinar
    setInterval(() => {
      this.webinarTimerData++;
    }, 1000);

  }

  fullscreen() {
    // this.dataService.allowFullScreen.emit(true);
    // this.onHide.emit(true);
    this.myModal.nativeElement.parentNode.parentNode.parentNode.className = 'modal-dialog modal-fullscreen';
    this.isFullScreen = true;
  }

  smallScreen() {
    this.myModal.nativeElement.parentNode.parentNode.parentNode.className = 'modal-dialog modal-xl';
    this.isFullScreen = false;

  }
  closeModal() {
    // sending log click action
    this.commonService.logAttendeeClicks(null, "Watching the webcast / webinars", "watched webinar-" + this.webinarId + "^^^^duration-" + this.webinarTimerData, this.eventDetails.eventId, this.isRepresentative, this.representativeId, this.attendeeId, this.roomId);
    this.bsModalRef.hide();
  }


}