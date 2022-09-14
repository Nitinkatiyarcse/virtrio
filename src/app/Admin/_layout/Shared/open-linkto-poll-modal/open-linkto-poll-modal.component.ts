import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { contains } from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-open-linkto-poll-modal',
  templateUrl: './open-linkto-poll-modal.component.html',
  styleUrls: ['./open-linkto-poll-modal.component.css']
})
export class OpenLinktoPollModalComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  constructor(public bsModalRef: BsModalRef,private translate: TranslateService) { }
  allPolls: any[] = [];
  selectedPolls: any[] = [];
  seletedItem: any[] = [];
  ngOnInit(): void {
    console.log(this.allPolls);
    console.log(this.selectedPolls);
    this.selectedPolls.forEach(element => {
      this.seletedItem.push(element);
    });
    this.allPolls.forEach(element => {
      if (this.selectedPolls.length > 0) {
        element.isChecked = false;
        this.selectedPolls.forEach(element1 => {
          if (element1.polls != null) {
            if (element1.polls.pollId === element.polls.pollId) {
              element.isChecked = true;
            }
          } else {
            element.isChecked = false;
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

  selecteDeselectedPolls(event, item) {
    if (!this.seletedItem) {
      this.seletedItem = [];
    }
    if (event.target.checked) {
      this.seletedItem.push(item);
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

  selecteDeselectedPoll(event, item) {
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