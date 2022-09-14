import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './Admin/nav-menu/nav-menu.component';
import { HomeComponent } from './Admin/home/home.component';
import { CounterComponent } from './Admin/counter/counter.component';
import { FetchDataComponent } from './Admin/fetch-data/fetch-data.component';
import { NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomDatePipe } from './Utils/custom.datepipe';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LoginComponent } from './Admin/AccountManagement/login/login.component';
import { SignupComponent } from '../app/Admin/AccountManagement/signup/signup.component';
import { AuthInterceptor } from '../app/Admin/auth/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserDashboardComponent } from './Admin/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from '../app/Admin/AccountManagement/user-profile/user-profile.component';
import { LoginLayoutComponent } from './Admin/_layout/login-layout/login-layout.component';
import { HomeLayoutComponent } from './Admin/_layout/home-layout/home-layout.component';
import { LanguageHeaderComponent } from './Admin/_layout/Shared/language-header/language-header.component';
import { MainHeaderComponent } from './Admin/_layout/Shared/_header/main-header/main-header.component';
import { MainSidebarComponent } from './Admin/_layout/Shared/_sidebar/main-sidebar/main-sidebar.component';
import { AppEventSidebarComponent } from './Admin/_layout/Shared/_sidebar/app-event-sidebar/app-event-sidebar.component';
import { UserListComponent } from './Admin/UserManagement/user-list/user-list.component';
import { UpsertUserComponent } from './Admin/UserManagement/upsert-user/upsert-user.component';
import { UserDetailsComponent } from './Admin/UserManagement/user-details/user-details.component';
import { UserDetailsPartialComponent } from './Admin/_layout/Shared/_user/user-details-partial/user-details-partial.component';
import { UserUpsertPartialComponent } from './Admin/_layout/Shared/_user/user-upsert-partial/user-upsert-partial.component';
import { EventListComponent } from '../app/Admin/EventManagement/event-list/event-list.component';
import { CreateEventComponent } from '../app/Admin/EventManagement/create-event/create-event.component';
import { EventDetailsComponent } from '../app/Admin/EventManagement/event-details/event-details.component';
import { DateTimePickerComponent } from '../app/Admin/_layout/Shared/date-time-picker/date-time-picker.component';
import { TimePickerComponent } from '../app/Admin/_layout/Shared/time-picker/time-picker.component';
import { DatePickerComponent } from '../app/Admin/_layout/Shared/date-picker/date-picker.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { EventUpdateComponent } from './Admin/EventManagement/event-update/event-update.component';
import { ManageRegistrationSetsComponent } from './Admin/EventManagement/RegistrationSets/manage-registration-sets/manage-registration-sets.component';
import { AddRegistrationSetsComponent } from './Admin/EventManagement/RegistrationSets/add-registration-sets/add-registration-sets.component';
import { ManageLoginPageComponent } from './Admin/EventManagement/RegistrationSets/manage-login-page/manage-login-page.component';
import { ManageRegistrationPageComponent } from './Admin/EventManagement/RegistrationSets/manage-registration-page/manage-registration-page.component';
import { ManageThankyouPageComponent } from './Admin/EventManagement/RegistrationSets/manage-thankyou-page/manage-thankyou-page.component';
import { UploadExternalRegistrationSetsComponent } from './Admin/EventManagement/RegistrationSets/upload-external-registration-sets/upload-external-registration-sets.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { Helper } from './Utils/Helper';
import { importType } from '@angular/compiler/src/output/output_ast';
import { RoomsComponent } from './Admin/EventManagement/RoomsManagement/rooms/rooms.component';
import { CreateRoomComponent } from './Admin/EventManagement/RoomsManagement/create-room/create-room.component';
import { GetterSetterService } from './Services/getter-setter.service';
import { EventSettingsComponent } from './Admin/EventManagement/event-settings/event-settings.component';
import { EventAdminusersComponent } from './Admin/EventManagement/event-adminusers/event-adminusers.component';
import { ClientListComponent } from './Admin/ClientManagement/client-list/client-list.component';
import { UpsertClientComponent } from './Admin/ClientManagement/upsert-client/upsert-client.component';
import { SuperadminEventcreateComponent } from './Admin/EventManagement/superadmin-eventcreate/superadmin-eventcreate.component';
import { EventEmailtemplatespageComponent } from './Admin/EventManagement/EmailTemplatesManagement/event-emailtemplatespage/event-emailtemplatespage.component';
import { CreateEmailtemplateComponent } from './Admin/EventManagement/EmailTemplatesManagement/create-emailtemplate/create-emailtemplate.component';
import { RoomSetupComponent } from './Admin/EventManagement/RoomsManagement/room-setup/room-setup.component';
import { BoothCreationImageSidebarComponent } from './Admin/_layout/Shared/booth-creation-image-sidebar/booth-creation-image-sidebar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AddToChatQueueModalComponent } from './Admin/_layout/Shared/add-to-chat-queue-modal/add-to-chat-queue-modal.component';
import { LinkContentModalComponent } from './Admin/_layout/Shared/link-content-modal/link-content-modal.component';
import { LinkLocationComponent } from './Admin/_layout/Shared/link-location/link-location.component';
import { LinkWebsiteComponent } from './Admin/_layout/Shared/link-website/link-website.component';
import { OpenBriefcaseModalComponent } from './Admin/_layout/Shared/open-briefcase-modal/open-briefcase-modal.component';
import { OpenLinkContentModalComponent } from './Admin/_layout/Shared/open-link-content-modal/open-link-content-modal.component';
import { OpenLinktoLeaderBoardwithinBoothModalComponent } from './Admin/_layout/Shared/open-linkto-leader-boardwithin-booth-modal/open-linkto-leader-boardwithin-booth-modal.component';
import { OpenLinktoQuizModalComponent } from './Admin/_layout/Shared/open-linkto-quiz-modal/open-linkto-quiz-modal.component';
import { OpenLinktoSurveyModalComponent } from './Admin/_layout/Shared/open-linkto-survey-modal/open-linkto-survey-modal.component';
import { OpenLinktoPollModalComponent } from './Admin/_layout/Shared/open-linkto-poll-modal/open-linkto-poll-modal.component';
import { OpenLinktoInfoCardModalComponent } from './Admin/_layout/Shared/open-linkto-info-card-modal/open-linkto-info-card-modal.component';
import { OpenLinktoChatScreenModalComponent } from './Admin/_layout/Shared/open-linkto-chat-screen-modal/open-linkto-chat-screen-modal.component';
import { OpenLinktoCalendarForBoothRepModalComponent } from './Admin/_layout/Shared/open-linkto-calendar-for-booth-rep-modal/open-linkto-calendar-for-booth-rep-modal.component';
import { OpenLinktoWallForWriteCommentsModalComponent } from './Admin/_layout/Shared/open-linkto-wall-for-write-comments-modal/open-linkto-wall-for-write-comments-modal.component';
import { OpenLinktoSocialMediaModalComponent } from './Admin/_layout/Shared/open-linkto-social-media-modal/open-linkto-social-media-modal.component';
import { OpenLinktoWebinarModalComponent } from './Admin/_layout/Shared/open-linkto-webinar-modal/open-linkto-webinar-modal.component';
import { OpenLinktoPrivateOneToOneMeetingModalComponent } from './Admin/_layout/Shared/open-linkto-private-one-to-one-meeting-modal/open-linkto-private-one-to-one-meeting-modal.component';
import { RepresentativeComponent } from './Admin/EventManagement/RoomsManagement/representative/representative.component';
import { ConvertToNewLinesPipe } from './Utils/convert-to-new-lines.pipe';
import { EventEntitlementComponent } from './Admin/EventManagement/EventEntitlement/event-entitlement/event-entitlement.component';
import { CreateEventEntitlementComponent } from './Admin/EventManagement/EventEntitlement/create-event-entitlement/create-event-entitlement.component';
import { GroupEntitlementComponent } from './Admin/EventManagement/EventEntitlement/group-entitlement/group-entitlement.component';
import { MatrixEntitlementComponent } from './Admin/EventManagement/EventEntitlement/matrix-entitlement/matrix-entitlement.component';
import { EntitlementAddcriteriaComponent } from './Admin/_layout/Shared/entitlement-addcriteria/entitlement-addcriteria.component';
import { CreateSurveyComponent } from './Admin/EventManagement/Surveys/create-survey/create-survey.component';
import { SurveyListComponent } from './Admin/EventManagement/Surveys/survey-list/survey-list.component';
import { SurveyAnalyticsComponent } from './Admin/EventManagement/Surveys/survey-analytics/survey-analytics.component';
import { SurveyResponseComponent } from './Admin/EventManagement/Surveys/survey-response/survey-response.component';
import { UpdateSurveyComponent } from './Admin/EventManagement/Surveys/update-survey/update-survey.component';
import { CreateQuizComponent } from './Admin/EventManagement/Quiz/create-quiz/create-quiz.component';
import { QuizListComponent } from './Admin/EventManagement/Quiz/quiz-list/quiz-list.component';
import { UpdateQuizComponent } from './Admin/EventManagement/Quiz/update-quiz/update-quiz.component';
import { EventGroupEntitlementComponent } from './Admin/EventManagement/EventEntitlement/event-group-entitlement/event-group-entitlement.component';
import { AdEntitlementGroupComponent } from './Admin/EventManagement/ad-entitlement-group/ad-entitlement-group.component';
import { CreateBadgeComponent } from './Admin/EventManagement/Leaderboard/Badges/create-badge/create-badge.component';
import { LeaderboardManagementComponent } from '../app/Admin/EventManagement/Leaderboard/leaderboard-management/leaderboard-management.component';
import { BadgeAddRuleModelComponent } from './Admin/_layout/Shared/_sidebar/badge-add-rule-model/badge-add-rule-model.component';
import { UpdateBadgeComponent } from '../app/Admin/EventManagement/Leaderboard/Badges/update-badge/update-badge.component';
import { EventRepresentativeAndStaffComponent } from '../app/Admin/EventManagement/event-representative-and-staff/event-representative-and-staff.component';
import { CreatePollComponent } from '../app/Admin/EventManagement/Polls/create-poll/create-poll.component';
import { PollListComponent } from '../app/Admin/EventManagement/Polls/poll-list/poll-list.component';
import { UpdatePollComponent } from '../app/Admin/EventManagement/Polls/update-poll/update-poll.component';
import { MainPageComponent } from './Frontend/Attendee/main-page/main-page.component';
import { LoginRegistrationSharedLayoutComponent } from './Frontend/Shared/_layout/login-registration-shared-layout/login-registration-shared-layout.component';
import { LoginPartialComponent } from './Frontend/Shared/Partial/login-partial/login-partial.component';
import { RegisterPartialComponent } from './Frontend/Shared/Partial/register-partial/register-partial.component';
import { QuizPartialComponent } from './Frontend/Shared/Partial/quiz-partial/quiz-partial.component';
import { SurveyPartialComponent } from './Frontend/Shared/Partial/survey-partial/survey-partial.component';
import { PollPartialComponent } from './Frontend/Shared/Partial/poll-partial/poll-partial.component';
import { SideMenuComponent } from './Frontend/Shared/Partial/side-menu/side-menu.component';
import { EventCalendarComponent } from './Frontend/Attendee/event-calendar/event-calendar.component';
import { InternalLayoutComponent } from './Frontend/Shared/_layout/internal-layout/internal-layout.component';
import { FooterComponent } from './Frontend/Shared/Partial/footer/footer.component';
import { AttendeeListComponent } from './Frontend/Attendee/attendee-list/attendee-list.component';
import { PageNotFoundComponent } from './Frontend/Attendee/page-not-found/page-not-found.component';
import { EventSponsorsComponent } from './Admin/EventManagement/event-sponsors/event-sponsors.component';
import { LoginPageComponent } from './Frontend/Attendee/login-page/login-page.component';
import { RegisterPageComponent } from './Frontend/Attendee/register-page/register-page.component';
import { ThankyouPageComponent } from './Frontend/Attendee/thankyou-page/thankyou-page.component';
import { VerifyEmailComponent } from './Frontend/Attendee/verify-email/verify-email.component';
import { ShowRoomsComponent } from './Frontend/Attendee/Rooms/show-rooms/show-rooms.component';
import { SafePipe } from './Utils/SafePipe';
import { SafeHtmlPipe } from './Utils/SafeHtmlPipe';
import { AttendeeRoomComponent } from './Frontend/Attendee/attendee-room/attendee-room.component';
import { EventSponsorDetailsComponent } from './Admin/_layout/Shared/event-sponsor-details/event-sponsor-details.component';
import { ApproveAttendeesComponent } from './Admin/EventManagement/approve-attendees/approve-attendees.component';
import { AttendeeDetailsComponent } from './Admin/_layout/Shared/attendee-details/attendee-details.component';
import { CreateBroadcastMessagePartialComponent } from './Frontend/Shared/Partial/create-broadcast-message-partial/create-broadcast-message-partial.component';
import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { BroadcastReportComponent } from './Admin/ReportManagement/broadcast-report/broadcast-report.component';




