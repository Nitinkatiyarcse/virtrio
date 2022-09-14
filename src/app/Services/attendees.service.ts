import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AppUtils from '../Utils/apputils';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AttendeesService {



  constructor(private httpClient: HttpClient) { }

  getEventAttendees(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.AdminAttendee_Base_Url + 'GetEventAttendees', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getLocationwiseEventAttendees(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'GetLocationwiseEventAttendees', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getLoggedInAttendees(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'GetLoggedInAttendees', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  approveDisapproveAttendees(attendee: any) {
    return this.httpClient.post(AppUtils.AdminAttendee_Base_Url + 'ApproveDisApproveAttendee', attendee).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  registerEventAttendee(eventAttendeeRegistrationModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'RegisterEventAttendee', eventAttendeeRegistrationModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getAttendeeLoginPage(reqModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'GetAttendeeLoginPage', reqModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  loginAttendeeAndGetOtp(loginFormControl: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'LoginAttendeeAndGetOtp', loginFormControl).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  verifyOTP(loginFormControl: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'VerifyOtpForAttendeeLogin', loginFormControl).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  logoutUser(logoutUserModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'LogoutAttendeeRep', logoutUserModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getThankyouPageDetails(inputThankyouModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'GetThankyouPage', inputThankyouModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getRegistrationPage(getAttendeeRegistrationPageModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'GetRegistrationPage', getAttendeeRegistrationPageModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  verifyEmail(getAttendeeRegistrationPageModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'VerifyAttendeeEmail', getAttendeeRegistrationPageModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getQuizDetails(quizReqModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendeeQuiz_Base_Url + 'GetQuizDetails', quizReqModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  startAttendeeQuiz(inputAttendeeQuizModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendeeQuiz_Base_Url + 'StartAttendeeQuiz', inputAttendeeQuizModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  saveAttendeeQuizResponse(inputAttendeeQuizModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendeeQuiz_Base_Url + 'SaveAttendeeQuizResponse', inputAttendeeQuizModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  sendEmailOnDownlCertificate(inputAttendeeQuizModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendeeQuiz_Base_Url + 'SendEmailOnDownloadCertificate', inputAttendeeQuizModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getPollDetails(pollInputModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendeePoll_Base_Url + 'GetPollDetails', pollInputModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  saveAttendeePollResponse(pollInputModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendeePoll_Base_Url + 'SaveAttendeePollResponse', pollInputModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getSurveyDetails(surveyReqModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendeeSurvey_Base_Url + 'GetSurveyDetails', surveyReqModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  saveSurveyResponse(surveyResponseModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendeeSurvey_Base_Url + 'SaveSurveyResponse', surveyResponseModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');

        })
      );
  }

  uploadEventAttendeeFile(inputModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'UploadEventAttendeeFile', inputModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }



  resendEmailToAttendees(inputModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'ResendEmailToAttendees', inputModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getLoggedInEventAttendeesCount(reqModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'GetLoggedInEventAttendeesCount', reqModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getLeaderBoard(reqModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'GetLeaderBoard', reqModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getAttendeeDetails(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'GetAttendeeDetails', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  updateEventAttendeeProfile(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'UpdateEventAttendeeProfile', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  uploadAttendeeProfileImage(formdata) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'UploadAttendeeProfileImage', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  uploadResume(formdata) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'UploadAttendeeResume', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }


  getRoomWebinars(webinarIds: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'GetRoomWebinars', webinarIds).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  attendWebinar(webinarIds: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'AttendWebinar', webinarIds).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  uploadMailAttachement(inputModel: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'UploadMailAttachement', inputModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  sendEmailMessageFromAttendee(messageFromAttendeeModel) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'SendEmailMessageFromAttendee', messageFromAttendeeModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  checkForAttendeeSession(checkForSession: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'CheckForAttendeeSession', checkForSession).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  checkIsProfileUpdated(getByIdViewModel) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'CheckIsProfileUpdated', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }


  addAttendeeToChatQueue(chatQueue: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'AddToChatQueue', chatQueue).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getEventsVideoItems(rooms: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'GetEventsVideoItems', rooms).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }
  showBadgeDetails(data: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'ShowBadgeDetails', data).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getAllRepLeaderboardBadges(data: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'GetAllRepLeaderboardBadges', data).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getAllAttendeeLeaderboardBadges(data: any) {
    return this.httpClient.post(AppUtils.FrontEndAttendees_Base_Url + 'GetAllAttendeeLeaderboardBadges', data).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

}
