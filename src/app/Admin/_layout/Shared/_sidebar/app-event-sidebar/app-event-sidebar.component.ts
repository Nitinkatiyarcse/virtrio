import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ActivatedRoute, Router, CanActivate, NavigationEnd } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';
import { EventsManagementService } from 'src/app/Services/events-management.service';
import { contains } from 'jquery';
import Swal from 'sweetalert2';
import { AllWebinarPartialComponent } from '../../all-webinar-partial/all-webinar-partial.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-event-sidebar',
  templateUrl: './app-event-sidebar.component.html',
  styleUrls: ['./app-event-sidebar.component.css']
})
export class AppEventSidebarComponent implements OnInit {


  isEventSelected = 'false';
  eventId;
  roleDisplayName = '';
  headerClass = '';
  routeUrl = '';
  class = '';
  isSuperAdminOREventAdminlogin = false;
  sidebarItems: any[] = [];modalRef: BsModalRef;
  constructor(private localStorageService: LocalStorageService,
    private eventService: EventsManagementService,  private modalService: BsModalService,
    public router: Router, private route: ActivatedRoute
  ) {
   
    this.isEventSelected = this.localStorageService.get('isEventSelected');
    this.eventId = this.router.url.split('/')[this.router.url.split('/').length - 1];
    this.roleDisplayName = this.localStorageService.get('Role');
    this.headerClass = this.roleDisplayName === 'SuperAdmin' ? 'bg-primary' : this.roleDisplayName === 'EventAdmin' ? 'bg-purple' : 'bg-indigo';
    this.routeUrl = this.router.url.toLowerCase();
    if (this.routeUrl.indexOf('manageloginpage'.toLowerCase()) !== -1) {
      this.class = 'active';
    } else {
      this.class = '';
    }

    if (this.roleDisplayName === 'SuperAdmin' || this.roleDisplayName === 'EventAdmin') {
      this.isSuperAdminOREventAdminlogin = true;
    } else {
      this.isSuperAdminOREventAdminlogin = false;
    }
    this.loadSidebarItem();

  }

  ngOnInit(): void {

  }
  goToDashboard() {
    location.href = '/admin/events';
  }

  openChat(){
    Swal.fire({
      title: 'Chatbox',
      text: 'Chat popup will be open here',
      icon: 'success'
    });
  }
  loadSidebarItem() {
    const eventUserProperyRequestViewModel: any = {};
    eventUserProperyRequestViewModel.eventId = this.localStorageService.get('EventId');
    eventUserProperyRequestViewModel.userId = this.localStorageService.get('UserId');
    this.eventService.getSideMenuItems(eventUserProperyRequestViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.sidebarItems = res.sidebarFeaturesRoleMapping;
        // console.log(this.sidebarItems);
      } else {
        window.location.href = '/admin/login';
      }
    });
  }

  openWebinar(){
    const initialState = {
      // index: index,
      //roomId: this.roomId,
      // addToWebinar: this.videosArr[index].clickAction[0].addToWebinar
    };
    
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
    };
    const modalParams = Object.assign({}, modalConfig, { initialState, class: 'modal-lg',backdrop: 'static',keyboard:false });
    this.modalRef = this.modalService.show(AllWebinarPartialComponent, modalParams);
    // this.modalRef.content.event.subscribe(res => {
    //   arr[res.index].clickAction[0].addToChatQueue = res.data;

    // });
  }
}
