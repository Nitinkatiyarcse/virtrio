import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AllEventsResponseViewModel } from 'src/app/Admin/Models/AllEventsResponseViewModel';
import { events } from 'src/app/Admin/Models/Events';
import { formatDate } from '@angular/common';
import * as AppUtils from '../Utils/apputils';
import { GetByIdViewModel } from 'src/app/Admin/Models/GetByIdViewModel';

@Injectable({
  providedIn: 'root'
})

export class EventsManagementService {



  constructor(private httpClient: HttpClient) { }

  /**
   * Method for get all events for super admin
   * @param user
   */
  GetAllEvents(user: AllEventsResponseViewModel) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'GetAllEvents', {}).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  /**
   * Method for get events on the basis of user
   * @param event
   */
  getUsersEvents(event: events) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'GetUsersEvents', event).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  /**
   * Method for check if event url exists or not
   * @param event
   */
  checkValidEventUrl(event: events) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'CheckValidEventUrl', event).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  /**
   * Function for upload event logo to cloud
   * @param formdata
   */
  uploadEventImage(formdata) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'UploadEventImage', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  /**
   * Function for upload event brouchere to cloud
   * @param fd
   */
  uploadEventBrochure(fd) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'UploadEventBrochure', fd).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  /**
   * Function for create new event
   * @param event
   */
  CreateEvent(event: any) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'CreateEvent', event).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  /**
   * Function for create new event from super admin
   * @param event
   */
  CreateSuperAdminEvent(event: any) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'CreateSuperAdminEvent', event).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }


  /**
   * Function for get event details by event id
   * @param getByIdViewModel
   */
  GetEventDetails(getByIdViewModel: GetByIdViewModel) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'GetEventDetails', getByIdViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  /**
   * Function for delete event by event id
   * @param eventVm
   */
  DeleteEvent(eventVm: events) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'DeleteEvent', eventVm).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  /**
   * function for get all clent list of a user by userid
   * @param getByIdViewModel
   */
  getUsersClient(getByIdViewModel: GetByIdViewModel) {
    return this.httpClient.post(AppUtils.Clients_Base_Url + 'GetUserClients', getByIdViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  /**
   * Function for get list of all timezones
   */
  TimeZone() {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'GetAllTimeZones', {}).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  /**
   * Function for update event
   * @param event
   */
  UpdateEvent(event: events) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'UpdateEvent', event).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }


  /**
   * function for get event status list
   */
  getEventStatus() {
    return this.httpClient.get(AppUtils.EventsManagement_Base_Url + 'GetEventStatusTypes').
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  /** // Depreciated now
   * Function for get event settins
   * @param getByIdViewModel
   */
  getEventSettings(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'GetEventSettings', getByIdViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  /**
   * Function for change event status
   * @param eventVm
   */
  changeEventStatus(eventVm: any) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'ChangeEventStatus', eventVm).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }


  saveEventSettings(inputEventSettingModel: any) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'SaveEventSettings', inputEventSettingModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  /**
   * Function for save and invite event admins
   * @param eventAdmin
   */
  saveEventAdmin(eventAdmin: any) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'SaveEventAdmin', eventAdmin).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  /**
   * Function for get event admin
   * @param inputEventAdminModel
   */
  getEventAdmin(inputEventAdminModel: any) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'GetEventAdmin', inputEventAdminModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }


  /**
   * Function for update event admin
   * @param inputEventAdminModel
   */
  updateEventAdmin(inputEventAdminModel: any) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'UpdateEventAdmin', inputEventAdminModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  /**
   * Function for delete event admin
   * @param userEvents
   */
  deleteEventAdmin(userEvents: any) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'DeleteEventAdmin', userEvents).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  /**
   * Function for get event admin details
   * @param inputEventAdminModel
   */
  getEventAdminDetails(inputEventAdminModel: any) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'GetEventAdminDetails', inputEventAdminModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  /**
   * FUnction for search client list for an event
   * @param searchModel
   */
  searchClient(searchModel: any) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'SearchEventAdmin', searchModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  /**
   * Function for add global representative for an event
   * @param searchForAddingEventRepresntativesUserModel
   */
  searchForAddingEventRepresntativesUser(searchForAddingEventRepresntativesUserModel: any) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'SearchForAddingEventRepresntativesUser',
      searchForAddingEventRepresntativesUserModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  getEventDetailsByEventName(eventDetailsForFrontendModel: any) {
    return this.httpClient.post(AppUtils.FrontEndEvent_Base_Url + 'GetEventDetails', eventDetailsForFrontendModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }


  uploadEventAdminsFile(inputModel: any) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'UploadEventAdminsFile', inputModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getSideMenuItems(eventUserProperyRequestViewModel: any) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'GetSideMenuItems', eventUserProperyRequestViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  resendEmailToEventAdmin(getByIdViewModel: GetByIdViewModel) {
    return this.httpClient.post(AppUtils.EventsManagement_Base_Url + 'ResendEmailToEventAdmin', getByIdViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  sendInvitationEmailFromFrontendPage(inviteToFriendModel: any) {
    return this.httpClient.post(AppUtils.FrontEndEvent_Base_Url + 'SendInvitationEmailFromFrontendPage', inviteToFriendModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  sendMessageToRepresentative(messageToREpresentativeModel: any) {
    return this.httpClient.post(AppUtils.FrontEndEvent_Base_Url + 'SendMessageToRepresentative', messageToREpresentativeModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  getAllWallPosts(roomsModel: any) {
    return this.httpClient.post(AppUtils.FrontEndEvent_Base_Url + 'GetAllWallPost', roomsModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  postWall(wall: any) {
    return this.httpClient.post(AppUtils.FrontEndEvent_Base_Url + 'PostWall', wall).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  getRepMessage(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.FrontEndEvent_Base_Url + 'GetRepMessage', getByIdViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  replyFromRepresentative(message: any) {
    return this.httpClient.post(AppUtils.FrontEndEvent_Base_Url + 'ReplyFromRepresentative', message).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }
  readRepMessage(message: any) {
    return this.httpClient.post(AppUtils.FrontEndEvent_Base_Url + 'ReadRepMessage', message).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }



  getRepChecklist(checklistItem: any) {
    return this.httpClient.post(AppUtils.FrontEndRep_Base_Url + 'GetRepresentativeChecklists', checklistItem).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  upsertRepChecklist(checklistItem: any) {
    return this.httpClient.post(AppUtils.FrontEndRep_Base_Url + 'UpsertRepChecklist', checklistItem).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  getSendNowBroadcastMessge() {
    return this.httpClient.get(AppUtils.FrontEndEvent_Base_Url + 'getSendNowBroadcastMessge').pipe(map((data: any) => {
      return data;
    }), catchError(error => {
      return throwError('something went wrong');
    })
    );
  }

}
