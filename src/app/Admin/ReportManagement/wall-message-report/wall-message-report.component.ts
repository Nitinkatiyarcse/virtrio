import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ReportService } from 'src/app/Services/report.service';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ColDef, GridApi } from 'ag-grid-enterprise';
import { GridReadyEvent } from 'ag-grid-community';


@Component({
  selector: 'app-wall-message-report',
  templateUrl: './wall-message-report.component.html',
  styleUrls: ['./wall-message-report.component.css']
})
export class WallMessageReportComponent implements OnInit {

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
    {
      headerName: 'First Name ', valueGetter(params) {
        return params.data.attendee.firstName
      }, rowDrag: true, sortable: true, enableRowGroup: true,
      enablePivot: true, filter: 'agMultiColumnFilter', resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
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
      headerName: 'Last Name ', valueGetter(params) {
        return params.data.attendee.lastName
      }, rowDrag: true, sortable: true, enableRowGroup: true,
      enablePivot: true, filter: 'agMultiColumnFilter', resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
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
    // {
    //   field: 'UserType', valueGetter: (params) => {
    //     return this.attendee;
    //   }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
    //     filters: [

    //       {
    //         filter: true,
    //       },
    //     ],
    //   },
    // },
    {
      headerName: "Room Name", field: 'name', valueGetter(params) {
        return params.data.rooms.name;
      }, rowDrag: true, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1',
    },
    // {
    //   field: 'roomName',valueGetter(params) {
    //     return params.data.rooms.roomId;
    //   }, rowDrag: true, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1,minWidth : 200, headerClass: 'bg1',
    // },

    {
      headerName: 'Post',
      minWidth: 200,
      rowDrag: true,
      sortable: true,
      enablePivot: true,
      headerClass: 'bg1',
      flex: 1,
      filter: 'agMultiColumnFilter',
      cellRenderer: params => {
        var a = document.createElement('div');
        a.innerHTML = params.data.post;
        return a;
      },
    },
    {
      headerName: "Post Date", field: 'addedDate', cellRenderer: (data) => {
        return data.value ? (new Date(data.value)).toLocaleString() : ' ';
      }, rowDrag: true, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
        filters: [
          {
            filter: 'agDateColumnFilter'
          },
          {
            filter: true,
          },
        ],
      },
    },
    {
      field: 'emailAddress', valueGetter(params) {
        return params.data.attendee.emailAddress;
      }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1'
    },

    // {
    //   field: 'isActive', valueGetter(params) {
    //     return params.data.attendee.isActive;
    //   }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1'
    // },
    {
      field: 'eventName', valueGetter: (params) => {
        return this.eventName;
      }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
        filters: [

          {
            filter: true,
          },
        ],
      },
    },
    // {
    //   headerName: 'registration Type', field: 'registrationSetName', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1',
    // },
    // {
    //   field: 'countryCode', valueGetter(params) {
    //     return params.data.attendee.countryCode;
    //   }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1'
    // },

    // {
    //   field: 'startDate',valueGetter(params) {
    //     return params.data.rooms.startDate;
    //   }, rowDrag: true, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, width: 20, headerClass: 'bg1', filterParams: {
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
    //   field: 'endDate',valueGetter(params) {
    //     return params.data.rooms.endDate;
    //   }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, width: 20, headerClass: 'bg1' ,filterParams: {
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
    //   field: 'startTime',valueGetter(params) {
    //     return params.data.rooms.startTime;
    //   }, rowDrag: true, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, width: 20, headerClass: 'bg1', filterParams: {
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
    //   field: 'endTime',valueGetter(params) {
    //     return params.data.rooms.endTime;
    //   }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, width: 20, headerClass: 'bg1', filterParams: {
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
    //   field: 'eventEndDate',  sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, width: 20, headerClass: 'bg1'
    // },
    // {
    //   field: 'eventStartTime', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, width: 20, headerClass: 'bg1'
    // },
    // {
    //   field: 'eventEndTime', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, width: 20, headerClass: 'bg1'
    // },

  ];
  userType: string;
  attendee: any;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private spinner: NgxSpinnerService,
    private reportService: ReportService,
  ) {
    // this.eventId = this.route.snapshot.paramMap.get('id');
    // this.eventName = this.localStorage.get('EventName');
    // this.fromDate=new Date('2020-01-01');
    // this.toDate=new Date('2023-01-01');
    // this.getWallmessage();

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
    this.userType = this.localStorage.get('UserType');

    this.fromDate = new Date('2020-01-01');
    this.toDate = new Date('2023-01-01');
    this.registration = '';
    this.getWallmessage();

  }





  getWallmessage() {
    this.spinner.show();
    this.getbyIdViewModel.id = this.eventId;
    this.reportService.getWallmessage(this.getbyIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        this.noRecordFound = false;
        console.log(res.wallMessageReport);
        this.attendeeData = res.wallMessageReport;
        this.primaryAttendeeData = res.wallMessageReport;
        this.attendeeData.forEach(element => {
          element.isChecked = false;
        });
        this.rowData = res.wallMessageReport;
        console.log(this.rowData);
        this.attendeeData = res.wallMessageReport;
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

  //rerender(): void {
  //    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //      // Destroy the table first
  //      dtInstance.destroy();
  //      // Call the dtTrigger to rerender again
  //      this.dtTrigger.next();
  //    });
  //  }
}
