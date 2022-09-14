import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgChartOptions } from 'ag-charts-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ReportService } from 'src/app/Services/report.service';

@Component({
  selector: 'app-top-documents-report',
  templateUrl: './top-documents-report.component.html',
  styleUrls: ['./top-documents-report.component.css']
})

export class TopDocumentsReportComponent implements OnInit {
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
      title: { text: "Top documents" },
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

    this.reportService.getTopDocumentReport(getbyIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.resdata = res.graphicalReportViewModels;
        console.log(this.resdata);
        this.options = {
          title: { text: "Top documents" },
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