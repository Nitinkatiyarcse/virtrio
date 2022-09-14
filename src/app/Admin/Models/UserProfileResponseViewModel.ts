import { callbackify } from 'util';

export class UserProfileResponseViewModel {

    FirstName: string;
    UserImage: string;
    ProfileImage: File;
    LastName: string;
    OrgName: string;
    OrgWebsite: string;
    MobileNo: string;
    UserId: string;
    UserName: string;
    NormalizedUserName: string;
    Email: string;
    NormalizedEmail: string;
    PhoneNumber: string;
    isProfileUpdated: boolean;
    Message: string;
    StatusCode: string;
    IsSuccess: string;
    Errors: [];
    IsEmailUpdated: boolean;
    eventId:string;

}