// import { CometChatUI } from '../cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/CometChatUI/CometChat-Ui/cometchat-ui.module';


// import { CometChatConversationList } from '../cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Chats/CometChat-conversation-list/cometchat-conversation-list.module';
// import { CometChatConversationListWithMessages } from '../cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Chats/CometChat-conversation-list-with-messages/cometchat-conversation-list-with-messages.module';
// import { CometChatGroupList } from '../cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Groups/CometChat-group-list/cometchat-group-list.module';
// import { CometChatGroupListWithMessages } from '../cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Groups/CometChat-group-list-with-messages/cometchat-group-list-with-messages.module';
// import { CometChatUserList } from '../cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Users/CometChat-user-list/cometchat-user-list.module';
// import { CometChatUserListWithMessages } from '../cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Users/CometChat-user-list-with-messages/cometchat-user-list-with-messages.module';
// import { CometChatAvatar } from '../cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Shared/CometChat-avatar/cometchat-avatar.module';
import { ChatPartialComponent } from './Frontend/Attendee/Chat/chat-partial/chat-partial.component';
import { EventTemplatesComponent } from './Admin/EventManagement/event-templates/event-templates.component';
import { CreateEventTemplateComponent } from './Admin/EventManagement/event-templates/create-event-template/create-event-template.component';
import { RepresentativeDashboardComponent } from './Frontend/representative-dashboard/representative-dashboard.component';
import { MasterlayoutComponent } from './Frontend/Shared/_layout/masterlayout/masterlayout.component';
import { DataService } from './Services/data-service.service';
import { AttendeeProfileComponent } from './Frontend/Attendee/attendee-profile/attendee-profile.component';
import { AddWebinarPartialComponent } from './Admin/_layout/Shared/add-webinar-partial/add-webinar-partial.component';
import { AllWebinarPartialComponent } from './Admin/_layout/Shared/all-webinar-partial/all-webinar-partial.component';
import { WebinarPartialComponent } from './Frontend/Shared/Partial/webinar-partial/webinar-partial.component';
import { BroadcastMessageComponent } from './Admin/EventManagement/BroadcastMessages/broadcast-message/broadcast-message.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ShareModule } from 'ngx-sharebuttons';
import { ShareButtonsConfig } from 'ngx-sharebuttons';
import { BoothDetailsPartialComponent } from './Frontend/Shared/Partial/booth-details-partial/booth-details-partial.component';
import { MessageToRepresentativePartialComponent } from './Frontend/Shared/Partial/message-to-representative-partial/message-to-representative-partial.component';
import { AllAttendeePartialComponent } from './Frontend/Shared/Partial/all-attendee-partial/all-attendee-partial.component';
import { AllAttendeeProfilePartialComponent } from './Frontend/Shared/Partial/all-attendee-profile-partial/all-attendee-profile-partial.component';
import { IframePartialComponent } from './Frontend/Shared/Partial/iframe-partial/iframe-partial.component';
import { IImageframePartialComponent } from './Frontend/Shared/Partial/image-iframe-partial/image-iframe-partial.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { WebinarIframePartialComponent } from './Frontend/Shared/Partial/webinar-iframe-partial/webinar-iframe-partial.component';
import { SendEmailFromAttendeeComponent } from './Frontend/Shared/Partial/send-email-from-attendee/send-email-from-attendee.component';
import { MessageDetailsPartialComponent } from './Frontend/Shared/Partial/message-details-partial/message-details-partial.component';
import { RegistrationReportComponent } from './Admin/ReportManagement/registration-report/registration-report.component';
import { SnedInvitationEmailPartialComponent } from './Frontend/Shared/Partial/sned-invitation-email-partial/sned-invitation-email-partial.component';
import { AddChecklistItemComponent } from './Frontend/Shared/Partial/add-checklist-item/add-checklist-item.component';
import { RoomRepresentativesComponent } from './Frontend/Shared/Partial/room-representatives/room-representatives.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { NgbDateCustomParserFormatter } from './Services/NgbDateCustomParserFormatter';
import { ChatQueueAtendeesPartialComponent } from './Frontend/Shared/Partial/chat-queue-atendees-partial/chat-queue-atendees-partial.component';
import { ArraySortPipe } from './Utils/ArraySortPipe';
import { BroadcastMessageListComponent } from './Admin/EventManagement/BroadcastMessages/broadcast-message-list/broadcast-message-list.component';
import { BroadcastMessageAlertPartialComponent } from './Frontend/Shared/Partial/broadcast-message-alert-partial/broadcast-message-alert-partial.component';
import { InvitationReportComponent } from './Admin/ReportManagement/invitation-report/invitation-report.component';
import { InvitefriendReportComponent } from './Admin/ReportManagement/invitefriend-report/invitefriend-report.component';
import { SocialSharingReportComponent } from './Admin/ReportManagement/social-sharing-report/social-sharing-report.component';
import { AttendedLiveReportComponent } from './Admin/ReportManagement/attended-live-report/attended-live-report.component';
import { OverallattendedReportComponent } from './Admin/ReportManagement/overallattended-report/overallattended-report.component';
import { ClickactionsReportComponent } from './Admin/ReportManagement/clickactions-report/clickactions-report.component';
import { VideoWatchedReportComponent } from './Admin/ReportManagement/video-watched-report/video-watched-report.component';
import { QuizReportComponent } from './Admin/ReportManagement/quiz-report/quiz-report.component';
import { PollReportComponent } from './Admin/ReportManagement/poll-report/poll-report.component';
import { MessagingAnnouncementReportComponent } from './Admin/ReportManagement/messaging-announcement-report/messaging-announcement-report.component';

