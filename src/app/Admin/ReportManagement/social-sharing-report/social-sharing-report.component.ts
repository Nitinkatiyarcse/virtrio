import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ReportService } from 'src/app/Services/report.service';

@Component({
  selector: 'app-social-sharing-report',
  templateUrl: './social-sharing-report.component.html',
  styleUrls: ['./social-sharing-report.component.css']
})
export class SocialSharingReportComponent implements OnInit {

  eventName: string;
  eventId: string;
  noRecordFound = false;
  primaryAttendeeData: any = [];
  fromDate:any;
  toDate:any;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  getbyIdViewModel: any = {};
  attendeeData: any;





  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private spinner: NgxSpinnerService,
    private reportService: ReportService,
  ) { 
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventName = this.localStorage.get('EventName');
    this.fromDate=new Date('2020-01-01');
    this.toDate=new Date('2023-01-01');
    this.getSocialSharing();

  } 

   
  ngOnInit(): void {
    
 buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };


 getSocialSharing(){
   this.spinner.show();
   this.getbyIdViewModel.id=this.eventId;
   this.reportService.getSocialSharing(this.getbyIdViewModel).subscribe((res) => {
     if (res.isSuccess) {  
       this.spinner.hide();
       this.noRecordFound = false;
       console.log(res.invitefriendReports);
       this.attendeeData = res.invitefriendReports;
       if (this.dtElement.dtInstance) {
         this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

           dtInstance.destroy();
           this.dtTrigger.next();
         });
       } else {
         this.spinner.hide();
         this.dtTrigger.next();
       }
     } else {
       this.spinner.hide();
       this.noRecordFound = true;
     }
     });
 }

 getValues(){
   const dta=this.primaryAttendeeData;
 this.attendeeData=  dta.filter(u=>u.registerDate>(this.fromDate) );
 }
 getToDateValues(){
   const dta=this.primaryAttendeeData;
 this.attendeeData=  dta.filter(u=>u.registerDate>(this.toDate) );
 }


 

 rerender(): void {
   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
     // Destroy the table first
     dtInstance.destroy();
     // Call the dtTrigger to rerender again
     this.dtTrigger.next();
   });
 }

}