import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CometChat } from '@cometchat-pro/chat';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { COMETCHAT_CONSTANTS } from 'src/CONSTS';
// import { CometChatUI } from 'src/cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/CometChatUI/CometChat-Ui/cometchat-ui.module';
// import { CometChatConversationListWithMessages } from 'src/cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Chats/CometChat-conversation-list-with-messages/cometchat-conversation-list-with-messages.module';

@Component({
  selector: 'app-chat-partial',
  templateUrl: './chat-partial.component.html',
  styleUrls: ['./chat-partial.component.css']
})
export class ChatPartialComponent implements OnInit {

  eventId = '';
  roomId = '';
  attendeeId = '';
  isRepresentative = '';
  representativeId = '';
  loggedInUserId = '';
  constructor(
    private route: ActivatedRoute,
    private sessionStorage: SessionStorageService
  ) {
   

  }

  ngOnInit(): void {
    // log in chat user
    // if (this.sessionStorage.get('AttendeeId') !== '') {
    //   const attendeeId = this.sessionStorage.get('AttendeeId');
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.isRepresentative = this.sessionStorage.get('IsRepresentative');
    if (this.isRepresentative) {
      this.representativeId = this.route.snapshot.paramMap.get('representativeId');
      this.loggedInUserId = this.representativeId + '_' + this.roomId;
    } else {
      this.attendeeId = this.route.snapshot.paramMap.get('attendeeId');
      this.loggedInUserId = this.attendeeId;
    }
    CometChat.login(this.loggedInUserId, COMETCHAT_CONSTANTS.AUTH_KEY).then(
      (loggedInUser) => {
        // console.log('Login Successful:', { loggedInUser });
        // get user list 
        if (this.isRepresentative) {
          // if it is represnetative, he can see all rep and attendees for an event
          let limit = 30;
          let roles = ["attendee"];
          // let usersRequest = new CometChat.UsersRequestBuilder()
          //   .setLimit(limit)
          //   .setRoles(roles)
          //   .build();
        } else {
          // if he is attendee, he can see all reps
          let limit = 30;
          let roles = ["representative"];
          let usersRequest = new CometChat.UsersRequestBuilder()
          .setLimit(limit)
          .setRoles(roles)
          .build();
        }
      },
      (error) => {
        // console.log('Login failed with exception:', { error });
      }
    );
  }
}
