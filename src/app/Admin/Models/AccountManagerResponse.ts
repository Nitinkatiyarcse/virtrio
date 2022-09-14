export class AccountManagerResponse {
  Message: string;
  StatusCode: string;
  IsSuccess: string;
  Errors: [];
  ExpireDate: Date;
  UserId: string;
  Email: string;
  UserVerificationEmailLink: string;
  Role: string;
  RoleId: string;
  ProfileImage: string;
  Name: string;
  RoleDisplayName: string;
  IsProfileUpdated: boolean;
  UserFeatures: string;
}
