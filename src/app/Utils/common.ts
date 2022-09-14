import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import * as AppUtils from 'src/app/Utils/apputils';
import { AttendeeLoggingService } from '../Services/attendee-logging.service';

@Injectable({ providedIn: 'root' })
export class CommonService {

  constructor(private router: Router, private location: Location, private attendeeLoggingService: AttendeeLoggingService) {

  }

  //#region  Common Logging events
  logAttendeeClicks(event, type, clickedItem, eventId, isRepresentative, representativeId, attendeeId, roomId) {
    const reqModel: any = {};
    reqModel.eventId = eventId;
    if (isRepresentative) {
      reqModel.attendeeId = AppUtils.emptyGuid;
      reqModel.isAttendee = false;
      reqModel.representativeId = representativeId;
    } else {
      reqModel.attendeeId = attendeeId;
      reqModel.isAttendee = true;
      reqModel.representativeId = AppUtils.emptyGuid;
    }
    reqModel.details = JSON.stringify(clickedItem);
    if (type === 'banner') {
      reqModel.leaderboardActivityId = 'A505CB37-4115-43EA-9C4E-5C8ED97DE233';
    } else if (type === 'image') {
      reqModel.leaderboardActivityId = 'B9C8C1FF-441D-4173-A9CB-68F1077C62EA';
    } else if (type === 'marquee') {
      reqModel.leaderboardActivityId = 'BB4B4308-2EF6-4A77-8616-CB77DB67DC7A';
    } else if (type === 'video') {
      reqModel.leaderboardActivityId = '70F455FD-B202-43AF-B177-C512C9246A0F';
    } else if (type === 'DocumentsandResources') {
      reqModel.leaderboardActivityId = '37EC6CCF-3F4E-45DC-AAB9-783A32FFB322';
    } else if (type === 'Weblinks') {
      reqModel.leaderboardActivityId = 'C2D3D990-A19B-4591-B9D8-183154859E24';
    } 
    
    else if (type === 'Completing the profile') {
      reqModel.leaderboardActivityId = '4E44A845-22BF-41FE-8084-7A6D29D0FCC6';
    }
    else if (type === 'Completing the event survey') {
      reqModel.leaderboardActivityId = '8B80532E-8E91-4565-9DC0-903574A9FF4A';
    }
    else if (type === 'Completing Booth Survey') {
      reqModel.leaderboardActivityId = 'C736AC57-563A-4DA9-8A9F-96960A427E1E';
    }
    else if (type === 'Completing the QUIZ') {
      reqModel.leaderboardActivityId = '6BBBE75D-B7DF-4F71-B111-9801195639FF';
    }
    else if (type === 'Completing the Poll') {
      reqModel.leaderboardActivityId = '2E2AEEF4-1251-4A37-BE45-CFC8F493F082';
    }

    else if (type === 'AnnounceMesssage') {
      reqModel.leaderboardActivityId = '2E2AEEF4-1251-4A37-BE45-CFC8F493F082';
    } else if (type == 'Login duration in rooms') {
      reqModel.leaderboardActivityId = 'E87C2361-0331-43BB-BD76-20A7FB30DB81';
    } else if (type == 'Login duration in booths') {
      reqModel.leaderboardActivityId = 'B7E1D33A-ACC6-4D4F-A443-1CE5ED5FE60F';
    } else if (type == 'Login duration in the entire event') {
      reqModel.leaderboardActivityId = 'DC7CDDFF-F85D-4BBE-8716-D655D8B56F4D';
    } else if (type == 'Visit meeting rooms') {
      reqModel.leaderboardActivityId = '3722E5ED-6591-4372-B805-ED4229EE4E33';
    } else if (type == 'Visit Auditorium') {
      reqModel.leaderboardActivityId = '30A36C56-A8EA-41F6-88C2-DED6E249A942';
    } else if (type == 'Visit booth') {
      reqModel.leaderboardActivityId = '82A0FBFF-CA33-41D5-80BF-FDF91CE6E8D3';
    } else if (type == 'Visit custom room') {
      reqModel.leaderboardActivityId = 'DF6E5184-45B7-4AD2-AB77-1BBD7D46D2A5';
    } else if (type == 'Visit exhibit hall') {
      reqModel.leaderboardActivityId = 'A343491F-B9D9-4AB5-8BF6-DEEC56F44112';
    } else if (type == 'Visit lobby') {
      reqModel.leaderboardActivityId = '4748D372-E04E-4D68-AB19-75395C7420EC';
    } else if (type == 'Visit launge') {
      reqModel.leaderboardActivityId = '9FBFAE00-957A-4A62-ADF0-EAC55057C4A5';
    } else if (type == 'Inviting a friend') {
      reqModel.leaderboardActivityId = '01AB6553-55F4-4C51-858D-106BD8C7C14A';
    } else if (type == 'Asking questions') {
      reqModel.leaderboardActivityId = 'AE7E93B2-AE87-4F04-8061-0FE66142DAD2';
    } else if (type == 'Writing on the wall - in the lobby') {
      reqModel.leaderboardActivityId = '7D339A1E-9B0D-4531-8ABF-2378C525E231';
    } else if (type == 'First entry to the event') {
      reqModel.leaderboardActivityId = '252540D4-0C6B-4B6D-BE7E-297312117146';
    } else if (type == 'One-on-one conversation') {
      reqModel.leaderboardActivityId = 'B67C4EEB-5805-4421-A927-44955179C7CB';
    } else if (type == 'Writing on the wall - in the booths') {
      reqModel.leaderboardActivityId = '804D08E0-C0B2-4B6F-8333-95586D5E965C';
    } else if (type == 'Meeting set up') {
      reqModel.leaderboardActivityId = 'ED27CD61-EBEE-49BA-888E-A5E808BB08FF';
    } else if (type == 'Email to booth rep') {
      reqModel.leaderboardActivityId = 'EF5202F1-9B66-4D5E-8874-A8A73D163CDB';
    } else if (type == 'Social sharing') {
      reqModel.leaderboardActivityId = '6657D2DF-B840-4793-BABB-BDCA7E063BD7';
    } else if (type == 'Exchange of visiting cards') {
      reqModel.leaderboardActivityId = '0A0BD28B-E31D-4380-BE7E-D02C1AB41414';
    }
    else if (type == 'Rating the contents') {
      reqModel.leaderboardActivityId = '28878E4F-F001-488B-9FD5-0EF51E3E9B41';
    } 
    else if (type == 'Watching Auditorium Videos') {
      reqModel.leaderboardActivityId = 'CE8EF9D2-A46E-4887-9880-4D08AD17513E';
    }   
    else if (type == 'Watching the webcast / webinars') {
      reqModel.leaderboardActivityId = '8A1BDA04-1C21-43A7-83DF-94A3046CC613';
    } 
    else if (type == 'Downloading or viewing the contents') {
      reqModel.leaderboardActivityId = '117D2779-D0B5-4180-AC9F-EA0F204219A9';
    } 
    else if (type == 'Watching the videos in the booths') {
      reqModel.leaderboardActivityId = 'B1A5D96E-BB0C-4461-B808-EE1C95A88738';
    } 
    
    else if (type == 'Chat conversations') {
      reqModel.leaderboardActivityId = 'FBFEC59D-539C-49C9-989C-311CE7552E5B';
    }



    reqModel.roomId = roomId;
    // console.log(reqModel);
    console.log("reqModel");

    console.log(reqModel);
    this.attendeeLoggingService.logAttendeesClickEvents(reqModel).subscribe((res) => {

    });
  }

}
