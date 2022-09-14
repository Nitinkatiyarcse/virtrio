import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { DataTableDirective } from 'angular-datatables';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ReportService } from 'src/app/Services/report.service';

@Component({
  selector: 'app-quick-summary-report',
  templateUrl: './quick-summary-report.component.html',
  styleUrls: ['./quick-summary-report.component.css']
})
export class QuickSummaryReportComponent implements OnInit {

  eventName: string;
  eventId: string;
  noRecordFound = false;
  primaryAttendeeData: any = [];
  dropdownList = [];
  dropdownSettings: IDropdownSettings = {};
  fromDate: any;
  toDate: any;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};// DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();
  getbyIdViewModel: any = {};
  attendeeData: any;
  overallattended = 0;
  attendedlive = 0;
  registration = 0;
  invitation = 0;

  attendeeOnDemand=0;


  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private spinner: NgxSpinnerService,
    private attendeeService: AttendeesService,
    private reportService: ReportService
  ) {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventName = this.localStorage.get('EventName');
    this.fromDate = new Date('2020-01-01');
    this.toDate = new Date('2023-01-01');
    this.getOverallattended();
    this.getAttendedlive();
    this.getEventAttendees();
    this.getInvitation();
this.getAttendedOnDemand();
  }


  getOverallattended() {
    this.spinner.show();
    this.getbyIdViewModel.id = this.eventId;
    this.reportService.getOverallattended(this.getbyIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        this.noRecordFound = false;
        console.log(res.overallAttendedReport);
        this.attendeeData = res.overallAttendedReport;
        this.primaryAttendeeData = res.overallAttendedReport;
        this.overallattended = this.primaryAttendeeData.length;
        console.log(this.overallattended);

        this.attendeeData.forEach(element => {
          element.isChecked = false;
        });
      } else {
        this.spinner.hide();
        this.noRecordFound = true;
      }
    });
  }
  getAttendedlive() {
    this.spinner.show();
    this.getbyIdViewModel.id = this.eventId;
    this.reportService.getAttendedlive(this.getbyIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        this.noRecordFound = false;
        console.log(res.attendedLiveReports);
        this.attendeeData = res.attendedLiveReports;
        this.primaryAttendeeData = res.attendedLiveReports;
        this.attendedlive = this.primaryAttendeeData.length;

        console.log(this.attendedlive);

        this.attendeeData.forEach(element => {
          element.isChecked = false;
        });
       
      } else {
        this.spinner.hide();
        this.noRecordFound = true;
      }
    });
  }
  getEventAttendees() {

    this.spinner.show();
    this.attendeeService.getEventAttendees(this.getbyIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        this.noRecordFound = false;
        console.log(res.attendees);
        this.attendeeData = res.attendees;

        this.primaryAttendeeData = res.attendees;

        this.registration = this.primaryAttendeeData.length;

        console.log(this.registration);
        this.attendeeData.forEach(element => {
          element.isChecked = false;

        });
       
      } else {
        this.spinner.hide();
        this.noRecordFound = true;
      }
    });

  }
  getAttendedOnDemand() {
    this.spinner.show();
    this.getbyIdViewModel.id = this.eventId;
    this.reportService.getAttendedOnDemand(this.getbyIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        this.noRecordFound = false;
        console.log(res.attendedLiveReports);
        this.attendeeOnDemand =res.attendedLiveReports.length;
        
      } else {
        this.spinner.hide();
        this.noRecordFound = true;
      }
    });

  }

  getInvitation() {
    this.spinner.show();
    this.getbyIdViewModel.id = this.eventId;
    this.reportService.getInvitation(this.getbyIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        this.noRecordFound = false;
        console.log(res.invitationReports);

        this.attendeeData = res.invitationReports;
        this.primaryAttendeeData = res.invitationReports;
        this.invitation = this.primaryAttendeeData.length;
        console.log(this.invitation);
        this.attendeeData.forEach(element => {
          element.isChecked = false;
        });
        
      } else {
        this.spinner.hide();
        this.noRecordFound = true;
      }
    });

  }

  getValues() {
    const dta = this.primaryAttendeeData;
    this.attendeeData = dta.filter(u => u.registerDate > (this.fromDate));
  }
  getToDateValues() {
    const dta = this.primaryAttendeeData;
    this.attendeeData = dta.filter(u => u.registerDate > (this.toDate));
  }


  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ]
    };
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