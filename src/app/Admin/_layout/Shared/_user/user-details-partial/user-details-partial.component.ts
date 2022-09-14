import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-user-details-partial',
  templateUrl: './user-details-partial.component.html',
  styleUrls: ['./user-details-partial.component.css']
})

export class UserDetailsPartialComponent implements OnInit {
  user: any = {};
  list: any[] = [];
  roleDisplayName = '';
  isSuperAdmin = false;
  isNotSuperAdmin = false;
  constructor(private localStorageService: LocalStorageService, 
    public bsModalRef: BsModalRef) {
    this.roleDisplayName = this.localStorageService.get('Role');
    if (this.roleDisplayName === 'SuperAdmin') {
      this.isSuperAdmin = true;
    } else {
      this.isSuperAdmin = false;
    }
    if (this.roleDisplayName === 'SuperAdmin') {
      this.isNotSuperAdmin = false;
    } else {
      this.isNotSuperAdmin = true;
    }
  }

  ngOnInit(): void {
    this.user = this.list[0];
    console.log(this.user);
    // get user events and his roles

  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