import { ReportDashboardComponent } from './Admin/ReportManagement/report-dashboard/report-dashboard.component';
import { WallMessageReportComponent } from './Admin/ReportManagement/wall-message-report/wall-message-report.component';
import { AgGridModule } from 'ag-grid-angular';
import { MainepageComponent } from './Frontend/Attendee/NewUI/mainepage/mainepage.component';
// import { WebSocketService } from 'src/app/Services/web-socket.service';
import { BannerClickedReportComponent } from './Admin/ReportManagement/banner-clicked-report/banner-clicked-report.component';
import { ContentConsumptionReportComponent } from './Admin/ReportManagement/content-consumption-report/content-consumption-report.component';
import { CommonService } from './Utils/common';
import { IWebsiteframePartialComponent } from './Frontend/Shared/Partial/website-iframe-partial.component/website-iframe-partial.component';
import { LinkToContentPartialComponent } from './Frontend/Shared/Partial/link-to-content-data-partial/link-to-content-data-partial.component';
import { IframeVideoPartialComponent } from './Frontend/Shared/Partial/iframe-video-partial/iframe-video-partial.component';
import { QuickSummaryReportComponent } from './Admin/ReportManagement/quick-summary-report/quick-summary-report.component';
import { WabinarAccessReportComponent } from './Admin/ReportManagement/wabinar-access-report/wabinar-access-report.component';
import { ContentConsumReportComponent } from './Admin/ReportManagement/content-consum-report/content-consum-report.component';
import { TopBoothReportComponent } from './Admin/ReportManagement/top-booth-report/top-booth-report.component';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { TotalDurationByRoomReportComponent } from "./Admin/ReportManagement/total-duration-by-room-report/total-duration-by-room-report.component";
import { TopWebinarReportComponent } from "./Admin/ReportManagement/top-webinar-report/top-webinar-report.component";
import { TopSpacesReportComponent } from "./Admin/ReportManagement/top-spaces-report/top-spaces-report.component";
import { TopDocumentsReportComponent } from "./Admin/ReportManagement/top-documents-report/top-documents-report.component";
import { AttendedOndemandReportComponent } from "./Admin/ReportManagement/attended-ondemand-report/attended-ondemand-report.component";
import { MarqueeClickactionsReportComponent } from './Admin/ReportManagement/Marqueeclickactions-report/Marqueeclickactions-report.component';
import { RoomentryReportComponent } from './Admin/ReportManagement/roomentry-report/roomentry-report.component';
import { RoomOrBoothEntryDetailReportComponent } from "./Admin/ReportManagement/roomorboothentrydetail-report/roomorboothentrydetail-report.component";
const customConfig: ShareButtonsConfig = {
  include: ['facebook', 'twitter', 'linkedin', 'whatsapp', 'copy'],
  // exclude: ['tumblr', 'stumble', 'vk'],
  theme: 'modern-light',
  gaTracking: true,
  twitterAccount: 'twitterUsername'
};
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    SignupComponent,
    UserDashboardComponent,
    UserProfileComponent,
    LoginLayoutComponent,
    HomeLayoutComponent,
    LanguageHeaderComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    AppEventSidebarComponent,
    UserListComponent,
    UpsertUserComponent,
    UserDetailsComponent,
    UserDetailsPartialComponent,
    UserUpsertPartialComponent,
    CustomDatePipe,
    EventListComponent,
    CreateEventComponent,
    EventDetailsComponent,
    DateTimePickerComponent,
    TimePickerComponent,
    DatePickerComponent,
    EventUpdateComponent,
    ManageRegistrationSetsComponent,
    AddRegistrationSetsComponent,
    ManageLoginPageComponent,
    ManageRegistrationPageComponent,
    ManageThankyouPageComponent,
    UploadExternalRegistrationSetsComponent,
    RoomsComponent,
    CreateRoomComponent,
    EventSettingsComponent,
    EventAdminusersComponent,
    ClientListComponent,
    UpsertClientComponent,
    SuperadminEventcreateComponent,
    EventEmailtemplatespageComponent,
    CreateEmailtemplateComponent,
    RoomSetupComponent,
    BoothCreationImageSidebarComponent,
    AddToChatQueueModalComponent,
    LinkContentModalComponent,
    LinkLocationComponent,
    LinkWebsiteComponent,
    OpenBriefcaseModalComponent,
    OpenLinkContentModalComponent,
    OpenLinktoLeaderBoardwithinBoothModalComponent,
    OpenLinktoQuizModalComponent,
    OpenLinktoSurveyModalComponent,
    OpenLinktoPollModalComponent,
    OpenLinktoInfoCardModalComponent,
    OpenLinktoChatScreenModalComponent,
    OpenLinktoCalendarForBoothRepModalComponent,
    OpenLinktoWallForWriteCommentsModalComponent,
    OpenLinktoSocialMediaModalComponent,
    OpenLinktoWebinarModalComponent,
    OpenLinktoPrivateOneToOneMeetingModalComponent,
    RepresentativeComponent,
    ConvertToNewLinesPipe,
    EventEntitlementComponent,
    CreateEventEntitlementComponent,
    GroupEntitlementComponent,
    MatrixEntitlementComponent,
    EntitlementAddcriteriaComponent,
    CreateSurveyComponent,
    SurveyListComponent,
    SurveyAnalyticsComponent,
    SurveyResponseComponent,
    UpdateSurveyComponent,
    CreateQuizComponent,
    QuizListComponent,
    UpdateQuizComponent,
    EventGroupEntitlementComponent,
    AdEntitlementGroupComponent,
    CreateBadgeComponent,
    LeaderboardManagementComponent,
    BadgeAddRuleModelComponent,
    UpdateBadgeComponent,
    EventRepresentativeAndStaffComponent,
    CreatePollComponent,
    PollListComponent,
    UpdatePollComponent,
    MainPageComponent,
    LoginRegistrationSharedLayoutComponent,
    LoginPartialComponent,
    RegisterPartialComponent,
    QuizPartialComponent,
    SurveyPartialComponent,
    PollPartialComponent,
    SideMenuComponent,
    EventCalendarComponent,
    InternalLayoutComponent,
    FooterComponent,
    AttendeeListComponent,
    PageNotFoundComponent,
    EventSponsorsComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ThankyouPageComponent,
    VerifyEmailComponent,
    ShowRoomsComponent,
    SafePipe,
    SafeHtmlPipe,
    ArraySortPipe,
    AttendeeRoomComponent,
    EventSponsorDetailsComponent,
    ApproveAttendeesComponent,
    AttendeeDetailsComponent,
    CreateBroadcastMessagePartialComponent,
    ChatPartialComponent,
    EventTemplatesComponent,
    CreateEventTemplateComponent,
    RepresentativeDashboardComponent,
    MasterlayoutComponent,
    AttendeeProfileComponent,
    AddWebinarPartialComponent,
    AllWebinarPartialComponent,
    WebinarPartialComponent,
    BroadcastMessageComponent,
    BoothDetailsPartialComponent,
    MessageToRepresentativePartialComponent,
    AllAttendeeProfilePartialComponent,
    AllAttendeePartialComponent,
    IframePartialComponent,
    IImageframePartialComponent,
    WebinarIframePartialComponent,
    SendEmailFromAttendeeComponent,
    MessageDetailsPartialComponent,
    RegistrationReportComponent,
    SnedInvitationEmailPartialComponent,
    AddChecklistItemComponent,
    RoomRepresentativesComponent,
    ChatQueueAtendeesPartialComponent,
    BroadcastMessageListComponent,
    BroadcastMessageAlertPartialComponent,
    InvitationReportComponent,
    InvitefriendReportComponent,
    SocialSharingReportComponent,
    AttendedLiveReportComponent,
    OverallattendedReportComponent,
    ClickactionsReportComponent,
    VideoWatchedReportComponent,
    QuizReportComponent,
    PollReportComponent,
    MessagingAnnouncementReportComponent,
    ReportDashboardComponent,
    WallMessageReportComponent,

    MainepageComponent,

    BroadcastMessageComponent,
    BannerClickedReportComponent,
    ContentConsumptionReportComponent,
    BroadcastReportComponent,
    IWebsiteframePartialComponent,
    LinkToContentPartialComponent,
    IframeVideoPartialComponent,
    QuickSummaryReportComponent,
    WabinarAccessReportComponent,
    ContentConsumReportComponent,
    TopBoothReportComponent,
    TotalDurationByRoomReportComponent,
    TopSpacesReportComponent,
    TopWebinarReportComponent,
    TopDocumentsReportComponent,
    AttendedOndemandReportComponent,
    MarqueeClickactionsReportComponent,
    RoomentryReportComponent,
    RoomOrBoothEntryDetailReportComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),

    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DragDropModule,
    ShareButtonsModule.withConfig(customConfig),
    ShareIconsModule,
    ShareModule,
    PdfViewerModule,
    AgChartsAngularModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxSpinnerModule,
    ColorPickerModule,
    ModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    CKEditorModule,
    DataTablesModule,
    SocialLoginModule,
    AngularDraggableModule,
    AgGridModule,
    // CometChatUI,
    // CometChatConversationList,
    // CometChatConversationListWithMessages,
    // CometChatGroupListWithMessages,
    // CometChatUserListWithMessages,
    // CometChatGroupList,
    // CometChatUserList,
    // CometChatAvatar,
    NgxMaskModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: LoginLayoutComponent,
        children: [
          { path: '', component: LoginComponent },
          { path: 'admin/login', component: LoginComponent },
          { path: 'admin/SignUp', component: SignupComponent },
          { path: 'admin/VerifyEmail/:id', component: SignupComponent }
        ]
      },
      {
        path: 'new/:clientName/:eventName',
        component: MainepageComponent
      },
      {
        path: '',
        component: HomeLayoutComponent,
        children: [
          { path: '', redirectTo: 'users', pathMatch: 'full' },
          { path: 'admin/users', component: UserListComponent },
          { path: 'admin/profile', component: UserProfileComponent },
          { path: 'admin/users/index', component: UserListComponent }
        ]
      },
      {
        path: '',
        component: HomeLayoutComponent,
        children: [
          { path: 'admin/events', component: EventListComponent },
          { path: 'admin/clients', component: ClientListComponent },

          //  { path: 'events/add', component: CreateEventComponent },
          { path: 'admin/events/create', component: SuperadminEventcreateComponent },
          { path: 'admin/events/index', component: EventListComponent },
          { path: 'admin/Events/Index', component: EventListComponent },
          { path: 'admin/Clients/Index', component: ClientListComponent },
          { path: 'admin/clients/index', component: ClientListComponent },
          { path: 'admin/clients/newclient', component: UpsertClientComponent },
          { path: 'admin/events/webinars/:id', component: AllWebinarPartialComponent },
          { path: 'admin/events/details/:id', component: EventDetailsComponent },
          { path: 'admin/events/update/:id', component: EventUpdateComponent },
          { path: 'admin/events/rooms/:id', component: RoomsComponent },
          { path: 'admin/events/rooms/setup/:roomId/:id', component: RoomSetupComponent },
          { path: 'admin/events/eventadmin/:id', component: EventAdminusersComponent },
          { path: 'admin/clients/updateclient/:id', component: UpsertClientComponent },
          { path: 'admin/events/registrationset/add/:id', component: AddRegistrationSetsComponent },
          { path: 'admin/events/registrationset/update/:regId/:id', component: AddRegistrationSetsComponent },
          { path: 'admin/events/registrationset/manageregistrationset/:id', component: ManageRegistrationSetsComponent },
          { path: 'admin/events/registrationset/manageloginpage/:regSetid/:id', component: ManageLoginPageComponent },
          { path: 'admin/events/registrationset/managethankyoupage/:regSetid/:id', component: ManageThankyouPageComponent },
          { path: 'admin/events/registrationset/manageregistrationpage/:regSetid/:id', component: ManageRegistrationPageComponent },
          { path: 'admin/events/rooms/addroom/:id', component: CreateRoomComponent },
          { path: 'admin/events/rooms/updateroom/:roomId/:id', component: CreateRoomComponent },
          { path: 'admin/events/emailtemplate/:id', component: EventEmailtemplatespageComponent },
          { path: 'admin/events/addemailtemplate/:id', component: CreateEmailtemplateComponent },
          { path: 'admin/events/updateemailtemplate/:templtId/:id', component: CreateEmailtemplateComponent },
          { path: 'admin/events/representative/:roomId/:id', component: RepresentativeComponent },
          { path: 'admin/events/entitlementlist/:id', component: EventEntitlementComponent },
          { path: 'admin/events/addentitlement/:id', component: CreateEventEntitlementComponent },
          { path: 'admin/events/updateentitlement/:entitlementId/:id', component: CreateEventEntitlementComponent },
          { path: 'admin/events/entitlementgroup/:id', component: GroupEntitlementComponent },
          { path: 'admin/events/entitlementmatrix/:id', component: MatrixEntitlementComponent },
          { path: 'admin/events/createsurvey/:id', component: CreateSurveyComponent },
          { path: 'admin/events/surveydetails/:surveyId/:id', component: UpdateSurveyComponent },
          { path: 'admin/events/Surveylist/:id', component: SurveyListComponent },
          { path: 'admin/events/surveyresponse/:surveyId/:id', component: SurveyResponseComponent },
          { path: 'admin/events/surveyanalytics/:surveyId/:id', component: SurveyAnalyticsComponent },
          { path: 'admin/events/Quiz/:id', component: QuizListComponent },
          { path: 'admin/events/CreateQuiz/:id', component: CreateQuizComponent },
          { path: 'admin/events/QuizDetails/:quizId/:id', component: UpdateQuizComponent },
          { path: 'admin/events/eventgroupentitlement/:id', component: EventGroupEntitlementComponent },
          { path: 'admin/events/AddEntitlementGroup/:id', component: AdEntitlementGroupComponent },
          { path: 'admin/events/eventgroupentitlement/details/:grpId/:id', component: AdEntitlementGroupComponent },
          { path: 'admin/events/Leaderboard/:id', component: LeaderboardManagementComponent },
          { path: 'admin/events/Createbadge/:leaderboardId/:id', component: CreateBadgeComponent },
          { path: 'admin/events/updateBadge/:badgeId/:id', component: UpdateBadgeComponent },
          { path: 'admin/events/createpoll/:id', component: CreatePollComponent },
          { path: 'admin/events/Polllist/:id', component: PollListComponent },
          { path: 'admin/events/pollsDetails/:pollId/:id', component: UpdatePollComponent },
          { path: 'admin/events/eventrepresentative/:id', component: EventRepresentativeAndStaffComponent },
          { path: 'admin/events/eventrepresentative/:id', component: EventRepresentativeAndStaffComponent },
          { path: 'admin/events/eventsponsors/:id', component: EventSponsorsComponent },
          { path: 'admin/events/attendees/:id', component: ApproveAttendeesComponent },
          { path: 'admin/events/broadcastmessage/:id', component: BroadcastMessageListComponent },
          { path: 'admin/events/broadcast/:id', component: BroadcastMessageComponent },
          { path: 'admin/events/broadcast/:msgId/:id', component: BroadcastMessageComponent },
          { path: 'admin/events/broadcast/:msgId/:dupId/:id', component: BroadcastMessageComponent },

          { path: 'admin/events/roomtemplates/:id', component: EventTemplatesComponent },
          { path: 'admin/events/createroomtemplate/:id', component: CreateEventTemplateComponent },
          { path: 'admin/events/updateroomtemplate/:tmplId/:id', component: CreateEventTemplateComponent },
          { path: 'admin/events/reports/:id', component: ReportDashboardComponent },
          { path: 'admin/events/Registrationreport/:id', component: RegistrationReportComponent },
          { path: 'admin/events/Invitationreport/:id', component: InvitationReportComponent },
          { path: 'admin/events/Invitefriendreport/:id', component: InvitefriendReportComponent },
          { path: 'admin/events/SocialSharingreport/:id', component: SocialSharingReportComponent },
          { path: 'admin/events/AttendedLivereport/:id', component: AttendedLiveReportComponent },
          { path: 'admin/events/Overallattendedreport/:id', component: OverallattendedReportComponent },
          { path: 'admin/events/Clickactionsreport/:id', component: ClickactionsReportComponent },
          { path: 'admin/events/VideoWatchedreport/:id', component: VideoWatchedReportComponent },
          { path: 'admin/events/Quizreport/:id', component: QuizReportComponent },
          { path: 'admin/events/Pollreport/:id', component: PollReportComponent },
          { path: 'admin/events/MessagingAnnouncementreport/:id', component: MessagingAnnouncementReportComponent },
          { path: 'admin/events/WallMessagereports/:id', component: WallMessageReportComponent },
          { path: 'admin/events/broadcastreport/:id', component: BroadcastReportComponent },
          { path: 'admin/events/BannerClickedreport/:id', component: BannerClickedReportComponent },
          { path: 'admin/events/ContentConnsumptionreport/:id', component: ContentConsumptionReportComponent },
          { path: 'admin/events/QuickSummaryreport/:id', component: QuickSummaryReportComponent },
          { path: 'admin/events/WabinarAccessreport/:id', component: WabinarAccessReportComponent },
          { path: 'admin/events/ContentConsumreport/:id', component: ContentConsumReportComponent },
          { path: 'admin/events/TopBoothreport/:id', component: TopBoothReportComponent },
          { path: 'admin/events/TopSpacesreport/:id', component: TopSpacesReportComponent },
          { path: 'admin/events/TopDocumentsreport/:id', component: TopDocumentsReportComponent },
          { path: 'admin/events/TopWebinarreport/:id', component: TopWebinarReportComponent },
          { path: 'admin/events/TotalDurationByRoomreport/:id', component: TotalDurationByRoomReportComponent },
          { path: 'admin/events/TopWebinarreport/:id', component: TopWebinarReportComponent },
          { path: 'admin/events/AttendeeOnDemandReport/:id', component: AttendedOndemandReportComponent },
          { path: 'admin/events/MarqueeMessageReport/:id', component: MarqueeClickactionsReportComponent },
          { path: 'admin/events/MarqueeMessageReport/:id', component: MarqueeClickactionsReportComponent },
          { path: 'admin/events/Roomentryreport/:id', component: RoomentryReportComponent },
          { path: 'admin/events/Boothentryrepport/:id', component: RoomentryReportComponent },
          { path: 'admin/events/reportdetails/:roomId/:id', component: RoomOrBoothEntryDetailReportComponent },
          

        ]
      },
      {
        path: 'room/:roomId/:id',
        component: MasterlayoutComponent,
        children: [
          { path: '', component: ShowRoomsComponent },
          { path: 'dashboard', component: RepresentativeDashboardComponent },

        ]
      },
      { path: 'preview/:roomId/:id', component: ShowRoomsComponent },
      {
        path: 'profile/:id',
        component: AttendeeProfileComponent
      },

      {
        path: '',
        component: LoginRegistrationSharedLayoutComponent,
        children: [
          { path: ':clientName/:eventName', component: MainPageComponent },
          { path: ':clientName/:eventName/:registrationset', component: MainPageComponent },
          { path: ':clientName/:eventName/:registrationset/register', component: RegisterPageComponent },
          { path: ':clientName/:eventName/:registrationset/verifyemail/:verificationCode', component: VerifyEmailComponent },
        ]
      },
      {
        path: '',
        component: InternalLayoutComponent,
        children: [
          { path: 'calendar', component: EventCalendarComponent },
          { path: ':clientName/:eventName/attendee', component: AttendeeListComponent },
        ]
      },
      { path: ':clientName/:eventName/:registrationset/login', component: LoginPageComponent },
      { path: ':clientName/:eventName/:registrationset/thankyou', component: ThankyouPageComponent },
      { path: ':eventId/:roomId:/:attendeeId/chat', component: ChatPartialComponent },
      // {
      //   path: '',
      //   children: [
      //     { path: '404Error', component: PageNotFoundComponent },
      //   ]
      // },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '125867920829-f7bhp2ka4c6n7dr6qa8e4acu0m4nn2n7.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '633858381116992'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    { provide: "Window", useValue: window },
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
    //   {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // },
    Helper,
    GetterSetterService,
    BsModalRef,
    Meta,
    DataService,
    CommonService
    // WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
