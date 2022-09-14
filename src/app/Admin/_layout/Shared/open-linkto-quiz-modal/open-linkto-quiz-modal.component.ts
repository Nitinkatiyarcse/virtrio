import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { contains } from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-open-linkto-quiz-modal',
  templateUrl: './open-linkto-quiz-modal.component.html',
  styleUrls: ['./open-linkto-quiz-modal.component.css']
})
export class OpenLinktoQuizModalComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  constructor(public bsModalRef: BsModalRef, private translate: TranslateService) { }
  allQuiz: any[] = [];
  selectedQuiz: any[] = [];
  seletedItem: any[] = [];
  ngOnInit(): void {
    console.log(this.allQuiz);
    console.log(this.selectedQuiz);
    this.selectedQuiz.forEach(element => {
      this.seletedItem.push(element);
    });
    this.allQuiz.forEach(element => {
      if (this.selectedQuiz.length > 0) {
        element.isChecked = false;
        this.selectedQuiz.forEach(element1 => {
          if (element1.quiz.quizId === element.quiz.quizId) {
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

  selecteDeselectedQuiz(event, item) {
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
}
