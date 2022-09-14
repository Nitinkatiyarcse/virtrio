import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { contains } from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'app-open-linkto-survey-modal',
  templateUrl: './open-linkto-survey-modal.component.html',
  styleUrls: ['./open-linkto-survey-modal.component.css']
})
export class OpenLinktoSurveyModalComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  constructor(public bsModalRef: BsModalRef,
    private translate: TranslateService) { }
  allSurveys: any[] = [];
  selectedSurveys: any[] = [];
  seletedItem: any[] = [];
  ngOnInit(): void {
    console.log(this.allSurveys);
    console.log(this.selectedSurveys);
    this.selectedSurveys.forEach(element => {
      this.seletedItem.push(element);
    });
    this.allSurveys.forEach(element => {
      if (this.selectedSurveys.length > 0) {
        element.isChecked = false;
        this.selectedSurveys.forEach(element1 => {
          if (element1.surveys.surveyId === element.surveys.surveyId) {
            element.isChecked = true;
          }
        });

      } else {
        element.isChecked = false;
      }

    });
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  triggerEvent(item: any) {
    this.event.emit({ data: item, res: 200 });
  }

  submitDataAndCloseModal() {
    if(this.seletedItem.length!==0){
    this.triggerEvent(this.seletedItem);
    console.log(this.seletedItem);
    this.bsModalRef.hide();
    } else{
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: new SweetAlertMessage(this.translate).pleaseSelectAtleastOnneItem,
        icon: 'error'
      });
    }
  }

  selecteDeselectedSurveys(event, item) {
    if (!this.seletedItem) {
      this.seletedItem = [];
    }
    if (event.target.checked) {
      if (this.seletedItem.filter(u => u.quizId !== item.quizId)) {
        this.seletedItem[0] = (item);
      }
    } else {
      this.seletedItem.splice(item, 1);
    }
  }
}
