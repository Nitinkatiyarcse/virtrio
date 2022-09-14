import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { AccountService } from 'src/app/Services/account.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

// import { networkInterfaces } from 'os';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit {

  /**
   * Creates an instance of home layout component.
   * @param http ;
   * @param acountService ;
   * @param spinner ;
   * @param route ;
   * @param location ;
   * @param translate ;
   * @param localStorage ;
   * @param router ;
   */
  constructor(private http: HttpClient,
    private acountService: AccountService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private location: Location,
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    public router: Router) { }
  message: string;
  roleDisplayName = '';
  isEventSelected = false;
  ngOnInit(): void {
    console.log(this.message);
    if (this.localStorage.get('IsProfileUpdated') === 'false') {
      this.router.navigate(['/admin/profile']);
    }
    const x = this.localStorage.get('isEventSelected');
    if (x === 'true') {
      this.isEventSelected = true;
    } else {
      this.isEventSelected = false;
    }
  }
  scrollToTop() {
    window.scrollTo(0, 0);
  }

  addItem(newItem: string) {
    console.log(newItem);
    // this.isEventSelected =newItem;
  }


}
