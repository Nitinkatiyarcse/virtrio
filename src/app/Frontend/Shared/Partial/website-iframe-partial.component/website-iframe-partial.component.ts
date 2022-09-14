import { Component, OnInit } from '@angular/core';
import { PDFDocumentProxy, PDFProgressData } from 'ng2-pdf-viewer';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-website-iframe-partial',
  templateUrl: './website-iframe-partial.component.html',
  styleUrls: ['./website-iframe-partial.component.css']
})
export class IWebsiteframePartialComponent implements OnInit {

  title: string = '';
  iframeWebsitePopup: string = '';
  eventDetails:any={};
  constructor(public bsModalRef: BsModalRef,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    // console.log(this.title);
    // console.log(this.documentUrl);
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  // onProgress(progressData: PDFProgressData) {
  //   // do anything with progress data. For example progress indicator
  //   this.spinner.show();
  // }
  callBackFn(pdf: PDFDocumentProxy) {
    // do anything with "pdf"
    this.spinner.hide();
 }
}
