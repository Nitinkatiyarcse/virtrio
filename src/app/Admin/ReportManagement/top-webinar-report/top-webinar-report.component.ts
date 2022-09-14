import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgChartOptions } from 'ag-charts-community';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ReportService } from 'src/app/Services/report.service';

@Component({
  selector: 'app-top-webinar-report',
  templateUrl: './top-webinar-report.component.html',
  styleUrls: ['./top-webinar-report.component.css']
})
export class TopWebinarReportComponent implements OnInit {

  public options: AgChartOptions;


  eventName: string;
  eventId: string;
  resdata: any;
  // noRecordFound = false;

  constructor(public router: Router,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private spinner: NgxSpinnerService,
    private reportService: ReportService) {
    this.eventId = this.route.snapshot.paramMap.get('id');
    var getbyIdViewModel: any = {};
    getbyIdViewModel.id = this.eventId;
    this.eventName = this.localStorage.get('EventName');

    this.options = {
      title: { text: "Top Webinar" },
      data: [
        { label: '', value: 0 }
      ],
      series: [
        {
          type: 'pie',
          angleKey: 'value',
          labelKey: 'label',
        },
      ],
    };

    this.reportService.getTopWebinarReport(getbyIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.resdata = res.graphicalReportViewModels;
        console.log(this.resdata);
        this.options = {
          title: { text: "Top Webinar" },
          data: this.resdata,
          series: [
            {
              type: 'pie',
              angleKey: 'value',
              labelKey: 'label',
            },
          ],
        };

      }
    })
  }
  ngOnInit(): void {
  }
}

