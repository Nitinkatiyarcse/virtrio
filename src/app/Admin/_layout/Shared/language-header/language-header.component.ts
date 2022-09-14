import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { useAnimation } from '@angular/animations';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { LanguageService } from 'src/app/Services/language.service';


@Component({
  selector: 'app-language-header',
  templateUrl: './language-header.component.html',
  styleUrls: ['./language-header.component.css']
})
export class LanguageHeaderComponent implements OnInit {

  selectedLan = 'en';
  languageDropdownList = [];
  constructor(private http: HttpClient,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private location: Location,
    public translate: TranslateService,
    public router: Router,
    private langugeService: LanguageService,
    private localStorage: LocalStorageService,
    private languageService: LanguageService) {

  }


  ngOnInit(): void {
    this.getAvailableLanguage();
  }

  getAvailableLanguage() {
    this.translate.addLangs(['en', 'ja']);
    if (this.localStorage.get('language') != null && this.localStorage.get('language') !== '') {
      this.translate.use(this.localStorage.get('language'));
      this.selectedLan = this.localStorage.get('language');
    } else {
      this.translate.setDefaultLang('en');
    }


    this.langugeService.getAvailableLanguages().subscribe((res) => {
      if (res.isSuccess) {
        let availableLang: any = [];
        availableLang = res.languageViewModel;
        // const temp = [];
        for (let i = 0; i < availableLang.length; i++) {
          // temp.push({ item_id: availableLang[i].abbreviation, item_text: availableLang[i].language });
          this.languageDropdownList=availableLang;
        }
        // this.languageDropdownList = temp;
      } else {
        // console.log('error in fetching languages');
      }
      if (this.localStorage.get('language') != null && this.localStorage.get('language') !== '') {
        this.translate.use(this.localStorage.get('language'));
        this.selectedLan = this.localStorage.get('language');
      } else {
        this.translate.setDefaultLang('en');
      }
    });


  }

  changeLanguage(event) {
    this.translate.use(event.target.value);
    this.localStorage.set('language', event.target.value);
    this.selectedLan = event.target.value;
  }

}
