import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ReportService } from 'src/app/Services/report.service';
import *  as AppUtils from "src/app/Utils/apputils";
@Component({
  selector: 'app-roomentry-report',
  templateUrl: './roomorboothentrydetail-report.component.html',
  styleUrls: ['./roomorboothentrydetail-report.component.css']
})
export class RoomOrBoothEntryDetailReportComponent implements OnInit {

  eventName: string;
  eventId: string;
  noRecordFound = false;
  primaryAttendeeData: any = [];
  cellRenderer: any;
  fromDate: any;
  toDate: any;
  // @ViewChild(DataTableDirective)
  // dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject();
  getbyIdViewModel: any = {};
  attendeeData: any;
  registration: any;
  inviteDate: any;
  rowData: any;

  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    {
      field: 'userType', rowDrag: true, sortable: true, enableRowGroup: true,
      enablePivot: true, filter: 'agMultiColumnFilter', resizable: true, flex: 1, width: 20, headerClass: 'bg1', filterParams: {
        filters: [
          {
            filter: 'agDateColumnFilter',

          },
          {
            filter: true,
          },
        ],
      },
    },
    {
      field: 'firstName', rowDrag: true, sortable: true, enableRowGroup: true,
      enablePivot: true, filter: 'agMultiColumnFilter', resizable: true, flex: 1, width: 20, headerClass: 'bg1', filterParams: {
        filters: [
          {
            filter: 'agDateColumnFilter',

          },
          {
            filter: true,
          },
        ],
      },
    },
    {
      field: 'lastName', rowDrag: true, sortable: true, enableRowGroup: true,
      enablePivot: true, filter: 'agMultiColumnFilter', resizable: true, flex: 1, width: 20, headerClass: 'bg1', filterParams: {
        filters: [
          {
            filter: 'agDateColumnFilter',

          },
          {
            filter: true,
          },
        ],
      },
    },
    {
      field: 'emailAddress', rowDrag: true, sortable: true, enableRowGroup: true,
      enablePivot: true, filter: 'agMultiColumnFilter', resizable: true, flex: 1, width: 20, headerClass: 'bg1', filterParams: {
        filters: [
          {
            filter: 'agDateColumnFilter',

          },
          {
            filter: true,
          },
        ],
      },
    },
    {
      field: 'privilege', rowDrag: true, sortable: true, enableRowGroup: true,
      enablePivot: true, filter: 'agMultiColumnFilter', resizable: true, flex: 1, width: 20, headerClass: 'bg1', filterParams: {
        filters: [
          {
            filter: 'agDateColumnFilter',

          },
          {
            filter: true,
          },
        ],
      },
    },
    {
      field: 'totalTimeSpent', rowDrag: true, sortable: true, enableRowGroup: true,
      enablePivot: true, filter: 'agMultiColumnFilter', resizable: true, flex: 1, width: 20, headerClass: 'bg1', filterParams: {
        filters: [
          {
            filter: 'agDateColumnFilter',

          },
          {
            filter: true,
          },
        ],
      },
    },
    {
      field: 'totalDocumentViewed', rowDrag: true, sortable: true, enableRowGroup: true,
      enablePivot: true, filter: 'agMultiColumnFilter', resizable: true, flex: 1, width: 20, headerClass: 'bg1', filterParams: {
        filters: [
          {
            filter: 'agDateColumnFilter',

          },
          {
            filter: true,
          },
        ],
      },
    },
    {
      field: 'totalVideoWathced', rowDrag: true, sortable: true, enableRowGroup: true,
      enablePivot: true, filter: 'agMultiColumnFilter', resizable: true, flex: 1, width: 20, headerClass: 'bg1', filterParams: {
        filters: [
          {
            filter: 'agDateColumnFilter',

          },
          {
            filter: true,
          },
        ],
      },
    },
    {
      field: 'bannerViewed', rowDrag: true, sortable: true, enableRowGroup: true,
      enablePivot: true, filter: 'agMultiColumnFilter', resizable: true, flex: 1, width: 20, headerClass: 'bg1', filterParams: {
        filters: [
          {
            filter: 'agDateColumnFilter',

          },
          {
            filter: true,
          },
        ],
      },
    },
    {
      field: 'announcemntMessageClicked', rowDrag: true, sortable: true, enableRowGroup: true,
      enablePivot: true, filter: 'agMultiColumnFilter', resizable: true, flex: 1, width: 20, headerClass: 'bg1', filterParams: {
        filters: [
          {
            filter: 'agDateColumnFilter',

          },
          {
            filter: true,
          },
        ],
      },
    },
    {
      field: 'totalVisits', rowDrag: true, sortable: true, enableRowGroup: true,
      enablePivot: true, filter: 'agMultiColumnFilter', resizable: true, flex: 1, width: 20, headerClass: 'bg1', filterParams: {
        filters: [
          {
            filter: 'agDateColumnFilter',

          },
          {
            filter: true,
          },
        ],
      },
    },
  ]


  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private spinner: NgxSpinnerService,
    private attendeeService: AttendeesService,
    private reportService: ReportService,

  ) {


  }


  onBtnExport() {
    this.gridApi.exportDataAsExcel();

  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getbyIdViewModel.id = this.route.snapshot.paramMap.get('roomId');
    this.eventName = this.localStorage.get('EventName');
    this.fromDate = new Date('2020-01-01');
    this.toDate = new Date('2023-01-01');
    this.registration = '';
    this.getRoomEntryDetails()
  }


  getRoomEntryDetails() {
    this.spinner.show();
    this.getbyIdViewModel.id = this.route.snapshot.paramMap.get('roomId');
    this.reportService.getRoomBoothEntryDetails(this.getbyIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        this.noRecordFound = false;
        console.log(res.roomBoothEntrReport);
        this.attendeeData = res.roomBoothEntrReport;
        this.primaryAttendeeData = res.roomBoothEntrReport;
        this.rowData = res.roomBoothEntrReport;
        console.log(this.rowData);
      } else {
        this.spinner.hide();
        this.noRecordFound = true;
      }
    });
  }



  ngOnInit(): void {

  }



}
