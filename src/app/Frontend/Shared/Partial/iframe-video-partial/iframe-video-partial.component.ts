import { Component, OnInit } from '@angular/core';
import { PDFDocumentProxy, PDFProgressData } from 'ng2-pdf-viewer';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-iframe-video-partial',
  templateUrl: './iframe-video-partial.component.html',
  styleUrls: ['./iframe-video-partial.component.css']
})
export class IframeVideoPartialComponent implements OnInit {

  eventDetails:any={};
  iframeVideoModalName = '';
  iframeVideoPopup = '';
  constructor(public bsModalRef: BsModalRef,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    // console.log(this.title);
    // console.log(this.documentUrl);
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  onProgress(progressData: PDFProgressData) {
    // do anything with progress data. For example progress indicator
    this.spinner.show();
  }
  callBackFn(pdf: PDFDocumentProxy) {
    // do anything with "pdf"
    this.spinner.hide();
 }
}
