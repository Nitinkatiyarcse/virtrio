import { Injectable } from '@angular/core';
import { SocketMessage } from 'src/app/Admin/Models/socket-message';
import { BehaviorSubject } from 'rxjs';
import { Square } from 'src/app/Admin/Models/square';
import { SquareChangeRequest } from 'src/app/Admin/Models/square-change-request';
import { SessionStorageService } from './session-storage.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BroadcastMessageAlertPartialComponent } from '../Frontend/Shared/Partial/broadcast-message-alert-partial/broadcast-message-alert-partial.component';
import { AttendeesService } from './attendees.service';
import { PollPartialComponent } from '../Frontend/Shared/Partial/poll-partial/poll-partial.component';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket;
  private socket2: WebSocket;
  constructor(private sesionStorage: SessionStorageService, public modalRef: BsModalRef, private modalService: BsModalService, private attendeeService: AttendeesService) { }
  startSocket(eventId, regId, attid, eventDetails,roomId) {
    this.socket = new WebSocket('wss://uatevent.myvirtrio.com/ws/' + eventId + '/' + regId + '/' + attid);
    // this.socket = new WebSocket('wss://localhost:44374/ws/' + eventId + '/' + regId + '/' + attid);
    this.socket.addEventListener("open", (ev => {
      console.log('opened')
    }));
    this.socket.addEventListener("message", (ev => {
      var messageBox: SocketMessage = JSON.parse(ev.data);
      // console.log('message object', ev);
      if (JSON.parse(ev.data)[0]) {
        if (JSON.parse(ev.data)[0].AttendeeId == this.sesionStorage.get('AttendeeId')) {
          const initialState = {
            msgDetails: JSON.parse(ev.data)[0],
            eventDetails: eventDetails,
            roomId:roomId
          };
          this.modalRef = this.modalService.show(BroadcastMessageAlertPartialComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
        }
      }
    }));
  }

  startPollService(eventId, attid, pollLevel) {
    this.socket2 = new WebSocket('wss://uatfrontend.myvirtrio.com/ws/' + eventId + '/' + attid + '/' + pollLevel);
    // this.socket2 = new WebSocket('wss://localhost:44376/ws/' + eventId + '/' + attid + '/' + pollLevel);

    this.socket2.addEventListener("open", (ev => {
      console.log('wspoll opened')
    }));
    this.socket2.addEventListener("message", (ev => {
      var messageBox: any = JSON.parse(ev.data);
      // console.log('message object', ev);
      if (JSON.parse(ev.data).IsSuccess) {
        const pollReqModel: any = {};
        pollReqModel.pollId = messageBox.PollsList[0].Polls.PollId;
        this.attendeeService.getPollDetails(pollReqModel).subscribe((res) => {
          if (res.isSuccess) {
            var eventDetails: any = {};
            eventDetails.headerTextColor = messageBox.PollsList[0].Polls.Events.HeaderTextColor;
            eventDetails.uiAccentColor = messageBox.PollsList[0].Polls.Events.UIAccentColor;
            eventDetails.sectionHeaderTextColor = messageBox.PollsList[0].Polls.Events.SectionHeaderTextColor;
            eventDetails.headerBackgroundColor = messageBox.PollsList[0].Polls.Events.HeaderBackgroundColor;

            const initialState = {
              polls: res.pollsList,
              eventDetails: eventDetails
            };
            console.log(initialState);
            this.modalRef = this.modalService.show(PollPartialComponent, { initialState, class: 'modal-lg', backdrop: 'static', keyboard: false });
            this.modalRef.content.closeBtnName = 'Close';
            this.modalRef.content.event.subscribe(resp => {
              // console.log(resp);
            });
          }
        });
      } else {
        console.log("hi");
      }
    }));
  }



}
