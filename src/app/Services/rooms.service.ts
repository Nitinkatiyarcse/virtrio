import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import * as AppUtils from 'src/app/Utils/apputils';



@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private httpClient: HttpClient) { }

  getRoomTypes(roomTypeRequest) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'GetRoomTypes', roomTypeRequest).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getRooms(roomRequestVM: any) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'GetEventRooms', roomRequestVM).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })

      );
  }

  upsertRoom(inputRoomModel: any) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'UpsertRoom', inputRoomModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  activateDeactivateRoom(roomInfo: any) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'ActivateDeactivateRoom', roomInfo).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  lockUnlockRoom(roomInfo: any) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'LockUnlockRoom', roomInfo).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }


  getRoomDetails(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'GetRoomDetails', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  UploadBoothBannerImage(formdata) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'UploadBoothBannerImage', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  uploadBoothDocument(formdata) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'uploadBoothDocument', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  uploadBoothIcon(formdata) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'UploadBoothIcon', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getRoomDesignDetails(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.FrontEndBooth_Base_Url + 'GetRoomDesignDetails', getByIdViewModel).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  attendeeRepresentativeRoomLogging(roomDetailsReq: any){
    return this.httpClient.post(AppUtils.FrontEndBooth_Base_Url + 'LogAttendeeRepresentativeRoomLogging', roomDetailsReq).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  saveRoomDesign(roomDesignDetails: any) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'SaveRoomDesign', roomDesignDetails).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getRoomsAndBoothsByCategory(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.FrontEndBooth_Base_Url + 'GetRoomsAndBoothsByCategory', getByIdViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  getBooths(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'GetBoothsByEvent', getByIdViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  getRepresentativeAssignedRooms(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'GetRepresentativeAssignedRooms', getByIdViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }


  getWebinarCategoryList(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'GetWebinarCategoryList', getByIdViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }


  getWebinarCategoryById(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'GetWebinarCategoryById', getByIdViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }


  upsertWebinarCategory(webinarCategory: any) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'UpsertWebinarCategory', webinarCategory).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  uploadWebinarLogo(formdata) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'UploadWebinarLogo', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  upsertWebinar(webinar: any) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'UpsertWebinar', webinar).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  getEventWebinars(webinarViewModel: any) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'GetEventWebinars', webinarViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  uploadRoomTemplate(formdata) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'UploadRoomTemplate', formdata).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('something went wrong');
        })
      );
  }

  getRoomTemplates(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'GetRoomTemplates', getByIdViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  upsertRoomTemplates(templates: any) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'UpsertRoomTemplates', templates).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  deleteRoomTemplate(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'DeleteRoomTemplate', getByIdViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  
  GetRoomTemplatesById(getByIdViewModel: any) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'getRoomTemplatesById', getByIdViewModel).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }

  createMeetingForWhereby(meeting: any) {
    return this.httpClient.post(AppUtils.EventRooms_Base_Url + 'CreateWherebyMeetingRoom', meeting).
      pipe(map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('something went wrong');
      })
      );
  }
  
  

  
}
