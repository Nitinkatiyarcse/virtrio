import { Component, OnInit } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ColDef, GridApi } from 'ag-grid-enterprise';
import { GridReadyEvent } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportService } from 'src/app/Services/report.service';
import { AttendeesService } from 'src/app/Services/attendees.service';
@Component({
  selector: 'app-banner-clicked-report',
  templateUrl: './banner-clicked-report.component.html',
  styleUrls: ['./banner-clicked-report.component.css']
})
export class BannerClickedReportComponent implements OnInit {

  eventName: string;
  eventId: string;
  noRecordFound = false;
  primaryAttendeeData: any = [];
  cellRenderer: any;
  fromDate: any;
  toDate: any;
  // @ViewChild(DataTableDirective)
  // dtElement: DataTableDirective;
  // dtOptions:any={};// DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject();
  getbyIdViewModel: any = {};
  attendeeData: any;
  registration: any;
  inviteDate: any;
  rowData: any;
  private gridApi!: GridApi;
  public columnDefs: ColDef[] = [
    {
      headerName: "#",
      valueGetter: "node.rowIndex + 1", sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 100, headerClass: 'bg1', filterParams: {
        filters: [

          {
            filter: true,
          },
        ],
      },
    },
    // {
    //   field: 'from', rowDrag: true, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1',
    // },
    // {
    //   field: 'to', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1'
    // },
    {
      headerName: "First Name", field: 'attendeeFirstName', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
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
      headerName: "Last Name", field: 'attendeeLastName', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
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
      headerName: "Email Address", field: 'attendeeEmailAddress', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
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
      field: 'registrationSetName', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
        filters: [

          {
            filter: true,
          },
        ],
      },
    },
    // {
    //   field: 'logId', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
    //     filters: [

    //       {
    //         filter: true,
    //       },
    //     ],
    //   },
    // },
    // {
    //   field: 'isAttendee', valueGetter: params => {
    //     if (params.data.isActive === true) {
    //       return 'Yes';
    //     } else if (params.data.isActive === false) {
    //       return 'No';
    //     }

    //   }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1',
    // },
    // {
    //   field: 'isActive', valueGetter: params => {
    //     if (params.data.isActive === true) {
    //       return 'Yes';
    //     } else if (params.data.isActive === false) {
    //       return 'No';
    //     }

    //   }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1',
    // },
    {
      headerName: "Room", field: 'roomname', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
        filters: [

          {
            filter: true,
          },
        ],
      },
    },

    {
      headerName: "Banner Type", field: 'leaderboardActivityName', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
        filters: [

          {
            filter: true,
          },
        ],
      },
    },
    // {
    //   field: 'createdDate', sortable: true, cellRenderer: (data) => {
    //     return data.value ? (new Date(data.value)).toLocaleString() : ' ';
    //   }, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
    //     filters: [
    //       {
    //         filter: 'agDateColumnFilter',

    //       },
    //       {
    //         filter: true,
    //       },
    //     ],
    //   },
    // },
    // {
    //   field: 'details', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
    //     filters: [

    //       {
    //         filter: true,
    //       },
    //     ],
    //   },
    // },

    // {
    //   field: 'emailAddress', valueGetter(params) {
    //     return params.data.attendees.emailAddress;
    //   }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1'
    // },
    // {
    //   field: 'isActive', valueGetter(params) {
    //     return params.data.attendees.isActive;
    //   }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1'
    // },
    {
      field: 'eventName', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
        filters: [

          {
            filter: true,
          },
        ],
      },
    },

  ];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private spinner: NgxSpinnerService,
    private attendeeService: AttendeesService,
    private reportService: ReportService,

  ) {
    // this.eventId = this.route.snapshot.paramMap.get('id');
    // this.eventName = this.localStorage.get('EventName');
    // this.fromDate=new Date('2020-01-01');
    // this.toDate=new Date('2023-01-01');
    // this.getBannerclicked();

  }


  onBtnExport() {
    this.gridApi.exportDataAsExcel();
  }

  //   hide(){
  //     this.gridColumnApi.setColumnsVisible(['columnNameOne',], false);
  // }

  //  show(){
  //     this.gridColumnApi.setColumnsVisible(['columnNameOne',], true);
  // }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getbyIdViewModel.id = this.route.snapshot.paramMap.get('id');
    this.eventName = this.localStorage.get('EventName');
    this.fromDate = new Date('2020-01-01');
    this.toDate = new Date('2023-01-01');
    this.registration = '';
    this.getBannerclicked();

  }


  getBannerclicked() {
    this.spinner.show();
    this.getbyIdViewModel.id = this.eventId;
    this.reportService.getBannerclicked(this.getbyIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        this.noRecordFound = false;
        console.log(res.clickActionsReport);
        this.attendeeData = res.clickActionsReport;
        this.primaryAttendeeData = res.clickActionsReport;
        this.attendeeData.forEach(element => {
          element.isChecked = false;
        });
        this.rowData = res.clickActionsReport;
        console.log(this.rowData);
        //  if (this.dtElement.dtInstance) {
        //    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

        //      dtInstance.destroy();
        //      this.dtTrigger.next();
        //    });
        //  } else {
        //    this.spinner.hide();
        //    this.dtTrigger.next();
        //  }
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

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   processing: true,
    //   dom: 'Bfrtip',
    //     buttons: [
    //         'copy', 'csv', 'excel', 'print'
    //     ]
    // };
  }

  //  rerender(): void {
  //    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //      // Destroy the table first
  //      dtInstance.destroy();
  //      // Call the dtTrigger to rerender again
  //      this.dtTrigger.next();
  //    });
  //  }

}

